import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { createClient } from '@supabase/supabase-js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized. Mission failed.' }, { status: 401 });
    }
    const token = authHeader.replace('Bearer ', '');

    const supabase = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
       return NextResponse.json({ error: 'Invalid authentication token.' }, { status: 401 });
    }

    // Use Service Role ONLY for initialization (if it exists)
    const supabaseAdmin = supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

    // 1. Prioritize checking using the AUTHENTICATED user client (most reliable with RLS)
    let { data: userData } = await supabase
       .from('users')
       .select('subscription_tier, daily_credits')
       .eq('id', user.id)
       .single();
    
    // 2. If not found, attempt to initialize the user record via Admin (if available)
    if (!userData && supabaseAdmin) {
       console.log("User record missing. Attempting initialization via Admin...");
       const { data: newData, error: insertError } = await supabaseAdmin
         .from('users')
         .insert([{ 
           id: user.id, 
           email: user.email, 
           name: user.user_metadata?.full_name || user.email?.split('@')[0] || "Scholar",
           daily_credits: 3, 
           subscription_tier: 'free' 
         }])
         .select()
         .single();
       
       if (insertError) {
          // If conflict (PGRST116/23505), try a final fetch with the Admin client
          const { data: retryData } = await supabaseAdmin.from('users').select('subscription_tier, daily_credits').eq('id', user.id).single();
          userData = retryData;
       } else {
          userData = newData;
       }
    }

    // 3. Absolute Fallback: If still missing, return a clearer error with instructions
    if (!userData) {
      return NextResponse.json({ 
        error: 'Account verification failed.', 
        details: 'The system could not find your user profile in the database. Please ensure you have run the provided setup.sql in your Supabase SQL Editor.' 
      }, { status: 500 });
    }


    if (userData.subscription_tier === 'free' && userData.daily_credits <= 0) {
      return NextResponse.json({ error: 'PAYWALL', message: 'You have exhausted your daily AI energy matrix. Upgrade to Scholar Plus to remove limits.' }, { status: 403 });
    }

    const formData = await req.formData();
    const sourceText = formData.get('source_text') as string | null;
    const file = formData.get('file') as File | null;

    if (!sourceText && !file) {
      return NextResponse.json({ error: 'Source text or file is required' }, { status: 400 });
    }

    const isUrl = sourceText && /^(http|https):\/\/[^ "]+$/.test(sourceText.trim());

    if (sourceText && sourceText.length < 50 && !file && !isUrl) {
      return NextResponse.json({ error: 'Source text is too short for meaningful analysis. Please provide at least 50 characters or upload a document.' }, { status: 400 });
    }
    const systemPrompt = `
      You are an expert AI tutor. Your job is to analyze the provided source content—which may be raw text, a document file, or a direct URL link—and generate a structured set of study materials.
      If a URL is provided, please attempt to extract context and knowledge from its destination for analysis.
      You must respond ONLY with a valid JSON object following this exact schema:
      {
        "summary_notes": [
          "A high-level key concept extracted from the source",
          "Another critical structural bullet point"
        ],
        "flashcards": [
          { "front": "A clear, concise question", "back": "The exact, simple answer" }
        ],
        "quizzes": [
          { "question": "Multiple choice question", "options": ["A", "B", "C", "D"], "correctAnswer": "A" }
        ]
      }
      
      Extract the most important concepts. Create exactly 5 summary_notes, 10 flashcards, and 10 quiz questions. Ensure the JSON is well-formed. Do NOT use markdown code blocks like \`\`\`json, just return raw JSON string.
    `;

    const parts: any[] = [{ text: systemPrompt }];

    if (sourceText) {
      parts.push({ text: '\n\nSOURCE TEXT:\n' + sourceText });
    }

    if (file) {
      const bytes = await file.arrayBuffer();
      const base64Data = Buffer.from(bytes).toString('base64');
      parts.push({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        }
      });
    }

    // Call Gemini with Multi-Model Resilience Loop
    const candidateModels = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-flash-latest', 'gemini-pro'];
    let responseText = "";
    let lastError = null;

    for (const modelId of candidateModels) {
      try {
        console.log(`Attempting generation with model: ${modelId}...`);
        const result = await ai.models.generateContent({
          model: modelId,
          contents: [{ role: 'user', parts }],
          config: {
            responseMimeType: 'application/json',
            temperature: 0.1,
          }
        });
        
        responseText = result.text || "";
        if (responseText) {
          console.log(`SUCCESS with model: ${modelId}`);
          break; 
        }
      } catch (err: any) {
        lastError = err;
        if (err.message?.includes('404') || err.message?.includes('not found')) {
          console.warn(`Model ${modelId} not found, trying next...`);
          continue;
        }
        throw err; // Re-throw real errors (auth, quota, etc.)
      }
    }

    // 4. Parse AI Response
    try {
      const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const data = JSON.parse(cleanedText);

      // AI Generation succeeded, trigger the deduction engine
      if (userData.subscription_tier === 'free') {
         const client = supabaseAdmin || supabase;
         await client
           .from('users')
           .update({ 
             daily_credits: Math.max(userData.daily_credits - 1, 0),
             updated_at: new Date().toISOString()
           })
           .eq('id', user.id);
      }

      return NextResponse.json(data);

    } catch (parseError: any) {
       console.error("AI Output parsing failure:", responseText);
       throw new Error(`The AI generated an invalid data format: ${parseError.message}`);
    }

  } catch (error: any) {
    console.error('Generation API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content', details: error.message }, 
      { status: 500 }
    );
  }
}

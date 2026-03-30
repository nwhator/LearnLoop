import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { createClient } from '@supabase/supabase-js';

const ai = new GoogleGenAI({});
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Must use service role to bypass RLS for credit checking or just normal client

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

    // Checking Subscription Engine
    const { data: userData, error: userError } = await supabase
       .from('users')
       .select('subscription_tier, daily_credits')
       .eq('id', user.id)
       .single();
    
    if (userError || !userData) {
      return NextResponse.json({ error: 'Failed to verify account permissions.' }, { status: 500 });
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

    if (sourceText && sourceText.length < 50 && !file) {
      return NextResponse.json({ error: 'Source text is too short for meaningful analysis. Please provide at least 50 characters or upload a document.' }, { status: 400 });
    }

    const systemPrompt = `
      You are an expert AI tutor. Your job is to analyze the provided content (text or document) and generate a structured set of study materials.
      You must respond ONLY with a valid JSON object following this exact schema:
      {
        "summary_notes": [
          "A high-level key concept extracted from the text",
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

    // Call Gemini 2.5 Flash
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts }],
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2, // Low temperature for factual extraction
      }
    });

    let responseText = response.text;
    
    if (!responseText) {
      throw new Error('No response text received from Gemini');
    }

    // Clean up markdown markers if Gemini ignores the prompt instruction
    responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

    const data = JSON.parse(responseText);

    // AI Generation succeeded, trigger the deduction engine
    await supabase.rpc('deduct_credit');

    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Generation API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content', details: error.message }, 
      { status: 500 }
    );
  }
}

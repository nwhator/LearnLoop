import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { createClient } from '@supabase/supabase-js';

const ai = new GoogleGenAI({});
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
       return NextResponse.json({ error: 'Invalid authentication token.' }, { status: 401 });
    }

    const { study_set_id, question_text, user_answer, correct_answer } = await req.json();

    if (!question_text || !user_answer || !correct_answer) {
      return NextResponse.json({ error: 'Missing diagnostic parameters' }, { status: 400 });
    }

    const systemPrompt = `
      You are an expert, empathetic AI Tutor.
      A student just answered a question incorrectly.
      Question: "${question_text}"
      They chose: "${user_answer}"
      The correct answer is: "${correct_answer}"
      
      Write exactly ONE polite, encouraging sentence explaining the conceptual mistake they likely made or why the correct answer is true. Keep it under 20 words.
    `;

    // Call Gemini 2.5 Flash
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
      config: {
        temperature: 0.3, 
      }
    });

    const aiFeedback = response.text?.trim() || "Review this topic to strengthen your understanding.";

    // Insert into user_diagnostics
    const { error: insertError } = await supabase
      .from('user_diagnostics')
      .insert([{
        user_id: user.id,
        study_set_id: study_set_id || null,
        question_text: question_text,
        ai_feedback: aiFeedback
      }]);

    if (insertError) {
       console.error("Failed to insert diagnostic:", insertError);
       return NextResponse.json({ error: 'Failed DB Diagnostic Save' }, { status: 500 });
    }

    return NextResponse.json({ success: true, feedback: aiFeedback });

  } catch (error: any) {
    console.error('Diagnostic API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process diagnostic', details: error.message }, 
      { status: 500 }
    );
  }
}

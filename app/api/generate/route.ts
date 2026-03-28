import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini client using the GenAI SDK
// It automatically picks up GEMINI_API_KEY from process.env
// Requires `@google/genai` to be installed
const ai = new GoogleGenAI({});

export async function POST(req: Request) {
  try {
    const { source_text } = await req.json();

    if (!source_text || source_text.trim() === '') {
      return NextResponse.json({ error: 'Source text is required' }, { status: 400 });
    }

    // Define the strict structured output we expect from Gemini
    const systemPrompt = `
      You are an expert AI tutor. Your job is to analyze the provided text and generate a structured set of study materials.
      You must respond ONLY with a valid JSON object following this exact schema:
      {
        "flashcards": [
          { "id": "uuid or unique string", "front": "A clear, concise question", "back": "The exact, simple answer" }
        ],
        "quizzes": [
          { "id": "uuid", "question": "Multiple choice question", "options": ["A", "B", "C", "D"], "correctAnswer": "A" }
        ]
      }
      
      Extract the most important concepts. Keep flashcards to 3-5 items. 
    `;

    // Call Gemini 2.5 Flash (or any available 2.0+ model)
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
         { role: 'user', parts: [{ text: systemPrompt + '\n\nSOURCE TEXT:\n' + source_text }] }
      ],
      config: {
        // Enforce JSON output type to ensure reliable parsing
        responseMimeType: 'application/json',
        temperature: 0.2, // Low temperature for factual extraction
      }
    });

    const responseText = response.text;
    
    if (!responseText) {
      throw new Error('No response text received from Gemini');
    }

    // Parse the JSON directly (Gemini is instructed to return raw JSON without markdown blocks via responseMimeType)
    const data = JSON.parse(responseText);

    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Generation API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content', details: error.message }, 
      { status: 500 }
    );
  }
}

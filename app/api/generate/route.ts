import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const sourceText = formData.get('source_text') as string | null;
    const file = formData.get('file') as File | null;

    if (!sourceText && !file) {
      return NextResponse.json({ error: 'Source text or file is required' }, { status: 400 });
    }

    const systemPrompt = `
      You are an expert AI tutor. Your job is to analyze the provided content (text or document) and generate a structured set of study materials.
      You must respond ONLY with a valid JSON object following this exact schema:
      {
        "flashcards": [
          { "front": "A clear, concise question", "back": "The exact, simple answer" }
        ],
        "quizzes": [
          { "question": "Multiple choice question", "options": ["A", "B", "C", "D"], "correctAnswer": "A" }
        ]
      }
      
      Extract the most important concepts. Create exactly 5 flashcards and 5 quiz questions. Ensure the JSON is well-formed. Do NOT use markdown code blocks like \`\`\`json, just return raw JSON string.
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

    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Generation API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content', details: error.message }, 
      { status: 500 }
    );
  }
}

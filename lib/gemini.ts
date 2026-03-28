import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

/**
 * Generate a study set or content using the new unified Gemini SDK.
 * @param prompt - The instruction for the AI
 */
export async function generateContent(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}

/**
 * Moderation helper using Gemini
 */
export async function moderateContent(content: string) {
  const prompt = `Act as a content moderator for an educational platform. 
  Review the following content and flag any inaccuracies, inappropriate material, or low-quality phrasing. 
  Respond ONLY with a JSON object: { "flagged": boolean, "reason": string, "accuracyScore": number (0-100) }
  Content: ${content}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });
    
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Moderation Error:", error);
    return { flagged: false, reason: "Error in moderation check", accuracyScore: 0 };
  }
}

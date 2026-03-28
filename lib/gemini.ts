import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Generate a study set or content using Gemini.
 * @param prompt - The instruction for the AI
 */
export async function generateContent(prompt: string) {
  try {
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
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
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error("Moderation Error:", error);
    return { flagged: false, reason: "Error in moderation check", accuracyScore: 0 };
  }
}

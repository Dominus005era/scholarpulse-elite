import { GoogleGenerativeAI } from "@google/generative-ai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const MODELS_TO_TRY = [
  "gemini-2.5-flash-lite", 
  "gemini-2.0-flash-lite",
  "gemini-2.0-flash"
];

async function generateWithRetry(prompt: string, imageParts: any[], modelIndex = 0): Promise<string> {
  if (modelIndex >= MODELS_TO_TRY.length) {
    throw new Error("All available AI models are currently busy. Please try again in a moment.");
  }

  const modelName = MODELS_TO_TRY[modelIndex];
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    if (error.message?.includes("429") || error.message?.includes("quota")) {
      return generateWithRetry(prompt, imageParts, modelIndex + 1);
    }
    throw error;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { type, images } = req.body;
  if (!images || !Array.isArray(images) || images.length === 0) {
    return res.status(400).json({ error: 'At least one image is required' });
  }

  try {
    let prompt = "";
    if (type === 'attendance') {
      prompt = `Analyze this ERP attendance dashboard. 
      1. Count total Present and total Absent classes.
      2. Extract a list of recent daily attendance entries if visible.
      Return ONLY a JSON object: {
        "present": number, 
        "absent": number, 
        "reportDate": "string",
        "dailyLogs": [{"date": "string", "status": "Present" | "Absent"}]
      }`;
    } else {
      prompt = `Analyze this Academic Calendar. Extract every event and date. 
      Return ONLY a JSON array of objects: [{"date": "string", "event": "string", "type": "Academic|Holiday|Exam|Event"}]. 
      Do not add markdown formatting or backticks.`;
    }

    const imageParts = images.map(img => ({
      inlineData: { mimeType: "image/jpeg", data: img }
    }));

    const rawText = await generateWithRetry(prompt, imageParts);
    
    // Improved JSON extraction: Finds the outermost [ or { to the end of ] or }
    const cleanedText = rawText.trim().replace(/^```json/, '').replace(/```$/, '').trim();
    const jsonMatch = cleanedText.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
    
    if (jsonMatch) {
      try {
        const data = JSON.parse(jsonMatch[0]);
        return res.status(200).json(data);
      } catch (e: any) {
        return res.status(500).json({ error: `JSON Parse Error: ${e.message}. Raw: ${jsonMatch[0].substring(0, 50)}...` });
      }
    }

    return res.status(500).json({ error: "AI failed to generate a valid data structure." });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Server error occurred." });
  }
}

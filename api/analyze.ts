import { GoogleGenerativeAI } from "@google/generative-ai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// List of models allowed by your key, ordered from best to most available
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
    // If it's a Quota error (429), try the next model in the list
    if (error.message?.includes("429") || error.message?.includes("quota")) {
      console.log(`Model ${modelName} hit quota, trying fallback...`);
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
      prompt = `Analyze ERP attendance. Count GREEN as Present, RED as Absent. Return ONLY JSON: {"present": number, "absent": number, "reportDate": "string"}`;
    } else {
      prompt = `Return JSON array of events: [{"date": "string", "event": "string"}]`;
    }

    const imageParts = images.map(img => ({
      inlineData: { mimeType: "image/jpeg", data: img }
    }));

    // Start the smart failover process
    const rawText = await generateWithRetry(prompt, imageParts);
    
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const data = JSON.parse(jsonMatch[0]);
      return res.status(200).json(data);
    }

    return res.status(500).json({ error: "AI failed to generate a valid report." });
  } catch (error: any) {
    console.error("Critical API Error:", error);
    return res.status(error.message?.includes("busy") ? 429 : 500).json({ 
      error: error.message || "Server error occurred during analysis." 
    });
  }
}

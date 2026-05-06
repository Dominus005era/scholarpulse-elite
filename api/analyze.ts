import { GoogleGenAI } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, images } = req.body; // Changed from 'image' to 'images' (array)

  if (!images || !Array.isArray(images) || images.length === 0) {
    return res.status(400).json({ error: 'At least one image is required' });
  }

  try {
    const model = "gemini-1.5-flash";
    let prompt = "";

    if (type === 'attendance') {
      prompt = `Analyze these ERP attendance screenshots (there may be multiple). 
      
      CRITICAL INSTRUCTIONS:
      1. Look for color-coded cells in the tables:
         - GREEN cells (or cells with text like BCS452 on a green background) = PRESENT.
         - RED cells (or cells with text like BVE401 on a red background) = ABSENT.
      2. If you see a numeric summary (e.g., "Total Present: 40"), use that. 
      3. If no summary exists, COUNT every green block as 1 present and every red block as 1 absent across ALL images provided.
      4. Sum the results from all provided images.
      5. Extract any report date or academic period mentioned.

      Return ONLY a valid JSON object: {"present": number, "absent": number, "reportDate": "string or null"}.`;
    } else if (type === 'calendar') {
      prompt = `Analyze these Academic Calendar images. 
      Identify all important dates, holidays, exams, and events mentioned across all images.
      
      Return the output in valid JSON format as a single list of events: 
      [{"date": "string", "event": "string", "type": "Academic | Holiday | Exam | Event | Other"}]`;
    } else {
      return res.status(400).json({ error: 'Invalid type' });
    }

    const genAIModel = ai.models;
    
    // Prepare the parts for the multi-image request
    const imageParts = images.map(img => ({
      inlineData: {
        mimeType: "image/jpeg",
        data: img
      }
    }));

    const response = await genAIModel.generateContent({
      model: model,
      contents: {
        parts: [
          { text: prompt },
          ...imageParts
        ]
      },
      config: {
        responseMimeType: "application/json"
      }
    });

    const responseText = response.text || "{}";
    const data = JSON.parse(responseText);

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error in API handler:", error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

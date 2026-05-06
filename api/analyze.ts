import { GoogleGenAI } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, images } = req.body;

  if (!images || !Array.isArray(images) || images.length === 0) {
    return res.status(400).json({ error: 'At least one image is required' });
  }

  try {
    const model = "gemini-1.5-flash";
    let prompt = "";

    if (type === 'attendance') {
      prompt = `Analyze these ERP attendance screenshots. 
      
      INSTRUCTIONS:
      1. This is a grid of lectures. 
      2. Count every GREEN cell as 1 "Present" lecture. (Even if it has text like BCS452 inside).
      3. Count every RED cell as 1 "Absent" lecture. (Even if it has text like BVE401 inside).
      4. Total them up across all images.
      5. If there is a "Total" summary at the bottom/top of the image, prioritize those numbers.
      
      Return ONLY a raw JSON object. No markdown, no conversational text.
      Format: {"present": number, "absent": number, "reportDate": "string or null"}`;
    } else if (type === 'calendar') {
      prompt = `Analyze these Academic Calendar images. Identify all important dates and events.
      Return ONLY a JSON array: [{"date": "string", "event": "string", "type": "Academic | Holiday | Exam | Other"}]`;
    }

    const imageParts = images.map(img => ({
      inlineData: {
        mimeType: "image/jpeg",
        data: img
      }
    }));

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          { text: prompt },
          ...imageParts
        ]
      }
    });

    let responseText = response.text || "{}";
    
    // SAFETY: Remove any markdown code blocks if the AI accidentally included them
    if (responseText.includes('```')) {
      responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    }

    const data = JSON.parse(responseText);
    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error in API handler:", error);
    return res.status(500).json({ error: "Failed to parse AI response. Please try again." });
  }
}

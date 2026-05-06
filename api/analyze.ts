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
      
      TASK:
      - Count every single GREEN block as 1 "Present" lecture.
      - Count every single RED block as 1 "Absent" lecture.
      - If there is a total summary (e.g. "Total Lectures: 50, Present: 40"), use those numbers.
      
      OUTPUT FORMAT:
      You must return ONLY a JSON object like this: {"present": 40, "absent": 10, "reportDate": "DD MMM YYYY"}. 
      Do not include any other text.`;
    } else {
      prompt = `Analyze these images and return a JSON list of events: [{"date": "string", "event": "string", "type": "string"}]`;
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

    let rawText = response.text || "";
    
    // Attempt to extract JSON from the response text
    // This finds the first '{' and last '}' to strip any extra text
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const data = JSON.parse(jsonMatch[0]);
        return res.status(200).json(data);
      } catch (e) {
        console.error("JSON Parse Error:", e);
        return res.status(500).json({ error: `AI gave invalid JSON: ${rawText.substring(0, 100)}...` });
      }
    }

    return res.status(500).json({ error: `AI didn't provide JSON. Raw response: ${rawText.substring(0, 100)}...` });
  } catch (error: any) {
    console.error("Error in API handler:", error);
    return res.status(500).json({ error: `Server Error: ${error.message}` });
  }
}

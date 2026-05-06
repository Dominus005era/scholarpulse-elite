import { GoogleGenerativeAI } from "@google/generative-ai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, images } = req.body;

  if (!images || !Array.isArray(images) || images.length === 0) {
    return res.status(400).json({ error: 'At least one image is required' });
  }

  try {
    // Switching to 1.5-flash-8b which is the most compatible free-tier model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
    let prompt = "";

    if (type === 'attendance') {
      prompt = `Analyze these ERP attendance screenshots. 
      
      TASK:
      - Count every single GREEN block as 1 "Present" lecture.
      - Count every single RED block as 1 "Absent" lecture.
      - If there is a total summary (e.g. "Total Lectures: 50, Present: 40"), use those numbers.
      
      OUTPUT FORMAT:
      Return ONLY a JSON object: {"present": number, "absent": number, "reportDate": "string"}. 
      No markdown, no extra text.`;
    } else {
      prompt = `Analyze these images and return a JSON list of events: [{"date": "string", "event": "string", "type": "string"}]`;
    }

    const imageParts = images.map(img => ({
      inlineData: {
        mimeType: "image/jpeg",
        data: img
      }
    }));

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    let rawText = response.text();
    
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const data = JSON.parse(jsonMatch[0]);
        return res.status(200).json(data);
      } catch (e) {
        return res.status(500).json({ error: `AI provided invalid format. Please try again.` });
      }
    }

    return res.status(500).json({ error: "AI failed to generate a report. Please try again." });
  } catch (error: any) {
    console.error("Error in API handler:", error);
    // If it's a quota error, give a friendly message
    if (error.message?.includes("429")) {
      return res.status(429).json({ error: "API Quota exceeded. Please wait a minute or use a different API key." });
    }
    return res.status(500).json({ error: `Server Error: ${error.message}` });
  }
}

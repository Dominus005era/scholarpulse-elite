import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, image } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'Image is required' });
  }

  try {
    const model = "gemini-1.5-flash";
    let prompt = "";

    if (type === 'attendance') {
      prompt = `Analyze this ERP attendance screenshot. 
      1. Extract the total number of lectures present and absent.
      2. Extract any date mentioned in the screenshot that indicates when this report was generated or the current date shown in the UI (often in corners or header).
      
      Return the output in valid JSON format: {"present": number, "absent": number, "reportDate": "string or null"}. 
      If you cannot find clear numbers, try to estimate based on the rows provided in the table. 
      Format reportDate as 'DD MMM YYYY' if possible.`;
    } else if (type === 'calendar') {
      prompt = `Analyze this Academic Calendar image. 
      Identify all important dates, holidays, exams, and events mentioned.
      
      Return the output in valid JSON format as a list of events: 
      [{"date": "string", "event": "string", "type": "Academic | Holiday | Exam | Event | Other"}]
      
      Be as precise as possible with the dates (format: YYYY-MM-DD or similar). 
      If a range is given, split it into separate entries or use a clear string.`;
    } else {
      return res.status(400).json({ error: 'Invalid type' });
    }

    const genAIModel = ai.getGenerativeModel({ model });
    const result = await genAIModel.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: image
        }
      }
    ]);

    const responseText = result.response.text();
    // Clean up potential markdown code blocks in the response
    const jsonString = responseText.replace(/```json|```/g, '').trim();
    const data = JSON.parse(jsonString);

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error in API handler:", error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

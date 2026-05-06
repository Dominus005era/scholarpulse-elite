import { GoogleGenAI } from "@google/genai";
import { CalendarEvent } from "../types.ts";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeAttendanceImage(base64Image: string): Promise<{ present: number; absent: number; reportDate?: string } | null> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: {
        parts: [
          {
            text: `Analyze this ERP attendance screenshot. 
            1. Extract the total number of lectures present and absent.
            2. Extract any date mentioned in the screenshot that indicates when this report was generated or the current date shown in the UI (often in corners or header).
            
            Return the output in valid JSON format: {"present": number, "absent": number, "reportDate": "string or null"}. 
            If you cannot find clear numbers, try to estimate based on the rows provided in the table. 
            Format reportDate as 'DD MMM YYYY' if possible.`
          },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image
            }
          }
        ]
      },
      config: {
        responseMimeType: "application/json"
      }
    });

    const result = JSON.parse(response.text || "{}");
    if (typeof result.present === 'number' && typeof result.absent === 'number') {
      return result;
    }
    return null;
  } catch (error) {
    console.error("Error analyzing image:", error);
    return null;
  }
}

export async function analyzeAcademicCalendar(base64Image: string): Promise<CalendarEvent[] | null> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: {
        parts: [
          {
            text: `Analyze this Academic Calendar image. 
            Identify all important dates, holidays, exams, and events mentioned.
            
            Return the output in valid JSON format as a list of events: 
            [{"date": "string", "event": "string", "type": "Academic | Holiday | Exam | Event | Other"}]
            
            Be as precise as possible with the dates (format: YYYY-MM-DD or similar). 
            If a range is given, split it into separate entries or use a clear string.`
          },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image
            }
          }
        ]
      },
      config: {
        responseMimeType: "application/json"
      }
    });

    const result = JSON.parse(response.text || "[]");
    if (Array.isArray(result)) {
      return result;
    }
    return null;
  } catch (error) {
    console.error("Error analyzing calendar:", error);
    return null;
  }
}

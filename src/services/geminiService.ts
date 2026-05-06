import { CalendarEvent } from "../types.ts";

export async function analyzeAttendanceImage(base64Image: string): Promise<{ present: number; absent: number; reportDate?: string } | null> {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'attendance',
        image: base64Image,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const result = await response.json();
    if (typeof result.present === 'number' && typeof result.absent === 'number') {
      return result;
    }
    return null;
  } catch (error) {
    console.error("Error analyzing image via API:", error);
    return null;
  }
}

export async function analyzeAcademicCalendar(base64Image: string): Promise<CalendarEvent[] | null> {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'calendar',
        image: base64Image,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const result = await response.json();
    if (Array.isArray(result)) {
      return result;
    }
    return null;
  } catch (error) {
    console.error("Error analyzing calendar via API:", error);
    return null;
  }
}

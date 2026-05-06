import { CalendarEvent } from "../types.ts";

export async function analyzeAttendanceImage(base64Images: string[]): Promise<{ present: number; absent: number; reportDate?: string; error?: string } | null> {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'attendance',
        images: base64Images,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { present: 0, absent: 0, error: data.error || `API Error: ${response.statusText}` };
    }

    return data;
  } catch (error: any) {
    console.error("Error analyzing image via API:", error);
    return { present: 0, absent: 0, error: error.message || "Network error. Please try again." };
  }
}

export async function analyzeAcademicCalendar(base64Images: string[]): Promise<CalendarEvent[] | { error: string } | null> {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'calendar',
        images: base64Images,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || `API Error: ${response.statusText}` };
    }

    return data;
  } catch (error: any) {
    console.error("Error analyzing calendar via API:", error);
    return { error: error.message || "Network error. Please try again." };
  }
}

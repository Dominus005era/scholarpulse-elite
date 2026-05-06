export interface UserRecord {
  name: string;
  college: string;
  class: string;
  section: string;
  year: string;
  semester: string;
  targetPercentage: number;
  avatar?: string;
}

export interface AttendanceData {
  id: string;
  timestamp: string; 
  present: number;
  absent: number;
  total: number;
  percentage: number;
  possibleBunks: number;
  requiredClasses?: number;
  reportDate?: string; 
}

export interface PredictionDetail {
  endDate: string;
  estimatedClassesRemaining: number;
  canBunk: number;
}

export interface Achievement {
  id: string;
  type: 'Award' | 'Certification' | 'Competition' | 'Project' | 'Other';
  title: string;
  description: string;
  date: string;
  organization: string;
}

export interface CalendarEvent {
  date: string;
  event: string;
  type: 'Academic' | 'Holiday' | 'Exam' | 'Event' | 'Other';
}

export interface Memory {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

export enum AppState {
  LANDING = 'LANDING',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  PLATFORM = 'PLATFORM',
  METHODOLOGY = 'METHODOLOGY',
  COMPANY = 'COMPANY',
  BLOG = 'BLOG',
  ACHIEVEMENTS = 'ACHIEVEMENTS',
  CALENDAR = 'CALENDAR',
  PREFERENCES = 'PREFERENCES',
  MEMORY = 'MEMORY',
}

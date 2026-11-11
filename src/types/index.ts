export type Priority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string; // e.g. "Database Systems"
  dueDate: string; // YYYY-MM-DD
  dueTime: string; // HH:mm
  priority: Priority;
  status: TaskStatus;
  createdAt: string;
  completedAt?: string;
  estimatedMinutes?: number;
}

export interface Category {
  id: string;
  name: string;
  code: string; // e.g. "CS-301"
  color: string; // Hex color
  description: string;
  instructor?: string;
  credits?: number;
}

export interface UserProfile {
  name: string;
  role: string;
  email: string;
  avatarUrl: string;
  major: string;
  university: string;
  semester: string;
  dailyStudyGoalHours: number;
}

export type NavigationTab = 
  | 'overview' 
  | 'tasks' 
  | 'calendar' 
  | 'categories' 
  | 'reports' 
  | 'settings';

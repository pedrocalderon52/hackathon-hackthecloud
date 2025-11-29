export type EventType = 'aula' | 'trabalho' | 'prova' | 'atividade' | 'seminario' | 'encontro';

export interface Task {
  id: string;
  name: string;
  dueDate: Date;
  notes?: string;
  difficulty: number; // 1-5
  workload: number; // 1-10
  frequency?: string;
  completed: boolean;
  type: EventType;
}

export interface Event {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  notes?: string;
  location?: string;
  frequency?: string;
  type: EventType;
  color?: string;
}

export interface WeekData {
  weekStart: Date;
  weekEnd: Date;
  days: DayData[];
}

export interface DayData {
  date: Date;
  dayName: string;
  tasks: Task[];
  events: Event[];
}

export interface Suggestion {
  id: string;
  type: 'warning' | 'info' | 'success';
  message: string;
  priority: 'high' | 'medium' | 'low';
}

export interface AttendanceRecord {
  id: string;
  subjectName: string;
  totalClasses: number;
  attended: number;
  absences: number;
  percentage: number;
}

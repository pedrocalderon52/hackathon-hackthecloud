// Core Types for Academic Planner

export type EventType = 'aula' | 'trabalho' | 'prova' | 'atividade' | 'seminario' | 'encontro';

export type TaskStatus = 'pendente' | 'concluida' | 'falta' | 'suspensa';

export type ICSLevel = 'green' | 'yellow' | 'red' | 'purple';

export interface Semester {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Discipline {
  id: string;
  semesterId: string;
  name: string;
  notes: Grade[];
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Grade {
  id: string;
  name: string;
  value: number;
  weight: number;
  date: Date;
}

export interface Aula {
  id: string;
  semesterId: string;
  disciplineId?: string;
  name: string;
  local: string;
  startDate: Date;
  endDate: Date;
  status: TaskStatus;
  observation?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  name: string;
  dueDate: Date;
  observation?: string;
  difficulty: number; // 0=trivial, 1=simples, 2=media, 3=dificil
  workload: number; // 1-10 hammers (legacy, keeping for compatibility)
  type: 'prova' | 'projeto' | 'trabalho' | 'leitura' | 'exercicio';
  estimatedHours: number;
  disciplineId?: string;
  completed: boolean;
  recurrence?: RecurrenceRule;
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  name: string;
  type: EventType;
  startDate: Date;
  endDate: Date;
  observation?: string;
  local?: string;
  disciplineId?: string;
  recurrence?: RecurrenceRule;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecurrenceRule {
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  daysOfWeek?: number[]; // 0 = Sunday, 6 = Saturday
  endDate?: Date;
  count?: number;
}

export interface UserRoutine {
  id: string;
  userId: string;
  wakeTime: string; // HH:mm format
  sleepTime: string; // HH:mm format
  createdAt: Date;
  updatedAt: Date;
}

export interface AttendanceRecord {
  disciplineId: string;
  disciplineName: string;
  totalClasses: number;
  attended: number;
  missed: number;
  percentage: number;
}

export interface Suggestion {
  id: string;
  type: 'warning' | 'info' | 'success';
  title: string;
  description: string;
  priority: 'alta' | 'media' | 'baixa';
  actionLabel?: string;
  action?: {
    type: 'move_task';
    taskId: string;
    newDate: Date;
  };
}

export interface WeeklyICS {
  weekStart: Date;
  weekEnd: Date;
  icsValue: number;
  level: ICSLevel;
  label: string;
}

// Calculate ICS level based on value
export function getICSLevel(value: number): ICSLevel {
  if (value <= 20) return 'green';
  if (value <= 60) return 'yellow';
  if (value <= 120) return 'red';
  return 'purple';
}

export function getICSLabel(level: ICSLevel): string {
  switch (level) {
    case 'green':
      return 'Carga leve - Semana tranquila';
    case 'yellow':
      return 'Carga moderada - Atenção recomendada';
    case 'red':
      return 'Carga alta - Semana crítica';
    case 'purple':
      return 'Sobrecarga - Alerta máximo!';
  }
}

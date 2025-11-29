import {
  Task,
  Event,
  Discipline,
  AttendanceRecord,
  Suggestion,
  WeeklyICS,
  getICSLevel,
  getICSLabel
} from '@/types';
import { addDays, startOfWeek, format } from 'date-fns';

// Mock Disciplines
export const mockDisciplines: Discipline[] = [
  {
    id: '1',
    semesterId: 'sem1',
    name: 'Cálculo II',
    notes: [
      { id: 'n1', name: 'P1', value: 7.5, weight: 1, date: new Date() },
      { id: 'n2', name: 'P2', value: 8.0, weight: 1, date: new Date() },
    ],
    color: '#F59E0B',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    semesterId: 'sem1',
    name: 'Física I',
    notes: [
      { id: 'n3', name: 'P1', value: 6.5, weight: 1, date: new Date() },
    ],
    color: '#3B82F6',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    semesterId: 'sem1',
    name: 'Programação',
    notes: [
      { id: 'n4', name: 'Projeto 1', value: 9.0, weight: 1, date: new Date() },
      { id: 'n5', name: 'P1', value: 8.5, weight: 1, date: new Date() },
    ],
    color: '#10B981',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Mock Tasks
const today = new Date();
const weekStart = startOfWeek(today, { weekStartsOn: 1 });

export const mockTasks: Task[] = [
  {
    id: 't1',
    name: 'Trabalho de Cálculo',
    dueDate: addDays(weekStart, 1),
    observation: 'Entregar pelo Moodle',
    difficulty: 3, // Difícil
    workload: 7,
    type: 'trabalho',
    estimatedHours: 4,
    disciplineId: '1',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 't2',
    name: 'Lista de exercícios',
    dueDate: addDays(weekStart, 3),
    difficulty: 1, // Simples
    workload: 3,
    type: 'exercicio',
    estimatedHours: 2,
    disciplineId: '2',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Mock Events
export const mockEvents: Event[] = [
  {
    id: 'e1',
    name: 'Prova de Física',
    type: 'prova',
    startDate: addDays(weekStart, 3),
    endDate: addDays(weekStart, 3),
    local: 'Sala A101',
    disciplineId: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'e2',
    name: 'Atividade em grupo',
    type: 'atividade',
    startDate: addDays(weekStart, 1),
    endDate: addDays(weekStart, 1),
    observation: 'Grupo de 4 pessoas',
    disciplineId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'e3',
    name: 'Seminário de Programação',
    type: 'seminario',
    startDate: addDays(weekStart, 11),
    endDate: addDays(weekStart, 11),
    local: 'Auditório',
    disciplineId: '3',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Mock Attendance Records
export const mockAttendance: AttendanceRecord[] = [
  {
    disciplineId: '1',
    disciplineName: 'Cálculo II',
    totalClasses: 40,
    attended: 35,
    missed: 5,
    percentage: 87.5,
  },
  {
    disciplineId: '2',
    disciplineName: 'Física I',
    totalClasses: 36,
    attended: 28,
    missed: 8,
    percentage: 77.8,
  },
  {
    disciplineId: '3',
    disciplineName: 'Programação',
    totalClasses: 44,
    attended: 42,
    missed: 2,
    percentage: 95.5,
  },
];

// Mock Suggestions
export const mockSuggestions: Suggestion[] = [
  {
    id: 's1',
    type: 'warning',
    title: 'Semana crítica chegando',
    description: 'Você tem 3 entregas e 2 provas na semana que vem. Considere adiantar algumas tarefas.',
    priority: 'alta',
    actionLabel: 'Alta prioridade',
  },
  {
    id: 's2',
    type: 'info',
    title: 'Carga equilibrada',
    description: 'Sua carga está equilibrada esta semana. Bom momento para revisar conteúdos anteriores.',
    priority: 'baixa',
    actionLabel: 'Baixa prioridade',
  },
];

// Generate Smart Suggestions
export function generateSuggestions(tasks: Task[], events: Event[]): Suggestion[] {
  const suggestions: Suggestion[] = [];
  const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });
  const nextWeekStart = addDays(currentWeekStart, 7);

  // 1. Check for Heavy Weeks (> 60 ICS)
  const nextWeekICS = calculateWeeklyICS(nextWeekStart, tasks, events);

  if (nextWeekICS > 60) {
    // Find movable tasks in next week (not exams, moderate difficulty)
    const nextWeekEnd = addDays(nextWeekStart, 6);
    const movableTasks = tasks.filter(t =>
      t.dueDate >= nextWeekStart &&
      t.dueDate <= nextWeekEnd &&
      t.type !== 'prova' &&
      !t.completed
    );

    if (movableTasks.length > 0) {
      // Suggest moving the first found task to the current week (e.g., Friday)
      const taskToMove = movableTasks[0];
      const suggestedDate = addDays(currentWeekStart, 4); // Friday of current week

      suggestions.push({
        id: `s_heavy_${taskToMove.id}`,
        type: 'warning',
        title: 'Semana seguinte pesada',
        description: `A próxima semana está sobrecarregada (ICS: ${nextWeekICS}). Que tal adiantar "${taskToMove.name}"?`,
        priority: 'alta',
        actionLabel: 'Antecipar Tarefa',
        action: {
          type: 'move_task',
          taskId: taskToMove.id,
          newDate: suggestedDate
        }
      });
    }
  }

  // 2. Check for Exams (Provas)
  const upcomingExams = events.filter(e =>
    e.type === 'prova' &&
    e.startDate >= today &&
    e.startDate <= addDays(today, 14)
  );

  upcomingExams.forEach(exam => {
    // Find tasks due 1-2 days before the exam
    const examDate = startOfWeek(exam.startDate, { weekStartsOn: 1 }); // Normalize to start of day if needed, but simple comparison is ok
    const criticalWindowStart = addDays(exam.startDate, -2);

    const conflictingTasks = tasks.filter(t =>
      t.dueDate >= criticalWindowStart &&
      t.dueDate < exam.startDate &&
      !t.completed
    );

    conflictingTasks.forEach(task => {
      // Suggest moving task to 3-4 days before exam
      const newDate = addDays(exam.startDate, -4);

      suggestions.push({
        id: `s_exam_${exam.id}_${task.id}`,
        type: 'info',
        title: `Preparação para ${exam.name}`,
        description: `A tarefa "${task.name}" está perto da prova. Antecipe para focar nos estudos.`,
        priority: 'media',
        actionLabel: 'Reorganizar',
        action: {
          type: 'move_task',
          taskId: task.id,
          newDate: newDate
        }
      });
    });
  });

  return suggestions;
}

// --- ICS Calculation Logic ---

// 1. Task Type Factor (TT)
function getTaskTypeFactor(type: Task['type'] | Event['type']): number {
  switch (type) {
    case 'prova': return 4;
    case 'projeto': return 3;
    case 'trabalho': return 2;
    case 'seminario': return 2;
    case 'atividade': return 1.5;
    case 'leitura': return 1;
    case 'exercicio': return 1;
    case 'aula': return 0.5; // Aulas regulares pesam menos
    case 'encontro': return 1;
    default: return 1;
  }
}

// 2. Time Estimated Factor (TE)
function getTimeFactor(hours: number): number {
  if (hours <= 1) return 1;
  if (hours <= 3) return 2;
  if (hours <= 6) return 3;
  return 4;
}

// 3. Urgency Factor (UG)
function getUrgencyFactor(date: Date, weekStart: Date): number {
  const diffTime = date.getTime() - weekStart.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 7) return 1.3; // Same week
  if (diffDays < 14) return 1.1; // Next week
  return 1.0; // Future
}

// Calculate IS for a single Task
function calculateTaskIS(task: Task, weekStart: Date): number {
  const PD = 1; // Peso da Disciplina (Default 1 for now, could be fetched from Discipline)
  const TT = getTaskTypeFactor(task.type);
  const CX = task.difficulty; // 0 to 3
  const TE = getTimeFactor(task.estimatedHours);
  const UG = getUrgencyFactor(task.dueDate, weekStart);

  // Formula: IS = (PD × TT × (1 + CX) × TE) × UG
  return (PD * TT * (1 + CX) * TE) * UG;
}

// Calculate IS for a single Event
function calculateEventIS(event: Event, weekStart: Date): number {
  const PD = 1;
  const TT = getTaskTypeFactor(event.type);
  const CX = 1; // Default complexity for events if not specified
  const durationHours = (event.endDate.getTime() - event.startDate.getTime()) / (1000 * 60 * 60) || 1;
  const TE = getTimeFactor(durationHours);
  const UG = getUrgencyFactor(event.startDate, weekStart);

  return (PD * TT * (1 + CX) * TE) * UG;
}

// Calculate Weekly ICS
export function calculateWeeklyICS(weekStart: Date, tasks: Task[] = mockTasks, events: Event[] = mockEvents): number {
  const weekEnd = addDays(weekStart, 6);

  // Filter items for this week
  const weekTasks = tasks.filter(t => t.dueDate >= weekStart && t.dueDate <= weekEnd);
  const weekEvents = events.filter(e => e.startDate >= weekStart && e.startDate <= weekEnd);

  // Sum raw IS
  let totalIS = 0;
  weekTasks.forEach(t => totalIS += calculateTaskIS(t, weekStart));
  weekEvents.forEach(e => totalIS += calculateEventIS(e, weekStart));

  // Density Score (DS)
  let DS = 1.0;
  if (totalIS < 30) DS = 1.0;
  else if (totalIS < 60) DS = 1.1;
  else if (totalIS < 100) DS = 1.25;
  else DS = 1.5;

  return Math.round(totalIS * DS);
}

// Generate Weekly ICS for current and next week
export function generateWeeklyICS(tasks: Task[] = mockTasks, events: Event[] = mockEvents): WeeklyICS[] {
  const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });
  const nextWeekStart = addDays(currentWeekStart, 7);

  const currentWeekICS = calculateWeeklyICS(currentWeekStart, tasks, events);
  const nextWeekICS = calculateWeeklyICS(nextWeekStart, tasks, events);

  const weeks: WeeklyICS[] = [
    {
      weekStart: currentWeekStart,
      weekEnd: addDays(currentWeekStart, 6),
      icsValue: currentWeekICS,
      level: getICSLevel(currentWeekICS),
      label: getICSLabel(getICSLevel(currentWeekICS)),
    },
    {
      weekStart: nextWeekStart,
      weekEnd: addDays(nextWeekStart, 6),
      icsValue: nextWeekICS,
      level: getICSLevel(nextWeekICS),
      label: getICSLabel(getICSLevel(nextWeekICS)),
    },
  ];

  return weeks;
}

// Get events for a specific date
export function getEventsForDate(date: Date, events: Event[] = mockEvents): Event[] {
  return events.filter(event => {
    const eventDate = format(event.startDate, 'yyyy-MM-dd');
    const targetDate = format(date, 'yyyy-MM-dd');
    return eventDate === targetDate;
  });
}

// Get tasks for a specific date
export function getTasksForDate(date: Date, tasks: Task[] = mockTasks): Task[] {
  return tasks.filter(task => {
    const taskDate = format(task.dueDate, 'yyyy-MM-dd');
    const targetDate = format(date, 'yyyy-MM-dd');
    return taskDate === targetDate;
  });
}

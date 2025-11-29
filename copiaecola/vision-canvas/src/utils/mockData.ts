import { Task, Event, Suggestion, AttendanceRecord, DayData } from "@/types";

// Generate dates for current and next week
const generateWeekDates = (startDate: Date): DayData[] => {
  const days: DayData[] = [];
  const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    days.push({
      date,
      dayName: dayNames[date.getDay()],
      tasks: [],
      events: [],
    });
  }
  
  return days;
};

// Get current week's Monday
const getCurrentWeekMonday = (): Date => {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(today.setDate(diff));
};

// Mock tasks
export const mockTasks: Task[] = [
  {
    id: '1',
    name: 'Trabalho de Cálculo II',
    dueDate: new Date(2025, 11, 2),
    notes: 'Exercícios do capítulo 5',
    difficulty: 4,
    workload: 7,
    completed: false,
    type: 'atividade',
  },
  {
    id: '2',
    name: 'Prova de Física',
    dueDate: new Date(2025, 11, 4),
    notes: 'Estudar cinemática e dinâmica',
    difficulty: 5,
    workload: 9,
    completed: false,
    type: 'prova',
  },
  {
    id: '3',
    name: 'Seminário de História',
    dueDate: new Date(2025, 11, 5),
    notes: 'Apresentação sobre Revolução Industrial',
    difficulty: 3,
    workload: 6,
    completed: false,
    type: 'seminario',
  },
];

// Mock suggestions
export const mockSuggestions: Suggestion[] = [
  {
    id: '1',
    type: 'warning',
    message: 'Você tem 3 entregas e 2 provas na semana que vem. Considere adiantar algumas tarefas.',
    priority: 'high',
  },
  {
    id: '2',
    type: 'info',
    message: 'Sua carga está equilibrada esta semana. Bom momento para revisar conteúdos anteriores.',
    priority: 'medium',
  },
  {
    id: '3',
    type: 'success',
    message: 'Você completou 85% das tarefas desta semana. Continue assim!',
    priority: 'low',
  },
];

// Mock attendance records
export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    subjectName: 'Cálculo II',
    totalClasses: 40,
    attended: 35,
    absences: 5,
    percentage: 87.5,
  },
  {
    id: '2',
    subjectName: 'Física I',
    totalClasses: 36,
    attended: 28,
    absences: 8,
    percentage: 77.8,
  },
  {
    id: '3',
    subjectName: 'Programação',
    totalClasses: 44,
    attended: 42,
    absences: 2,
    percentage: 95.5,
  },
  {
    id: '4',
    subjectName: 'História',
    totalClasses: 32,
    attended: 22,
    absences: 10,
    percentage: 68.8,
  },
];

// Generate week data with mock tasks
export const generateMockWeekData = (): { currentWeek: DayData[]; nextWeek: DayData[] } => {
  const currentMonday = getCurrentWeekMonday();
  const currentWeek = generateWeekDates(currentMonday);
  
  const nextMonday = new Date(currentMonday);
  nextMonday.setDate(nextMonday.getDate() + 7);
  const nextWeek = generateWeekDates(nextMonday);
  
  // Add mock tasks to specific days
  currentWeek[1].tasks.push(mockTasks[0]); // Monday
  currentWeek[3].tasks.push(mockTasks[1]); // Wednesday
  nextWeek[4].tasks.push(mockTasks[2]); // Next Thursday
  
  return { currentWeek, nextWeek };
};

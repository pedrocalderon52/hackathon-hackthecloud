import { format, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Task, Event, EventType } from '@/types';

interface DayCardProps {
  date: Date;
  tasks: Task[];
  events: Event[];
  onAddClick: (date: Date) => void;
  onEventClick: (event: Event) => void;
  onTaskClick: (task: Task) => void;
  onDateClick: (date: Date) => void;
}

function getEventBadgeClass(type: EventType): string {
  switch (type) {
    case 'prova':
      return 'event-badge-exam';
    case 'atividade':
      return 'event-badge-activity';
    case 'seminario':
      return 'event-badge-seminar';
    case 'trabalho':
      return 'event-badge-work';
    case 'encontro':
      return 'event-badge-meeting';
    case 'aula':
    default:
      return 'event-badge-class';
  }
}

export function DayCard({
  date,
  tasks,
  events,
  onAddClick,
  onEventClick,
  onTaskClick,
  onDateClick,
}: DayCardProps) {
  const dayName = format(date, 'EEEE', { locale: ptBR });
  const dayNumber = format(date, 'd/MM');
  const today = isToday(date);

  return (
    <div
      onClick={() => onDateClick(date)}
      className={cn(
        'day-card cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all',
        today && 'day-card-today'
      )}
    >
      <div className="text-center mb-2">
        <p className="font-semibold text-sm capitalize text-primary-foreground">
          {dayName}
        </p>
        <p className="text-xs text-primary-foreground/80">{dayNumber}</p>
      </div>

      <div className="flex-1 space-y-1.5 overflow-y-auto max-h-[100px]">
        {events.map((event) => (
          <button
            key={event.id}
            onClick={() => onEventClick(event)}
            className={cn(
              'event-badge w-full text-left animate-scale-in cursor-pointer hover:opacity-90 transition-opacity',
              getEventBadgeClass(event.type)
            )}
          >
            <span className="block truncate">{event.name}</span>
          </button>
        ))}

        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => onTaskClick(task)}
            className="w-full bg-card text-card-foreground rounded-md px-2 py-1 text-xs text-left hover:bg-card/80 transition-colors cursor-pointer"
          >
            <span className="block truncate">{task.name}</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => onAddClick(date)}
        className="mt-auto pt-2 flex justify-center"
        aria-label="Adicionar tarefa ou evento"
      >
        <Plus className="h-5 w-5 text-primary-foreground/60 hover:text-primary-foreground transition-colors" />
      </button>
    </div>
  );
}

import { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isToday,
  isSameDay,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Event, Task } from '@/types';
import { getEventsForDate, getTasksForDate } from '@/utils/mockData';

interface CalendarViewProps {
  onDateClick: (date: Date) => void;
  onEventClick: (event: Event) => void;
  onTaskClick: (task: Task) => void;
  selectedDate?: Date;
  tasks: Task[];
  events: Event[];
}

export function CalendarView({
  onDateClick,
  onEventClick,
  onTaskClick,
  selectedDate,
  tasks,
  events,
}: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePrevMonth}
        className="h-8 w-8"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <h2 className="text-lg font-semibold capitalize">
        {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
      </h2>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleNextMonth}
        className="h-8 w-8"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );

  const renderDaysOfWeek = () => {
    const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    return (
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const currentDay = day;
        const dayEvents = getEventsForDate(currentDay, events);
        const dayTasks = getTasksForDate(currentDay, tasks);
        const hasItems = dayEvents.length > 0 || dayTasks.length > 0;
        const isSelected = selectedDate && isSameDay(currentDay, selectedDate);

        days.push(
          <div
            key={day.toISOString()}
            className={cn(
              'min-h-[80px] p-1 border border-border rounded-lg cursor-pointer transition-all hover:bg-accent/50',
              !isSameMonth(currentDay, monthStart) && 'opacity-40',
              isToday(currentDay) && 'bg-indigo-100 border-indigo-500 dark:bg-indigo-900/30 dark:border-indigo-400',
              isSelected && 'ring-2 ring-primary'
            )}
            onClick={() => onDateClick(currentDay)}
          >
            <span
              className={cn(
                'text-xs font-medium',
                isToday(currentDay) && 'text-indigo-700 dark:text-indigo-300 font-bold'
              )}
            >
              {format(currentDay, 'd')}
            </span>

            <div className="mt-1 space-y-0.5">
              {dayEvents.slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event);
                  }}
                  className={cn(
                    'text-[10px] px-1 py-0.5 rounded truncate cursor-pointer',
                    event.type === 'prova' && 'bg-destructive text-destructive-foreground',
                    event.type === 'atividade' && 'bg-ics-green text-white',
                    event.type === 'seminario' && 'bg-ics-purple text-white',
                    event.type === 'aula' && 'bg-primary text-primary-foreground',
                    event.type === 'trabalho' && 'bg-blue-500 text-white',
                    event.type === 'encontro' && 'bg-cyan-500 text-white'
                  )}
                >
                  {event.name}
                </div>
              ))}
              {dayTasks.slice(0, 1).map((task) => (
                <div
                  key={task.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTaskClick(task);
                  }}
                  className="text-[10px] px-1 py-0.5 rounded truncate cursor-pointer bg-muted text-muted-foreground"
                >
                  {task.name}
                </div>
              ))}
              {hasItems && dayEvents.length + dayTasks.length > 3 && (
                <span className="text-[10px] text-muted-foreground">
                  +{dayEvents.length + dayTasks.length - 3} mais
                </span>
              )}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toISOString()} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      );
      days = [];
    }

    return <div className="space-y-1">{rows}</div>;
  };

  return (
    <div className="animate-fade-in">
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderCells()}
    </div>
  );
}

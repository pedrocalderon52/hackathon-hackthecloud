import { useState } from 'react';
import { format, addDays, startOfWeek, addWeeks, subWeeks } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DayCard } from './DayCard';
import { ICSBar } from './ICSBar';
import { Task, Event, WeeklyICS } from '@/types';
import { getEventsForDate, getTasksForDate, generateWeeklyICS } from '@/utils/mockData';

interface WeekViewProps {
  onAddClick: (date: Date) => void;
  onEventClick: (event: Event) => void;
  onTaskClick: (task: Task) => void;
  onDateClick: (date: Date) => void;
  tasks: Task[];
  events: Event[];
}

export function WeekView({
  onAddClick,
  onEventClick,
  onTaskClick,
  onDateClick,
  tasks,
  events
}: WeekViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const weeklyICS = generateWeeklyICS(tasks, events);

  const handlePrevWeek = () => {
    setCurrentDate(subWeeks(currentDate, 2));
  };

  const handleNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 2));
  };

  const renderWeek = (weekStartDate: Date, icsData?: WeeklyICS) => {
    const days = Array.from({ length: 7 }, (_, i) => addDays(weekStartDate, i));
    const weekRangeStart = format(weekStartDate, 'd');
    const weekRangeEnd = format(addDays(weekStartDate, 6), 'd');

    return (
      <div className="space-y-2 animate-fade-in">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-foreground">
            Semana dia {weekRangeStart}-{weekRangeEnd}
          </h3>
        </div>

        {icsData && (
          <ICSBar
            level={icsData.level}
            label={icsData.label}
            value={icsData.icsValue}
          />
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {days.map((day) => (
            <DayCard
              key={day.toISOString()}
              date={day}
              tasks={getTasksForDate(day, tasks)}
              events={getEventsForDate(day, events)}
              onAddClick={onAddClick}
              onEventClick={onEventClick}
              onTaskClick={onTaskClick}
              onDateClick={onDateClick}
            />
          ))}
        </div>
      </div>
    );
  };

  const firstWeekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const secondWeekStart = addWeeks(firstWeekStart, 1);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevWeek}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextWeek}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <span className="text-sm text-muted-foreground">
          {format(firstWeekStart, 'MMMM yyyy', { locale: ptBR })}
        </span>
      </div>

      {renderWeek(firstWeekStart, weeklyICS[0])}
      {renderWeek(secondWeekStart, weeklyICS[1])}
    </div>
  );
}

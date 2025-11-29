import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DayData } from "@/types";
import { Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WeekViewProps {
  weekData: DayData[];
  weekTitle: string;
  onAddTask: (date: Date) => void;
  onTaskClick: (taskId: string) => void;
  onDayClick: (day: DayData) => void;
  selectedDay: DayData | null;
}

const eventTypeColors: Record<string, string> = {
  aula: 'bg-primary',
  trabalho: 'bg-accent',
  prova: 'bg-destructive',
  atividade: 'bg-info',
  seminario: 'bg-warning',
  encontro: 'bg-success',
};

const eventTypeLabels: Record<string, string> = {
  aula: 'Aula',
  trabalho: 'Trabalho',
  prova: 'Prova',
  atividade: 'Atividade',
  seminario: 'Seminário',
  encontro: 'Encontro',
};

export function WeekView({ weekData, weekTitle, onAddTask, onTaskClick, onDayClick, selectedDay }: WeekViewProps) {
  const isSelected = (day: DayData) => 
    selectedDay?.date.toDateString() === day.date.toDateString();
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">{weekTitle}</h2>
      <div className="grid grid-cols-7 gap-3">
        {weekData.map((day) => (
          <Card
            key={day.date.toISOString()}
            onClick={() => onDayClick(day)}
            className={`transition-all duration-300 border-2 shadow-md min-h-[180px] flex flex-col cursor-pointer ${
              isSelected(day) 
                ? 'bg-primary border-accent ring-2 ring-accent' 
                : 'bg-primary hover:bg-primary/90 border-transparent'
            }`}
          >
            <div className="p-3 flex-1 flex flex-col">
              <div className="text-center mb-3">
                <p className="font-semibold text-primary-foreground text-sm">
                  {day.dayName}
                </p>
                <p className="text-xs text-primary-foreground/80">
                  {day.date.getDate()}/{day.date.getMonth() + 1}
                </p>
              </div>
              
              <div className="space-y-2 flex-1 overflow-y-auto">
                {day.tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => onTaskClick(task.id)}
                    className="bg-card rounded-md p-2 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <Badge
                      className={`${eventTypeColors[task.type]} text-white text-xs mb-1`}
                      variant="default"
                    >
                      {eventTypeLabels[task.type]}
                    </Badge>
                    <p className="text-xs font-medium text-card-foreground line-clamp-2">
                      {task.name}
                    </p>
                  </div>
                ))}
                
                {day.events.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => onTaskClick(event.id)}
                    className="bg-card rounded-md p-2 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <Badge
                      className={`${eventTypeColors[event.type]} text-white text-xs mb-1`}
                      variant="default"
                    >
                      {eventTypeLabels[event.type]}
                    </Badge>
                    <p className="text-xs font-medium text-card-foreground line-clamp-2">
                      {event.name}
                    </p>
                  </div>
                ))}
              </div>

              <Button
                size="sm"
                variant="ghost"
                className="w-full mt-2 hover:bg-white/20 text-primary-foreground"
                onClick={() => onAddTask(day.date)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

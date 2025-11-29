import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DayData, Task } from "@/types";
import { Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DayDetailsPanelProps {
  selectedDay: DayData | null;
  onTaskClick: (taskId: string) => void;
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

export function DayDetailsPanel({ selectedDay, onTaskClick }: DayDetailsPanelProps) {
  if (!selectedDay) {
    return (
      <Card className="h-full p-4 bg-card border border-border">
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
          <Calendar className="h-12 w-12 mb-4 opacity-50" />
          <p className="text-sm text-center">
            Selecione um dia para ver os detalhes
          </p>
        </div>
      </Card>
    );
  }

  const allItems = [...selectedDay.tasks, ...selectedDay.events];

  return (
    <Card className="h-full bg-card border border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="font-bold text-lg text-foreground">
          {selectedDay.dayName}
        </h3>
        <p className="text-sm text-muted-foreground">
          {selectedDay.date.toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: 'long', 
            year: 'numeric' 
          })}
        </p>
      </div>

      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-4">
          <TabsTrigger value="all" className="flex-1">
            Todos ({allItems.length})
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex-1">
            Tarefas ({selectedDay.tasks.length})
          </TabsTrigger>
          <TabsTrigger value="events" className="flex-1">
            Eventos ({selectedDay.events.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="space-y-3">
            {allItems.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Nenhuma atividade neste dia
              </p>
            ) : (
              allItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onTaskClick(item.id)}
                  className="bg-secondary/50 rounded-lg p-3 cursor-pointer hover:bg-secondary transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={`${eventTypeColors[item.type]} text-white text-xs`}>
                      {eventTypeLabels[item.type]}
                    </Badge>
                  </div>
                  <p className="font-medium text-sm text-foreground mb-1">
                    {item.name}
                  </p>
                  {item.notes && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {item.notes}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="space-y-3">
            {selectedDay.tasks.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Nenhuma tarefa neste dia
              </p>
            ) : (
              selectedDay.tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onTaskClick(task.id)}
                  className="bg-secondary/50 rounded-lg p-3 cursor-pointer hover:bg-secondary transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={`${eventTypeColors[task.type]} text-white text-xs`}>
                      {eventTypeLabels[task.type]}
                    </Badge>
                  </div>
                  <p className="font-medium text-sm text-foreground mb-1">
                    {task.name}
                  </p>
                  {task.notes && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {task.notes}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="events" className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="space-y-3">
            {selectedDay.events.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Nenhum evento neste dia
              </p>
            ) : (
              selectedDay.events.map((event) => (
                <div
                  key={event.id}
                  onClick={() => onTaskClick(event.id)}
                  className="bg-secondary/50 rounded-lg p-3 cursor-pointer hover:bg-secondary transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={`${eventTypeColors[event.type]} text-white text-xs`}>
                      {eventTypeLabels[event.type]}
                    </Badge>
                  </div>
                  <p className="font-medium text-sm text-foreground mb-1">
                    {event.name}
                  </p>
                  {event.notes && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {event.notes}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

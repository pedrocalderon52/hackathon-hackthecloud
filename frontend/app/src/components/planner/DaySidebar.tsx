import { format, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Task, Event } from '@/types';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DaySidebarProps {
  selectedDate: Date;
  tasks: Task[];
  events: Event[];
  onTaskClick: (task: Task) => void;
  onEventClick: (event: Event) => void;
}

export function DaySidebar({
  selectedDate,
  tasks,
  events,
  onTaskClick,
  onEventClick,
}: DaySidebarProps) {
  const dayName = format(selectedDate, 'EEEE', { locale: ptBR });
  const formattedDate = format(selectedDate, "d 'de' MMMM 'de' yyyy", { locale: ptBR });

  const allItems = [...tasks, ...events].sort((a, b) => {
    const dateA = 'dueDate' in a ? a.dueDate : a.startDate;
    const dateB = 'dueDate' in b ? b.dueDate : b.startDate;
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="space-y-4">
      <div>
        <h2 className={cn(
          'text-xl font-bold capitalize',
          isToday(selectedDate) && 'text-primary'
        )}>
          {dayName}
        </h2>
        <p className="text-sm text-muted-foreground">{formattedDate}</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="all">Todos ({allItems.length})</TabsTrigger>
          <TabsTrigger value="tasks">Tarefas ({tasks.length})</TabsTrigger>
          <TabsTrigger value="events">Eventos ({events.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-2">
          {allItems.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nenhuma atividade neste dia
            </p>
          ) : (
            allItems.map((item) => {
              if ('dueDate' in item) {
                return (
                  <button
                    key={item.id}
                    onClick={() => onTaskClick(item)}
                    className="w-full p-3 bg-card rounded-lg text-left hover:bg-accent/50 transition-colors"
                  >
                    <p className="font-medium text-sm">{item.name}</p>
                    {item.observation && (
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {item.observation}
                      </p>
                    )}
                  </button>
                );
              } else {
                return (
                  <button
                    key={item.id}
                    onClick={() => onEventClick(item)}
                    className={cn(
                      'w-full p-3 rounded-lg text-left hover:opacity-90 transition-opacity',
                      item.type === 'prova' && 'bg-destructive/10 border-l-4 border-destructive',
                      item.type === 'atividade' && 'bg-ics-green-light border-l-4 border-ics-green',
                      item.type === 'seminario' && 'bg-ics-purple-light border-l-4 border-ics-purple',
                      item.type === 'aula' && 'bg-primary/10 border-l-4 border-primary',
                      item.type === 'trabalho' && 'bg-blue-100 border-l-4 border-blue-500',
                      item.type === 'encontro' && 'bg-cyan-100 border-l-4 border-cyan-500'
                    )}
                  >
                    <p className="font-medium text-sm">{item.name}</p>
                    {item.local && (
                      <p className="text-xs text-muted-foreground mt-1">{item.local}</p>
                    )}
                  </button>
                );
              }
            })
          )}
        </TabsContent>

        <TabsContent value="tasks" className="mt-4 space-y-2">
          {tasks.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nenhuma tarefa neste dia
            </p>
          ) : (
            tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => onTaskClick(task)}
                className="w-full p-3 bg-card rounded-lg text-left hover:bg-accent/50 transition-colors"
              >
                <p className="font-medium text-sm">{task.name}</p>
                {task.observation && (
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {task.observation}
                  </p>
                )}
              </button>
            ))
          )}
        </TabsContent>

        <TabsContent value="events" className="mt-4 space-y-2">
          {events.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nenhum evento neste dia
            </p>
          ) : (
            events.map((event) => (
              <button
                key={event.id}
                onClick={() => onEventClick(event)}
                className={cn(
                  'w-full p-3 rounded-lg text-left hover:opacity-90 transition-opacity',
                  event.type === 'prova' && 'bg-destructive/10 border-l-4 border-destructive',
                  event.type === 'atividade' && 'bg-ics-green-light border-l-4 border-ics-green',
                  event.type === 'seminario' && 'bg-ics-purple-light border-l-4 border-ics-purple',
                  event.type === 'aula' && 'bg-primary/10 border-l-4 border-primary'
                )}
              >
                <p className="font-medium text-sm">{event.name}</p>
                {event.local && (
                  <p className="text-xs text-muted-foreground mt-1">{event.local}</p>
                )}
              </button>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "./ui/drawer";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, Star, Hammer } from "lucide-react";
import { Button } from "./ui/button";

const eventTypeLabels = {
  aula: "Aula",
  trabalho: "Trabalho",
  prova: "Prova",
  atividade: "Atividade",
  seminario: "Seminário",
  encontro: "Encontro",
};

export function TaskDetailsDrawer({ isOpen, onClose, task }) {
  if (!task) return null;

  const dueDate =
    task.dueDate instanceof Date
      ? task.dueDate
      : new Date(task.dueDate);

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle className="text-xl">{task.name}</DrawerTitle>

          <DrawerDescription>
            <Badge variant="default" className="mt-2">
              {eventTypeLabels[task.type] || "Evento"}
            </Badge>
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-8 space-y-6">
          <div className="space-y-4">

            {/* Data */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                Data de entrega: {dueDate.toLocaleDateString("pt-BR")}
              </span>
            </div>

            {/* Observações */}
            {task.notes && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Observações:</p>
                <p className="text-sm text-muted-foreground">{task.notes}</p>
              </div>
            )}

            {/* Dificuldade / Trabalho */}
            <div className="grid grid-cols-2 gap-4">
              {/* Dificuldade */}
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-warning" />
                  <p className="text-sm font-medium">Dificuldade</p>
                </div>

                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < task.difficulty
                          ? "fill-warning text-warning"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Workload */}
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Hammer className="h-4 w-4 text-accent" />
                  <p className="text-sm font-medium">Trabalho</p>
                </div>

                <div className="flex gap-1 flex-wrap">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <Hammer
                      key={i}
                      className={`h-4 w-4 ${
                        i < task.workload
                          ? "text-accent"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Frequência */}
            {task.frequency && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Frequência:</p>
                <p className="text-sm text-muted-foreground">{task.frequency}</p>
              </div>
            )}
          </div>

          {/* Botões */}
          <div className="flex gap-3">
            <Button variant="default" className="flex-1">
              Editar
            </Button>

            <Button variant="outline" className="flex-1" onClick={onClose}>
              Fechar
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

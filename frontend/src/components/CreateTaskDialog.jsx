import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import { Star, Hammer } from "lucide-react";

const eventTypes = [
  { value: "aula", label: "Aula" },
  { value: "trabalho", label: "Trabalho" },
  { value: "prova", label: "Prova" },
  { value: "atividade", label: "Atividade" },
  { value: "seminario", label: "Seminário" },
  { value: "encontro", label: "Encontro" }
];

export function CreateTaskDialog({ isOpen, onClose, selectedDate }) {
  const [difficulty, setDifficulty] = useState(3);
  const [workload, setWorkload] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task created");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Tarefa/Evento</DialogTitle>
          <DialogDescription>
            {selectedDate &&
              `Data selecionada: ${selectedDate.toLocaleDateString("pt-BR")}`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Nome da tarefa ou evento" required />
            </div>

            {/* Tipo */}
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Datas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dueDate">Data de Entrega</Label>
                <Input
                  id="dueDate"
                  type="date"
                  defaultValue={
                    selectedDate
                      ? selectedDate.toISOString().split("T")[0]
                      : undefined
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Horário</Label>
                <Input id="time" type="time" />
              </div>
            </div>

            {/* Localização */}
            <div className="space-y-2">
              <Label htmlFor="location">Localização (opcional)</Label>
              <Input id="location" placeholder="Sala ou local" />
            </div>

            {/* Observações */}
            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                placeholder="Adicione observações sobre a tarefa"
                rows={3}
              />
            </div>

            {/* Dificuldade & Carga de Trabalho */}
            <div className="space-y-4">
              {/* Dificuldade */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-warning" />
                  Dificuldade: {difficulty}/5
                </Label>
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setDifficulty(i + 1)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 transition-colors ${
                          i < difficulty
                            ? "fill-warning text-warning"
                            : "text-muted-foreground hover:text-warning"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Carga */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Hammer className="h-4 w-4 text-accent" />
                  Carga de Trabalho: {workload}/10
                </Label>
                <div className="flex gap-1 flex-wrap">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setWorkload(i + 1)}
                      className="focus:outline-none"
                    >
                      <Hammer
                        className={`h-5 w-5 transition-colors ${
                          i < workload
                            ? "text-accent"
                            : "text-muted-foreground hover:text-accent"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Frequência */}
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequência (opcional)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Não se repete" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Não se repete</SelectItem>
                  <SelectItem value="daily">Diariamente</SelectItem>
                  <SelectItem value="weekly">Semanalmente</SelectItem>
                  <SelectItem value="monthly">Mensalmente</SelectItem>
                  <SelectItem value="semester">Todo semestre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-3">
            <Button type="submit" className="flex-1">
              Criar Tarefa
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

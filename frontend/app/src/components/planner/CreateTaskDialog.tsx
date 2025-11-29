import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, Star, Hammer, Clock, Repeat } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { EventType } from '@/types';
import { mockDisciplines } from '@/utils/mockData';

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate?: Date;
  onSave: (item: any) => void;
}

export function CreateTaskDialog({
  open,
  onOpenChange,
  selectedDate,
  onSave,
}: CreateTaskDialogProps) {
  const [isRecurring, setIsRecurring] = useState(false);
  const [formType, setFormType] = useState<'task' | 'event'>('task');
  const [name, setName] = useState('');
  const [date, setDate] = useState<Date | undefined>(selectedDate || new Date());
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [observation, setObservation] = useState('');
  const [difficulty, setDifficulty] = useState(3);
  const [workload, setWorkload] = useState(5);
  const [eventType, setEventType] = useState<EventType>('atividade');
  const [local, setLocal] = useState('');
  const [disciplineId, setDisciplineId] = useState('');
  const [recurrenceFrequency, setRecurrenceFrequency] = useState<
    'daily' | 'weekly' | 'biweekly' | 'monthly'
  >('weekly');
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  // New state for UI refinement
  const [isSingleDay, setIsSingleDay] = useState(true);
  const [hasTime, setHasTime] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = () => {
    const commonData = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      observation,
      disciplineId: disciplineId || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Helper to combine date and time
    const combineDateAndTime = (dateVal: Date, timeVal: string) => {
      if (!dateVal) return new Date();
      const newDate = new Date(dateVal);
      if (hasTime && timeVal) {
        const [hours, minutes] = timeVal.split(':').map(Number);
        newDate.setHours(hours, minutes);
      } else {
        newDate.setHours(0, 0, 0, 0); // Default to start of day if no time
      }
      return newDate;
    };

    if (formType === 'task') {
      const taskData = {
        ...commonData,
        dueDate: combineDateAndTime(date || new Date(), startTime),
        difficulty,
        workload,
        type: 'trabalho', // Default type for now
        estimatedHours: 2, // Default estimated hours
        completed: false,
      };
      onSave(taskData);
    } else {
      const eventStartDate = combineDateAndTime(date || new Date(), startTime);
      // If single day, end date is same as start date (plus duration or just same day)
      // If range, use endDate. If no endDate selected, default to startDate.
      const eventEndDateRaw = isSingleDay ? (date || new Date()) : (endDate || date || new Date());
      const eventEndDate = combineDateAndTime(eventEndDateRaw, endTime);

      const eventData = {
        ...commonData,
        type: eventType,
        startDate: eventStartDate,
        endDate: eventEndDate,
        local,
      };
      onSave(eventData);
    }

    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setDate(selectedDate || new Date());
    setEndDate(undefined);
    setObservation('');
    setDifficulty(3);
    setWorkload(5);
    setEventType('atividade');
    setLocal('');
    setDisciplineId('');
    setIsRecurring(false);
    setSelectedDays([]);
    setIsSingleDay(true);
    setHasTime(false);
    setStartTime('');
    setEndTime('');
  };

  const toggleDay = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const daysOfWeek = [
    { value: 1, label: 'Seg' },
    { value: 2, label: 'Ter' },
    { value: 3, label: 'Qua' },
    { value: 4, label: 'Qui' },
    { value: 5, label: 'Sex' },
    { value: 6, label: 'Sáb' },
    { value: 0, label: 'Dom' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Atividade</DialogTitle>
        </DialogHeader>

        {/* Recurring/New Task Switch */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            <Repeat className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Atividade com recorrência</span>
          </div>
          <Switch checked={isRecurring} onCheckedChange={setIsRecurring} />
        </div>

        {/* Type Selection */}
        <div className="flex gap-2">
          <Button
            variant={formType === 'task' ? 'default' : 'outline'}
            onClick={() => setFormType('task')}
            className="flex-1"
          >
            Tarefa
          </Button>
          <Button
            variant={formType === 'event' ? 'default' : 'outline'}
            onClick={() => setFormType('event')}
            className="flex-1"
          >
            Evento
          </Button>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome da atividade"
            />
          </div>

          {/* Event Type */}
          {formType === 'event' && (
            <div className="space-y-2">
              <Label>Tipo de Evento</Label>
              <Select
                value={eventType}
                onValueChange={(v) => setEventType(v as EventType)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aula">Aula</SelectItem>
                  <SelectItem value="prova">Prova</SelectItem>
                  <SelectItem value="atividade">Atividade</SelectItem>
                  <SelectItem value="seminario">Seminário</SelectItem>
                  <SelectItem value="trabalho">Trabalho</SelectItem>
                  <SelectItem value="encontro">Encontro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Discipline */}
          <div className="space-y-2">
            <Label>Disciplina (opcional)</Label>
            <Select value={disciplineId} onValueChange={setDisciplineId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma disciplina" />
              </SelectTrigger>
              <SelectContent>
                {mockDisciplines.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date & Time Section */}
          <div className="space-y-4 p-3 bg-accent/20 rounded-lg">
            <div className="flex items-center justify-between">
              <Label>Configuração de Data e Hora</Label>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Switch checked={isSingleDay} onCheckedChange={setIsSingleDay} id="single-day" />
                  <Label htmlFor="single-day" className="text-xs font-normal cursor-pointer">Dia único</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={hasTime} onCheckedChange={setHasTime} id="has-time" />
                  <Label htmlFor="has-time" className="text-xs font-normal cursor-pointer">Definir horário</Label>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {/* Start Date */}
              <div className="grid gap-2">
                <Label>{isSingleDay ? 'Data' : 'Data de Início'}</Label>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !date && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP', { locale: ptBR }) : 'Selecione uma data'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>

                  {hasTime && (
                    <Input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-24"
                    />
                  )}
                </div>
              </div>

              {/* End Date (if not single day) */}
              {!isSingleDay && (
                <div className="grid gap-2">
                  <Label>Data de Fim</Label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !endDate && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate
                            ? format(endDate, 'PPP', { locale: ptBR })
                            : 'Selecione uma data'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>

                    {hasTime && (
                      <Input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-24"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recurrence Options */}
          {isRecurring && (
            <div className="space-y-4 p-3 bg-accent/20 rounded-lg">
              <div className="space-y-2">
                <Label>Frequência</Label>
                <Select
                  value={recurrenceFrequency}
                  onValueChange={(v) =>
                    setRecurrenceFrequency(
                      v as 'daily' | 'weekly' | 'biweekly' | 'monthly'
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Diariamente</SelectItem>
                    <SelectItem value="weekly">Semanalmente</SelectItem>
                    <SelectItem value="biweekly">Quinzenalmente</SelectItem>
                    <SelectItem value="monthly">Mensalmente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(recurrenceFrequency === 'weekly' ||
                recurrenceFrequency === 'biweekly') && (
                  <div className="space-y-2">
                    <Label>Dias da semana</Label>
                    <div className="flex gap-1 flex-wrap">
                      {daysOfWeek.map((day) => (
                        <Button
                          key={day.value}
                          type="button"
                          variant={
                            selectedDays.includes(day.value) ? 'default' : 'outline'
                          }
                          size="sm"
                          onClick={() => toggleDay(day.value)}
                          className="w-10"
                        >
                          {day.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}

          {/* Location for Events */}
          {formType === 'event' && (
            <div className="space-y-2">
              <Label htmlFor="local">Local</Label>
              <Input
                id="local"
                value={local}
                onChange={(e) => setLocal(e.target.value)}
                placeholder="Sala ou local"
              />
            </div>
          )}

          {/* Difficulty for Tasks */}
          {formType === 'task' && (
            <>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Dificuldade ({difficulty}/5)
                </Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setDifficulty(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={cn(
                          'h-6 w-6 transition-colors',
                          star <= difficulty
                            ? 'fill-primary text-primary'
                            : 'text-muted-foreground'
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Hammer className="h-4 w-4" />
                  Quão trabalhoso ({workload}/10)
                </Label>
                <div className="flex gap-0.5 flex-wrap">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((hammer) => (
                    <button
                      key={hammer}
                      type="button"
                      onClick={() => setWorkload(hammer)}
                      className="focus:outline-none"
                    >
                      <Hammer
                        className={cn(
                          'h-5 w-5 transition-colors',
                          hammer <= workload
                            ? 'fill-primary text-primary'
                            : 'text-muted-foreground'
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Observation */}
          <div className="space-y-2">
            <Label htmlFor="observation">Observação</Label>
            <Textarea
              id="observation"
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              placeholder="Adicione uma observação..."
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button onClick={handleSubmit} className="w-full">
            Criar {formType === 'task' ? 'Tarefa' : 'Evento'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

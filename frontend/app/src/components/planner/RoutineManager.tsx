import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Plus, Edit2, Trash2, BookOpen, GraduationCap, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Aula, Discipline, TaskStatus } from '@/types';
import { mockDisciplines } from '@/utils/mockData';

// Mock data for Aulas
const mockAulas: Aula[] = [
  {
    id: 'a1',
    semesterId: 'sem1',
    disciplineId: '1',
    name: 'Cálculo II',
    local: 'Sala A101',
    startDate: new Date(),
    endDate: new Date(),
    status: 'pendente',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'a2',
    semesterId: 'sem1',
    disciplineId: '2',
    name: 'Física I',
    local: 'Laboratório B',
    startDate: new Date(),
    endDate: new Date(),
    status: 'concluida',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function RoutineManager() {
  const [aulas, setAulas] = useState<Aula[]>(mockAulas);
  const [disciplines, setDisciplines] = useState<Discipline[]>(mockDisciplines);
  const [isAulaDialogOpen, setIsAulaDialogOpen] = useState(false);
  const [isDisciplineDialogOpen, setIsDisciplineDialogOpen] = useState(false);
  const [editingAula, setEditingAula] = useState<Aula | null>(null);
  const [editingDiscipline, setEditingDiscipline] = useState<Discipline | null>(null);

  // Aula form state
  const [aulaName, setAulaName] = useState('');
  const [aulaLocal, setAulaLocal] = useState('');
  const [aulaStartDate, setAulaStartDate] = useState<Date | undefined>(new Date());
  const [aulaEndDate, setAulaEndDate] = useState<Date | undefined>(new Date());
  const [aulaStatus, setAulaStatus] = useState<TaskStatus>('pendente');
  const [aulaObservation, setAulaObservation] = useState('');
  const [aulaDisciplineId, setAulaDisciplineId] = useState('');

  // Discipline form state
  const [disciplineName, setDisciplineName] = useState('');

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'concluida':
        return 'bg-ics-green text-white';
      case 'pendente':
        return 'bg-ics-yellow text-white';
      case 'falta':
        return 'bg-ics-red text-white';
      case 'suspensa':
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case 'concluida':
        return 'Concluída';
      case 'pendente':
        return 'Pendente';
      case 'falta':
        return 'Falta';
      case 'suspensa':
        return 'Suspensa';
    }
  };

  const handleSaveAula = () => {
    const newAula: Aula = {
      id: editingAula?.id || `a${Date.now()}`,
      semesterId: 'sem1',
      disciplineId: aulaDisciplineId || undefined,
      name: aulaName,
      local: aulaLocal,
      startDate: aulaStartDate || new Date(),
      endDate: aulaEndDate || new Date(),
      status: aulaStatus,
      observation: aulaObservation || undefined,
      createdAt: editingAula?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (editingAula) {
      setAulas(aulas.map((a) => (a.id === editingAula.id ? newAula : a)));
    } else {
      setAulas([...aulas, newAula]);
    }

    resetAulaForm();
    setIsAulaDialogOpen(false);
  };

  const handleSaveDiscipline = () => {
    const newDiscipline: Discipline = {
      id: editingDiscipline?.id || `d${Date.now()}`,
      semesterId: 'sem1',
      name: disciplineName,
      notes: editingDiscipline?.notes || [],
      createdAt: editingDiscipline?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (editingDiscipline) {
      setDisciplines(disciplines.map((d) => (d.id === editingDiscipline.id ? newDiscipline : d)));
    } else {
      setDisciplines([...disciplines, newDiscipline]);
    }

    resetDisciplineForm();
    setIsDisciplineDialogOpen(false);
  };

  const handleEditAula = (aula: Aula) => {
    setEditingAula(aula);
    setAulaName(aula.name);
    setAulaLocal(aula.local);
    setAulaStartDate(aula.startDate);
    setAulaEndDate(aula.endDate);
    setAulaStatus(aula.status);
    setAulaObservation(aula.observation || '');
    setAulaDisciplineId(aula.disciplineId || '');
    setIsAulaDialogOpen(true);
  };

  const handleEditDiscipline = (discipline: Discipline) => {
    setEditingDiscipline(discipline);
    setDisciplineName(discipline.name);
    setIsDisciplineDialogOpen(true);
  };

  const handleDeleteAula = (id: string) => {
    setAulas(aulas.filter((a) => a.id !== id));
  };

  const handleDeleteDiscipline = (id: string) => {
    setDisciplines(disciplines.filter((d) => d.id !== id));
  };

  const resetAulaForm = () => {
    setEditingAula(null);
    setAulaName('');
    setAulaLocal('');
    setAulaStartDate(new Date());
    setAulaEndDate(new Date());
    setAulaStatus('pendente');
    setAulaObservation('');
    setAulaDisciplineId('');
  };

  const resetDisciplineForm = () => {
    setEditingDiscipline(null);
    setDisciplineName('');
  };

  const openNewAulaDialog = () => {
    resetAulaForm();
    setIsAulaDialogOpen(true);
  };

  const openNewDisciplineDialog = () => {
    resetDisciplineForm();
    setIsDisciplineDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="aulas" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="aulas" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Aulas
          </TabsTrigger>
          <TabsTrigger value="disciplinas" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Disciplinas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="aulas" className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Aulas cadastradas</h2>
            <Button onClick={openNewAulaDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Aula
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {aulas.map((aula) => (
              <Card key={aula.id} className="animate-scale-in">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base">{aula.name}</CardTitle>
                    <Badge className={cn('text-xs', getStatusColor(aula.status))}>
                      {getStatusLabel(aula.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">{aula.local}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(aula.startDate, 'dd/MM/yyyy', { locale: ptBR })}
                  </p>
                  {aula.observation && (
                    <p className="text-xs text-muted-foreground truncate">
                      {aula.observation}
                    </p>
                  )}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditAula(aula)}
                    >
                      <Edit2 className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteAula(aula.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="disciplinas" className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Disciplinas do semestre</h2>
            <Button onClick={openNewDisciplineDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Disciplina
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {disciplines.map((discipline) => {
              const avgGrade =
                discipline.notes.length > 0
                  ? discipline.notes.reduce((sum, n) => sum + n.value, 0) /
                    discipline.notes.length
                  : null;

              return (
                <Card key={discipline.id} className="animate-scale-in">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{discipline.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {avgGrade !== null && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Média</span>
                        <span
                          className={cn(
                            'font-bold',
                            avgGrade >= 7
                              ? 'text-ics-green'
                              : avgGrade >= 5
                              ? 'text-ics-yellow'
                              : 'text-ics-red'
                          )}
                        >
                          {avgGrade.toFixed(1)}
                        </span>
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground">
                      {discipline.notes.length} nota(s) registrada(s)
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditDiscipline(discipline)}
                      >
                        <Edit2 className="h-3 w-3 mr-1" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteDiscipline(discipline.id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Excluir
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Aula Dialog */}
      <Dialog open={isAulaDialogOpen} onOpenChange={setIsAulaDialogOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingAula ? 'Editar Aula' : 'Nova Aula'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="aulaName">Nome</Label>
              <Input
                id="aulaName"
                value={aulaName}
                onChange={(e) => setAulaName(e.target.value)}
                placeholder="Nome da aula"
              />
            </div>

            <div className="space-y-2">
              <Label>Disciplina (opcional)</Label>
              <Select value={aulaDisciplineId} onValueChange={setAulaDisciplineId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma disciplina" />
                </SelectTrigger>
                <SelectContent>
                  {disciplines.map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="aulaLocal">Local</Label>
              <Input
                id="aulaLocal"
                value={aulaLocal}
                onChange={(e) => setAulaLocal(e.target.value)}
                placeholder="Sala ou local"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Data Início</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !aulaStartDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {aulaStartDate
                        ? format(aulaStartDate, 'dd/MM', { locale: ptBR })
                        : 'Selecione'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={aulaStartDate}
                      onSelect={setAulaStartDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Data Fim</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !aulaEndDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {aulaEndDate
                        ? format(aulaEndDate, 'dd/MM', { locale: ptBR })
                        : 'Selecione'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={aulaEndDate}
                      onSelect={setAulaEndDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={aulaStatus} onValueChange={(v) => setAulaStatus(v as TaskStatus)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="concluida">Concluída</SelectItem>
                  <SelectItem value="falta">Falta</SelectItem>
                  <SelectItem value="suspensa">Suspensa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="aulaObservation">Observação (opcional)</Label>
              <Textarea
                id="aulaObservation"
                value={aulaObservation}
                onChange={(e) => setAulaObservation(e.target.value)}
                placeholder="Adicione uma observação..."
                rows={3}
              />
            </div>

            <Button onClick={handleSaveAula} className="w-full">
              {editingAula ? 'Salvar alterações' : 'Criar Aula'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Discipline Dialog */}
      <Dialog open={isDisciplineDialogOpen} onOpenChange={setIsDisciplineDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingDiscipline ? 'Editar Disciplina' : 'Nova Disciplina'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="disciplineName">Nome</Label>
              <Input
                id="disciplineName"
                value={disciplineName}
                onChange={(e) => setDisciplineName(e.target.value)}
                placeholder="Nome da disciplina"
              />
            </div>

            <Button onClick={handleSaveDiscipline} className="w-full">
              {editingDiscipline ? 'Salvar alterações' : 'Criar Disciplina'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

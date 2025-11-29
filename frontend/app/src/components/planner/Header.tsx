import { Link } from 'react-router-dom';
import { Calendar, LayoutGrid, Plus, ChevronLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  viewMode: 'week' | 'calendar';
  onViewModeChange: (mode: 'week' | 'calendar') => void;
  onNewTask: () => void;
}

export function Header({ viewMode, onViewModeChange, onNewTask }: HeaderProps) {
  return (
    <header className="flex items-center justify-between py-4 border-b border-border">
      <div className="flex items-center gap-3">
        <Calendar className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-bold text-foreground">Planejador Acadêmico</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* View Mode Toggle */}
        <div className="flex items-center border border-border rounded-lg overflow-hidden">
          <Button
            variant={viewMode === 'week' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('week')}
            className="rounded-none"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Semanas
          </Button>
          <Button
            variant={viewMode === 'calendar' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('calendar')}
            className="rounded-none"
          >
            <LayoutGrid className="h-4 w-4 mr-1" />
            Calendário
          </Button>
        </div>

        {/* Routine Link */}
        <Link to="/rotina">
          <Button variant="outline" size="sm">
            <BookOpen className="h-4 w-4 mr-2" />
            Rotina
          </Button>
        </Link>

        {/* New Task Button */}
        <Button onClick={onNewTask}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Tarefa
        </Button>
      </div>
    </header>
  );
}

import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RoutineManager } from '@/components/planner/RoutineManager';

const Routine = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="flex items-center justify-between py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Rotina Acadêmica</h1>
          </div>

          <Link to="/">
            <Button variant="outline">Voltar ao Planejador</Button>
          </Link>
        </header>

        {/* Content */}
        <main className="py-6">
          <RoutineManager />
        </main>
      </div>
    </div>
  );
};

export default Routine;

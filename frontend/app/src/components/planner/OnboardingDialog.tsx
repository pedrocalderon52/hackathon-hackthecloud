import { useState } from 'react';
import { Moon, Sun, Clock, ArrowRight, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface OnboardingDialogProps {
  open: boolean;
  onComplete: (wakeTime: string, sleepTime: string) => void;
}

export function OnboardingDialog({ open, onComplete }: OnboardingDialogProps) {
  const [step, setStep] = useState(1);
  const [wakeTime, setWakeTime] = useState('07:00');
  const [sleepTime, setSleepTime] = useState('23:00');

  const handleComplete = () => {
    onComplete(wakeTime, sleepTime);
  };

  const handleSkip = () => {
    onComplete('07:00', '23:00'); // Default values
  };

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-md" hideCloseButton>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">
              {step === 1 ? 'Bem-vindo ao Planejador Acadêmico!' : 'Configure sua rotina'}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSkip}
              className="h-8 w-8 -mr-2 -mt-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-center pt-2">
            {step === 1
              ? 'Vamos configurar seu perfil para uma experiência personalizada.'
              : 'Informe seus horários de sono para melhorar as sugestões.'}
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-6 py-4">
            <div className="flex justify-center">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-12 w-12 text-primary" />
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              O planejador vai ajudar você a organizar suas atividades acadêmicas
              de forma inteligente, considerando seus horários e carga de trabalho.
            </p>

            <Button onClick={() => setStep(2)} className="w-full">
              Começar configuração
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-accent/20 rounded-lg">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <Sun className="h-6 w-6 text-amber-500" />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="wakeTime" className="text-sm font-medium">
                    Horário que você acorda
                  </Label>
                  <Input
                    id="wakeTime"
                    type="time"
                    value={wakeTime}
                    onChange={(e) => setWakeTime(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-accent/20 rounded-lg">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Moon className="h-6 w-6 text-indigo-500" />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="sleepTime" className="text-sm font-medium">
                    Horário que você dorme
                  </Label>
                  <Input
                    id="sleepTime"
                    type="time"
                    value={sleepTime}
                    onChange={(e) => setSleepTime(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Essas informações ajudam a calcular o melhor momento para estudar
              e evitar sugestões fora dos seus horários ativos.
            </p>

            <Button onClick={handleComplete} className="w-full">
              Concluir e começar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

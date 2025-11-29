import { Card } from "@/components/ui/card";
import { Flame } from "lucide-react";

interface HeatmapData {
  date: Date;
  value: number; // 0-4 intensity levels
}

interface HeatmapPanelProps {
  data?: HeatmapData[];
  title?: string;
}

export function HeatmapPanel({ data = [], title = "Heatmap de Atividades" }: HeatmapPanelProps) {
  // Generate mock data for demonstration (12 weeks, 7 days each)
  const generateMockData = (): HeatmapData[] => {
    const mockData: HeatmapData[] = [];
    const today = new Date();
    
    for (let week = 11; week >= 0; week--) {
      for (let day = 0; day < 7; day++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (week * 7 + day));
        mockData.push({
          date,
          value: Math.floor(Math.random() * 5), // 0-4
        });
      }
    }
    
    return mockData;
  };

  const heatmapData = data.length > 0 ? data : generateMockData();
  
  // Group by weeks
  const weeks: HeatmapData[][] = [];
  for (let i = 0; i < heatmapData.length; i += 7) {
    weeks.push(heatmapData.slice(i, i + 7));
  }

  const getIntensityColor = (value: number) => {
    const colors = [
      'bg-muted',           // 0 - no activity
      'bg-success/20',      // 1 - low
      'bg-success/40',      // 2 - medium-low
      'bg-success/60',      // 3 - medium-high
      'bg-success/80',      // 4 - high
    ];
    return colors[value] || colors[0];
  };

  const dayLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <Card className="p-4 bg-card border border-border shadow-lg h-[300px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="h-5 w-5 text-success" />
        <h3 className="font-bold text-sm text-foreground">{title}</h3>
      </div>

      <div className="space-y-4 overflow-y-auto flex-1">
        {/* Heatmap grid */}
        <div className="flex gap-1">
          {/* Day labels */}
          <div className="flex flex-col gap-1 pr-2">
            {dayLabels.map((label, idx) => (
              <div key={idx} className="h-3 text-[10px] text-muted-foreground flex items-center">
                {idx % 2 === 0 ? label.slice(0, 1) : ''}
              </div>
            ))}
          </div>

          {/* Weeks grid */}
          <div className="flex gap-1 overflow-x-auto">
            {weeks.map((week, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-1">
                {week.map((day, dayIdx) => (
                  <div
                    key={dayIdx}
                    className={`h-3 w-3 rounded-sm ${getIntensityColor(day.value)} transition-colors cursor-pointer hover:ring-1 hover:ring-primary`}
                    title={`${day.date.toLocaleDateString('pt-BR')}: ${day.value} atividades`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
          <span>Menos</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`h-3 w-3 rounded-sm ${getIntensityColor(level)}`}
              />
            ))}
          </div>
          <span>Mais</span>
        </div>

        {/* Stats placeholder */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
          <div className="text-center p-2 bg-secondary/50 rounded">
            <p className="text-xs text-muted-foreground">Total Semana</p>
            <p className="text-lg font-bold text-foreground">0</p>
          </div>
          <div className="text-center p-2 bg-secondary/50 rounded">
            <p className="text-xs text-muted-foreground">Média Diária</p>
            <p className="text-lg font-bold text-foreground">0</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

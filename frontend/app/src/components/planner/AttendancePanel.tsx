import { cn } from '@/lib/utils';
import { AttendanceRecord } from '@/types';

interface AttendancePanelProps {
  records: AttendanceRecord[];
}

export function AttendancePanel({ records }: AttendancePanelProps) {
  const getPercentageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-ics-green';
    if (percentage >= 75) return 'text-ics-yellow';
    return 'text-ics-red';
  };

  const getBarColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-ics-green';
    if (percentage >= 75) return 'bg-ics-yellow';
    return 'bg-ics-red';
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground">Faltas e notas por disciplina</h3>

      <div className="space-y-4">
        {records.map((record) => (
          <div key={record.disciplineId} className="space-y-2 animate-slide-up">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm text-foreground">
                {record.disciplineName}
              </span>
              <span
                className={cn(
                  'font-bold text-sm',
                  getPercentageColor(record.percentage)
                )}
              >
                {record.percentage.toFixed(1)}%
              </span>
            </div>

            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all duration-500', getBarColor(record.percentage))}
                style={{ width: `${record.percentage}%` }}
              />
            </div>


          </div>
        ))}
      </div>
    </div>
  );
}

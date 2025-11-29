import { ICSLevel } from '@/types';
import { cn } from '@/lib/utils';

interface ICSBarProps {
  level: ICSLevel;
  label: string;
  value?: number;
  className?: string;
}

export function ICSBar({ level, label, value, className }: ICSBarProps) {
  const getBarClass = () => {
    switch (level) {
      case 'green':
        return 'ics-green';
      case 'yellow':
        return 'ics-yellow';
      case 'red':
        return 'ics-red';
      case 'purple':
        return 'ics-purple';
    }
  };

  const getTextColor = () => {
    switch (level) {
      case 'green':
        return 'text-ics-green';
      case 'yellow':
        return 'text-ics-yellow';
      case 'red':
        return 'text-ics-red';
      case 'purple':
        return 'text-ics-purple';
    }
  };

  return (
    <div className={cn('space-y-1', className)}>
      <div className="flex items-center justify-between">
        <span className={cn('text-xs font-medium', getTextColor())}>
          {label}
        </span>
        {value !== undefined && (
          <span className={cn('text-xs font-semibold', getTextColor())}>
            ICS: {value}
          </span>
        )}
      </div>
      <div className={cn('week-ics-bar', getBarClass())} />
    </div>
  );
}

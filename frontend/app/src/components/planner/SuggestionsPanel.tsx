import { AlertCircle, Info, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Suggestion } from '@/types';
import { Badge } from '@/components/ui/badge';

interface SuggestionsPanelProps {
  suggestions: Suggestion[];
  onAccept?: (suggestion: Suggestion) => void;
}

export function SuggestionsPanel({ suggestions, onAccept }: SuggestionsPanelProps) {
  const getIcon = (type: Suggestion['type']) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-ics-yellow" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-ics-green" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBorderColor = (type: Suggestion['type']) => {
    switch (type) {
      case 'warning':
        return 'border-l-ics-yellow';
      case 'success':
        return 'border-l-ics-green';
      default:
        return 'border-l-blue-500';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground">
        Sugestão de revisões e atividades de cronograma
      </h3>

      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className={cn(
              'p-4 bg-card rounded-lg border-l-4 animate-slide-up',
              getBorderColor(suggestion.type)
            )}
          >
            <div className="flex items-start gap-3">
              {getIcon(suggestion.type)}
              <div className="flex-1 space-y-2">
                <p className="text-sm text-foreground">{suggestion.description}</p>
                {suggestion.actionLabel && (
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={cn(
                        'text-xs',
                        suggestion.priority === 'alta' && 'border-ics-red text-ics-red',
                        suggestion.priority === 'media' && 'border-ics-yellow text-ics-yellow',
                        suggestion.priority === 'baixa' && 'border-ics-green text-ics-green'
                      )}
                    >
                      {suggestion.priority}
                    </Badge>
                    {suggestion.action && onAccept && (
                      <button
                        onClick={() => onAccept(suggestion)}
                        className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded hover:bg-primary/90 transition-colors"
                      >
                        {suggestion.actionLabel}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

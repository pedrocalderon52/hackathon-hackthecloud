import { Card } from "./ui/card";
import { AlertCircle, Info, CheckCircle } from "lucide-react";
import { Badge } from "./ui/badge";

const iconMap = {
  warning: AlertCircle,
  info: Info,
  success: CheckCircle,
};

const colorMap = {
  warning: "text-warning",
  info: "text-info",
  success: "text-success",
};

const bgColorMap = {
  warning: "bg-warning/10",
  info: "bg-info/10",
  success: "bg-success/10",
};

export function SuggestionsPanel({ suggestions = [] }) {
  return (
    <Card className="p-4 bg-card shadow-lg h-[300px] flex flex-col">
      <h3 className="font-bold text-lg mb-4 text-foreground">
        Sugestão de revisões e atividades de cronograma
      </h3>

      <div className="space-y-3 overflow-y-auto flex-1">
        {suggestions.map((suggestion) => {
          const Icon = iconMap[suggestion.type];

          return (
            <div
              key={suggestion.id}
              className={`p-3 rounded-lg ${bgColorMap[suggestion.type]} border border-border`}
            >
              <div className="flex items-start gap-2">
                <Icon
                  className={`h-5 w-5 ${colorMap[suggestion.type]} flex-shrink-0 mt-0.5`}
                />

                <div className="flex-1">
                  <p className="text-sm text-foreground">{suggestion.message}</p>

                  <Badge variant="outline" className="mt-2 text-xs">
                    {suggestion.priority === "high" && "Alta prioridade"}
                    {suggestion.priority === "medium" && "Média prioridade"}
                    {suggestion.priority === "low" && "Baixa prioridade"}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

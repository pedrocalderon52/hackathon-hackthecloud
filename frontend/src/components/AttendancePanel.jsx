import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function AttendancePanel({ attendanceRecords }) {
  return (
    <Card className="p-4 bg-card shadow-lg h-[300px] flex flex-col">
      <h3 className="font-bold text-lg mb-4 text-foreground">
        Faltas e notas por disciplina
      </h3>

      <div className="space-y-4 overflow-y-auto flex-1">
        {attendanceRecords.map((record) => (
          <div key={record.id} className="space-y-2">
            
            {/* Nome da disciplina + porcentagem */}
            <div className="flex justify-between items-center">
              <p className="font-medium text-sm text-foreground">
                {record.subjectName}
              </p>

              <span
                className={`text-sm font-semibold ${
                  record.percentage >= 75
                    ? "text-success"
                    : "text-destructive"
                }`}
              >
                {record.percentage}%
              </span>
            </div>

            {/* Barra de progresso */}
            <Progress value={record.percentage} className="h-2" />

            {/* Presenças e faltas */}
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{record.attended} presentes</span>
              <span>{record.absences} faltas</span>
            </div>

          </div>
        ))}
      </div>
    </Card>
  );
}

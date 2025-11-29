import { useState } from "react";
import { WeekView } from "../components/WeekView";
import { SuggestionsPanel } from "../components/SuggestionsPanel";
import { AttendancePanel } from "../components/AttendancePanel";
import { TaskDetailsDrawer } from "../components/TaskDetailsDrawer";
import { CreateTaskDialog } from "../components/CreateTaskDialog";
import { DayDetailsPanel } from "../components/DayDetailsPanel";
import { HeatmapPanel } from "../components/HeatmapPanel";
import { Button } from "../components/ui/button";
import { Calendar, ChevronLeft, ChevronRight, Plus, LayoutGrid } from "lucide-react";
import {
    generateMockWeekData,
    mockSuggestions,
    mockAttendanceRecords
} from "../utils/mockData";

const Index = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const [selectedDay, setSelectedDay] = useState(null);

    const { currentWeek, nextWeek } = generateMockWeekData();

    // Set today as default selected day
    useState(() => {
        const today = new Date();
        const todayData = currentWeek.find(
            day => day.date.toDateString() === today.toDateString()
        );
        if (todayData) setSelectedDay(todayData);
    });

    const currentWeekTitle = `Semana dia ${currentWeek[0].date.getDate()}-${currentWeek[6].date.getDate()}`;
    const nextWeekTitle = `Semana dia ${nextWeek[0].date.getDate()}-${nextWeek[6].date.getDate()}`;

    const handleTaskClick = (taskId) => {
        // TODO: Fetch task details from backend
        const task = currentWeek
            .concat(nextWeek)
            .flatMap((day) => day.tasks)
            .find((t) => t.id === taskId);

        if (task) {
            setSelectedTask(task);
            setIsDrawerOpen(true);
        }
    };

    const handleAddTask = (date) => {
        setSelectedDate(date);
        setIsCreateDialogOpen(true);
    };

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Calendar className="h-8 w-8 text-primary" />
                            <h1 className="text-2xl font-bold text-foreground">Planejador Acadêmico</h1>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="outline" size="icon">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <LayoutGrid className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="default"
                                onClick={() => {
                                    setSelectedDate(new Date());
                                    setIsCreateDialogOpen(true);
                                }}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Nova Tarefa
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Sidebar - Day Details */}
                    <div className="col-span-2">
                        <DayDetailsPanel
                            selectedDay={selectedDay}
                            onTaskClick={handleTaskClick}
                        />
                    </div>

                    {/* Center - Week Views */}
                    <div className="col-span-7 space-y-8">
                        <WeekView
                            weekData={currentWeek}
                            weekTitle={currentWeekTitle}
                            onAddTask={handleAddTask}
                            onTaskClick={handleTaskClick}
                            onDayClick={handleDayClick}
                            selectedDay={selectedDay}
                        />

                        <WeekView
                            weekData={nextWeek}
                            weekTitle={nextWeekTitle}
                            onAddTask={handleAddTask}
                            onTaskClick={handleTaskClick}
                            onDayClick={handleDayClick}
                            selectedDay={selectedDay}
                        />
                    </div>

                    {/* Right Sidebar - Suggestions, Attendance and Heatmap */}
                    <div className="col-span-3 space-y-6">
                        <SuggestionsPanel suggestions={mockSuggestions} />
                        <AttendancePanel attendanceRecords={mockAttendanceRecords} />
                        <HeatmapPanel />
                    </div>
                </div>
            </div>

            {/* Task Details Drawer */}
            <TaskDetailsDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                task={selectedTask}
            />

            {/* Create Task Dialog */}
            <CreateTaskDialog
                isOpen={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
                selectedDate={selectedDate}
            />
        </div>
    );
};

export default Index;

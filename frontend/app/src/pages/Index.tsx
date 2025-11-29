import { useState, useEffect } from 'react';
import { Header } from '@/components/planner/Header';
import { WeekView } from '@/components/planner/WeekView';
import { CalendarView } from '@/components/planner/CalendarView';
import { DaySidebar } from '@/components/planner/DaySidebar';
import { SuggestionsPanel } from '@/components/planner/SuggestionsPanel';
import { AttendancePanel } from '@/components/planner/AttendancePanel';
import { CreateTaskDialog } from '@/components/planner/CreateTaskDialog';
import { OnboardingDialog } from '@/components/planner/OnboardingDialog';
import { Task, Event, Suggestion } from '@/types';
import {
  mockTasks,
  mockEvents,
  mockAttendance,
  mockSuggestions,
  getEventsForDate,
  getTasksForDate,
} from '@/utils/mockData';

const Index = () => {
  const [viewMode, setViewMode] = useState<'week' | 'calendar'>('week');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [createDialogDate, setCreateDialogDate] = useState<Date | undefined>();
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Lifted state
  // Lifted state
  // Lifted state
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [events, setEvents] = useState<Event[]>(mockEvents);

  // Check if user has completed onboarding
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('planner_onboarding_complete');
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = (wakeTime: string, sleepTime: string) => {
    // TODO: Save to backend
    localStorage.setItem('planner_onboarding_complete', 'true');
    localStorage.setItem('planner_wake_time', wakeTime);
    localStorage.setItem('planner_sleep_time', sleepTime);
    setShowOnboarding(false);
  };

  const handleAddClick = (date: Date) => {
    setCreateDialogDate(date);
    setIsCreateDialogOpen(true);
  };

  const handleNewTask = () => {
    setCreateDialogDate(undefined);
    setIsCreateDialogOpen(true);
  };

  const handleSaveItem = (item: any) => {
    if ('dueDate' in item) {
      setTasks([...tasks, item as Task]);
    } else {
      setEvents([...events, item as Event]);
    }
  };

  const handleEventClick = (event: Event) => {
    // TODO: Open event details drawer
    console.log('Event clicked:', event);
  };

  const handleTaskClick = (task: Task) => {
    // TODO: Open task details drawer
    console.log('Task clicked:', task);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const tasksForSelectedDate = getTasksForDate(selectedDate, tasks);
  const eventsForSelectedDate = getEventsForDate(selectedDate, events);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-[1600px]">
        <Header
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onNewTask={handleNewTask}
        />

        <div className="flex flex-col lg:flex-row gap-6 py-6">
          {/* Left Sidebar - Day Details (Hidden on mobile, shows on lg+) */}
          <aside className="hidden lg:block w-64 shrink-0">
            <DaySidebar
              selectedDate={selectedDate}
              tasks={tasksForSelectedDate}
              events={eventsForSelectedDate}
              onTaskClick={handleTaskClick}
              onEventClick={handleEventClick}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {viewMode === 'week' ? (
              <WeekView
                onAddClick={handleAddClick}
                onEventClick={handleEventClick}
                onTaskClick={handleTaskClick}
                onDateClick={handleDateClick}
                tasks={tasks}
                events={events}
              />
            ) : (
              <CalendarView
                selectedDate={selectedDate}
                onDateClick={handleDateClick}
                onEventClick={handleEventClick}
                onTaskClick={handleTaskClick}
                tasks={tasks}
                events={events}
              />
            )}
          </main>

          {/* Right Sidebar - Suggestions & Attendance */}
          <aside className="w-full lg:w-80 shrink-0 space-y-6">
            <SuggestionsPanel suggestions={mockSuggestions} />
            <AttendancePanel records={mockAttendance} />
          </aside>
        </div>
      </div>

      {/* Create Task/Event Dialog */}
      <CreateTaskDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        selectedDate={createDialogDate}
        onSave={handleSaveItem}
      />

      {/* Onboarding Dialog */}
      <OnboardingDialog
        open={showOnboarding}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
};

export default Index;

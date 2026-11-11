import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar } from 'lucide-react';
import { Task, Category, UserProfile } from '../../types';
import { computeTaskStatistics, computeWeeklyProductivity } from '../../utils/taskUtils';
import { StatCards } from './StatCards';
import { ProductivityChart } from './ProductivityChart';
import { TodaysTaskList } from './TodaysTaskList';
import { UpcomingDeadlines } from './UpcomingDeadlines';

interface DashboardViewProps {
  tasks: Task[];
  categories: Category[];
  userProfile: UserProfile;
  onOpenAddTask?: () => void;
  onToggleTask: (taskId: string) => void;
  onSelectTask: (task: Task) => void;
  onViewAllTasks: () => void;
  onFilterByStatus?: (status: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  tasks,
  categories,
  userProfile,
  onOpenAddTask,
  onToggleTask,
  onSelectTask,
  onViewAllTasks,
  onFilterByStatus,
}) => {
  const stats = computeTaskStatistics(tasks);
  const weeklyData = computeWeeklyProductivity(tasks);

  // Filter tasks that are due today or in progress/pending
  const todaysTasks = tasks.filter((t) => {
    return t.dueDate === '2026-11-10' || t.status === 'In Progress';
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      {/* Header Greeting with subtle ambient blue glow and floating sparkle */}
      <div className="relative overflow-hidden bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-1/4 w-72 h-36 bg-blue-400/10 rounded-full blur-3xl pointer-events-none animate-ambient-glow" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <motion.div
              animate={{ rotate: [0, 8, -8, 0], y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
            >
              <Sparkles className="w-3.5 h-3.5" />
            </motion.div>
            <span>Academic Semester Overview</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Good morning, {userProfile.name.split(' ')[0]}!
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Here's what's happening with your studies today.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>Tuesday, Nov 10, 2026</span>
          </div>
        </div>
      </div>

      {/* 4 Statistics Cards */}
      <StatCards stats={stats} onFilterClick={onFilterByStatus} />

      {/* Main Grid: Charts & Lists with Scroll-triggered presence */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left 2 Cols: Productivity Chart & Today's Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <ProductivityChart data={weeklyData} />
          <TodaysTaskList
            tasks={todaysTasks}
            categories={categories}
            onToggleTask={onToggleTask}
            onSelectTask={onSelectTask}
            onViewAllTasks={onViewAllTasks}
          />
        </div>

        {/* Right Col: Upcoming Deadlines & Focus Timer */}
        <div className="space-y-6">
          <UpcomingDeadlines
            tasks={tasks}
            categories={categories}
            onSelectTask={onSelectTask}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

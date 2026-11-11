import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Plus, 
  CheckCircle2 
} from 'lucide-react';
import { Task, Category } from '../../types';

interface CalendarViewProps {
  tasks: Task[];
  categories: Category[];
  onSelectTask: (task: Task) => void;
  onAddTaskForDate: (dateStr: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  tasks,
  categories,
  onSelectTask,
  onAddTaskForDate,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 10, 1));
  const [direction, setDirection] = useState<number>(0);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setDirection(1);
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setDirection(0);
    setCurrentDate(new Date(2026, 10, 10));
  };

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarCells = [];

  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const dayNum = daysInPrevMonth - i;
    const prevMonthDate = new Date(year, month - 1, dayNum);
    const dateStr = prevMonthDate.toISOString().split('T')[0];
    calendarCells.push({
      dayNum,
      dateStr,
      isCurrentMonth: false,
    });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const monthStr = (month + 1).toString().padStart(2, '0');
    const dayStr = d.toString().padStart(2, '0');
    const dateStr = `${year}-${monthStr}-${dayStr}`;
    calendarCells.push({
      dayNum: d,
      dateStr,
      isCurrentMonth: true,
      isToday: dateStr === '2026-11-10',
    });
  }

  const remainingCells = (7 - (calendarCells.length % 7)) % 7;
  for (let d = 1; d <= remainingCells; d++) {
    const nextMonthDate = new Date(year, month + 1, d);
    const dateStr = nextMonthDate.toISOString().split('T')[0];
    calendarCells.push({
      dayNum: d,
      dateStr,
      isCurrentMonth: false,
    });
  }

  const tasksByDate = React.useMemo(() => {
    const map: Record<string, Task[]> = {};
    for (const task of tasks) {
      if (!map[task.dueDate]) {
        map[task.dueDate] = [];
      }
      map[task.dueDate].push(task);
    }
    return map;
  }, [tasks]);

  const getPriorityStyle = (priority: string, isCompleted: boolean) => {
    if (isCompleted) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200 line-through opacity-75';
    }
    if (priority === 'High') {
      return 'bg-red-50 text-red-700 border-red-200 font-semibold';
    }
    if (priority === 'Medium') {
      return 'bg-amber-50 text-amber-800 border-amber-200';
    }
    return 'bg-blue-50 text-blue-700 border-blue-200';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Calendar Header with Navigation */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-blue-600 font-semibold mb-1">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Academic Schedule</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            {monthNames[month]} {year}
          </h2>
          <p className="text-xs text-slate-500">
            View course assignments, quizzes, and submission milestones
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Priority legend */}
          <div className="hidden lg:flex items-center gap-3 text-xs text-slate-500 mr-4 border-r border-slate-200 pr-4">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>High Priority</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Low</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToday}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Today
          </motion.button>

          <div className="flex items-center rounded-lg border border-slate-200 bg-white shadow-xs">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevMonth}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-l-lg transition-colors"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <div className="w-[1px] h-4 bg-slate-200" />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNextMonth}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-r-lg transition-colors"
              aria-label="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Calendar Grid Container with month transition */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Days of week header */}
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/70 text-center text-xs font-semibold text-slate-600 py-2.5">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Animated Month Grid */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${year}-${month}`}
            initial={{ opacity: 0, x: direction * 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 15 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="grid grid-cols-7 divide-x divide-y divide-slate-100 auto-rows-fr"
          >
            {calendarCells.map((cell, idx) => {
              const dayTasks = tasksByDate[cell.dateStr] || [];

              return (
                <div
                  key={idx}
                  className={`min-h-[110px] sm:min-h-[125px] p-2 flex flex-col justify-between transition-colors ${
                    cell.isCurrentMonth ? 'bg-white' : 'bg-slate-50/50 text-slate-400'
                  } ${cell.isToday ? 'bg-blue-50/30' : ''} hover:bg-slate-50/60 group`}
                >
                  {/* Day Header with + Quick Add */}
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs font-mono font-medium inline-flex items-center justify-center w-6 h-6 rounded-full transition-transform ${
                        cell.isToday
                          ? 'bg-blue-600 text-white font-bold shadow-xs scale-105'
                          : cell.isCurrentMonth
                          ? 'text-slate-700'
                          : 'text-slate-400'
                      }`}
                    >
                      {cell.dayNum}
                    </span>

                    {cell.isCurrentMonth && (
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onAddTaskForDate(cell.dateStr)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-blue-600 hover:bg-white rounded transition-all shadow-xs"
                        title="Add task on this date"
                      >
                        <Plus className="w-3 h-3" />
                      </motion.button>
                    )}
                  </div>

                  {/* Task Pills on this Day with hover scale */}
                  <div className="flex-1 space-y-1 overflow-y-auto max-h-[85px]">
                    {dayTasks.map((t) => {
                      const isCompleted = t.status === 'Completed';
                      return (
                        <motion.div
                          key={t.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectTask(t);
                          }}
                          className={`px-1.5 py-1 rounded text-[11px] border leading-tight truncate cursor-pointer transition-colors shadow-2xs ${getPriorityStyle(
                            t.priority,
                            isCompleted
                          )}`}
                          title={`${t.title} (${t.dueTime || '23:59'})`}
                        >
                          <div className="flex items-center gap-1">
                            {isCompleted ? (
                              <CheckCircle2 className="w-2.5 h-2.5 shrink-0" />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-current" />
                            )}
                            <span className="truncate">{t.title}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Day bottom note if tasks exist */}
                  {dayTasks.length > 0 && (
                    <div className="pt-1 text-[10px] text-slate-400 font-mono text-right">
                      {dayTasks.length} {dayTasks.length === 1 ? 'task' : 'tasks'}
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

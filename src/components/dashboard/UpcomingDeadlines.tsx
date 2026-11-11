import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, AlertCircle, Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { Task, Category } from '../../types';
import { formatDeadlineRelative } from '../../utils/taskUtils';

interface UpcomingDeadlinesProps {
  tasks: Task[];
  categories: Category[];
  onSelectTask: (task: Task) => void;
}

export const UpcomingDeadlines: React.FC<UpcomingDeadlinesProps> = ({
  tasks,
  categories,
  onSelectTask,
}) => {
  // Focus Pomodoro Timer State
  const [timerSeconds, setTimerSeconds] = React.useState<number>(25 * 60);
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [timerMode, setTimerMode] = React.useState<'study' | 'break'>('study');

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsRunning(false);
      if (timerMode === 'study') {
        setTimerMode('break');
        setTimerSeconds(5 * 60);
      } else {
        setTimerMode('study');
        setTimerSeconds(25 * 60);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timerSeconds, timerMode]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimerSeconds(timerMode === 'study' ? 25 * 60 : 5 * 60);
  };

  // Filter tasks that are pending or in progress, sorted by deadline soonest
  const upcomingTasks = tasks
    .filter((t) => t.status !== 'Completed')
    .sort((a, b) => `${a.dueDate} ${a.dueTime}`.localeCompare(`${b.dueDate} ${b.dueTime}`))
    .slice(0, 4);

  const getCategoryColor = (catName: string) => {
    const found = categories.find((c) => c.name.toLowerCase() === catName.toLowerCase());
    return found ? found.color : '#2563EB';
  };

  return (
    <div className="space-y-4">
      {/* Upcoming Deadlines Card */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Upcoming Deadlines</h3>
            <p className="text-xs text-slate-500">Approaching milestones & submissions</p>
          </div>
          <Calendar className="w-4 h-4 text-slate-400" />
        </div>

        <div className="space-y-2.5">
          {upcomingTasks.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center">No pending deadlines</p>
          ) : (
            <AnimatePresence mode="popLayout">
              {upcomingTasks.map((task) => {
                const deadline = formatDeadlineRelative(task.dueDate, task.dueTime);
                const catColor = getCategoryColor(task.category);

                return (
                  <motion.div
                    layout
                    key={task.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ x: 2, transition: { duration: 0.15 } }}
                    onClick={() => onSelectTask(task)}
                    className="p-2.5 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50/70 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-800 leading-snug truncate">
                        {task.title}
                      </p>
                      <span
                        className={`text-[10px] font-medium shrink-0 px-1.5 py-0.5 rounded ${
                          deadline.isOverdue
                            ? 'text-red-700 bg-red-50'
                            : deadline.isToday
                            ? 'text-amber-800 bg-amber-50'
                            : 'text-blue-700 bg-blue-50'
                        }`}
                      >
                        {deadline.text}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1.5 truncate">
                        <span
                          className="w-2 h-2 rounded-full inline-block shrink-0"
                          style={{ backgroundColor: catColor }}
                        />
                        <span className="truncate">{task.category}</span>
                      </span>

                      <span className="font-mono text-[10px] text-slate-400 shrink-0">
                        {task.dueDate}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Quick Study Focus Timer Widget with Subtle Ambient Glow */}
      <div className="relative overflow-hidden bg-slate-900 text-white p-4 rounded-xl border border-slate-800 shadow-md">
        {/* Subtle Ambient Blue Gradient Glow behind element */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none animate-ambient-glow" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-semibold tracking-wide uppercase text-slate-300">
                {timerMode === 'study' ? 'Deep Work Sprint' : 'Rest Break'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Pomodoro 25/5</span>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div>
              <div className="text-2xl font-bold font-mono tracking-tight text-white tabular-nums">
                {formatTimer(timerSeconds)}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {timerMode === 'study' ? 'Target: 1 focused session' : 'Step away from screen'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsRunning(!isRunning)}
                className="p-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white transition-colors shadow-xs"
                aria-label={isRunning ? 'Pause study timer' : 'Start study timer'}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08, rotate: -45 }}
                whileTap={{ scale: 0.92 }}
                onClick={resetTimer}
                className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                aria-label="Reset timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

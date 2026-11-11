import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Circle, Clock, ArrowRight, Check } from 'lucide-react';
import { Task, Category } from '../../types';

interface TodaysTaskListProps {
  tasks: Task[];
  categories: Category[];
  onToggleTask: (taskId: string) => void;
  onSelectTask: (task: Task) => void;
  onViewAllTasks: () => void;
}

export const TodaysTaskList: React.FC<TodaysTaskListProps> = ({
  tasks,
  categories,
  onToggleTask,
  onSelectTask,
  onViewAllTasks,
}) => {
  const getCategoryColor = (catName: string) => {
    const found = categories.find((c) => c.name.toLowerCase() === catName.toLowerCase());
    return found ? found.color : '#2563EB';
  };

  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Today's Focus Tasks</h3>
          <p className="text-xs text-slate-500">
            Immediate deliverables for today's study session
          </p>
        </div>
        <motion.button
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.96 }}
          onClick={onViewAllTasks}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group transition-colors"
        >
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </motion.button>
      </div>

      {/* Mini Progress Bar for Today */}
      <div className="mb-4 bg-slate-50 border border-slate-100 rounded-lg p-2.5">
        <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5">
          <span className="font-medium">Today's Progress</span>
          <span className="font-mono font-bold text-slate-800 tabular-nums">{progressPercent}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="h-full bg-blue-600 rounded-full"
          />
        </div>
      </div>

      <div className="space-y-2.5">
        {tasks.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            No tasks scheduled for today. Great job staying ahead!
          </div>
        ) : (
          <AnimatePresence mode="popLayout" initial={false}>
            {tasks.slice(0, 5).map((task) => {
              const isCompleted = task.status === 'Completed';
              const catColor = getCategoryColor(task.category);

              return (
                <motion.div
                  layout
                  key={task.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                  whileHover={{ x: 2, transition: { duration: 0.15 } }}
                  onClick={() => onSelectTask(task)}
                  className={`group flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                    isCompleted
                      ? 'bg-slate-50/50 border-slate-100 text-slate-400'
                      : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/70 hover:shadow-xs'
                  }`}
                >
                  {/* Satisfying Checkbox Micro-Interaction */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleTask(task.id);
                    }}
                    className="mt-0.5 relative shrink-0 focus:outline-hidden"
                    aria-label={isCompleted ? `Mark ${task.title} incomplete` : `Mark ${task.title} complete`}
                  >
                    <AnimatePresence mode="wait">
                      {isCompleted ? (
                        <motion.div
                          key="checked"
                          initial={{ scale: 0.4, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.4, opacity: 0 }}
                          transition={{ type: 'spring', damping: 15, stiffness: 400 }}
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-50" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="unchecked"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0.8 }}
                        >
                          <Circle className="w-4 h-4 text-slate-300 group-hover:stroke-blue-600 transition-colors" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-semibold leading-snug truncate transition-all duration-200 ${
                        isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'
                      }`}
                    >
                      {task.title}
                    </p>

                    <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2 h-2 rounded-full inline-block"
                          style={{ backgroundColor: catColor }}
                        />
                        <span className="truncate max-w-[130px]">{task.category}</span>
                      </span>

                      <span aria-hidden="true" className="text-slate-300">·</span>

                      <span className="flex items-center gap-1 font-mono text-slate-500">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{task.dueTime}</span>
                      </span>

                      <span aria-hidden="true" className="text-slate-300">·</span>

                      <span
                        className={`font-medium ${
                          task.priority === 'High'
                            ? 'text-red-700'
                            : task.priority === 'Medium'
                            ? 'text-amber-800'
                            : 'text-slate-600'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>

                  {/* Status indicator */}
                  <div className="shrink-0 self-center">
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded transition-colors ${
                        isCompleted
                          ? 'text-emerald-700 bg-emerald-50'
                          : task.status === 'In Progress'
                          ? 'text-blue-700 bg-blue-50'
                          : 'text-slate-600 bg-slate-100'
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Showing {Math.min(tasks.length, 5)} active tasks</span>
        <span className="font-mono text-slate-400 tabular-nums">
          {completedCount} of {tasks.length} done
        </span>
      </div>
    </div>
  );
};

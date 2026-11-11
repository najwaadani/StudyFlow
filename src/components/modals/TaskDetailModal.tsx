import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Calendar, 
  Clock, 
  Tag, 
  CheckCircle2, 
  Circle, 
  Edit3, 
  Trash2
} from 'lucide-react';
import { Task, Category } from '../../types';
import { formatDeadlineRelative } from '../../utils/taskUtils';

interface TaskDetailModalProps {
  task: Task | null;
  categoryObj?: Category;
  onClose: () => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleStatus: (taskId: string) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  categoryObj,
  onClose,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  if (!task) return null;

  const deadlineInfo = formatDeadlineRelative(task.dueDate, task.dueTime, new Date(), task.status === 'Completed');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Animated Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
          aria-hidden="true"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-10"
          role="dialog"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span 
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: categoryObj?.color || '#2563EB' }}
              />
              <span className="font-medium text-slate-700">{task.category}</span>
              {categoryObj?.code && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{categoryObj.code}</span>
                </>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                onClick={() => onToggleStatus(task.id)}
                className="mt-1 text-slate-400 hover:text-blue-600 transition-colors shrink-0 focus:outline-hidden"
                aria-label={task.status === 'Completed' ? 'Mark incomplete' : 'Mark completed'}
              >
                {task.status === 'Completed' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400 hover:text-blue-600" />
                )}
              </motion.button>
              <div>
                <h3 className={`text-base font-bold text-slate-900 leading-snug transition-all ${
                  task.status === 'Completed' ? 'line-through text-slate-400' : ''
                }`}>
                  {task.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {task.description || 'No additional notes provided for this task.'}
                </p>
              </div>
            </div>

            {/* Metadata Block */}
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Due Date</span>
                </span>
                <span className="font-mono font-medium text-slate-800">
                  {task.dueDate} at {task.dueTime}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Urgency</span>
                </span>
                <span className={`font-medium ${
                  deadlineInfo.isOverdue 
                    ? 'text-red-700 font-semibold' 
                    : deadlineInfo.isToday 
                    ? 'text-amber-800 font-semibold' 
                    : 'text-slate-700'
                }`}>
                  {deadlineInfo.text}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Priority</span>
                </span>
                <span className={`font-semibold ${
                  task.priority === 'High' 
                    ? 'text-red-700' 
                    : task.priority === 'Medium' 
                    ? 'text-amber-800' 
                    : 'text-slate-600'
                }`}>
                  {task.priority} Priority
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Status</span>
                <span className="font-medium text-slate-800">
                  {task.status}
                </span>
              </div>

              {task.estimatedMinutes && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Estimated Effort</span>
                  <span className="font-mono text-slate-800">
                    {task.estimatedMinutes} minutes
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (window.confirm(`Delete "${task.title}"?`)) {
                  onDelete(task.id);
                  onClose();
                }
              }}
              className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded-md transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </motion.button>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onClose();
                  onEdit(task);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200/60 rounded-md transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onToggleStatus(task.id);
                  onClose();
                }}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-all shadow-xs"
              >
                {task.status === 'Completed' ? 'Mark Incomplete' : 'Complete Task'}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

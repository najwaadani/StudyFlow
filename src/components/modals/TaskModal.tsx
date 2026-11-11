import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, AlertCircle } from 'lucide-react';
import { Task, Category, Priority, TaskStatus } from '../../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTask: (task: Task) => void;
  editingTask?: Task | null;
  categories: Category[];
  defaultDate?: string;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSaveTask,
  editingTask,
  categories,
  defaultDate,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('23:59');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [status, setStatus] = useState<TaskStatus>('Pending');
  const [estimatedMinutes, setEstimatedMinutes] = useState<number>(60);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setCategory(editingTask.category);
      setDueDate(editingTask.dueDate);
      setDueTime(editingTask.dueTime || '23:59');
      setPriority(editingTask.priority);
      setStatus(editingTask.status);
      setEstimatedMinutes(editingTask.estimatedMinutes || 60);
    } else {
      const todayStr = defaultDate || new Date().toISOString().split('T')[0];
      setTitle('');
      setDescription('');
      setCategory(categories[0]?.name || 'Database Systems');
      setDueDate(todayStr);
      setDueTime('23:59');
      setPriority('Medium');
      setStatus('Pending');
      setEstimatedMinutes(60);
    }
    setErrors({});
  }, [editingTask, isOpen, categories, defaultDate]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!title.trim()) {
      errs.title = 'Task title is required';
    } else if (title.trim().length < 3) {
      errs.title = 'Task title must be at least 3 characters';
    }
    if (!category) {
      errs.category = 'Please select a course or category';
    }
    if (!dueDate) {
      errs.dueDate = 'Deadline date is required';
    }
    if (!dueTime) {
      errs.dueTime = 'Deadline time is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const taskData: Task = {
      id: editingTask ? editingTask.id : `task-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      category,
      dueDate,
      dueTime,
      priority,
      status,
      createdAt: editingTask ? editingTask.createdAt : new Date().toISOString().split('T')[0],
      completedAt: status === 'Completed' 
        ? (editingTask?.completedAt || new Date().toISOString()) 
        : undefined,
      estimatedMinutes: Number(estimatedMinutes) || 60,
    };

    onSaveTask(taskData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-10"
            role="dialog"
            aria-labelledby="task-modal-title"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 id="task-modal-title" className="text-base font-bold text-slate-900">
                  {editingTask ? 'Edit Academic Task' : 'Add New Task'}
                </h2>
                <p className="text-xs text-slate-500">
                  {editingTask 
                    ? 'Update deadline, course, or priority status' 
                    : 'Track an assignment, exam preparation, or lab task'}
                </p>
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

            {/* Modal Form Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Task Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Task Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
                  }}
                  placeholder="e.g. Complete Database Systems Assignment"
                  className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 text-slate-900 placeholder-slate-400 ${
                    errors.title ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-600'
                  }`}
                />
                {errors.title && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.title}</span>
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description / Notes
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Key deliverables, rubric requirements, reference links..."
                  rows={2}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-slate-900 placeholder-slate-400 resize-none"
                />
              </div>

              {/* Course / Category & Estimated Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Course / Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      if (errors.category) setErrors((prev) => ({ ...prev, category: '' }));
                    }}
                    className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 text-slate-800 ${
                      errors.category ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-600'
                    }`}
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name} ({cat.code})
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-xs text-red-600">{errors.category}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Estimated Time (mins)
                  </label>
                  <input
                    type="number"
                    min="10"
                    step="10"
                    value={estimatedMinutes}
                    onChange={(e) => setEstimatedMinutes(Math.max(10, parseInt(e.target.value) || 30))}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-slate-800 font-mono"
                  />
                </div>
              </div>

              {/* Deadline Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Deadline Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => {
                        setDueDate(e.target.value);
                        if (errors.dueDate) setErrors((prev) => ({ ...prev, dueDate: '' }));
                      }}
                      className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 text-slate-800 font-mono ${
                        errors.dueDate ? 'border-red-500' : 'border-slate-200 focus:border-blue-600'
                      }`}
                    />
                  </div>
                  {errors.dueDate && (
                    <p className="mt-1 text-xs text-red-600">{errors.dueDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Deadline Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="time"
                      value={dueTime}
                      onChange={(e) => {
                        setDueTime(e.target.value);
                        if (errors.dueTime) setErrors((prev) => ({ ...prev, dueTime: '' }));
                      }}
                      className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 text-slate-800 font-mono ${
                        errors.dueTime ? 'border-red-500' : 'border-slate-200 focus:border-blue-600'
                      }`}
                    />
                  </div>
                  {errors.dueTime && (
                    <p className="mt-1 text-xs text-red-600">{errors.dueTime}</p>
                  )}
                </div>
              </div>

              {/* Priority & Status Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Priority
                  </label>
                  <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
                    {(['Low', 'Medium', 'High'] as Priority[]).map((p) => {
                      const isSelected = priority === p;
                      return (
                        <motion.button
                          type="button"
                          key={p}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setPriority(p)}
                          className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                            isSelected 
                              ? p === 'High' 
                                ? 'bg-red-50 text-red-700 font-semibold shadow-xs' 
                                : p === 'Medium'
                                ? 'bg-amber-50 text-amber-800 font-semibold shadow-xs'
                                : 'bg-white text-slate-800 font-semibold shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {p}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Status
                  </label>
                  <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
                    {(['Pending', 'In Progress', 'Completed'] as TaskStatus[]).map((s) => {
                      const isSelected = status === s;
                      return (
                        <motion.button
                          type="button"
                          key={s}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setStatus(s)}
                          className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all truncate ${
                            isSelected 
                              ? s === 'Completed'
                                ? 'bg-emerald-50 text-emerald-700 font-semibold shadow-xs'
                                : s === 'In Progress'
                                ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                                : 'bg-white text-slate-800 font-semibold shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {s}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs hover:shadow-md transition-all"
                >
                  {editingTask ? 'Save Changes' : 'Save Task'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Plus, 
  Filter, 
  ArrowUpDown, 
  LayoutList, 
  LayoutGrid, 
  CheckCircle2, 
  Circle, 
  Edit3, 
  Trash2, 
  Clock, 
  AlertCircle,
  Check
} from 'lucide-react';
import { Task, Category } from '../../types';
import { filterAndSortTasks, formatDeadlineRelative } from '../../utils/taskUtils';

interface TasksViewProps {
  tasks: Task[];
  categories: Category[];
  onOpenAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onToggleTask: (taskId: string) => void;
  onSelectTask: (task: Task) => void;
  initialStatusFilter?: string;
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  categories,
  onOpenAddTask,
  onEditTask,
  onDeleteTask,
  onToggleTask,
  onSelectTask,
  initialStatusFilter = 'All',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter);
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'deadline_asc' | 'deadline_desc' | 'priority' | 'title' | 'status'>('deadline_asc');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filteredTasks = useMemo(() => {
    return filterAndSortTasks(tasks, {
      searchQuery,
      statusFilter,
      priorityFilter,
      categoryFilter,
      sortBy,
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter, categoryFilter, sortBy]);

  const getCategoryColor = (catName: string) => {
    const found = categories.find((c) => c.name.toLowerCase() === catName.toLowerCase());
    return found ? found.color : '#2563EB';
  };

  const getCategoryCode = (catName: string) => {
    const found = categories.find((c) => c.name.toLowerCase() === catName.toLowerCase());
    return found ? found.code : '';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      {/* Top Header & Action Row */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Academic Tasks</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your assignments, quizzes, labs, and deliverables ({filteredTasks.length} shown)
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View mode toggle with animated indicator */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'list' 
                  ? 'bg-white text-slate-900 shadow-xs font-semibold' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Table List View"
              aria-label="Table List View"
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'grid' 
                  ? 'bg-white text-slate-900 shadow-xs font-semibold' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Cards Grid View"
              aria-label="Cards Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenAddTask}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs hover:shadow-md transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </motion.button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, description, or course..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-600 focus:bg-white text-slate-900 placeholder-slate-400 transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-600 text-slate-700 font-medium transition-colors"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Overdue">Overdue Only</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-600 text-slate-700 font-medium transition-colors"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-600 text-slate-700 font-medium transition-colors"
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Secondary row: Quick sort & reset */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort by:</span>
            <div className="flex items-center gap-1">
              {[
                { id: 'deadline_asc', label: 'Earliest Deadline' },
                { id: 'deadline_desc', label: 'Latest Deadline' },
                { id: 'priority', label: 'Priority' },
                { id: 'title', label: 'Task Name' },
              ].map((sortOption) => (
                <motion.button
                  key={sortOption.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSortBy(sortOption.id as any)}
                  className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                    sortBy === sortOption.id
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {sortOption.label}
                </motion.button>
              ))}
            </div>
          </div>

          {(searchQuery || statusFilter !== 'All' || priorityFilter !== 'All' || categoryFilter !== 'All') && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('All');
                setPriorityFilter('All');
                setCategoryFilter('All');
              }}
              className="text-xs text-blue-600 hover:underline"
            >
              Reset Filters
            </motion.button>
          )}
        </div>
      </div>

      {/* Main Tasks Render (List vs Grid) */}
      {filteredTasks.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 text-center rounded-2xl border border-slate-200 shadow-xs"
        >
          <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-800">No tasks found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            No academic tasks match your active filter criteria. Try clearing search keywords or adding a new task.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenAddTask}
            className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Task</span>
          </motion.button>
        </motion.div>
      ) : viewMode === 'list' ? (
        /* TABLE LIST VIEW WITH ANIMATEPRESENCE */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 w-12 text-center">Status</th>
                  <th className="py-3 px-4">Task Name & Details</th>
                  <th className="py-3 px-4 w-44">Category</th>
                  <th className="py-3 px-4 w-44">Deadline</th>
                  <th className="py-3 px-4 w-28">Priority</th>
                  <th className="py-3 px-4 w-32">Status</th>
                  <th className="py-3 px-4 w-24 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <AnimatePresence mode="popLayout" initial={false}>
                  {filteredTasks.map((task) => {
                    const isCompleted = task.status === 'Completed';
                    const deadline = formatDeadlineRelative(task.dueDate, task.dueTime, new Date(), isCompleted);
                    const catColor = getCategoryColor(task.category);
                    const catCode = getCategoryCode(task.category);

                    return (
                      <motion.tr
                        layout
                        key={task.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -10, transition: { duration: 0.2 } }}
                        whileHover={{ backgroundColor: 'rgba(248, 250, 252, 0.9)' }}
                        className="transition-colors group cursor-pointer"
                        onClick={() => onSelectTask(task)}
                      >
                        {/* Checkbox with micro-interaction */}
                        <td className="py-3 px-4 text-center">
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.8 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleTask(task.id);
                            }}
                            className="text-slate-300 hover:text-blue-600 transition-colors focus:outline-hidden"
                            aria-label={isCompleted ? `Mark ${task.title} incomplete` : `Mark ${task.title} complete`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-50" />
                            ) : (
                              <Circle className="w-4 h-4 hover:stroke-blue-600" />
                            )}
                          </motion.button>
                        </td>

                        {/* Title & Description */}
                        <td className="py-3 px-4">
                          <p
                            className={`font-semibold text-slate-900 leading-snug transition-all ${
                              isCompleted ? 'line-through text-slate-400' : ''
                            }`}
                          >
                            {task.title}
                          </p>
                          {task.description && (
                            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                              {task.description}
                            </p>
                          )}
                        </td>

                        {/* Category */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="w-2 h-2 rounded-full inline-block shrink-0"
                              style={{ backgroundColor: catColor }}
                            />
                            <span className="font-medium text-slate-700">{task.category}</span>
                            {catCode && (
                              <span className="text-[10px] text-slate-400 font-mono">({catCode})</span>
                            )}
                          </div>
                        </td>

                        {/* Deadline */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className={`font-mono ${isCompleted ? 'text-slate-400' : 'text-slate-800'}`}>
                            {task.dueDate} {task.dueTime}
                          </div>
                          <span
                            className={`text-[10px] font-medium block mt-0.5 ${
                              isCompleted
                                ? 'text-emerald-700'
                                : deadline.isOverdue
                                ? 'text-red-700 font-semibold'
                                : deadline.isToday
                                ? 'text-amber-800'
                                : 'text-slate-500'
                            }`}
                          >
                            {deadline.text}
                          </span>
                        </td>

                        {/* Priority */}
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                              task.priority === 'High'
                                ? 'text-red-700 font-semibold'
                                : task.priority === 'Medium'
                                ? 'text-amber-800'
                                : 'text-slate-600'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                task.priority === 'High'
                                  ? 'bg-red-500'
                                  : task.priority === 'Medium'
                                  ? 'bg-amber-500'
                                  : 'bg-slate-400'
                              }`}
                            />
                            {task.priority}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                              isCompleted
                                ? 'bg-emerald-50 text-emerald-700'
                                : task.status === 'In Progress'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {task.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                            <motion.button
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => onToggleTask(task.id)}
                              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors"
                              title={isCompleted ? 'Mark Pending' : 'Mark Completed'}
                              aria-label="Toggle Complete"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => onEditTask(task)}
                              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                              title="Edit Task"
                              aria-label="Edit Task"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                if (window.confirm(`Delete task "${task.title}"?`)) {
                                  onDeleteTask(task.id);
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                              title="Delete Task"
                              aria-label="Delete Task"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* CARDS GRID VIEW WITH ANIMATEPRESENCE & HOVER LIFT */
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredTasks.map((task) => {
              const isCompleted = task.status === 'Completed';
              const deadline = formatDeadlineRelative(task.dueDate, task.dueTime, new Date(), isCompleted);
              const catColor = getCategoryColor(task.category);

              return (
                <motion.div
                  layout
                  key={task.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  onClick={() => onSelectTask(task)}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full inline-block"
                          style={{ backgroundColor: catColor }}
                        />
                        <span className="font-medium text-slate-700 truncate max-w-[160px]">
                          {task.category}
                        </span>
                      </span>

                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded transition-colors ${
                          isCompleted
                            ? 'bg-emerald-50 text-emerald-700'
                            : task.status === 'In Progress'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>

                    <h3
                      className={`text-sm font-bold text-slate-900 leading-snug line-clamp-2 ${
                        isCompleted ? 'line-through text-slate-400' : ''
                      }`}
                    >
                      {task.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {task.description || 'No description notes.'}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-slate-500 font-mono text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{task.dueDate}</span>
                    </div>

                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onToggleTask(task.id)}
                        className="p-1 text-slate-400 hover:text-blue-600 rounded transition-colors"
                        title="Toggle Complete"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onEditTask(task)}
                        className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          if (window.confirm(`Delete "${task.title}"?`)) {
                            onDeleteTask(task.id);
                          }
                        }}
                        className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { 
  FolderKanban, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  User
} from 'lucide-react';
import { Task, Category } from '../../types';
import { computeCategorySummaries } from '../../utils/taskUtils';

interface CategoriesViewProps {
  categories: Category[];
  tasks: Task[];
  onOpenAddCategory: () => void;
  onEditCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
  onSelectCategoryTasks: (categoryName: string) => void;
  onSelectTask: (task: Task) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  categories,
  tasks,
  onOpenAddCategory,
  onEditCategory,
  onDeleteCategory,
  onSelectCategoryTasks,
  onSelectTask,
}) => {
  const summaries = computeCategorySummaries(categories, tasks);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header & Add Button */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-blue-600 font-semibold mb-1">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Academic Curriculum</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Course Categories</h2>
          <p className="text-xs text-slate-500">
            Organize academic workloads, track subject progress, and manage syllabus modules
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenAddCategory}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs hover:shadow-md transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </motion.button>
      </div>

      {/* Category Cards Grid with Staggered Entrance */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {summaries.map(({ category, totalTasks, completedTasks, inProgressTasks, progressPercent }) => {
          const categoryTasks = tasks.filter(
            (t) => t.category.toLowerCase() === category.name.toLowerCase()
          );

          return (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-all p-5 flex flex-col justify-between group"
            >
              <div>
                {/* Top Row: Course Code & Actions */}
                <div className="flex items-center justify-between text-xs mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full inline-block"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-mono font-semibold text-slate-700">
                      {category.code}
                    </span>
                    {category.credits && (
                      <span className="text-[11px] text-slate-400 font-medium">
                        · {category.credits} Credits
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onEditCategory(category)}
                      className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
                      title="Edit Category"
                      aria-label={`Edit ${category.name}`}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        if (
                          window.confirm(
                            `Delete category "${category.name}"? Existing tasks will remain.`
                          )
                        ) {
                          onDeleteCategory(category.id);
                        }
                      }}
                      className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete Category"
                      aria-label={`Delete ${category.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </div>

                {/* Course Title & Description */}
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {category.name}
                </h3>
                {category.instructor && (
                  <p className="mt-1 text-xs text-slate-500 flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-400" />
                    <span>{category.instructor}</span>
                  </p>
                )}
                <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {category.description}
                </p>

                {/* Animated Progress Bar & Stats */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-500 font-medium">Completion Rate</span>
                    <span className="font-mono font-bold text-slate-900 tabular-nums">
                      {progressPercent}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.75, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: category.color,
                      }}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{completedTasks} completed</span>
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{inProgressTasks} active</span>
                    </span>
                    <span className="font-mono text-slate-400">
                      {totalTasks} total
                    </span>
                  </div>
                </div>

                {/* Active Tasks Preview */}
                {categoryTasks.length > 0 && (
                  <div className="mt-3 pt-2 space-y-1.5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Recent Deliverables:
                    </p>
                    {categoryTasks.slice(0, 2).map((t) => (
                      <motion.div
                        key={t.id}
                        whileHover={{ x: 2 }}
                        onClick={() => onSelectTask(t)}
                        className="text-xs p-1.5 rounded-md bg-slate-50 hover:bg-blue-50/60 text-slate-700 truncate cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <span className="truncate">{t.title}</span>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-1">
                          {t.dueDate}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* View tasks in filter action */}
              <motion.button
                whileHover={{ x: 2 }}
                onClick={() => onSelectCategoryTasks(category.name)}
                className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-between w-full group/btn"
              >
                <span>Filter tasks for this course</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
              </motion.button>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

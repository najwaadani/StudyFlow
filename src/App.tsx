import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Task, 
  Category, 
  UserProfile, 
  NavigationTab 
} from './types';
import { 
  getStoredTasks, 
  saveStoredTasks, 
  getStoredCategories, 
  saveStoredCategories, 
  getStoredProfile, 
  saveStoredProfile,
  resetToSampleData 
} from './data/initialData';
import { computeTaskStatistics } from './utils/taskUtils';
import { Sidebar } from './components/layout/Sidebar';
import { TopNavbar } from './components/layout/TopNavbar';
import { DashboardView } from './components/dashboard/DashboardView';
import { TasksView } from './components/tasks/TasksView';
import { CalendarView } from './components/calendar/CalendarView';
import { CategoriesView } from './components/categories/CategoriesView';
import { ReportsView } from './components/reports/ReportsView';
import { SettingsView } from './components/settings/SettingsView';
import { TaskModal } from './components/modals/TaskModal';
import { TaskDetailModal } from './components/modals/TaskDetailModal';
import { CategoryModal } from './components/modals/CategoryModal';
import { ToastContainer, ToastMessage } from './components/common/Toast';
import { LandingPage } from './components/landing/LandingPage';
import { LogOut, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => getStoredTasks());
  const [categories, setCategories] = useState<Category[]>(() => getStoredCategories());
  const [userProfile, setUserProfile] = useState<UserProfile>(() => getStoredProfile());

  // Top-level View Mode: 'landing' or 'app'
  const [viewMode, setViewMode] = useState<'landing' | 'app'>(() => {
    return (localStorage.getItem('studyflow_view_mode') as 'landing' | 'app') || 'landing';
  });

  const [currentTab, setCurrentTab] = useState<NavigationTab>('overview');
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Modals state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskDefaultDate, setTaskDefaultDate] = useState<string | undefined>(undefined);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [selectedTaskForDetail, setSelectedTaskForDetail] = useState<Task | null>(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [tasksFilterParam, setTasksFilterParam] = useState<string>('All');

  // Toasts state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((type: ToastMessage['type'], title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Sync state changes to localStorage
  useEffect(() => {
    saveStoredTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    saveStoredCategories(categories);
  }, [categories]);

  useEffect(() => {
    saveStoredProfile(userProfile);
  }, [userProfile]);

  // Task Actions with interactive toast feedback
  const handleSaveTask = (taskData: Task) => {
    const isEditing = tasks.some((t) => t.id === taskData.id);
    setTasks((prev) => {
      const existsIndex = prev.findIndex((t) => t.id === taskData.id);
      if (existsIndex >= 0) {
        const copy = [...prev];
        copy[existsIndex] = taskData;
        return copy;
      }
      return [taskData, ...prev];
    });

    if (isEditing) {
      addToast('info', 'Task Updated', `Changes to "${taskData.title}" were saved.`);
    } else {
      addToast('success', 'Task Created', `"${taskData.title}" added to your study schedule.`);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    const taskToDelete = tasks.find((t) => t.id === taskId);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    if (selectedTaskForDetail?.id === taskId) {
      setSelectedTaskForDetail(null);
    }
    addToast('warning', 'Task Removed', taskToDelete ? `"${taskToDelete.title}" deleted.` : 'Task deleted.');
  };

  const handleToggleTaskStatus = (taskId: string) => {
    let nowCompleted = false;
    let taskTitle = '';

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const isNowCompleted = t.status !== 'Completed';
          nowCompleted = isNowCompleted;
          taskTitle = t.title;
          return {
            ...t,
            status: isNowCompleted ? 'Completed' : 'Pending',
            completedAt: isNowCompleted ? new Date().toISOString() : undefined,
          };
        }
        return t;
      })
    );

    if (selectedTaskForDetail?.id === taskId) {
      setSelectedTaskForDetail((prev) =>
        prev
          ? {
              ...prev,
              status: prev.status !== 'Completed' ? 'Completed' : 'Pending',
              completedAt: prev.status !== 'Completed' ? new Date().toISOString() : undefined,
            }
          : null
      );
    }

    if (nowCompleted) {
      addToast('success', 'Milestone Completed!', `"${taskTitle}" marked as finished.`);
    } else {
      addToast('info', 'Task Reopened', `"${taskTitle}" set back to active status.`);
    }
  };

  // Category Actions
  const handleSaveCategory = (catData: Category) => {
    const isEditing = categories.some((c) => c.id === catData.id);
    setCategories((prev) => {
      const existsIndex = prev.findIndex((c) => c.id === catData.id);
      if (existsIndex >= 0) {
        const copy = [...prev];
        copy[existsIndex] = catData;
        return copy;
      }
      return [...prev, catData];
    });

    addToast('success', isEditing ? 'Category Updated' : 'Category Created', `Course "${catData.name}" saved.`);
  };

  const handleDeleteCategory = (catId: string) => {
    const cat = categories.find((c) => c.id === catId);
    setCategories((prev) => prev.filter((c) => c.id !== catId));
    addToast('warning', 'Category Deleted', cat ? `"${cat.name}" removed.` : 'Category removed.');
  };

  // Quick action from Dashboard Stat Cards to jump to Tasks tab with specific filter
  const handleFilterFromDashboard = (statusKey: string) => {
    setTasksFilterParam(statusKey);
    setCurrentTab('tasks');
  };

  // Reset Data to sample
  const handleResetData = () => {
    const data = resetToSampleData();
    setTasks(data.tasks);
    setCategories(data.categories);
    setUserProfile(data.profile);
    setTasksFilterParam('All');
    addToast('info', 'Sample Data Restored', '24 academic coursework tasks loaded.');
  };

  // Computed statistics
  const stats = computeTaskStatistics(tasks);

  const handleSearchChange = (q: string) => {
    setGlobalSearch(q);
    if (q && currentTab !== 'tasks') {
      setCurrentTab('tasks');
    }
  };

  const handleLaunchApp = () => {
    setViewMode('app');
    localStorage.setItem('studyflow_view_mode', 'app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToLanding = () => {
    setViewMode('landing');
    localStorage.setItem('studyflow_view_mode', 'landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (viewMode === 'landing') {
    return (
      <div className="min-h-screen bg-slate-50 antialiased text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        <LandingPage onLaunchApp={handleLaunchApp} tasksCount={tasks.length} />
        <ToastContainer toasts={toasts} onDismiss={removeToast} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row antialiased text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Fixed Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          if (tab !== 'tasks') {
            setTasksFilterParam('All');
          }
        }}
        tasksCount={tasks.length}
        overdueCount={stats.overdue}
        userProfile={userProfile}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        onLogoutClick={() => setIsLogoutModalOpen(true)}
        onGoToLanding={handleGoToLanding}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 min-h-screen">
        {/* Top Navbar */}
        <TopNavbar
          currentTab={currentTab}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenAddTask={() => {
            setEditingTask(null);
            setTaskDefaultDate(undefined);
            setIsTaskModalOpen(true);
          }}
          searchQuery={globalSearch}
          onSearchChange={handleSearchChange}
          userProfile={userProfile}
          onSelectTab={setCurrentTab}
          onLogoutClick={() => setIsLogoutModalOpen(true)}
          onGoToLanding={handleGoToLanding}
        />

        {/* Viewport Content Container with Page Transition */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {currentTab === 'overview' && (
                <DashboardView
                  tasks={tasks}
                  categories={categories}
                  userProfile={userProfile}
                  onOpenAddTask={() => {
                    setEditingTask(null);
                    setTaskDefaultDate(undefined);
                    setIsTaskModalOpen(true);
                  }}
                  onToggleTask={handleToggleTaskStatus}
                  onSelectTask={setSelectedTaskForDetail}
                  onViewAllTasks={() => setCurrentTab('tasks')}
                  onFilterByStatus={handleFilterFromDashboard}
                />
              )}

              {currentTab === 'tasks' && (
                <TasksView
                  tasks={tasks}
                  categories={categories}
                  onOpenAddTask={() => {
                    setEditingTask(null);
                    setTaskDefaultDate(undefined);
                    setIsTaskModalOpen(true);
                  }}
                  onEditTask={(task) => {
                    setEditingTask(task);
                    setIsTaskModalOpen(true);
                  }}
                  onDeleteTask={handleDeleteTask}
                  onToggleTask={handleToggleTaskStatus}
                  onSelectTask={setSelectedTaskForDetail}
                  initialStatusFilter={tasksFilterParam}
                />
              )}

              {currentTab === 'calendar' && (
                <CalendarView
                  tasks={tasks}
                  categories={categories}
                  onSelectTask={setSelectedTaskForDetail}
                  onAddTaskForDate={(dateStr) => {
                    setEditingTask(null);
                    setTaskDefaultDate(dateStr);
                    setIsTaskModalOpen(true);
                  }}
                />
              )}

              {currentTab === 'categories' && (
                <CategoriesView
                  categories={categories}
                  tasks={tasks}
                  onOpenAddCategory={() => {
                    setEditingCategory(null);
                    setIsCategoryModalOpen(true);
                  }}
                  onEditCategory={(cat) => {
                    setEditingCategory(cat);
                    setIsCategoryModalOpen(true);
                  }}
                  onDeleteCategory={handleDeleteCategory}
                  onSelectCategoryTasks={(catName) => {
                    setTasksFilterParam('All');
                    setGlobalSearch(catName);
                    setCurrentTab('tasks');
                  }}
                  onSelectTask={setSelectedTaskForDetail}
                />
              )}

              {currentTab === 'reports' && (
                <ReportsView tasks={tasks} categories={categories} />
              )}

              {currentTab === 'settings' && (
                <SettingsView
                  userProfile={userProfile}
                  onUpdateProfile={(updated) => {
                    setUserProfile(updated);
                    addToast('success', 'Profile Updated', 'Settings saved to browser.');
                  }}
                  onResetData={handleResetData}
                  tasks={tasks}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Add / Edit Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSaveTask={handleSaveTask}
        editingTask={editingTask}
        categories={categories}
        defaultDate={taskDefaultDate}
      />

      {/* Task Details Modal */}
      <TaskDetailModal
        task={selectedTaskForDetail}
        categoryObj={categories.find(
          (c) => c.name.toLowerCase() === selectedTaskForDetail?.category.toLowerCase()
        )}
        onClose={() => setSelectedTaskForDetail(null)}
        onEdit={(task) => {
          setEditingTask(task);
          setIsTaskModalOpen(true);
        }}
        onDelete={handleDeleteTask}
        onToggleStatus={handleToggleTaskStatus}
      />

      {/* Add / Edit Category Modal */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSaveCategory={handleSaveCategory}
        editingCategory={editingCategory}
      />

      {/* Simulated Sign Out Modal with AnimatePresence */}
      <AnimatePresence>
        {isLogoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLogoutModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
              aria-hidden="true"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-sm bg-white rounded-xl shadow-2xl border border-slate-200 p-6 text-center z-10"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                <LogOut className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">StudyFlow Session</h3>
              <p className="text-xs text-slate-500 mt-1">
                You are currently logged in as <strong>{userProfile.name}</strong> ({userProfile.email}).
              </p>
              <div className="mt-5 flex items-center justify-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsLogoutModalOpen(false);
                    addToast('info', 'Session Refreshed', 'Local workspace synced.');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-xs"
                >
                  Refresh Session
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Animated Toast Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

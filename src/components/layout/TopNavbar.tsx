import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  Search, 
  Bell, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ChevronRight,
  User,
  Sliders,
  LogOut,
  X,
  Sparkles
} from 'lucide-react';
import { NavigationTab, UserProfile } from '../../types';

interface TopNavbarProps {
  currentTab: NavigationTab;
  onOpenMobileMenu: () => void;
  onOpenAddTask: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  userProfile: UserProfile;
  onSelectTab: (tab: NavigationTab) => void;
  onLogoutClick: () => void;
  onGoToLanding?: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  currentTab,
  onOpenMobileMenu,
  onOpenAddTask,
  searchQuery,
  onSearchChange,
  userProfile,
  onSelectTab,
  onLogoutClick,
  onGoToLanding,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const tabTitles: Record<NavigationTab, { title: string; breadcrumb: string }> = {
    overview: { title: 'Dashboard', breadcrumb: 'Overview' },
    tasks: { title: 'My Tasks', breadcrumb: 'Tasks Management' },
    calendar: { title: 'Academic Calendar', breadcrumb: 'Schedule & Deadlines' },
    categories: { title: 'Course Categories', breadcrumb: 'Subjects & Modules' },
    reports: { title: 'Productivity Reports', breadcrumb: 'Study Analytics' },
    settings: { title: 'Settings', breadcrumb: 'Preferences' },
  };

  const currentMeta = tabTitles[currentTab] || { title: 'Dashboard', breadcrumb: 'Overview' };

  const notifications = [
    {
      id: 1,
      title: 'Database Systems assignment due today',
      description: 'Complete SQL query optimization by 23:59 tonight.',
      time: '35m ago',
      type: 'urgent',
    },
    {
      id: 2,
      title: 'UI/UX Design milestone reviewed',
      description: 'Elena Rostova posted feedback on your wireframe deck.',
      time: '2h ago',
      type: 'info',
    },
    {
      id: 3,
      title: 'Software Engineering quiz tomorrow',
      description: 'Quiz covers structural and behavioral design patterns.',
      time: '5h ago',
      type: 'reminder',
    },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-4 transition-colors">
      {/* Left: Mobile hamburger + Page Title & Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </motion.button>

        <div className="min-w-0">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
            <span>StudyFlow</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-500 font-medium">{currentMeta.breadcrumb}</span>
          </div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 truncate">
            {currentMeta.title}
          </h1>
        </div>
      </div>

      {/* Middle/Right: Search, Notifications, Primary Action, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Input */}
        <div className="relative hidden md:block w-52 lg:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks, courses..."
            className="w-full pl-9 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-blue-600 focus:bg-white text-slate-800 placeholder-slate-400 transition-colors"
          />
          {searchQuery && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </motion.button>
          )}
        </div>

        {onGoToLanding && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onGoToLanding}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 sm:py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-colors shrink-0"
            title="View Product Landing Page"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Landing Page</span>
          </motion.button>
        )}

        {/* Primary Action Button with Micro-Interaction */}
        <motion.button
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpenAddTask}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs hover:shadow-md transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Task</span>
          <span className="sm:hidden">Add</span>
        </motion.button>

        {/* Notification Bell with AnimatePresence Dropdown */}
        <div className="relative" ref={notifRef}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full" />
          </motion.button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute right-0 mt-2 w-80 sm:w-88 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="text-xs font-bold text-slate-800">Academic Alerts</span>
                  <span className="text-[11px] text-blue-600 hover:underline cursor-pointer">
                    Mark all read
                  </span>
                </div>
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <motion.div 
                      key={n.id} 
                      whileHover={{ x: 2 }}
                      className="p-2 rounded-lg bg-slate-50 hover:bg-blue-50/60 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-2">
                        {n.type === 'urgent' ? (
                          <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        ) : n.type === 'reminder' ? (
                          <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-800 leading-tight">
                            {n.title}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                            {n.description}
                          </p>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {n.time}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile Dropdown with AnimatePresence */}
        <div className="relative" ref={profileRef}>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-blue-500/20 transition-all"
            aria-label="User Profile Menu"
          >
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              referrerPolicy="no-referrer"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-slate-200"
            />
          </motion.button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50"
              >
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <p className="text-xs font-bold text-slate-800">{userProfile.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{userProfile.email}</p>
                  <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded mt-1 inline-block">
                    {userProfile.semester}
                  </span>
                </div>
                <motion.button
                  whileHover={{ x: 2 }}
                  onClick={() => {
                    onSelectTab('settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Profile Details</span>
                </motion.button>
                <motion.button
                  whileHover={{ x: 2 }}
                  onClick={() => {
                    onSelectTab('settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5 text-slate-400" />
                  <span>Planner Settings</span>
                </motion.button>
                <div className="border-t border-slate-100 my-1" />
                <motion.button
                  whileHover={{ x: 2 }}
                  onClick={() => {
                    setShowProfileMenu(false);
                    onLogoutClick();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

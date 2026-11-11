import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  CalendarDays, 
  FolderKanban, 
  BarChart3, 
  Settings, 
  LogOut, 
  X,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { NavigationTab, UserProfile } from '../../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  tasksCount: number;
  overdueCount: number;
  userProfile: UserProfile;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onLogoutClick: () => void;
  onGoToLanding?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  tasksCount,
  overdueCount,
  userProfile,
  isOpenMobile,
  onCloseMobile,
  onLogoutClick,
  onGoToLanding,
}) => {
  const navItems = [
    {
      id: 'overview' as NavigationTab,
      label: 'Overview',
      icon: LayoutDashboard,
    },
    {
      id: 'tasks' as NavigationTab,
      label: 'My Tasks',
      icon: CheckSquare,
      badge: tasksCount,
      alertBadge: overdueCount > 0 ? overdueCount : undefined,
    },
    {
      id: 'calendar' as NavigationTab,
      label: 'Calendar',
      icon: CalendarDays,
    },
    {
      id: 'categories' as NavigationTab,
      label: 'Categories',
      icon: FolderKanban,
    },
    {
      id: 'reports' as NavigationTab,
      label: 'Reports',
      icon: BarChart3,
    },
    {
      id: 'settings' as NavigationTab,
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop with AnimatePresence */}
      <AnimatePresence>
        {isOpenMobile && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 lg:hidden"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-250 ease-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-xl' : '-translate-x-full'
        }`}
        aria-label="Main Navigation"
      >
        {/* Brand / Logo with subtle floating motion on cap */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: -5 }}
              className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs"
            >
              <GraduationCap className="w-5 h-5" />
            </motion.div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900">StudyFlow</span>
              <span className="block text-[10px] font-medium tracking-wider uppercase text-slate-400 -mt-1">
                Student Planner
              </span>
            </div>
          </div>

          {/* Mobile close button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
            aria-label="Close mobile menu"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Navigation Links with Layout Transition */}
        <div className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Workspace
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`relative w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-blue-600 rounded-r"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}

                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.alertBadge ? (
                  <span className="text-xs px-1.5 py-0.5 rounded text-red-600 bg-red-50 font-mono font-medium">
                    {item.alertBadge} due
                  </span>
                ) : item.badge !== undefined ? (
                  <span className="text-xs px-2 py-0.5 rounded-md text-slate-500 bg-slate-100 font-mono font-medium">
                    {item.badge}
                  </span>
                ) : null}
              </motion.button>
            );
          })}

          {onGoToLanding && (
            <div className="pt-2">
              <motion.button
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onGoToLanding();
                  onCloseMobile();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-blue-600 bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200/50 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="truncate">Product Landing Page</span>
              </motion.button>
            </div>
          )}
        </div>

        {/* Academic Quick Glance */}
        <div className="px-4 py-3 mx-3 mb-3 bg-slate-50 border border-slate-100 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span>Semester Progress</span>
            <span className="font-mono font-semibold text-slate-700">62%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '62%' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-blue-600 rounded-full" 
            />
          </div>
          <p className="mt-2 text-[11px] text-slate-500">
            Fall 2026 · Week 10 of 16
          </p>
        </div>

        {/* User Profile at Bottom with hover micro-interaction */}
        <div className="p-3 border-t border-slate-100 bg-white">
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <motion.img
                whileHover={{ scale: 1.08 }}
                src={userProfile.avatarUrl}
                alt={userProfile.name}
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">
                  {userProfile.name}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {userProfile.role}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={onLogoutClick}
              title="Sign Out"
              aria-label="Sign Out"
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </aside>
    </>
  );
};

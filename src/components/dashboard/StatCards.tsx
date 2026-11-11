import React from 'react';
import { motion } from 'motion/react';
import { 
  ClipboardList, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { TaskStatistics } from '../../utils/taskUtils';
import { AnimatedCounter } from '../common/AnimatedCounter';

interface StatCardsProps {
  stats: TaskStatistics;
  onFilterClick?: (status: string) => void;
}

export const StatCards: React.FC<StatCardsProps> = ({ stats, onFilterClick }) => {
  const cards = [
    {
      id: 'total',
      label: 'Total Tasks',
      value: stats.total,
      icon: ClipboardList,
      iconBg: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
      trend: `${stats.completionRate}% completion`,
      trendType: 'neutral' as const,
      statusKey: 'All',
    },
    {
      id: 'completed',
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
      trend: `${Math.round((stats.completed / (stats.total || 1)) * 100)}% of goal`,
      trendType: 'positive' as const,
      statusKey: 'Completed',
    },
    {
      id: 'in-progress',
      label: 'In Progress',
      value: stats.inProgress,
      icon: Clock,
      iconBg: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white',
      trend: 'Active coursework',
      trendType: 'warning' as const,
      statusKey: 'In Progress',
    },
    {
      id: 'overdue',
      label: 'Overdue',
      value: stats.overdue,
      icon: AlertCircle,
      iconBg: 'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white',
      trend: stats.overdue > 0 ? 'Urgent attention' : 'All caught up',
      trendType: stats.overdue > 0 ? ('danger' as const) : ('positive' as const),
      statusKey: 'Overdue',
    },
  ];

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
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            variants={itemVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onFilterClick && onFilterClick(card.statusKey)}
            className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-shadow cursor-pointer group relative overflow-hidden"
          >
            {/* Subtle top accent highlight on hover */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {card.label}
              </span>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.iconBg} transition-colors duration-200`}>
                <Icon className="w-5 h-5 transition-transform group-hover:scale-110 duration-200" />
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                <AnimatedCounter value={card.value} />
              </span>
              
              <div className="flex items-center gap-1 text-xs">
                {card.trendType === 'positive' && (
                  <span className="text-emerald-700 font-medium">
                    {card.trend}
                  </span>
                )}
                {card.trendType === 'danger' && (
                  <span className="text-red-700 font-medium flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {card.trend}
                  </span>
                )}
                {card.trendType === 'warning' && (
                  <span className="text-amber-800 font-medium">
                    {card.trend}
                  </span>
                )}
                {card.trendType === 'neutral' && (
                  <span className="text-slate-500 font-medium flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-blue-600" />
                    {card.trend}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

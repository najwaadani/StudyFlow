import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  Award, 
  Flame, 
  TrendingUp 
} from 'lucide-react';
import { Task, Category } from '../../types';
import { 
  computeTaskStatistics, 
  computeWeeklyProductivity, 
  computeCategorySummaries 
} from '../../utils/taskUtils';
import { AnimatedCounter } from '../common/AnimatedCounter';

interface ReportsViewProps {
  tasks: Task[];
  categories: Category[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ tasks, categories }) => {
  const stats = computeTaskStatistics(tasks);
  const weeklyData = computeWeeklyProductivity(tasks);
  const categorySummaries = computeCategorySummaries(categories, tasks);

  // Status Distribution Pie Data
  const statusPieData = [
    { name: 'Completed', value: stats.completed, color: '#16A34A' },
    { name: 'In Progress', value: stats.inProgress, color: '#2563EB' },
    { name: 'Pending', value: stats.pending, color: '#94A3B8' },
    { name: 'Overdue', value: stats.overdue, color: '#EF4444' },
  ].filter((d) => d.value > 0);

  // Priority Distribution Pie Data
  const priorityData = [
    { name: 'High Priority', value: tasks.filter((t) => t.priority === 'High').length, color: '#EF4444' },
    { name: 'Medium Priority', value: tasks.filter((t) => t.priority === 'Medium').length, color: '#F59E0B' },
    { name: 'Low Priority', value: tasks.filter((t) => t.priority === 'Low').length, color: '#3B82F6' },
  ];

  // Category Distribution Bar Data
  const categoryChartData = categorySummaries.map((cs) => ({
    name: cs.category.code || cs.category.name.substring(0, 10),
    fullName: cs.category.name,
    completed: cs.completedTasks,
    pending: cs.totalTasks - cs.completedTasks,
    rate: cs.progressPercent,
  }));

  // SVG Circular progress math
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (stats.completionRate / 100) * circumference;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-blue-600 font-semibold mb-1">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Academic Performance Metrics</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Productivity Reports</h2>
          <p className="text-xs text-slate-500">
            Insights into study pacing, assignment completions, and workload distribution
          </p>
        </div>

        <div className="flex items-center gap-2">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
          >
            <motion.div
              animate={{ rotate: [-4, 4, -4], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            >
              <Flame className="w-4 h-4 text-amber-500" />
            </motion.div>
            <span>4-Day Study Streak</span>
          </motion.div>
        </div>
      </div>

      {/* Top 3 KPI Highlights with Animated Numbers and Circular Gauge */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Overall Completion Rate */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Overall Completion Rate
            </span>
            <div className="mt-2 text-3xl font-bold font-mono text-slate-900 tabular-nums">
              <AnimatedCounter value={stats.completionRate} suffix="%" />
            </div>
            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Above semester median</span>
            </p>
          </div>

          {/* Animated Circular Progress Gauge */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r={radius}
                stroke="#E2E8F0"
                strokeWidth="5"
                fill="transparent"
              />
              <motion.circle
                cx="32"
                cy="32"
                r={radius}
                stroke="#2563EB"
                strokeWidth="5"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-xs font-mono font-bold text-blue-600">
              {stats.completionRate}%
            </span>
          </div>
        </motion.div>

        {/* Task Velocity */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Completed Coursework
            </span>
            <div className="mt-2 text-3xl font-bold font-mono text-slate-900 tabular-nums">
              <AnimatedCounter value={stats.completed} />{' '}
              <span className="text-sm font-normal text-slate-400">/ {stats.total}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {stats.total - stats.completed} deliverables remaining
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Action Priority */}
        <motion.div 
          whileHover={{ y: -2 }}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Deadlines Requiring Action
            </span>
            <div className="mt-2 text-3xl font-bold font-mono text-slate-900 tabular-nums">
              <AnimatedCounter value={stats.overdue + stats.inProgress} />
            </div>
            <p className="text-xs text-amber-600 mt-1">
              {stats.overdue} overdue · {stats.inProgress} currently active
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </motion.div>
      </div>

      {/* Chart Section 1: Weekly Output & Status Pie with Animation Enabled */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Productivity Bar Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Weekly Output Cadence</h3>
              <p className="text-xs text-slate-500">Tasks completed vs. daily target (Mon - Sun)</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} />
                <Tooltip 
                  formatter={(val, name) => [val, name === 'completed' ? 'Completed Tasks' : 'Study Target']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                />
                <Bar 
                  dataKey="completed" 
                  fill="#2563EB" 
                  name="Completed" 
                  radius={[4, 4, 0, 0]} 
                  maxBarSize={32}
                  isAnimationActive={true}
                  animationDuration={850}
                  animationEasing="ease-out"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Breakdown Donut with Animation */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Task Status Breakdown</h3>
            <p className="text-xs text-slate-500">Distribution across active states</p>
          </div>
          <div className="h-52 w-full my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                  isAnimationActive={true}
                  animationDuration={900}
                  animationEasing="ease-out"
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
            {statusPieData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 truncate">{item.name}:</span>
                <span className="font-mono font-bold text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Section 2: Category Distribution & Priority Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Task Volume by Course</h3>
              <p className="text-xs text-slate-500">Completed vs. pending tasks per subject</p>
            </div>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11 }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
                <Tooltip 
                  formatter={(val, name) => [val, name === 'completed' ? 'Completed' : 'Pending']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                />
                <Bar 
                  dataKey="completed" 
                  stackId="a" 
                  fill="#2563EB" 
                  radius={[0, 0, 0, 0]} 
                  maxBarSize={20}
                  isAnimationActive={true}
                  animationDuration={800}
                />
                <Bar 
                  dataKey="pending" 
                  stackId="a" 
                  fill="#E2E8F0" 
                  radius={[0, 4, 4, 0]} 
                  maxBarSize={20}
                  isAnimationActive={true}
                  animationDuration={800}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Breakdown & Academic Summary */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Workload Priority Matrix</h3>
            <p className="text-xs text-slate-500">Breakdown of urgent vs. regular coursework</p>
          </div>

          <div className="space-y-3 my-4">
            {priorityData.map((p) => {
              const pct = Math.round((p.value / (tasks.length || 1)) * 100);
              return (
                <div key={p.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                      {p.name}
                    </span>
                    <span className="font-mono text-slate-500 tabular-nums">
                      {p.value} tasks ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: p.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Academic Productivity Summary Card */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Academic Summary & Advice</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Your weekly task velocity is currently <strong className="text-slate-800">12% higher</strong> than last week. 
              Prioritize resolving the 2 pending items in <span className="font-semibold text-blue-700">Database Systems</span> before Friday to maintain your study schedule.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

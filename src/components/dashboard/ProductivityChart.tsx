import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { DayProductivity } from '../../utils/taskUtils';

interface ProductivityChartProps {
  data: DayProductivity[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const completedVal = payload.find((p) => p.dataKey === 'completed')?.value || 0;
    const targetVal = payload.find((p) => p.dataKey === 'target')?.value || 0;

    return (
      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-md text-xs">
        <p className="font-semibold text-slate-800">{label}</p>
        <div className="mt-1.5 space-y-1">
          <p className="text-blue-600 flex items-center justify-between gap-4">
            <span>Completed Tasks:</span>
            <span className="font-mono font-bold tabular-nums">{completedVal}</span>
          </p>
          <p className="text-slate-500 flex items-center justify-between gap-4">
            <span>Daily Study Target:</span>
            <span className="font-mono tabular-nums">{targetVal}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const ProductivityChart: React.FC<ProductivityChartProps> = ({ data }) => {
  const totalWeeklyCompleted = data.reduce((sum, d) => sum + d.completed, 0);

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Weekly Study Productivity</h3>
          <p className="text-xs text-slate-500">
            Completed tasks from Monday through Sunday
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400">Total this week</span>
          <p className="text-sm font-bold font-mono text-blue-600 tabular-nums">
            {totalWeeklyCompleted} completed
          </p>
        </div>
      </div>

      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748B', fontSize: 12, fontFamily: 'inherit' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'inherit' }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="completed" 
              name="Completed" 
              fill="#2563EB" 
              radius={[4, 4, 0, 0]} 
              maxBarSize={36}
              isAnimationActive={true}
              animationDuration={850}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-sm bg-blue-600 inline-block" />
          <span>Completed Task Output</span>
        </div>
        <span className="font-mono text-slate-400">Peak day: Wednesday</span>
      </div>
    </div>
  );
};

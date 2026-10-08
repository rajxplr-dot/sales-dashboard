import React from 'react';

interface SummaryCardProps {
  title: string;
  value: string;
  growth?: number;
  growthLabel?: string;
  icon?: React.ReactNode;
  subtitle?: string;
  isHighlight?: boolean;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  growth,
  growthLabel = 'vs prev year',
  icon,
  subtitle,
  isHighlight = false,
}) => {
  const isPositive = growth !== undefined && growth >= 0;

  return (
    <div
      className={`relative overflow-hidden rounded-xl border p-6 transition-all duration-200 hover:shadow-md ${
        isHighlight
          ? 'bg-gradient-to-br from-blue-900 to-indigo-900 text-white border-transparent shadow-lg'
          : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            isHighlight ? 'text-blue-200' : 'text-slate-500'
          }`}
        >
          {title}
        </span>
        {icon && (
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
              isHighlight
                ? 'bg-white/10 text-white'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <div className="text-2xl font-bold tracking-tight sm:text-3xl">
          {value}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs">
        {growth !== undefined && (
          <span
            className={`inline-flex items-center rounded-md px-2 py-0.5 font-medium ${
              isHighlight
                ? isPositive
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-rose-500/20 text-rose-300'
                : isPositive
                  ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20'
                  : 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20'
            }`}
          >
            {isPositive ? '↑' : '↓'} {Math.abs(growth).toFixed(1)}%
          </span>
        )}
        {growthLabel && (
          <span
            className={`${
              isHighlight ? 'text-blue-200' : 'text-slate-500'
            }`}
          >
            {growthLabel}
          </span>
        )}
        {subtitle && !growthLabel && (
          <span
            className={`${
              isHighlight ? 'text-blue-200' : 'text-slate-500'
            }`}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

import React from 'react';

export interface SummaryCardProps {
  title: string;
  value: string;
  growth?: number;
  growthLabel?: string;
  trendDirection?: 'up' | 'down';
  trendSentiment?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  subtitle?: string;
  isHighlight?: boolean;
  badgeText?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  growth,
  growthLabel = 'vs previous period',
  trendDirection,
  trendSentiment = 'positive',
  icon,
  subtitle,
  isHighlight = false,
  badgeText,
}) => {
  // Determine if trend is considered positive
  const isUp = trendDirection ? trendDirection === 'up' : growth !== undefined && growth >= 0;
  const isPositiveSentiment = trendSentiment === 'positive';
  const isNegativeSentiment = trendSentiment === 'negative';

  const badgeStyle = isHighlight
    ? isPositiveSentiment
      ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/30'
      : isNegativeSentiment
        ? 'bg-rose-500/20 text-rose-300 ring-1 ring-rose-400/30'
        : 'bg-slate-500/20 text-slate-300'
    : isPositiveSentiment
      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20'
      : isNegativeSentiment
        ? 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20'
        : 'bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-500/20';

  return (
    <div
      className={`relative overflow-hidden rounded-xl border p-6 transition-all duration-200 hover:shadow-md ${
        isHighlight
          ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white border-indigo-800/40 shadow-lg'
          : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-bold uppercase tracking-wider ${
            isHighlight ? 'text-indigo-200' : 'text-slate-500'
          }`}
        >
          {title}
        </span>
        {icon && (
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${
              isHighlight
                ? 'bg-white/10 text-indigo-300 ring-1 ring-white/15'
                : 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100'
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

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        {growth !== undefined && (
          <span
            className={`inline-flex items-center rounded-md px-2 py-0.5 font-medium ${badgeStyle}`}
          >
            {isUp ? '↑' : '↓'} {Math.abs(growth).toFixed(1)}%
          </span>
        )}
        {badgeText && (
          <span
            className={`inline-flex items-center rounded-md px-2 py-0.5 font-medium ${badgeStyle}`}
          >
            {badgeText}
          </span>
        )}
        {growthLabel && (
          <span
            className={`${
              isHighlight ? 'text-indigo-200/80' : 'text-slate-500'
            }`}
          >
            {growthLabel}
          </span>
        )}
        {subtitle && !growthLabel && (
          <span
            className={`${
              isHighlight ? 'text-indigo-200/80' : 'text-slate-500'
            }`}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

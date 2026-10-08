import React from 'react';

export type ChartType = 'bar' | 'line';

interface ChartTypeSwitchProps {
  chartType: ChartType;
  onChartTypeChange: (type: ChartType) => void;
}

export const ChartTypeSwitch: React.FC<ChartTypeSwitchProps> = ({
  chartType,
  onChartTypeChange,
}) => {
  return (
    <div className="inline-flex rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
      <button
        onClick={() => onChartTypeChange('bar')}
        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
          chartType === 'bar'
            ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
        }`}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        Bar View
      </button>
      <button
        onClick={() => onChartTypeChange('line')}
        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
          chartType === 'line'
            ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
        }`}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18"
          />
        </svg>
        Line View
      </button>
    </div>
  );
};

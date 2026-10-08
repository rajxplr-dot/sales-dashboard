import React from 'react';

export type YearFilterOption = 'All' | '2022' | '2023' | '2024';

interface YearFilterProps {
  selectedYear: YearFilterOption;
  onYearChange: (year: YearFilterOption) => void;
}

const FILTER_OPTIONS: { label: string; value: YearFilterOption }[] = [
  { label: 'All Years (2022–2024)', value: 'All' },
  { label: '2022', value: '2022' },
  { label: '2023', value: '2023' },
  { label: '2024', value: '2024' },
];

export const YearFilter: React.FC<YearFilterProps> = ({
  selectedYear,
  onYearChange,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl bg-slate-100 p-1.5 dark:bg-slate-800">
      <span className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        Filter Period:
      </span>
      {FILTER_OPTIONS.map((option) => {
        const isActive = selectedYear === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onYearChange(option.value)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 ${
              isActive
                ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-900 dark:text-blue-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

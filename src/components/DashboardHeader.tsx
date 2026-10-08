import React from 'react';

interface DashboardHeaderProps {
  title?: string;
  description?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title = 'Sales Dashboard',
  description = 'Comprehensive multi-year sales analytics and performance tracking for 2022, 2023, and 2024.',
}) => {
  return (
    <header className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {title}
            </h1>
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/20">
              2022 - 2024
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            {description}
          </p>
        </div>
        <div className="mt-4 flex items-center gap-2 sm:mt-0">
          <span className="inline-flex items-center text-xs text-slate-400">
            Last Updated: Oct 2026
          </span>
        </div>
      </div>
    </header>
  );
};

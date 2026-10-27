import React from 'react';
import { RefreshIcon } from './icons';

export type DashboardTab = 'overview' | 'users' | 'rules' | 'health' | 'flags';

interface DashboardHeaderProps {
  title?: string;
  description?: string;
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title = 'Enterprise Compliance Admin Panel',
  description = 'Real-time regulatory compliance surveillance, rule enforcement, system telemetry, and governance console.',
  activeTab,
  onTabChange,
  onRefresh,
  isRefreshing = false,
}) => {
  const tabs: { id: DashboardTab; label: string; badge?: string }[] = [
    { id: 'overview', label: 'Executive Overview' },
    { id: 'users', label: 'User Management', badge: '8' },
    { id: 'rules', label: 'Compliance Rules', badge: '5' },
    { id: 'health', label: 'System Health & Logs', badge: 'Live' },
    { id: 'flags', label: 'Feature Flags', badge: 'Active' },
  ];

  return (
    <header className="mb-6 border-b border-slate-200 bg-white shadow-sm dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm shadow-sm">
                EP
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {title}
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Surveillance Active
              </span>
              <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                Mock Sandbox Mode
              </span>
            </div>
            <p className="mt-1.5 text-sm text-slate-500 sm:text-base max-w-3xl">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                disabled={isRefreshing}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                aria-label="Refresh telemetry and logs"
              >
                <RefreshIcon className={`h-4 w-4 text-slate-500 ${isRefreshing ? 'animate-spin text-indigo-600' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh Health'}
              </button>
            )}

            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-semibold text-slate-900">Task 3: Admin Console</span>
              <span className="text-[11px] text-slate-400">FINRA / SEC Regulatory Audit</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="mt-6 -mb-6 flex space-x-1 overflow-x-auto border-t border-slate-100 pt-2 no-scrollbar" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`group inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab.label}
                {tab.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

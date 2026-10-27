'use client';

import React, { useState, useMemo } from 'react';
import {
  SystemHealthMetrics,
  ActivityLogEntry,
  LogLevel,
  LogSubsystem,
} from '@/data/mockComplianceData';
import { ServerIcon, DatabaseIcon, ActivityPulseIcon, SearchIcon, FilterIcon } from './icons';
import { formatNumber } from '@/lib/utils';

interface SystemHealthMonitorProps {
  metrics: SystemHealthMetrics;
  logs: ActivityLogEntry[];
  onAddSimulatedLog?: () => void;
}

const LOG_LEVELS: ('All' | LogLevel)[] = ['All', 'Info', 'Warning', 'Error', 'Success'];
const SUBSYSTEMS: ('All' | LogSubsystem)[] = [
  'All',
  'RuleEngine',
  'PresidioMasker',
  'Auth',
  'Database',
  'IngestionAPI',
  'AuditTrail',
];

export const SystemHealthMonitor: React.FC<SystemHealthMonitorProps> = ({
  metrics,
  logs,
  onAddSimulatedLog,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<'All' | LogLevel>('All');
  const [selectedSubsystem, setSelectedSubsystem] = useState<'All' | LogSubsystem>('All');

  // Filter logs
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.traceId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLevel = selectedLevel === 'All' || log.level === selectedLevel;
      const matchesSubsystem =
        selectedSubsystem === 'All' || log.subsystem === selectedSubsystem;

      return matchesSearch && matchesLevel && matchesSubsystem;
    });
  }, [logs, searchQuery, selectedLevel, selectedSubsystem]);

  const getLevelBadge = (level: LogLevel) => {
    switch (level) {
      case 'Info':
        return 'bg-blue-50 text-blue-700 ring-blue-600/20';
      case 'Warning':
        return 'bg-amber-50 text-amber-700 ring-amber-600/20';
      case 'Error':
        return 'bg-rose-50 text-rose-700 ring-rose-600/20';
      case 'Success':
        return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Health Indicator Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1: API Latency */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              API Gateway Latency
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <ServerIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-slate-900">
              {metrics.apiLatencyMs}ms
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              {metrics.apiStatus}
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
            <span>p95: {metrics.apiLatencyP95Ms}ms</span>
            <span>Target: &lt; 100ms</span>
            <span>Nodes: {metrics.activeWorkerNodes} Online</span>
          </div>
        </div>

        {/* Card 2: Database Status */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Database Replica Cluster
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <DatabaseIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-slate-900">
              {metrics.databaseStatus}
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
              {metrics.databaseUptime}% Uptime
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
            <span>Replication Lag: {metrics.databaseReplicationLagMs}ms</span>
            <span>PostgreSQL HA Multi-AZ</span>
          </div>
        </div>

        {/* Card 3: Error Rate */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Pipeline Error Rate
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <ActivityPulseIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold tracking-tight text-slate-900">
              {metrics.errorRatePercent.toFixed(3)}%
            </div>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
              SLA Compliant
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
            <span>Threshold: &lt; {metrics.errorRateThresholdPercent}%</span>
            <span>Throughput: {formatNumber(metrics.throughputReqPerSec)} rps</span>
          </div>
        </div>
      </div>

      {/* 2. Filterable Activity Log */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">
                Surveillance Audit & Activity Stream
              </h3>
              <span className="rounded-md bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                {filteredLogs.length} Entries
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Immutable telemetry log records for compliance audit trails, pipeline exceptions, and security events
            </p>
          </div>

          {onAddSimulatedLog && (
            <button
              type="button"
              onClick={onAddSimulatedLog}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              + Simulate Event
            </button>
          )}
        </div>

        {/* Filters bar */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative min-w-[220px] flex-1">
            <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search activity logs (message, actor, trace ID)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Subsystem filter */}
          <div className="flex items-center gap-1.5">
            <FilterIcon className="h-4 w-4 text-slate-400" />
            <select
              value={selectedSubsystem}
              onChange={(e) => setSelectedSubsystem(e.target.value as any)}
              className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {SUBSYSTEMS.map((s) => (
                <option key={s} value={s}>
                  {s === 'All' ? 'All Subsystems' : s}
                </option>
              ))}
            </select>
          </div>

          {/* Level filter */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value as any)}
            className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {LOG_LEVELS.map((l) => (
              <option key={l} value={l}>
                {l === 'All' ? 'All Levels' : l}
              </option>
            ))}
          </select>

          {/* Clear button if filtered */}
          {(searchQuery || selectedLevel !== 'All' || selectedSubsystem !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLevel('All');
                setSelectedSubsystem('All');
              }}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Log Entries Container */}
        <div className="mt-4 max-h-[420px] overflow-y-auto rounded-xl border border-slate-200 divide-y divide-slate-100 bg-slate-50/40">
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 transition-colors hover:bg-white text-xs space-y-1"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] text-slate-400">
                      {log.timestamp}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold ring-1 ring-inset ${getLevelBadge(
                        log.level
                      )}`}
                    >
                      {log.level}
                    </span>
                    <span className="rounded bg-slate-200/70 px-1.5 py-0.5 font-mono text-[11px] text-slate-700">
                      {log.subsystem}
                    </span>
                    <span className="text-slate-500 font-medium">
                      by <strong className="text-slate-800">{log.actor}</strong>
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">
                    {log.traceId}
                  </span>
                </div>
                <p className="text-slate-700 font-medium leading-relaxed pl-1">
                  {log.message}
                </p>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">
              No activity logs matched your current search filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

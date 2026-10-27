'use client';

import React, { useState, useMemo } from 'react';
import { ComplianceRule, RuleSeverity } from '@/data/mockComplianceData';
import { SearchIcon, ScaleIcon } from './icons';
import { formatNumber } from '@/lib/utils';

interface ComplianceRuleManagerProps {
  rules: ComplianceRule[];
  onToggleRule: (ruleId: string) => void;
  onChangeSeverity: (ruleId: string, newSeverity: RuleSeverity) => void;
}

const SEVERITIES: RuleSeverity[] = ['Critical', 'High', 'Medium', 'Low'];

export const ComplianceRuleManager: React.FC<ComplianceRuleManagerProps> = ({
  rules,
  onToggleRule,
  onChangeSeverity,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(rules.map((r) => r.category)))];
  }, [rules]);

  const filteredRules = useMemo(() => {
    return rules.filter((rule) => {
      const matchesSearch =
        rule.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rule.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === 'All' || rule.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [rules, searchQuery, categoryFilter]);

  const activeCount = rules.filter((r) => r.active).length;
  const criticalCount = rules.filter((r) => r.severity === 'Critical').length;
  const totalViolationsCaught = rules.reduce((acc, r) => acc + r.violationCount, 0);

  const getSeverityBadgeClass = (severity: RuleSeverity) => {
    switch (severity) {
      case 'Critical':
        return 'bg-rose-50 text-rose-700 ring-rose-600/20';
      case 'High':
        return 'bg-orange-50 text-orange-700 ring-orange-600/20';
      case 'Medium':
        return 'bg-yellow-50 text-yellow-800 ring-yellow-600/20';
      case 'Low':
        return 'bg-blue-50 text-blue-700 ring-blue-600/20';
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">
              Compliance Rule Engine & Surveillance Policies
            </h2>
            <span className="rounded-md bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
              {activeCount} Active / {rules.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Configurable regulatory surveillance rules including FINRA-2210, SEC-17a-4, and DISC-09
          </p>
        </div>

        {/* Quick stat chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="rounded-lg bg-slate-50 px-3 py-1.5 border border-slate-200/80">
            <span className="text-slate-400">Enforcing:</span>{' '}
            <span className="font-bold text-emerald-600">{activeCount} Rules</span>
          </div>
          <div className="rounded-lg bg-slate-50 px-3 py-1.5 border border-slate-200/80">
            <span className="text-slate-400">Critical Tier:</span>{' '}
            <span className="font-bold text-rose-600">{criticalCount}</span>
          </div>
          <div className="rounded-lg bg-slate-50 px-3 py-1.5 border border-slate-200/80">
            <span className="text-slate-400">Total Flagged:</span>{' '}
            <span className="font-bold text-slate-900">{formatNumber(totalViolationsCaught)}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search rules by code (e.g. FINRA-2210, SEC-17a-4) or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mr-1">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                categoryFilter === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Rules List Grid */}
      <div className="mt-5 space-y-3.5">
        {filteredRules.map((rule) => {
          return (
            <div
              key={rule.id}
              className={`rounded-xl border p-4 transition-all duration-200 ${
                rule.active
                  ? 'border-slate-200 bg-white shadow-sm hover:border-indigo-200'
                  : 'border-slate-200/60 bg-slate-50/60 opacity-75'
              }`}
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                {/* Rule Info */}
                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {rule.code}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">
                      {rule.title}
                    </h3>
                    <span className="text-[11px] rounded bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
                      {rule.regulatoryBody}
                    </span>
                    <span className="text-[11px] rounded bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
                      {rule.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      [{rule.detectionMode}]
                    </span>
                  </div>

                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                    {rule.description}
                  </p>

                  <div className="mt-2.5 flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
                    <span>
                      Violations Triggered:{' '}
                      <strong className="text-slate-700">{formatNumber(rule.violationCount)}</strong>
                    </span>
                    <span>
                      Last Evaluated:{' '}
                      <strong className="text-slate-700">{rule.lastTriggered}</strong>
                    </span>
                  </div>
                </div>

                {/* Severity Editor & Active Toggle */}
                <div className="flex flex-wrap items-center gap-4 border-t border-slate-100 pt-3 lg:border-t-0 lg:pt-0 shrink-0">
                  {/* Severity selector */}
                  <div className="flex items-center gap-2">
                    <label htmlFor={`severity-${rule.id}`} className="text-xs font-semibold text-slate-500">
                      Severity:
                    </label>
                    <select
                      id={`severity-${rule.id}`}
                      value={rule.severity}
                      onChange={(e) => onChangeSeverity(rule.id, e.target.value as RuleSeverity)}
                      className={`rounded-lg border px-2.5 py-1 text-xs font-bold ring-1 ring-inset shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${getSeverityBadgeClass(rule.severity)}`}
                    >
                      {SEVERITIES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Active / Inactive switch */}
                  <div className="flex items-center gap-2.5">
                    <span className={`text-xs font-semibold ${rule.active ? 'text-emerald-700' : 'text-slate-400'}`}>
                      {rule.active ? 'Enforcing' : 'Disabled'}
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={rule.active}
                      onClick={() => onToggleRule(rule.id)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        rule.active ? 'bg-indigo-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          rule.active ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredRules.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
            No compliance rules matched your filter criteria.
          </div>
        )}
      </div>
    </div>
  );
};

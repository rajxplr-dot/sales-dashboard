'use client';

import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { RuleViolationBreakdown } from '@/data/mockComplianceData';
import { formatNumber } from '@/lib/utils';

interface ViolationDistributionChartProps {
  data: RuleViolationBreakdown[];
}

const SEVERITY_COLORS: Record<string, string> = {
  Critical: '#E11D48', // rose-600
  High: '#F97316',     // orange-500
  Medium: '#EAB308',   // yellow-500
  Low: '#3B82F6',      // blue-500
};

const PIE_COLORS = ['#E11D48', '#F97316', '#EAB308', '#6366F1', '#06B6D4'];

export const ViolationDistributionChart: React.FC<ViolationDistributionChartProps> = ({ data }) => {
  const [viewType, setViewType] = useState<'donut' | 'bar'>('donut');

  const totalViolations = data.reduce((acc, curr) => acc + curr.violations, 0);

  const chartData = data.map((item) => ({
    name: item.ruleId.replace('rule-', '').toUpperCase(),
    fullName: item.ruleName,
    violations: item.violations,
    percentage: item.percentage,
    severity: item.severity,
  }));

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">
              Rule Violation Distribution
            </h2>
            <span className="rounded-md bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-700">
              {formatNumber(totalViolations)} Total
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Breakdown across FINRA-2210, SEC-17a-4, DISC-09, and data privacy policies
          </p>
        </div>

        {/* View toggle */}
        <div className="inline-flex rounded-lg bg-slate-100 p-1 text-xs">
          <button
            onClick={() => setViewType('donut')}
            className={`rounded-md px-2.5 py-1 font-semibold transition ${
              viewType === 'donut'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Donut View
          </button>
          <button
            onClick={() => setViewType('bar')}
            className={`rounded-md px-2.5 py-1 font-semibold transition ${
              viewType === 'bar'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Bar View
          </button>
        </div>
      </div>

      <div className="h-[340px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          {viewType === 'donut' ? (
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="48%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={4}
                dataKey="violations"
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any, name: any, entry: any) => [
                  `${formatNumber(Number(value || 0))} violations (${entry?.payload?.percentage ?? 0}%)`,
                  entry?.payload?.fullName ?? name,
                ]}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px',
                }}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }}
              />
            </PieChart>
          ) : (
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
              <XAxis
                type="number"
                tick={{ fill: '#64748B', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
                axisLine={{ stroke: '#CBD5E1' }}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: any, _name: any, entry: any) => [
                  `${formatNumber(Number(value || 0))} violations (${entry?.payload?.percentage ?? 0}%)`,
                  entry?.payload?.fullName,
                ]}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px',
                }}
              />
              <Bar
                dataKey="violations"
                name="Violations Count"
                radius={[0, 4, 4, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`bar-cell-${index}`}
                    fill={SEVERITY_COLORS[entry.severity] || '#6366F1'}
                  />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Severity Legend pill badges */}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3 border-t border-slate-100 pt-3 text-xs">
        <span className="text-slate-400 font-medium">Severity Tiers:</span>
        <span className="inline-flex items-center gap-1.5 text-rose-700 font-semibold">
          <span className="h-2 w-2 rounded-full bg-rose-600"></span> Critical
        </span>
        <span className="inline-flex items-center gap-1.5 text-orange-700 font-semibold">
          <span className="h-2 w-2 rounded-full bg-orange-500"></span> High
        </span>
        <span className="inline-flex items-center gap-1.5 text-yellow-700 font-semibold">
          <span className="h-2 w-2 rounded-full bg-yellow-500"></span> Medium
        </span>
        <span className="inline-flex items-center gap-1.5 text-blue-700 font-semibold">
          <span className="h-2 w-2 rounded-full bg-blue-500"></span> Low
        </span>
      </div>
    </div>
  );
};

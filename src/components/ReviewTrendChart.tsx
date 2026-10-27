'use client';

import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ReviewTrendPoint } from '@/data/mockComplianceData';
import { formatNumber } from '@/lib/utils';

interface ReviewTrendChartProps {
  data: ReviewTrendPoint[];
}

export const ReviewTrendChart: React.FC<ReviewTrendChartProps> = ({ data }) => {
  const [chartMode, setChartMode] = useState<'area' | 'bar'>('area');
  const [filterMetric, setFilterMetric] = useState<'all' | 'violationsOnly'>('all');

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">
              Document Review & Compliance Trajectory
            </h2>
            <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
              Daily Run Rate
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Surveillance throughput tracking compliant filings vs flagged violations
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Metric toggle */}
          <div className="inline-flex rounded-lg bg-slate-100 p-1 text-xs">
            <button
              onClick={() => setFilterMetric('all')}
              className={`rounded-md px-2.5 py-1 font-semibold transition ${
                filterMetric === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              All Documents
            </button>
            <button
              onClick={() => setFilterMetric('violationsOnly')}
              className={`rounded-md px-2.5 py-1 font-semibold transition ${
                filterMetric === 'violationsOnly'
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Violations Only
            </button>
          </div>

          {/* Chart mode toggle */}
          <div className="inline-flex rounded-lg bg-slate-100 p-1 text-xs">
            <button
              onClick={() => setChartMode('area')}
              className={`rounded-md px-2.5 py-1 font-semibold transition ${
                chartMode === 'area'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Area View
            </button>
            <button
              onClick={() => setChartMode('bar')}
              className={`rounded-md px-2.5 py-1 font-semibold transition ${
                chartMode === 'bar'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Bar View
            </button>
          </div>
        </div>
      </div>

      <div className="h-[340px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          {chartMode === 'area' ? (
            <AreaChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
              <defs>
                <linearGradient id="colorCompliant" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorViolations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E11D48" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#E11D48" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis
                dataKey="date"
                tick={{ fill: '#64748B', fontSize: 12 }}
                axisLine={{ stroke: '#CBD5E1' }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(val) => (val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val)}
                tick={{ fill: '#64748B', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: any, name: any) => [
                  formatNumber(Number(value || 0)),
                  name === 'compliant'
                    ? 'Compliant Docs'
                    : name === 'violations'
                      ? 'Flagged Violations'
                      : 'Total Reviewed',
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
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: '16px', fontSize: '12px' }}
              />

              {filterMetric === 'all' && (
                <Area
                  type="monotone"
                  dataKey="compliant"
                  name="Compliant Docs"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCompliant)"
                />
              )}

              <Area
                type="monotone"
                dataKey="violations"
                name="Flagged Violations"
                stroke="#E11D48"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorViolations)"
              />
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis
                dataKey="date"
                tick={{ fill: '#64748B', fontSize: 12 }}
                axisLine={{ stroke: '#CBD5E1' }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(val) => (val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val)}
                tick={{ fill: '#64748B', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: any, name: any) => [
                  formatNumber(Number(value || 0)),
                  name === 'compliant'
                    ? 'Compliant Docs'
                    : name === 'violations'
                      ? 'Flagged Violations'
                      : 'Reviewed',
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
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: '16px', fontSize: '12px' }}
              />

              {filterMetric === 'all' && (
                <Bar
                  dataKey="compliant"
                  name="Compliant Docs"
                  fill="#4F46E5"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
              )}

              <Bar
                dataKey="violations"
                name="Flagged Violations"
                fill="#E11D48"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

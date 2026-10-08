'use client';

import React, { useState, useMemo } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { SummaryCard } from '@/components/SummaryCard';
import { YearFilter, YearFilterOption } from '@/components/YearFilter';
import { ChartTypeSwitch, ChartType } from '@/components/ChartTypeSwitch';
import { SalesBarChart } from '@/components/SalesBarChart';
import { SalesLineChart } from '@/components/SalesLineChart';
import { CategoryChart } from '@/components/CategoryChart';
import { getYearTotals, getFilteredSalesData } from '@/data/sales';
import { formatCurrency } from '@/lib/utils';

export default function DashboardPage() {
  const [selectedYear, setSelectedYear] = useState<YearFilterOption>('All');
  const [chartType, setChartType] = useState<ChartType>('bar');

  const {
    total2022,
    total2023,
    total2024,
    overallTotal,
    growth2023,
    growth2024,
  } = useMemo(() => getYearTotals(), []);

  const filteredData = useMemo(
    () => getFilteredSalesData(selectedYear),
    [selectedYear]
  );

  // Dynamic summary calculations based on filter
  const currentDisplayedTotal = useMemo(() => {
    if (selectedYear === '2022') return total2022;
    if (selectedYear === '2023') return total2023;
    if (selectedYear === '2024') return total2024;
    return overallTotal;
  }, [selectedYear, total2022, total2023, total2024, overallTotal]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Dashboard Header */}
        <DashboardHeader />

        {/* Filters and Controls */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <YearFilter
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          />
          <ChartTypeSwitch
            chartType={chartType}
            onChartTypeChange={setChartType}
          />
        </div>

        {/* Summary Cards Grid */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            title="2022 Total Sales"
            value={formatCurrency(total2022)}
            subtitle="Baseline year performance"
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          />

          <SummaryCard
            title="2023 Total Sales"
            value={formatCurrency(total2023)}
            growth={growth2023}
            growthLabel="vs 2022"
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
          />

          <SummaryCard
            title="2024 Total Sales"
            value={formatCurrency(total2024)}
            growth={growth2024}
            growthLabel="vs 2023"
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />

          <SummaryCard
            title={selectedYear === 'All' ? '3-Year Total Sales' : `${selectedYear} Selected Total`}
            value={formatCurrency(currentDisplayedTotal)}
            isHighlight={true}
            subtitle={selectedYear === 'All' ? 'Cumulative 2022-2024 Revenue' : `Filtered view for ${selectedYear}`}
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Sales Trend Chart (2 columns wide on desktop) */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Sales Performance Trend
                </h2>
                <p className="text-xs text-slate-500">
                  {selectedYear === 'All'
                    ? 'Comparing monthly trajectory across 2022, 2023, and 2024'
                    : `Monthly sales revenue breakdown for ${selectedYear}`}
                </p>
              </div>
              <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                {chartType === 'bar' ? 'Bar View' : 'Line View'}
              </span>
            </div>

            {chartType === 'bar' ? (
              <SalesBarChart data={filteredData} selectedYear={selectedYear} />
            ) : (
              <SalesLineChart data={filteredData} selectedYear={selectedYear} />
            )}
          </div>

          {/* Category Revenue Share (1 column on desktop) */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900">
                Category Revenue Share
              </h2>
              <p className="text-xs text-slate-500">
                Product distribution for {selectedYear === 'All' ? '2022-2024' : selectedYear}
              </p>
            </div>

            <CategoryChart selectedYear={selectedYear} />
          </div>
        </div>

        {/* Key Takeaways & Highlights Section */}
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Executive Summary & Insights
          </h3>
          <div className="mt-3 grid grid-cols-1 gap-4 text-xs text-slate-600 sm:grid-cols-3">
            <div className="rounded-lg bg-slate-50 p-3">
              <span className="font-semibold text-slate-800">Consistent Growth:</span>
              <p className="mt-1">
                Sales expanded by {growth2023.toFixed(1)}% in 2023 and accelerated further by {growth2024.toFixed(1)}% in 2024, demonstrating strong market demand.
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <span className="font-semibold text-slate-800">Q4 Peak Seasonality:</span>
              <p className="mt-1">
                November and December consistently generate the highest monthly volume across all 3 years, driven by Q4 holiday promotions.
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <span className="font-semibold text-slate-800">Top Revenue Driver:</span>
              <p className="mt-1">
                Electronics remains the primary revenue driver, contributing the largest share of annual income across 2022–2024.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

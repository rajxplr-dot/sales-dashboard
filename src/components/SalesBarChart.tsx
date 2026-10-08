'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '@/lib/utils';
import { MonthlySales } from '@/data/sales';

interface SalesBarChartProps {
  data: (MonthlySales | { month: string; sales: number })[];
  selectedYear: string;
}

export const SalesBarChart: React.FC<SalesBarChartProps> = ({
  data,
  selectedYear,
}) => {
  const isSingleYear = selectedYear !== 'All';

  return (
    <div className="h-[380px] w-full pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 20, bottom: 25 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis
            dataKey="month"
            tick={{ fill: '#64748B', fontSize: 12 }}
            axisLine={{ stroke: '#CBD5E1' }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(val) => `$${val / 1000}k`}
            tick={{ fill: '#64748B', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: any) => [
              formatCurrency(Number(value || 0)),
              'Sales',
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
            wrapperStyle={{ paddingBottom: '20px', fontSize: '12px' }}
          />

          {isSingleYear ? (
            <Bar
              dataKey="sales"
              name={`${selectedYear} Sales`}
              fill="#2563EB"
              radius={[4, 4, 0, 0]}
              maxBarSize={45}
            />
          ) : (
            <>
              <Bar
                dataKey="sales2022"
                name="2022 Sales"
                fill="#94A3B8"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="sales2023"
                name="2023 Sales"
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="sales2024"
                name="2024 Sales"
                fill="#1D4ED8"
                radius={[4, 4, 0, 0]}
              />
            </>
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

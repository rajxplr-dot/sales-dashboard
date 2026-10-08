'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { CATEGORY_SALES_DATA } from '@/data/sales';
import { formatCurrency } from '@/lib/utils';

interface CategoryChartProps {
  selectedYear: string;
}

const COLORS = ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'];

export const CategoryChart: React.FC<CategoryChartProps> = ({
  selectedYear,
}) => {
  const chartData = CATEGORY_SALES_DATA.map((item) => {
    let sales = item.sales2024;
    if (selectedYear === '2022') sales = item.sales2022;
    if (selectedYear === '2023') sales = item.sales2023;
    if (selectedYear === 'All') sales = item.sales2022 + item.sales2023 + item.sales2024;

    return {
      name: item.category,
      value: sales,
    };
  });

  return (
    <div className="h-[320px] w-full pt-2">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: any) => [
              formatCurrency(Number(value || 0)),
              'Revenue',
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
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

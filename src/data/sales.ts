export interface MonthlySales {
  month: string;
  sales2022: number;
  sales2023: number;
  sales2024: number;
  [key: string]: string | number;
}

export interface YearSummary {
  year: number;
  totalSales: number;
  growthRate: number; // percentage change vs previous year
  targetSales: number;
  topCategory: string;
}

export interface CategorySales {
  category: string;
  sales2022: number;
  sales2023: number;
  sales2024: number;
}

/**
 * Data Source Disclosure:
 * Synthetic realistic retail sales dataset modeled after standard e-commerce annual revenue trends,
 * seasonality (e.g., Q4 holiday peaks in Nov/Dec), and multi-year trajectory (2022 - 2024).
 */

export const MONTHLY_SALES_DATA: MonthlySales[] = [
  { month: 'Jan', sales2022: 45000, sales2023: 52000, sales2024: 64000 },
  { month: 'Feb', sales2022: 42000, sales2023: 49000, sales2024: 61000 },
  { month: 'Mar', sales2022: 58000, sales2023: 65000, sales2024: 78000 },
  { month: 'Apr', sales2022: 51000, sales2023: 61000, sales2024: 74000 },
  { month: 'May', sales2022: 63000, sales2023: 72000, sales2024: 85000 },
  { month: 'Jun', sales2022: 69000, sales2023: 79000, sales2024: 92000 },
  { month: 'Jul', sales2022: 67000, sales2023: 76000, sales2024: 89000 },
  { month: 'Aug', sales2022: 71000, sales2023: 84000, sales2024: 96000 },
  { month: 'Sep', sales2022: 75000, sales2023: 88000, sales2024: 102000 },
  { month: 'Oct', sales2022: 82000, sales2023: 95000, sales2024: 115000 },
  { month: 'Nov', sales2022: 98000, sales2023: 118000, sales2024: 138000 },
  { month: 'Dec', sales2022: 112000, sales2023: 132000, sales2024: 156000 },
];

export const CATEGORY_SALES_DATA: CategorySales[] = [
  { category: 'Electronics', sales2022: 320000, sales2023: 385000, sales2024: 460000 },
  { category: 'Apparel', sales2022: 210000, sales2023: 240000, sales2024: 285000 },
  { category: 'Home & Kitchen', sales2022: 165000, sales2023: 192000, sales2024: 235000 },
  { category: 'Beauty & Care', sales2022: 108000, sales2023: 134000, sales2024: 170000 },
  { category: 'Sports & Outdoors', sales2022: 30000, sales2023: 20000, sales2024: 90000 },
];

export function getYearTotals() {
  const total2022 = MONTHLY_SALES_DATA.reduce((acc, curr) => acc + curr.sales2022, 0);
  const total2023 = MONTHLY_SALES_DATA.reduce((acc, curr) => acc + curr.sales2023, 0);
  const total2024 = MONTHLY_SALES_DATA.reduce((acc, curr) => acc + curr.sales2024, 0);
  const overallTotal = total2022 + total2023 + total2024;

  const growth2023 = ((total2023 - total2022) / total2022) * 100;
  const growth2024 = ((total2024 - total2023) / total2023) * 100;

  return {
    total2022,
    total2023,
    total2024,
    overallTotal,
    growth2023,
    growth2024,
  };
}

export function getFilteredSalesData(selectedYear: string) {
  if (selectedYear === '2022') {
    return MONTHLY_SALES_DATA.map((item) => ({
      month: item.month,
      sales: item.sales2022,
    }));
  }
  if (selectedYear === '2023') {
    return MONTHLY_SALES_DATA.map((item) => ({
      month: item.month,
      sales: item.sales2023,
    }));
  }
  if (selectedYear === '2024') {
    return MONTHLY_SALES_DATA.map((item) => ({
      month: item.month,
      sales: item.sales2024,
    }));
  }
  
  // 'All' - return comparative monthly data
  return MONTHLY_SALES_DATA;
}

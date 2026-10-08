# Sales Analytics Dashboard (2022 – 2024)

A clean, modern, and high-performance sales analytics dashboard built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Recharts**. This project was created as an internship assessment project showcasing atomic component architecture, multi-year sales data visualization, dynamic filtering, chart switching, and responsive design.

---

## 🚀 Live Demo & Preview

- **Dashboard Route:** `/dashboard`
- **Supported Years:** 2022, 2023, 2024
- **Deploy Target:** Vercel

---

## ✨ Features

- **Executive Overview Cards:** Summary metrics for 2022 Sales, 2023 Sales, 2024 Sales, and Cumulative/Filtered Total Sales with Year-over-Year (YoY) growth percentage badges.
- **Interactive Multi-Year Filtering:** Filter dataset dynamically by *All Years*, *2022*, *2023*, or *2024*. Summary metrics and chart visualizations update seamlessly.
- **Chart Type Toggle:** Switch effortlessly between **Bar Chart View** and **Line Chart View** for trend and distribution analysis.
- **Product Category Revenue Share:** Donut chart breakdown of revenue by product categories (Electronics, Apparel, Home & Kitchen, Beauty & Care, Sports & Outdoors).
- **Atomic & Reusable Component Architecture:** Modular design with strict separation of data, utilities, and UI components.
- **Responsive & Accessible UI/UX:** Mobile-first layout, clean typography, rounded card design, crisp contrast, and subtle hover interactions.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Charts Library:** [Recharts](https://recharts.org/)
- **Icons & Fonts:** Inter (via `next/font/google`), Inline SVGs

---

## 📁 Project Structure

```
sales-dashboard/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx         # Main Dashboard route (/dashboard)
│   │   ├── globals.css          # Global CSS & Tailwind directives
│   │   ├── layout.tsx           # Root layout with Inter font & metadata
│   │   └── page.tsx             # Root page (redirects to /dashboard)
│   ├── components/
│   │   ├── CategoryChart.tsx    # Category breakdown donut chart
│   │   ├── ChartTypeSwitch.tsx  # Toggle component for Bar/Line views
│   │   ├── DashboardHeader.tsx  # Header with title, badge & description
│   │   ├── SalesBarChart.tsx    # Reusable Recharts Bar Chart
│   │   ├── SalesLineChart.tsx   # Reusable Recharts Line Chart
│   │   ├── SummaryCard.tsx      # Reusable KPI summary card with growth badges
│   │   └── YearFilter.tsx       # Filter tabs (All, 2022, 2023, 2024)
│   ├── data/
│   │   └── sales.ts             # Sales data store & helper functions
│   └── lib/
│       └── utils.ts             # Formatting & mathematical helper utilities
├── public/                      # Static assets
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Project dependencies & scripts
```

---

## 📊 Data Source Disclosure

> **Honesty & Transparency Note:**
> This dashboard uses a clearly documented synthetic dataset structured specifically for multi-year enterprise e-commerce analytics. It reflects realistic retail sales patterns, including Q4 holiday peaks (November–December seasonality), steady Year-over-Year revenue expansion from 2022 to 2024, and product category distribution.

---

## 💻 Getting Started Locally

### Prerequisites

- **Node.js**: `v18.17.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sales-dashboard.git
   cd sales-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000/dashboard
   ```

---

## 🏗️ Production Build & Verification

To verify that the application compiles without TypeScript or build errors:

```bash
npm run build
```

To run the production build locally:

```bash
npm start
```

---

## 🚀 Deployment to Vercel

### Option 1: Via Vercel Web Dashboard (Recommended)

1. Push your repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import your `sales-dashboard` repository.
4. Keep the framework preset as **Next.js**.
5. Click **Deploy**.

### Option 2: Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

---

## 🔮 Future Improvements

- [ ] Add CSV/PDF export capability for executive reporting.
- [ ] Connect to live REST/GraphQL APIs or PostgreSQL/BigQuery databases.
- [ ] Add dark mode toggle support.
- [ ] Add region/country geographic filter dropdown.

---

## 📄 License

MIT License - free to use for assessment and learning purposes.

# Task 3: Enterprise Compliance Admin Panel

An enterprise-grade regulatory compliance surveillance console and administration panel built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Recharts**.

This platform was developed as **Task 3: Enterprise Admin Panel** for the Frontend Engineering Platform assessment, showcasing clean component-driven architecture, responsive data tables with pagination and sorting, interactive compliance telemetry charts, granular role-based access control (RBAC), configurable regulatory rule management, and runtime feature flags.

---

## 🚀 Live Demo & Route Information

- **Dashboard Route:** `/dashboard` (Root `/` automatically redirects to `/dashboard`)
- **Framework:** Next.js 15 (React 19, Server & Client Components)
- **Deployment Target:** Vercel

---

## 📋 Core Features Implemented

### 1. Executive Metrics Cards
- **Total Documents Reviewed:** 148,920 documents (+14.2% MoM growth) with 100% surveillance coverage.
- **Compliance Violations Flagged:** 1,428 violations (-8.6% favorable violation decrease).
- **Regulatory Pass Rate:** 99.04% (+0.42% above the internal risk benchmark).
- **Average Review Time:** 1.42s (-0.38s latency improvement per document).

### 2. Interactive Compliance Telemetry Charts (Recharts)
- **Review Trend Trajectory:** Area and Bar chart views comparing compliant filings against flagged violations over time, with metric filtering (*All Documents* vs *Violations Only*).
- **Rule Violation Distribution:** Donut and Horizontal Bar views breaking down violations across regulatory policies (`FINRA-2210`, `SEC-17a-4`, `DISC-09`, `GDPR-ART-32`, `AML-KYC-04`) with color-coded severity tiers.

### 3. Searchable User Management Table & RBAC Modal
- **Real-time Filter & Search:** Instant keyword search across user names, emails, roles, and departments.
- **Status Badges:** Strict visual states for `Active` (emerald), `Pending` (amber), and `Suspended` (rose).
- **Sorting & Pagination:** Configurable 5 or 10 users per page, next/previous and direct page jumping, with two-way column sorting (Name, Role, Department, Status, Documents Reviewed, Last Active).
- **Role & Permission Modal:** Accessible dialog (keyboard `ESC` dismiss, backdrop click) allowing administrators to modify governance roles (`System Administrator`, `Compliance Officer`, `Senior Auditor`, `Risk Analyst`, `Junior Reviewer`) and toggle granular permissions:
  - `Manage Compliance Rules`
  - `Approve Violation Overrides`
  - `View Unmasked Presidio PII`
  - `Export Regulatory Audit Logs`
  - `Toggle Feature Flags`

### 4. Compliance Rule Manager
- **Configured Rules:**
  - `FINRA-2210`: Communications with the Public & Promissory Claims (Semantic ML).
  - `SEC-17a-4`: Electronic Books & Records Preservation (WORM compliance, Hybrid LLM).
  - `DISC-09`: Mandatory Risk & Conflict of Interest Disclosures (Deterministic Regex).
  - `GDPR-ART-32`: Security of Processing & PII De-identification.
  - `AML-KYC-04`: High-Risk Jurisdiction & OFAC Sanctioned Entity Filter.
- **Severity Editing:** Inline dropdown selector for `Critical`, `High`, `Medium`, and `Low` with dynamic color styling.
- **Active / Inactive Enforcement Toggles:** Accessible toggle switches with immediate local state updates, active rule counts, and toast notifications.

### 5. System Health Indicators & Activity Log
- **System Telemetry:**
  - **API Latency:** 38ms (p95: 64ms) — Optimal (&lt; 100ms SLA).
  - **Database Status:** Connected (Primary PostgreSQL HA Multi-AZ cluster, 99.99% uptime, 0ms replication lag).
  - **Pipeline Error Rate:** 0.012% (&lt; 0.05% SLA threshold) with 1,450 rps throughput.
- **Filterable Mock Activity Stream:**
  - Search by message, actor, or trace ID.
  - Filter by Subsystem (`RuleEngine`, `PresidioMasker`, `Auth`, `Database`, `IngestionAPI`, `AuditTrail`).
  - Filter by Level (`Info`, `Warning`, `Error`, `Success`).
  - **Interactive Simulator:** "+ Simulate Event" button that generates real-time telemetry log entries.

### 6. Feature Flag Switches
- **AI Substring Validation:** Contextual semantic checks on flagged phrases using fine-tuned embeddings.
- **Presidio PII Masking:** Automated Microsoft Presidio scrubbing of SSN, IBAN, bank credentials, and customer contact data.
- **Precedent Lookup:** Vector similarity search against 12,000+ historical FINRA/SEC enforcement actions.
- **Visible Pipeline Impact:** Real-time state indicators reflecting pipeline latency, PII scrubbing security level, and precedent DB connectivity.
- **Toast Notifications:** Dynamic feedback confirming state changes whenever a flag is toggled.

---

## 🛡️ Mock Data & Simulated State Disclosure

> **Honesty & Transparency Note:**
> This application operates entirely on **functional local state and realistic synthetic mock data**. It does not connect to live production databases, SEC Edgar, or external FINRA APIs. All compliance rules, user profiles, telemetry logs, and metrics are modeled after real-world financial services compliance architecture for demonstration and assessment purposes.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js 15.1.0 (React 19)
- **Language:** TypeScript 5.7 (Strict mode enabled)
- **Styling:** Tailwind CSS 3.4 + PostCSS + Autoprefixer
- **Visualizations:** Recharts 2.15
- **Icons:** Zero-dependency inline accessible SVGs
- **Typography:** Inter (via `next/font/google`)

---

## 📁 Project Structure

```
sales-dashboard/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx               # Master Enterprise Admin Panel route
│   │   ├── globals.css                # Tailwind directives & CSS variables
│   │   ├── layout.tsx                 # Root layout with Inter font & metadata
│   │   └── page.tsx                   # Root redirect to /dashboard
│   ├── components/
│   │   ├── icons.tsx                  # Accessible SVG icon primitives
│   │   ├── DashboardHeader.tsx        # Top enterprise header with navigation tabs
│   │   ├── SummaryCard.tsx            # Executive KPI card with sentiments & trends
│   │   ├── ReviewTrendChart.tsx       # Recharts Area/Bar review trend chart
│   │   ├── ViolationDistributionChart.tsx # Recharts Donut/Bar rule distribution chart
│   │   ├── UserManagementTable.tsx    # Searchable, sortable, paginated user table
│   │   ├── UserEditModal.tsx          # Accessible role & permission editor modal
│   │   ├── ComplianceRuleManager.tsx  # FINRA/SEC rule manager with severity editor
│   │   ├── SystemHealthMonitor.tsx    # Telemetry indicators & filterable activity log
│   │   ├── FeatureFlagsManager.tsx    # Feature flag toggles with pipeline impact
│   │   └── ToastNotification.tsx      # Feedback toast notifications
│   ├── data/
│   │   └── mockComplianceData.ts      # Strictly typed enterprise compliance mock data
│   └── lib/
│       └── utils.ts                   # Formatting helpers (numbers, latency, duration, percentages)
├── public/                            # Static assets
├── next.config.js                     # Next.js configuration
├── tailwind.config.js                 # Tailwind CSS configuration
├── tsconfig.json                      # Strict TypeScript configuration
└── package.json                       # Project dependencies
```

---

## 💻 Local Development Setup

### 1. Prerequisites
- **Node.js:** v18.17.0+ or v20+
- **npm:** v9.0.0+

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/sales-dashboard.git
cd sales-dashboard

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3000/dashboard`) in your browser.

---

## 🏗️ Production Build & Verification

To verify that the application compiles without any TypeScript, ESLint, or bundle errors:

```bash
npm run build
```

To run the optimized production build locally:

```bash
npm run start
```

---

## 🚀 How to Update GitHub & Deploy to Vercel

### Step 1: Commit and Push Changes to GitHub
Run the following commands in the project directory:

```bash
# Check modified and newly added files
git status

# Stage all files
git add .

# Create a clear commit message
git commit -m "feat: transform into Task 3 Enterprise Compliance Admin Panel with full mock state"

# Push to your main branch
git push origin main
```

### Step 2: Redeploy on Vercel
1. Log into your [Vercel Dashboard](https://vercel.com).
2. If the project is already linked to your GitHub repository, Vercel will **automatically trigger a new deployment** upon receiving the `git push`.
3. If setting up a new Vercel project:
   - Click **Add New** → **Project**.
   - Select your GitHub repository.
   - Vercel automatically detects Next.js with default build settings (`npm run build`, output `.next`).
   - Click **Deploy**.
4. Once deployed, verify that `/dashboard` renders cleanly with all tabs, charts, and interactive controls functioning.

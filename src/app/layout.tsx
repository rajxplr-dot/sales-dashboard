import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Enterprise Compliance Admin Panel | Regulatory Intelligence",
  description:
    "Task 3: Production-grade Enterprise Compliance Admin Panel built with Next.js 15, TypeScript, Tailwind CSS, and Recharts. Real-time regulatory surveillance for FINRA and SEC compliance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

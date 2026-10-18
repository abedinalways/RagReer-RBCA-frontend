import type { Metadata } from "next";
import { FinancialSummaryView } from "@/features/admin/financial-summary/components/FinancialSummaryView";

export const metadata: Metadata = {
  title: "Financial Summary",
  description: "Comprehensive financial performance overview, revenue streams, and expense breakdown.",
};

export default function AdminFinancialSummaryPage() {
  return <FinancialSummaryView />;
}

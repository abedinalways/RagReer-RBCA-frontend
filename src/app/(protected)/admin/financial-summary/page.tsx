import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "Financial Summary" };

export default function AdminFinancialSummaryPage() {
  return (
    <PlaceholderPage
      title="Financial Summary"
      description="Comprehensive financial performance overview, revenue streams, and expense breakdown."
    />
  );
}

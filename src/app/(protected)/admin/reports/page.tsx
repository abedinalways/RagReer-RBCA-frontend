import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "Reports" };

export default function AdminReportsPage() {
  return (
    <PlaceholderPage
      title="Reports"
      description="Business reports & exports — implementation lives in features/reports."
    />
  );
}
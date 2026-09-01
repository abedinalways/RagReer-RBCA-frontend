import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "Estimation" };

export default function CustomerEstimationsPage() {
  return (
    <PlaceholderPage
      title="Estimation"
      description="Cost estimation views — implementation lives in features/estimations."
    />
  );
}
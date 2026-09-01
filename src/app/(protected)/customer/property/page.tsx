import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "My Property" };

export default function CustomerPropertyPage() {
  return (
    <PlaceholderPage
      title="My Property"
      description="Customer's own property records — implementation lives in features/properties."
    />
  );
}
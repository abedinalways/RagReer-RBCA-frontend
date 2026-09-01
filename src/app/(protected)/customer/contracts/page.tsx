import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "Contract & Agreements" };

export default function CustomerContractsPage() {
  return (
    <PlaceholderPage
      title="Contract & Agreements"
      description="Signed & pending agreements — implementation lives in features/contracts."
    />
  );
}
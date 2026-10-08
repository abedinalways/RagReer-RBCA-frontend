import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "Services" };

export default function AdminServicesPage() {
  return (
    <PlaceholderPage
      title="Services"
      description="Configure lawn care service catalog, tiered bundles, seasonal offerings, and rate cards."
    />
  );
}

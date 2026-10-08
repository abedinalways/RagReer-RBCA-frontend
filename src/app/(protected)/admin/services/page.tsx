import type { Metadata } from "next";
import { ServicesManagementView } from "@/features/admin/services/components/ServicesManagementView";

export const metadata: Metadata = {
  title: "Services | Admin",
  description: "Configure lawn care service catalog, tiered bundles, seasonal offerings, and rate cards.",
};

export default function AdminServicesPage() {
  return <ServicesManagementView />;
}

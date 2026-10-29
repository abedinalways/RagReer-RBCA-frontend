import type { Metadata } from "next";
import { AdminEstimatesView } from "@/features/admin/estimates/components/AdminEstimatesView";

export const metadata: Metadata = {
  title: "Estimates — Admin",
};

export default function AdminEstimatesPage() {
  return <AdminEstimatesView />;
}

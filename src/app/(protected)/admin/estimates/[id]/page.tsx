import type { Metadata } from "next";
import { AdminEstimateDetailView } from "@/features/admin/estimates/components/AdminEstimateDetailView";

export const metadata: Metadata = {
  title: "Estimate Details — Admin",
};

interface EstimateDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEstimateDetailPage({
  params,
}: EstimateDetailPageProps) {
  const { id } = await params;
  return <AdminEstimateDetailView estimateId={id} />;
}

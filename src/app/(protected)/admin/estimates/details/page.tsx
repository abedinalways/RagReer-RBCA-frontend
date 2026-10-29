import type { Metadata } from "next";
import { AdminEstimateDetailView } from "@/features/admin/estimates/components/AdminEstimateDetailView";

export const metadata: Metadata = {
  title: "Estimate Details — Admin",
};

interface EstimateDetailsPageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function AdminEstimateDetailsStaticPage({
  searchParams,
}: EstimateDetailsPageProps) {
  const { id } = await searchParams;
  return <AdminEstimateDetailView estimateId={id} />;
}

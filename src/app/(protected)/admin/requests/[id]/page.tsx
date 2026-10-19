import type { Metadata } from "next";
import { AdminRequestDetail } from "@/features/admin/requests/components/AdminRequestDetail";

export const metadata: Metadata = {
  title: "Service Request Details — Admin",
};

interface RequestDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminRequestDetailPage({
  params,
}: RequestDetailPageProps) {
  const { id } = await params;
  return <AdminRequestDetail requestId={id} />;
}

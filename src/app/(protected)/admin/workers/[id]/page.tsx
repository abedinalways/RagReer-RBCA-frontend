import type { Metadata } from "next";
import { AdminWorkersView } from "@/features/admin/workers/components/AdminWorkersView";

interface AdminWorkerDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata: Metadata = {
  title: "Crew Details | Admin Console",
  description: "View crew member details, routes, assignments, and activities.",
};

export default async function AdminWorkerDetailPage({
  params,
}: AdminWorkerDetailPageProps) {
  const { id } = await params;
  return <AdminWorkersView initialMemberId={id} initialTab="overview" />;
}

import type { Metadata } from "next";
import { AdminWorkersView } from "@/features/admin/workers/components/AdminWorkersView";
import { CrewTabKey } from "@/features/admin/workers/types/crewMembers.types";

interface AdminWorkerDetailTabProps {
  params: Promise<{
    id: string;
    tab: string;
  }>;
}

export const metadata: Metadata = {
  title: "Crew Details | Admin Console",
  description: "View crew member details, routes, assignments, and activities.",
};

export default async function AdminWorkerDetailTabPage({
  params,
}: AdminWorkerDetailTabProps) {
  const { id, tab } = await params;
  return (
    <AdminWorkersView
      initialMemberId={id}
      initialTab={(tab as CrewTabKey) || "overview"}
    />
  );
}

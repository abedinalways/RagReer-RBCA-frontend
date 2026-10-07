import type { Metadata } from "next";
import { Suspense } from "react";
import { TimeEntryTravelView } from "@/workspaces/worker/components/timesheet/travel-details";

export const metadata: Metadata = {
  title: "Traveling to the Site — Worker Workspace",
};

interface WorkerTimeEntryDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkerTimeEntryDetailPage({
  params,
}: WorkerTimeEntryDetailPageProps) {
  const { id } = await params;
  return (
    <Suspense
      fallback={
        <div className="flex min-h-75 w-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <TimeEntryTravelView entryId={id} />
    </Suspense>
  );
}

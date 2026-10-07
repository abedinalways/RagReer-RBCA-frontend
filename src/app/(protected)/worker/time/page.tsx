import type { Metadata } from "next";
import { Suspense } from "react";
import { WorkerTimeSheetView } from "@/workspaces/worker/components/WorkerTimeSheetView";
import { TimeSheetSkeleton } from "@/workspaces/worker/components/timesheet";

export const metadata: Metadata = { title: "Time — Worker Workspace" };

export default function WorkerTimePage() {
  return (
    <Suspense fallback={<TimeSheetSkeleton />}>
      <WorkerTimeSheetView />
    </Suspense>
  );
}
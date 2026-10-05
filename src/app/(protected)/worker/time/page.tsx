import type { Metadata } from "next";
import { Suspense } from "react";
import { WorkerTimeSheetView } from "@/workspaces/worker/components/WorkerTimeSheetView";

export const metadata: Metadata = { title: "Time — Worker Workspace" };

export default function WorkerTimePage() {
  return (
    <Suspense
      fallback={
        <div className="p-4 text-center text-secondary-subheading text-sm font-medium">
          Loading time sheet...
        </div>
      }
    >
      <WorkerTimeSheetView />
    </Suspense>
  );
}
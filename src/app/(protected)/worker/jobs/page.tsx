import type { Metadata } from "next";
import { Suspense } from "react";
import { WorkerJobList } from "@/workspaces/worker/components/WorkerJobList";

export const metadata: Metadata = { title: "Jobs" };

export default function WorkerJobsPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center text-secondary-subheading text-sm font-medium">Loading jobs...</div>}>
      <WorkerJobList />
    </Suspense>
  );
}
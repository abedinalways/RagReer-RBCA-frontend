import type { Metadata } from "next";
import { WorkerJobList } from "@/workspaces/worker/components/WorkerJobList";

export const metadata: Metadata = { title: "Jobs" };

/**
 * Worker Jobs tab — workspace-specific mobile list (All / Current / Upcoming)
 * that reuses features/jobs business cards.
 */
export default function WorkerJobsPage() {
  return <WorkerJobList />;
}
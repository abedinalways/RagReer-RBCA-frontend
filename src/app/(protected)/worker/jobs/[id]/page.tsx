import type { Metadata } from "next";
import { WorkerJobDetailsView } from "@/workspaces/worker/components/job-details/WorkerJobDetailsView";

export const metadata: Metadata = { title: "Job Details" };

interface WorkerJobDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkerJobDetailsPage({
  params,
}: WorkerJobDetailsPageProps) {
  const { id } = await params;
  return <WorkerJobDetailsView jobId={id} />;
}

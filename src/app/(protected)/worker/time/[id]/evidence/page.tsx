import type { Metadata } from "next";
import { EvidenceSubmitView } from "@/workspaces/worker/components/timesheet/evidence/EvidenceSubmitView";

export const metadata: Metadata = {
  title: "Evidence Submission — Worker Workspace",
};

interface WorkerEvidencePageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkerEvidencePage({
  params,
}: WorkerEvidencePageProps) {
  const { id } = await params;
  return <EvidenceSubmitView jobId={id} />;
}

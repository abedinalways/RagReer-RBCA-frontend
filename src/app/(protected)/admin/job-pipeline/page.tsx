import type { Metadata } from "next";
import { AdminJobPipelineView } from "@/features/admin/job-pipeline/components/AdminJobPipelineView";

export const metadata: Metadata = {
  title: "Job Pipeline | Admin Console",
  description: "Track and manage job pipeline stages, crew assignments, and service tasks.",
};

export default function AdminJobPipelinePage() {
  return <AdminJobPipelineView />;
}
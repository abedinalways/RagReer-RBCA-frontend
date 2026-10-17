import type { Metadata } from "next";
import { AdminJobDetail } from "@/features/admin/job-pipeline/components/details/AdminJobDetail";

interface JobDetailTabPageProps {
  params: Promise<{ id: string; tab: string }>;
}

export async function generateMetadata({
  params,
}: JobDetailTabPageProps): Promise<Metadata> {
  const { tab } = await params;
  const formattedTab = tab
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${formattedTab} | Job Details | Admin Console`,
    description: `View ${formattedTab} details for this job in the pipeline.`,
  };
}

export default async function AdminJobDetailTabPage({
  params,
}: JobDetailTabPageProps) {
  const { id, tab } = await params;
  return <AdminJobDetail jobId={id} initialTab={tab} />;
}

import { redirect } from "next/navigation";

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminJobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  redirect(`/admin/job-pipeline/${id}/overview`);
}

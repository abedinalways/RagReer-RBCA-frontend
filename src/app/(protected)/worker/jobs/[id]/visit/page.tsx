import type { Metadata } from "next";
import { SiteVisitView } from "@/workspaces/worker/components/visit/SiteVisitView";

export const metadata: Metadata = { title: "Site Visit" };

interface VisitPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkerVisitPage({ params }: VisitPageProps) {
  const { id } = await params;
  return <SiteVisitView jobId={id} />;
}

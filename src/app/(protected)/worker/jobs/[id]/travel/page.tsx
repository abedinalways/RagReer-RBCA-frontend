import type { Metadata } from "next";
import { TravelTrackingView } from "@/workspaces/worker/components/visit/TravelTrackingView";

export const metadata: Metadata = { title: "Travel to Site" };

interface TravelPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkerTravelPage({ params }: TravelPageProps) {
  const { id } = await params;
  return <TravelTrackingView jobId={id} />;
}

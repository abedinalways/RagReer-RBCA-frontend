import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "Requests" };

export default function AdminRequestsPage() {
  return (
    <PlaceholderPage
      title="Requests"
      description="Service request triage & dispatch — implementation lives in features/requests."
    />
  );
}
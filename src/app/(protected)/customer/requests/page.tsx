import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "My Requests" };

export default function CustomerRequestsPage() {
  return (
    <PlaceholderPage
      title="My Requests"
      description="Customer-scoped request list — same domain as admin requests (features/requests), rendered differently here."
    />
  );
}
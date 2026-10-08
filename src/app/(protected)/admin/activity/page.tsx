import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "Activity Log" };

export default function AdminActivityPage() {
  return (
    <PlaceholderPage
      title="Activity Log"
      description="View real-time system activity, staff audit trails, and security event histories."
    />
  );
}

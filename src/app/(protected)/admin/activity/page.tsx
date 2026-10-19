import type { Metadata } from "next";
import { ActivityLogView } from "@/features/admin/activity/components/ActivityLogView";

export const metadata: Metadata = {
  title: "Activity Log | Admin",
  description:
    "View real-time system activity, staff audit trails, and security event histories.",
};

export default function AdminActivityPage() {
  return <ActivityLogView />;
}

import type { Metadata } from "next";
import { AdminScheduleView } from "@/features/admin/schedule/components/AdminScheduleView";

export const metadata: Metadata = {
  title: "Schedule | Admin Console",
  description: "Manage and monitor scheduled service appointments, crew dispatch, and assignments.",
};

export default function AdminSchedulePage() {
  return <AdminScheduleView />;
}

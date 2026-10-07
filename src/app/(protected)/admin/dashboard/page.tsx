import type { Metadata } from "next";
import { AdminDashboardView } from "@/workspaces/admin/components/AdminDashboardView";

export const metadata: Metadata = {
  title: "Dashboard & Field Operations — Admin",
};

export default function AdminDashboardPage() {
  return <AdminDashboardView />;
}
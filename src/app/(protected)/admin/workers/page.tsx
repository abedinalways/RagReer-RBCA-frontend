import type { Metadata } from "next";
import { AdminWorkersView } from "@/features/admin/workers/components/AdminWorkersView";

export const metadata: Metadata = { title: "Crew Members" };

export default function AdminWorkersPage() {
  return <AdminWorkersView />;
}
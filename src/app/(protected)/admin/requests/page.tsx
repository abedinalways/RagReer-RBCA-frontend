import type { Metadata } from "next";
import { AdminServiceRequestsView } from "@/features/admin/requests/components/AdminServiceRequestsView";

export const metadata: Metadata = {
  title: "Service Requests — Admin",
};

export default function AdminRequestsPage() {
  return <AdminServiceRequestsView />;
}
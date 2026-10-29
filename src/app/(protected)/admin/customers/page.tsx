import type { Metadata } from "next";
import { AdminCustomersView } from "@/features/admin/customers/components/AdminCustomersView";

export const metadata: Metadata = {
  title: "Customers | Admin Console",
  description: "Manage customer profiles, contracts, properties, billing, and portal access.",
};

export default function AdminCustomersPage() {
  return <AdminCustomersView />;
}
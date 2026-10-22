import type { Metadata } from "next";
import { AdminCustomersView } from "@/features/admin/customers/components/AdminCustomersView";

interface AdminCustomerDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata: Metadata = {
  title: "Customer Details | Admin Console",
  description: "View customer overview, properties, services, billing, and activity logs.",
};

export default async function AdminCustomerDetailPage({
  params,
}: AdminCustomerDetailPageProps) {
  const { id } = await params;
  return <AdminCustomersView initialCustomerId={id} initialTab="overview" />;
}

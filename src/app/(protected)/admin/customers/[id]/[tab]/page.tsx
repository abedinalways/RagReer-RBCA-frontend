import type { Metadata } from "next";
import { AdminCustomersView } from "@/features/admin/customers/components/AdminCustomersView";
import { CustomerTabKey } from "@/features/admin/customers/types/adminCustomers.types";

interface AdminCustomerDetailTabProps {
  params: Promise<{
    id: string;
    tab: string;
  }>;
}

export const metadata: Metadata = {
  title: "Customer Details | Admin Console",
  description: "View customer details by specific tab.",
};

export default async function AdminCustomerDetailTabPage({
  params,
}: AdminCustomerDetailTabProps) {
  const { id, tab } = await params;
  return (
    <AdminCustomersView
      initialCustomerId={id}
      initialTab={tab as CustomerTabKey}
    />
  );
}

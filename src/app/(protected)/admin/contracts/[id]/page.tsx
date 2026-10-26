import { Suspense } from "react";
import type { Metadata } from "next";
import { AdminContractDetailView } from "@/features/admin/contracts/components/AdminContractDetailView";

export const metadata: Metadata = {
  title: "Contract Details — Admin",
};

interface ContractDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminContractDetailPage({
  params,
}: ContractDetailPageProps) {
  const { id } = await params;
  return (
    <Suspense
      fallback={
        <div className="p-6 text-xs text-secondary-subheading">
          Loading contract details...
        </div>
      }
    >
      <AdminContractDetailView contractId={id} />
    </Suspense>
  );
}

import { Suspense } from "react";
import type { Metadata } from "next";
import { AdminContractDetailView } from "@/features/admin/contracts/components/AdminContractDetailView";

export const metadata: Metadata = {
  title: "Contract Details — Admin",
};

interface ContractDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ status?: string }>;
}

export default async function AdminContractDetailPage({
  params,
  searchParams,
}: ContractDetailPageProps) {
  const { id } = await params;
  const sp = searchParams ? await searchParams : undefined;
  return (
    <Suspense
      fallback={
        <div className="p-6 text-xs text-secondary-subheading">
          Loading contract details...
        </div>
      }
    >
      <AdminContractDetailView
        contractId={id}
        initialStatus={sp?.status as any}
      />
    </Suspense>
  );
}

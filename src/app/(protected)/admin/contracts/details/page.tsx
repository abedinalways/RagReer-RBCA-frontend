import { Suspense } from "react";
import type { Metadata } from "next";
import { AdminContractDetailView } from "@/features/admin/contracts/components/AdminContractDetailView";

export const metadata: Metadata = {
  title: "Contract Details — Admin",
};

interface ContractDetailsStaticPageProps {
  searchParams: Promise<{ id?: string; status?: string }>;
}

export default async function AdminContractDetailsStaticPage({
  searchParams,
}: ContractDetailsStaticPageProps) {
  const { id } = await searchParams;
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

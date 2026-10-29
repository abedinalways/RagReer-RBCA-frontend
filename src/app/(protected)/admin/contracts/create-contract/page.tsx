import { Suspense } from "react";
import type { Metadata } from "next";
import { CreateContractView } from "@/features/admin/contracts/components/CreateContractView";

export const metadata: Metadata = {
  title: "Create Contract & Agreement — Admin",
};

export default function CreateContractAliasPage() {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-secondary-subheading">Loading contract details...</div>}>
      <CreateContractView />
    </Suspense>
  );
}

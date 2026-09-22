import ContractsAgreements from "@/features/customer/contracts-agreements/components/ContractsAgreements";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contract & Agreements" };

export default function CustomerContractsPage() {
  return <ContractsAgreements />;
}

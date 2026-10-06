import React from "react";
import type { Metadata } from "next";
import { ContractDetail } from "@/features/customer/contracts-agreements/components/ContractDetail";

interface CustomerContractDetailPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Contract & Agreement Details",
};

export default async function CustomerContractDetailPage({
  params,
}: CustomerContractDetailPageProps) {
  const { id } = await params;
  return <ContractDetail contractId={id} />;
}

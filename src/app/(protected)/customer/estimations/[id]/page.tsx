import React from "react";
import type { Metadata } from "next";
import { EstimateDetail } from "@/features/customer/estimate/components/EstimateDetail";

interface EstimationsDetailPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Estimation Details",
};

export default async function EstimationsDetailsPage({
  params,
}: EstimationsDetailPageProps) {
  const { id } = await params;
  return <EstimateDetail estimateId={id} />;
}

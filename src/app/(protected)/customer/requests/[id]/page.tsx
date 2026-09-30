import { RequestDetail } from "@/features/customer/my-requests/components/RequestDetail";
import React from "react";

interface RequestDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function RequestDetailPage({
  params,
}: RequestDetailPageProps) {
  const { id } = await params;
  return <RequestDetail requestId={id} />;
}


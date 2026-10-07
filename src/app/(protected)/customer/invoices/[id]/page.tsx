import React from "react";
import type { Metadata } from "next";
import { InvoiceDetail } from "@/features/customer/invoices/components/InvoiceDetail";

interface CustomerInvoiceDetailPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Invoice Details",
};

export default async function CustomerInvoiceDetailPage({
  params,
}: CustomerInvoiceDetailPageProps) {
  const { id } = await params;
  return <InvoiceDetail invoiceId={id} />;
}

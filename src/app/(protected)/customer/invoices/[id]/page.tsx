import React from "react";
import type { Metadata } from "next";
import { InvoiceDetail } from "@/features/customer/invoices/components/InvoiceDetail";

interface CustomerInvoiceDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ payment?: string; tx?: string }>;
}

export const metadata: Metadata = {
  title: "Invoice Details",
};

export default async function CustomerInvoiceDetailPage({
  params,
  searchParams,
}: CustomerInvoiceDetailPageProps) {
  const { id } = await params;
  const { payment, tx } = (await searchParams) || {};

  return (
    <InvoiceDetail
      invoiceId={id}
      initialPaymentStatus={payment}
      initialTxId={tx}
    />
  );
}

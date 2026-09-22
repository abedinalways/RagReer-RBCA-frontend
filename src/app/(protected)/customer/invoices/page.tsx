import type { Metadata } from "next";
import { Invoices } from "@/features/customer/invoices/components/Invoices";

export const metadata: Metadata = { title: "Invoices" };

export default function CustomerInvoicesPage() {
  return <Invoices />;
}

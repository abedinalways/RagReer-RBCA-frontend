import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";
import { InvoicesList } from "@/features/invoices/components/InvoicesList";

export const metadata: Metadata = { title: "Invoices" };

/**
 * Customer "My Invoices" — renders the SAME features/invoices module that an
 * admin invoice-management screen would use. Only the workspace shell differs.
 */
export default function CustomerInvoicesPage() {
  return (
    <PlaceholderPage
      title="My Invoices"
      description="Shared with admin invoice management via features/invoices — presentation differs per workspace."
    >
      <InvoicesList />
    </PlaceholderPage>
  );
}
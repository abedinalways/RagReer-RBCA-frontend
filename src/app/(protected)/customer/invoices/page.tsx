import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";
import { InvoicesList } from "@/features/invoices/components/InvoicesList";
import { Invoices } from "@/features/customer/invoices/components/Invoices";

export const metadata: Metadata = { title: "Invoices" };

/**
 * Customer "My Invoices" — renders the SAME features/invoices module that an
 * admin invoice-management screen would use. Only the workspace shell differs.
 */
export default function CustomerInvoicesPage() {
  return (
    <div>
      {/* <PlaceholderPage
        title="My Invoices"
        description="Shared with admin invoice management via features/invoices — presentation differs per workspace."
      >
        <InvoicesList />
      </PlaceholderPage> */}
      <Invoices />
    </div>
  );
}

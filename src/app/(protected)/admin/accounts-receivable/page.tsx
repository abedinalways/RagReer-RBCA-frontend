import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "Accounts Receivable" };

export default function AdminAccountsReceivablePage() {
  return (
    <PlaceholderPage
      title="Accounts Receivable"
      description="Track outstanding customer invoices, overdue balances, and incoming receivables."
    />
  );
}

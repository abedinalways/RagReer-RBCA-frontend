import type { Metadata } from "next";
import { AccountsReceivableView } from "@/features/admin/accounts-receivable/components/AccountsReceivableView";

export const metadata: Metadata = {
  title: "Accounts Receivable",
  description: "Track outstanding customer invoices, overdue balances, and incoming receivables.",
};

export default function AdminAccountsReceivablePage() {
  return <AccountsReceivableView />;
}

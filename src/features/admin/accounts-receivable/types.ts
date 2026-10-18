export type BillingType = "Pending" | "Consolidated" | "Confirmed";
export type ReceivableStatus = "Awaiting Payment" | "Overdue" | "Paid";

export interface ReceivableInvoice {
  id: string;
  invoiceNumber: string;
  customer: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  billingType: BillingType;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  formattedAmount: string;
  status: ReceivableStatus;
}

export interface ReceivableMetrics {
  totalOutstanding: string;
  outstandingInvoicesCount: number;
  dueSoon: string;
  dueSoonNote: string;
  overdue: string;
  overdueInvoicesCount: number;
  thisMonthRevenue: string;
  revenueTrend: string;
}

export interface ReceivableAgingItem {
  id: string;
  label: string;
  amount: number;
  formattedAmount: string;
  percentage: number;
}

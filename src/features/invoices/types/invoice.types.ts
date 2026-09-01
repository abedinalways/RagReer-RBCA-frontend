/**
 * features/invoices/types/invoice.types.ts — Invoice domain types.
 */

export const INVOICE_STATUS_VALUES = ["DRAFT", "SENT", "PAID", "OVERDUE"] as const;
export type InvoiceStatus = (typeof INVOICE_STATUS_VALUES)[number];

export interface Invoice {
  id: string;
  number: string;
  amount: number;
  currency: "BDT" | "USD";
  status: InvoiceStatus;
  issuedAt: string;
  dueAt: string;
  lineItems: Array<{ description: string; quantity: number; unitPrice: number }>;
}
// Types and Interfaces for Invoices Application
export type InvoiceStatus = "Pending" | "Paid" | "Due" | "Overdue";
export type PaymentType = "Monthly" | "One - Time";

export interface Invoice {
  id: string;
  rawId: string;
  propertyAddress: string;
  serviceType: string;
  paymentType: PaymentType;
  issueDate: string;
  status: InvoiceStatus;
  amount: string;
  customerName?: string;
  customerEmail?: string;
  dueDate?: string;
  notes?: string;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: string;
  rate: string;
  amount: string;
}

export interface InvoicePartyInfo {
  name: string;
  email: string;
  address: string;
  avatarUrl?: string;
}

export interface InvoiceDetailData {
  id: string;
  rawId: string;
  propertyName: string;
  propertyAddress: string;
  issueDate: string;
  status: InvoiceStatus;
  serviceAgreementType: string;
  billingType: string;
  paymentType: PaymentType;
  payableMonth: string;
  paymentTerms: string;
  remainingMonths?: string;
  totalAmount: string;
  amountPayable: string;
  amountPaid?: string;
  remainingAmount?: string;
  dueDate: string;
  billedBy: InvoicePartyInfo;
  billedTo: InvoicePartyInfo;
  lineItems: InvoiceLineItem[];
  notes: string[];
  subtotal: string;
  discount: string;
  tax: string;
  total: string;
}

export type SortField =
  | "id"
  | "propertyAddress"
  | "serviceType"
  | "issueDate"
  | "amount";
export type SortOrder = "asc" | "desc";

export interface ColumnDef<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

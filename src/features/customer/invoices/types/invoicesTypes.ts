// Types and Interfaces for Invoices Application
export type InvoiceStatus = "Pending" | "Paid" | "Due" | "Overdue";
export type PaymentType = "Monthly" | "One - Time";

export interface Invoice {
  id: string;
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

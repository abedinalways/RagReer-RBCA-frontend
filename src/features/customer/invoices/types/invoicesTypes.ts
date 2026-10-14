// Types and Interfaces for Invoices Application
export type InvoiceStatus =
  | "Pending"
  | "Paid"
  | "Due"
  | "Payment Due"
  | "Active"
  | "Overdue";

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

export interface BillingHistoryItem {
  id: string;
  transactionId: string;
  billedTo: string;
  paymentCompletionDate: string;
  amount: string;
  paymentMethod: string;
  companyName?: string;
  companyCategory?: string;
  invoiceId?: string;
  completedService?: string;
  totalVisit?: string;
  serviceCompletionDate?: string;
  propertyAddress?: string;
}

export type SortField =
  | "id"
  | "propertyAddress"
  | "serviceType"
  | "issueDate"
  | "amount";
export type SortOrder = "asc" | "desc";

export interface ColumnDef<T> {
  header: React.ReactNode;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

// Portfolio Customer Types
export type CustomerBillingMode =
  | "regular"
  | "portfolio_consolidated"
  | "portfolio_separate";

export interface PortfolioConsolidatedInvoice {
  id: string;
  rawId: string;
  propertiesCount: string;
  servicePeriod: string;
  paymentType: PaymentType;
  issueDate: string;
  status: InvoiceStatus;
  amount: string;
}

export interface MonthlyStatementItem {
  id: string;
  month: string;
  propertiesCount: string;
  visitsCount: string;
  issueDate: string;
  status: InvoiceStatus;
  amount: string;
  downloadUrl?: string;
}

export interface StatementPropertyItem {
  id: string;
  propertyAddress: string;
  visits: string;
  status: string;
  amount: string;
}

export interface StatementDetailData {
  id: string;
  statementTitle: string;
  companyGroup: string;
  properties: StatementPropertyItem[];
  totalBilled: string;
  totalPaid: string;
  balance: string;
}

export interface PortfolioSeparateInvoice {
  id: string;
  rawId: string;
  propertyAddress: string;
  serviceType: string;
  paymentType: PaymentType;
  issueDate: string;
  status: InvoiceStatus;
  amount: string;
}

export interface SeparateStatementPropertyItem {
  id: string;
  propertyAddress: string;
  visitsCount: string;
  issueDate: string;
  status: InvoiceStatus;
  amount: string;
}

export interface SeparateMonthlyStatementGroup {
  id: string;
  month: string;
  propertiesCount: string;
  totalAmount: string;
  items: SeparateStatementPropertyItem[];
}



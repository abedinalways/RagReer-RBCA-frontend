export type StatBadgeType = "progress" | "recurring" | "inUse" | "overdue" | "trend";

export interface DashboardStatCard {
  id: string;
  title: string;
  value: string | number;
  badgeText: string;
  badgeType: StatBadgeType;
  linkText: string;
  linkHref: string;
  iconType: "calendar" | "service" | "equipment" | "outstanding" | "revenue";
}

export interface JobPipelineItem {
  id: string;
  status: string;
  count: string;
}

export interface CashFlowData {
  cashIn: {
    amount: string;
    percentage: string;
  };
  cashOut: {
    amount: string;
    percentage: string;
  };
  netProfit: string;
}

export interface ContractProfitabilityItem {
  id: string;
  name: string;
  percentage: number;
}

export interface MonthlyIncomeDataPoint {
  month: string;
  revenue: number; // in thousands (K)
  expense: number; // in thousands (K)
  formattedRevenue: string;
  formattedExpense: string;
  fullDate?: string;
}

export interface NeedAttentionItem {
  id: string;
  title: string;
  subtext: string;
  actionHref?: string;
}

export type InvoicePaymentStatus = "Pending" | "Paid" | "Overdue";
export type InvoicePaymentType = "Monthly" | "One - Time";

export interface OutstandingInvoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerAvatar: string;
  paymentType: InvoicePaymentType;
  due: string;
  amount: string;
  status: InvoicePaymentStatus;
}

export interface TodaysRouteItem {
  id: string;
  title: string;
  status: "In Progress" | "Scheduled" | "Completed";
  time: string;
  location: string;
  crewName: string;
  crewAvatars: string[];
}

export interface FinancialMetric {
  id: string;
  label: string;
  amount: string;
  percentage: number;
  barColor: string;
}

export interface ServiceDistributionItem {
  id: string;
  name: string;
  percentage: number;
  color: string;
}

export type ActivityType = "request" | "contract" | "estimation" | "assessment";

export interface RecentActivityItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  dotColor: "amber" | "green" | "blue";
}

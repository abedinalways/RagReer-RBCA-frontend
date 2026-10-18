export interface FinancialSummaryMetrics {
  totalRevenue: string;
  revenueTrend: string;
  totalCollected: string;
  collectedProfilesCount: number;
  discountApplied: string;
  discountJobsCount: number;
  avgProfitMargin: string;
  marginNote: string;
}

export interface MonthlyFinancialTrendPoint {
  month: string;
  invoiced: number;
  collected: number;
  fullDate?: string;
  formattedInvoiced?: string;
  formattedCollected?: string;
}

export interface ServiceProfitItem {
  id: string;
  serviceName: string;
  percentage: number;
}

export interface RevenuePerformanceBreakdown {
  label: "Collected" | "Outstanding" | "Overdue";
  amount: number;
  formattedAmount: string;
  percentage: number;
  color: string;
}

export interface ContractProfitItem {
  id: string;
  customerName: string;
  jobs: number;
  revenue: number;
  formattedRevenue: string;
  crewCost: number;
  formattedCrewCost: string;
  profit: number;
  formattedProfit: string;
  margin: string;
  avatarUrl?: string;
}

import {
  FinancialSummaryMetrics,
  MonthlyFinancialTrendPoint,
  ServiceProfitItem,
  RevenuePerformanceBreakdown,
  ContractProfitItem,
} from "../types";

export const FINANCIAL_METRICS: FinancialSummaryMetrics = {
  totalRevenue: "$24,680",
  revenueTrend: "12.4%",
  totalCollected: "$12,500.00",
  collectedProfilesCount: 5,
  discountApplied: "$3,200.00",
  discountJobsCount: 10,
  avgProfitMargin: "76%",
  marginNote: "Portfolio Wise",
};

export const MONTHLY_TREND_DATA: MonthlyFinancialTrendPoint[] = [
  {
    month: "Jan",
    invoiced: 2300,
    collected: 1900,
    formattedInvoiced: "$2.3K",
    formattedCollected: "$1.9K",
  },
  {
    month: "Feb",
    invoiced: 3000,
    collected: 1800,
    formattedInvoiced: "$3.0K",
    formattedCollected: "$1.8K",
  },
  {
    month: "Mar",
    invoiced: 3600,
    collected: 2000,
    formattedInvoiced: "$3.6K",
    formattedCollected: "$2.0K",
  },
  {
    month: "Apr",
    invoiced: 4300,
    collected: 2100,
    fullDate: "JULY 17, 2026",
    formattedInvoiced: "$124.5K",
    formattedCollected: "$124.5K",
  },
  {
    month: "May",
    invoiced: 3200,
    collected: 1800,
    formattedInvoiced: "$3.2K",
    formattedCollected: "$1.8K",
  },
  {
    month: "Jun",
    invoiced: 4000,
    collected: 1700,
    formattedInvoiced: "$4.0K",
    formattedCollected: "$1.7K",
  },
];

export const SERVICE_PROFIT_DATA: ServiceProfitItem[] = [
  {
    id: "serv-1",
    serviceName: "Commercial Services",
    percentage: 95,
  },
  {
    id: "serv-2",
    serviceName: "Residential Lawn Care",
    percentage: 75,
  },
  {
    id: "serv-3",
    serviceName: "Landscape and Property Maintenance",
    percentage: 70,
  },
  {
    id: "serv-4",
    serviceName: "Video & Photography",
    percentage: 25,
  },
  {
    id: "serv-5",
    serviceName: "DJ & Events",
    percentage: 10,
  },
  {
    id: "serv-6",
    serviceName: "Others",
    percentage: 5,
  },
];

export const REVENUE_PERFORMANCE_BREAKDOWN: RevenuePerformanceBreakdown[] = [
  {
    label: "Collected",
    amount: 18400,
    formattedAmount: "$18,400",
    percentage: 75,
    color: "#EC7032",
  },
  {
    label: "Outstanding",
    amount: 6200,
    formattedAmount: "$6,200",
    percentage: 25,
    color: "#8B5CF6",
  },
  {
    label: "Overdue",
    amount: 2100,
    formattedAmount: "$2,100",
    percentage: 9,
    color: "#EAAA08",
  },
];

export const TOP_CONTRACTS_DATA: ContractProfitItem[] = [
  {
    id: "contract-1",
    customerName: "Mercer Ridge HOA",
    jobs: 8,
    revenue: 4800,
    formattedRevenue: "$4,800",
    crewCost: 2400,
    formattedCrewCost: "$2,400",
    profit: 2400,
    formattedProfit: "$2,400",
    margin: "67%",
    avatarUrl: "/images/customer_avatar.png",
  },
  {
    id: "contract-2",
    customerName: "Samira Patel",
    jobs: 15,
    revenue: 7500,
    formattedRevenue: "$7,500",
    crewCost: 3750,
    formattedCrewCost: "$3,750",
    profit: 3750,
    formattedProfit: "$3,750",
    margin: "53%",
    avatarUrl: "/images/customer_avatar.png",
  },
  {
    id: "contract-3",
    customerName: "Alex Morgan",
    jobs: 12,
    revenue: 6400,
    formattedRevenue: "$6,400",
    crewCost: 3200,
    formattedCrewCost: "$3,200",
    profit: 3200,
    formattedProfit: "$3,200",
    margin: "42%",
    avatarUrl: "/images/customer_avatar.png",
  },
  {
    id: "contract-4",
    customerName: "Lakeside Villas",
    jobs: 10,
    revenue: 5000,
    formattedRevenue: "$5,000",
    crewCost: 2000,
    formattedCrewCost: "$2,000",
    profit: 3000,
    formattedProfit: "$3,000",
    margin: "40%",
    avatarUrl: "/images/customer_avatar.png",
  },
  {
    id: "contract-5",
    customerName: "Mercer Ridge HOA",
    jobs: 10,
    revenue: 5000,
    formattedRevenue: "$5,000",
    crewCost: 2000,
    formattedCrewCost: "$2,000",
    profit: 3000,
    formattedProfit: "$3,000",
    margin: "40%",
    avatarUrl: "/images/customer_avatar.png",
  },
];

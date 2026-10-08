import {
  DashboardStatCard,
  JobPipelineItem,
  CashFlowData,
  ContractProfitabilityItem,
  MonthlyIncomeDataPoint,
  NeedAttentionItem,
  OutstandingInvoice,
  TodaysRouteItem,
  FinancialMetric,
  ServiceDistributionItem,
  RecentActivityItem,
} from "../types/dashboardTypes";

export const DASHBOARD_STAT_CARDS: DashboardStatCard[] = [
  {
    id: "todays-visit",
    title: "Today's Visit",
    value: "8",
    badgeText: "2 in progress",
    badgeType: "progress",
    linkText: "Schedule",
    linkHref: "/admin/jobs",
    iconType: "calendar",
  },
  {
    id: "active-services",
    title: "Active Services",
    value: "14",
    badgeText: "3 recurring",
    badgeType: "recurring",
    linkText: "Services",
    linkHref: "/admin/services",
    iconType: "service",
  },
  {
    id: "total-equipments",
    title: "Total Equipments",
    value: "180",
    badgeText: "20 in use",
    badgeType: "inUse",
    linkText: "View",
    linkHref: "/admin/equipment",
    iconType: "equipment",
  },
  {
    id: "outstanding",
    title: "Outstanding",
    value: "$8,420",
    badgeText: "3 overdue",
    badgeType: "overdue",
    linkText: "Receivables",
    linkHref: "/admin/reports",
    iconType: "outstanding",
  },
  {
    id: "this-month-revenue",
    title: "This Month Revenue",
    value: "$24,680",
    badgeText: "12.4%",
    badgeType: "trend",
    linkText: "View",
    linkHref: "/admin/reports",
    iconType: "revenue",
  },
];

export const JOB_PIPELINE_DATA: JobPipelineItem[] = [
  { id: "scheduled", status: "Scheduled", count: "12" },
  { id: "in-progress", status: "In Progress", count: "04" },
  { id: "awaiting-review", status: "Awaiting Review", count: "20" },
  { id: "completed", status: "Completed", count: "10" },
  { id: "rescheduled", status: "Rescheduled", count: "06" },
];

export const CASH_FLOW_DATA: CashFlowData = {
  cashIn: {
    amount: "$18,420",
    percentage: "+16%",
  },
  cashOut: {
    amount: "$9,760",
    percentage: "-16%",
  },
  netProfit: "$8,660",
};

export const TOP_CONTRACTS_DATA: ContractProfitabilityItem[] = [
  { id: "c1", name: "Mercer Ridge HOA", percentage: 67 },
  { id: "c2", name: "Lakeside Villas", percentage: 53 },
  { id: "c3", name: "Mercer Ridge HOA", percentage: 42 },
  { id: "c4", name: "Pine Grove Estates", percentage: 37 },
  { id: "c5", name: "Palmetto Strip", percentage: 32 },
];

export const MONTHLY_INCOME_DATA: MonthlyIncomeDataPoint[] = [
  { month: "Jan", revenue: 2.9, expense: 1.4, formattedRevenue: "$2.9K", formattedExpense: "$1.4K" },
  { month: "Feb", revenue: 3.9, expense: 2.0, formattedRevenue: "$3.9K", formattedExpense: "$2.0K" },
  { month: "Mar", revenue: 2.9, expense: 2.5, formattedRevenue: "$2.9K", formattedExpense: "$2.5K" },
  { month: "Apr", revenue: 4.5, expense: 2.9, formattedRevenue: "$4.5K", formattedExpense: "$2.9K" },
  { month: "May", revenue: 2.1, expense: 1.6, formattedRevenue: "$2.1K", formattedExpense: "$1.6K" },
  { month: "Jun", revenue: 2.9, expense: 1.6, formattedRevenue: "$2.9K", formattedExpense: "$1.6K" },
  {
    month: "Jul",
    revenue: 3.8,
    expense: 2.0,
    formattedRevenue: "$124.5K",
    formattedExpense: "$18.4K",
    fullDate: "JULY 17, 2026",
  },
  { month: "Aug", revenue: 2.9, expense: 2.6, formattedRevenue: "$2.9K", formattedExpense: "$2.6K" },
  { month: "Sep", revenue: 3.6, expense: 2.9, formattedRevenue: "$3.6K", formattedExpense: "$2.9K" },
  { month: "Oct", revenue: 2.1, expense: 1.6, formattedRevenue: "$2.1K", formattedExpense: "$1.6K" },
  { month: "Nov", revenue: 2.1, expense: 1.6, formattedRevenue: "$2.1K", formattedExpense: "$1.6K" },
  { month: "Dec", revenue: 4.6, expense: 0.0, formattedRevenue: "$4.6K", formattedExpense: "$0" },
];

export const NEED_ATTENTION_DATA: NeedAttentionItem[] = [
  {
    id: "att-1",
    title: "2 Proposals Awaiting Approval",
    subtext: "Customers haven't responded yet.",
    actionHref: "/admin/requests",
  },
  {
    id: "att-2",
    title: "1 Contract Awaiting Signature",
    subtext: "John Smith • 2300 Maple Avenue, Suite 5",
    actionHref: "/admin/crm",
  },
  {
    id: "att-3",
    title: "1 Completed Service Awaiting Review",
    subtext: "Landscape and Property Maintenance • 2300 Maple Avenue, Suite 5",
    actionHref: "/admin/jobs",
  },
  {
    id: "att-4",
    title: "1 Additional Work Request",
    subtext: "Fence-line trimming • $120 • 2300 Maple Avenue, Suite 5",
    actionHref: "/admin/requests",
  },
];

export const OUTSTANDING_INVOICES_DATA: OutstandingInvoice[] = [
  {
    id: "inv-1",
    invoiceNumber: "#INV-1024",
    customerName: "Alex Morgan",
    customerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    paymentType: "Monthly",
    due: "21 days",
    amount: "$2,45",
    status: "Pending",
  },
  {
    id: "inv-2",
    invoiceNumber: "#INV-1025",
    customerName: "Jamie Lee",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    paymentType: "One - Time",
    due: "30 days",
    amount: "$5,100",
    status: "Paid",
  },
  {
    id: "inv-3",
    invoiceNumber: "#INV-1024",
    customerName: "Alex Morgan",
    customerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    paymentType: "Monthly",
    due: "18 days",
    amount: "$2,45",
    status: "Pending",
  },
  {
    id: "inv-4",
    invoiceNumber: "#INV-1024",
    customerName: "Alex Morgan",
    customerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    paymentType: "Monthly",
    due: "18 days",
    amount: "$2,45",
    status: "Pending",
  },
  {
    id: "inv-5",
    invoiceNumber: "#INV-1024",
    customerName: "Alex Morgan",
    customerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    paymentType: "Monthly",
    due: "18 days",
    amount: "$2,45",
    status: "Pending",
  },
  {
    id: "inv-6",
    invoiceNumber: "#INV-1024",
    customerName: "Alex Morgan",
    customerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    paymentType: "Monthly",
    due: "18 days",
    amount: "$2,45",
    status: "Pending",
  },
  {
    id: "inv-7",
    invoiceNumber: "#INV-1024",
    customerName: "Alex Morgan",
    customerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    paymentType: "Monthly",
    due: "18 days",
    amount: "$2,45",
    status: "Pending",
  },
  {
    id: "inv-8",
    invoiceNumber: "#INV-1024",
    customerName: "Alex Morgan",
    customerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    paymentType: "Monthly",
    due: "18 days",
    amount: "$2,45",
    status: "Pending",
  },
  {
    id: "inv-9",
    invoiceNumber: "#INV-1026",
    customerName: "Morgan Chen",
    customerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    paymentType: "One - Time",
    due: "06 days",
    amount: "$12,000",
    status: "Overdue",
  },
];

export const TODAYS_ROUTE_DATA: TodaysRouteItem[] = [
  {
    id: "route-1",
    title: "Storm Inspection",
    status: "In Progress",
    time: "08:00 AM",
    location: "100 Whispering Pines Blvd at Hwy 43",
    crewName: "Marcus Team",
    crewAvatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    ],
  },
  {
    id: "route-2",
    title: "Storm Inspection",
    status: "Scheduled",
    time: "09:00 AM",
    location: "100 Whispering Pines Blvd at Hwy 43",
    crewName: "Marcus Team",
    crewAvatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    ],
  },
];

export const FINANCIAL_OVERVIEW_METRICS: FinancialMetric[] = [
  {
    id: "rev",
    label: "Revenue",
    amount: "$24,680",
    percentage: 68,
    barColor: "#0777F6",
  },
  {
    id: "out",
    label: "Outstanding",
    amount: "$8,420",
    percentage: 35,
    barColor: "#EAAA08",
  },
  {
    id: "over",
    label: "Overdue",
    amount: "$2,150",
    percentage: 15,
    barColor: "#E11D48",
  },
];

export const SERVICE_DISTRIBUTION_DATA: ServiceDistributionItem[] = [
  {
    id: "s1",
    name: "Residential Lawn Care",
    percentage: 78,
    color: "#16A34A",
  },
  {
    id: "s2",
    name: "Landscape and Property Maintenance",
    percentage: 65,
    color: "#8B5CF6",
  },
  {
    id: "s3",
    name: "Commercial Services",
    percentage: 43,
    color: "#F59E0B",
  },
];

export const RECENT_ACTIVITY_DATA: RecentActivityItem[] = [
  {
    id: "act-1",
    title: "New Service Requested",
    description: "John Smith submitted a new service request.",
    timeAgo: "5 minutes ago",
    dotColor: "amber",
  },
  {
    id: "act-2",
    title: "Contract & Agreement Approved",
    description: "Contract #CN-1042 signed by Sarah Miller",
    timeAgo: "5 minutes ago",
    dotColor: "green",
  },
  {
    id: "act-3",
    title: "Estimation Sent to the Customer",
    description: "Alex Morgan created and send the estimation for request #REQ-1276",
    timeAgo: "3 minutes ago",
    dotColor: "blue",
  },
  {
    id: "act-4",
    title: "Site Assessment Completed",
    description: "Dev completed site assessment for request #REQ-1245",
    timeAgo: "1 hour ago",
    dotColor: "green",
  },
];

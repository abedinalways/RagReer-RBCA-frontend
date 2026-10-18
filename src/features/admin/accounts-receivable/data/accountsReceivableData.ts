import { ReceivableInvoice, ReceivableMetrics, ReceivableAgingItem } from "../types";

export const RECEIVABLE_METRICS: ReceivableMetrics = {
  totalOutstanding: "$12,500.00",
  outstandingInvoicesCount: 6,
  dueSoon: "$3,200.00",
  dueSoonNote: "Need Attention",
  overdue: "$1,200.00",
  overdueInvoicesCount: 2,
  thisMonthRevenue: "$24,680",
  revenueTrend: "12.4%",
};

export const INITIAL_RECEIVABLE_INVOICES: ReceivableInvoice[] = [
  {
    id: "inv-1",
    invoiceNumber: "#INV12458",
    customer: {
      name: "Sunset Realty",
      email: "contact@sunsetrealty.com",
    },
    billingType: "Pending",
    invoiceDate: "Oct 18",
    dueDate: "Nov 20",
    amount: 3150,
    formattedAmount: "$3,150.00",
    status: "Awaiting Payment",
  },
  {
    id: "inv-2",
    invoiceNumber: "#INV12458",
    customer: {
      name: "Oliver Davis",
      email: "oliver.davis@icloud.com",
      avatarUrl: "/images/customer_avatar.png",
    },
    billingType: "Consolidated",
    invoiceDate: "Oct 22",
    dueDate: "Dec 1",
    amount: 1950,
    formattedAmount: "$1,950.00",
    status: "Overdue",
  },
  {
    id: "inv-3",
    invoiceNumber: "#INV12458",
    customer: {
      name: "Weatherly Property Group",
      email: "weatherly@gmail.com",
    },
    billingType: "Consolidated",
    invoiceDate: "Oct 15",
    dueDate: "Nov 15",
    amount: 2400,
    formattedAmount: "$2,400.00",
    status: "Overdue",
  },
  {
    id: "inv-4",
    invoiceNumber: "#INV12458",
    customer: {
      name: "Maple Leaf Properties",
      email: "support@mapleleaf.com",
    },
    billingType: "Pending",
    invoiceDate: "Oct 25",
    dueDate: "Nov 30",
    amount: 3300,
    formattedAmount: "$3,300.00",
    status: "Awaiting Payment",
  },
  {
    id: "inv-5",
    invoiceNumber: "#INV12458",
    customer: {
      name: "Oliver Davis",
      email: "oliver.davis@icloud.com",
      avatarUrl: "/images/customer_avatar.png",
    },
    billingType: "Confirmed",
    invoiceDate: "Oct 20",
    dueDate: "Nov 22",
    amount: 4800,
    formattedAmount: "$4,800.00",
    status: "Overdue",
  },
  {
    id: "inv-6",
    invoiceNumber: "#INV12458",
    customer: {
      name: "Cedar Valley Realty",
      email: "contact@cedarvalley.com",
    },
    billingType: "Confirmed",
    invoiceDate: "Oct 28",
    dueDate: "Dec 5",
    amount: 2750,
    formattedAmount: "$2,750.00",
    status: "Awaiting Payment",
  },
];

export const RECEIVABLE_AGING_DATA: ReceivableAgingItem[] = [
  {
    id: "current",
    label: "Current",
    amount: 1650,
    formattedAmount: "$1,650",
    percentage: 65,
  },
  {
    id: "1-30",
    label: "1-30 days",
    amount: 1020,
    formattedAmount: "$1,020",
    percentage: 50,
  },
  {
    id: "31-60",
    label: "31-60 days",
    amount: 780,
    formattedAmount: "$780",
    percentage: 35,
  },
  {
    id: "61-90",
    label: "61-90 days",
    amount: 520,
    formattedAmount: "$520",
    percentage: 15,
  },
  {
    id: "90-plus",
    label: "90+ days",
    amount: 850,
    formattedAmount: "$850",
    percentage: 42,
  },
];

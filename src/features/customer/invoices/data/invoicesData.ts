import {
  Invoice,
  InvoiceDetailData,
  BillingHistoryItem,
  PortfolioConsolidatedInvoice,
  MonthlyStatementItem,
  StatementDetailData,
  PortfolioSeparateInvoice,
  SeparateMonthlyStatementGroup,
} from "../types/invoicesTypes";

export const INITIAL_INVOICES_DATA: Invoice[] = [
  {
    id: "#INV-1024",
    rawId: "inv-1024",
    propertyAddress: "124 Oak Street",
    serviceType: "Residential Lawn Care",
    paymentType: "Monthly",
    issueDate: "Aug 12, 2026",
    status: "Pending",
    amount: "$2,45",
    customerName: "Sarah Sidd",
    customerEmail: "sarahsidd@gmail.com",
    dueDate: "Sep 27, 2026",
  },
  {
    id: "#INV-1024",
    rawId: "inv-1025",
    propertyAddress: "124 Oak Street",
    serviceType: "Residential Lawn Care",
    paymentType: "One - Time",
    issueDate: "Aug 12, 2026",
    status: "Paid",
    amount: "$2,45",
    customerName: "Sarah Sidd",
    customerEmail: "sarahsidd@gmail.com",
    dueDate: "Aug 15, 2026",
  },
  {
    id: "#INV-1024",
    rawId: "inv-1026",
    propertyAddress: "124 Oak Street",
    serviceType: "Landscape & Propert...",
    paymentType: "Monthly",
    issueDate: "Aug 12, 2026",
    status: "Payment Due",
    amount: "$2,45",
    customerName: "Sarah Sidd",
    customerEmail: "sarahsidd@gmail.com",
    dueDate: "Aug 20, 2026",
  },
  {
    id: "#INV-1024",
    rawId: "inv-1027",
    propertyAddress: "124 Oak Street",
    serviceType: "Commercial Services",
    paymentType: "One - Time",
    issueDate: "Aug 12, 2026",
    status: "Active",
    amount: "$2,45",
    customerName: "Sarah Sidd",
    customerEmail: "sarahsidd@gmail.com",
    dueDate: "Aug 25, 2026",
  },
];

export const BILLING_HISTORY_DATA: BillingHistoryItem[] = [
  {
    id: "tx-1",
    transactionId: "#TX 12458",
    billedTo: "Sarah Sidd",
    paymentCompletionDate: "Sep 05, 2026",
    amount: "$3,995.00",
    paymentMethod: "Online Payment",
    companyName: "HALF STACHE",
    companyCategory: "Lawn Care",
    invoiceId: "#INV-1024",
    completedService: "Landscape & Property Maintenance",
    totalVisit: "03",
    serviceCompletionDate: "Aug 27, 2026",
  },
  {
    id: "tx-2",
    transactionId: "#TX 12458",
    billedTo: "Sarah Sidd",
    paymentCompletionDate: "Sep 05, 2026",
    amount: "$3,995.00",
    paymentMethod: "Cash Payment",
    companyName: "HALF STACHE",
    companyCategory: "Lawn Care",
    invoiceId: "#INV-1024",
    completedService: "Landscape & Property Maintenance",
    totalVisit: "03",
    serviceCompletionDate: "Aug 27, 2026",
  },
  {
    id: "tx-3",
    transactionId: "#TX 12458",
    billedTo: "Sarah Sidd",
    paymentCompletionDate: "Sep 05, 2026",
    amount: "$3,995.00",
    paymentMethod: "Clover POS",
    companyName: "HALF STACHE",
    companyCategory: "Lawn Care",
    invoiceId: "#INV-1024",
    completedService: "Landscape & Property Maintenance",
    totalVisit: "03",
    serviceCompletionDate: "Aug 27, 2026",
  },
];

export const getInvoiceDetailData = (
  rawId: string = "inv-1024",
): InvoiceDetailData => {
  const matched = INITIAL_INVOICES_DATA.find(
    (inv) =>
      inv.rawId.toLowerCase() === rawId.toLowerCase() ||
      inv.id.replace("#", "").toLowerCase() === rawId.toLowerCase(),
  );

  const status = matched?.status || "Pending";

  return {
    id: "#INV-1024",
    rawId: rawId,
    propertyName: "South Retention Pond & Walking Trail",
    propertyAddress: "100 Whispering Pines Blvd at Hwy 43",
    issueDate: "Aug 27, 2026",
    status: status,
    serviceAgreementType: "12 month agreement",
    billingType: "Monthly",
    paymentType: "Monthly",
    payableMonth: "August, 2026",
    paymentTerms: "NET 30 Days",
    remainingMonths: "11 months",
    totalAmount: "$3,995.00",
    amountPayable: "$3,995.00",
    amountPaid: status === "Paid" ? "$3,995.00" : "$0.00",
    remainingAmount: status === "Paid" ? "$0.00" : "$3,995.00",
    dueDate: "Sep 27, 2026",
    billedBy: {
      name: "HALF STACHE",
      email: "halfstache@gmail.com",
      address: "100 Whispering Pines Blvd at Hwy 43",
      avatarUrl: "/images/logo.png",
    },
    billedTo: {
      name: "Sarah Sidd",
      email: "sarahsidd@gmail.com",
      address: "100 Whispering Pines Blvd at Hwy 43",
      avatarUrl: "/images/customer_avatar.png",
    },
    lineItems: [
      {
        id: "item-1",
        description: "Site preparation & sod removal",
        quantity: "1 job",
        rate: "$85.00",
        amount: "$85.00",
      },
      {
        id: "item-2",
        description: "Soil grading & leveling",
        quantity: "1 job",
        rate: "$85.00",
        amount: "$85.00",
      },
      {
        id: "item-3",
        description: "Drought-tolerant plantings (12 shrubs)",
        quantity: "12 items",
        rate: "$85.00",
        amount: "$1020.00",
      },
      {
        id: "item-4",
        description: "Premium mulch installation",
        quantity: "4 items",
        rate: "$95.00",
        amount: "$380.00",
      },
      {
        id: "item-5",
        description: "Edging & cleanup",
        quantity: "1 job",
        rate: "$85.00",
        amount: "$85.00",
      },
      {
        id: "item-6",
        description: "Equipments",
        quantity: "5 items",
        rate: "$85.00",
        amount: "$1020.00",
      },
    ],
    notes: [
      "Payment is due by September 27, 2026.",
      "Your next payment invoice generated after monthly visit.",
    ],
    subtotal: "$3,995.00",
    discount: "$0.00",
    tax: "$45.00",
    total: "$3,995.00",
  };
};

export const PORTFOLIO_CONSOLIDATED_INVOICES: PortfolioConsolidatedInvoice[] = [
  {
    id: "#INV-1024",
    rawId: "inv-1024",
    propertiesCount: "18 property",
    servicePeriod: "Aug 31, 2026",
    paymentType: "One - Time",
    issueDate: "Aug 12, 2026",
    status: "Paid",
    amount: "$2,45",
  },
  {
    id: "#INV-1024",
    rawId: "inv-1025",
    propertiesCount: "10 Property",
    servicePeriod: "Aug 31, 2026",
    paymentType: "Monthly",
    issueDate: "Aug 12, 2026",
    status: "Due",
    amount: "$2,45",
  },
  {
    id: "#INV-1024",
    rawId: "inv-1026",
    propertiesCount: "15 property",
    servicePeriod: "Aug 31, 2026",
    paymentType: "Monthly",
    issueDate: "Aug 12, 2026",
    status: "Paid",
    amount: "$2,45",
  },
  {
    id: "#INV-1024",
    rawId: "inv-1027",
    propertiesCount: "12 Property",
    servicePeriod: "Aug 31, 2026",
    paymentType: "One - Time",
    issueDate: "Aug 12, 2026",
    status: "Due",
    amount: "$2,45",
  },
];

export const MONTHLY_STATEMENTS_DATA: MonthlyStatementItem[] = [
  {
    id: "stmt-july-2026",
    month: "July 2026",
    propertiesCount: "18 property",
    visitsCount: "22 visits",
    issueDate: "Aug 12, 2026",
    status: "Paid",
    amount: "$3,240.00",
  },
  {
    id: "stmt-aug-2026",
    month: "August 2026",
    propertiesCount: "9 Property",
    visitsCount: "18 visits",
    issueDate: "Aug 12, 2026",
    status: "Paid",
    amount: "$3,240.00",
  },
  {
    id: "stmt-sep-2026",
    month: "September 2026",
    propertiesCount: "15 Property",
    visitsCount: "22 visits",
    issueDate: "Sep 10, 2026",
    status: "Paid",
    amount: "$4,500.00",
  },
  {
    id: "stmt-oct-2026",
    month: "October 2026",
    propertiesCount: "8 Property",
    visitsCount: "15 visits",
    issueDate: "Oct 05, 2026",
    status: "Paid",
    amount: "$2,600.00",
  },
  {
    id: "stmt-nov-2026",
    month: "November 2026",
    propertiesCount: "12 Property",
    visitsCount: "20 visits",
    issueDate: "Nov 11, 2026",
    status: "Paid",
    amount: "$3,900.00",
  },
  {
    id: "stmt-dec-2026",
    month: "December 2026",
    propertiesCount: "20 Property",
    visitsCount: "30 visits",
    issueDate: "Dec 15, 2026",
    status: "Paid",
    amount: "$6,000.00",
  },
];

export const STATEMENT_DETAILS_DATA: Record<string, StatementDetailData> = {
  "stmt-aug-2026": {
    id: "stmt-aug-2026",
    statementTitle: "Statement - Aug 2026",
    companyGroup: "Coastline Property Group",
    properties: [
      {
        id: "p-1",
        propertyAddress: "1142 Cypress Ln",
        visits: "02",
        status: "Paid",
        amount: "$3,450.00",
      },
      {
        id: "p-2",
        propertyAddress: "239 Oakwood Dr",
        visits: "03",
        status: "Paid",
        amount: "$2,875.00",
      },
      {
        id: "p-3",
        propertyAddress: "490 Elm St",
        visits: "01",
        status: "Paid",
        amount: "$980.00",
      },
      {
        id: "p-4",
        propertyAddress: "1142 Cypress Ln",
        visits: "03",
        status: "Paid",
        amount: "$3,450.00",
      },
      {
        id: "p-5",
        propertyAddress: "785 Maple St",
        visits: "02",
        status: "Paid",
        amount: "$1,200.00",
      },
      {
        id: "p-6",
        propertyAddress: "678 Pine Ave",
        visits: "01",
        status: "Paid",
        amount: "$1,750.00",
      },
      {
        id: "p-7",
        propertyAddress: "400 Walnut Blvd",
        visits: "03",
        status: "Paid",
        amount: "$3,200.00",
      },
      {
        id: "p-8",
        propertyAddress: "1325 Birch Rd",
        visits: "02",
        status: "Paid",
        amount: "$4,500.00",
      },
      {
        id: "p-9",
        propertyAddress: "1523 Cedar Ct",
        visits: "01",
        status: "Paid",
        amount: "$2,300.00",
      },
    ],
    totalBilled: "$3,995.00",
    totalPaid: "-$3,995.00",
    balance: "$0.00",
  },
};

export const getStatementDetailData = (
  idOrMonth: string = "August 2026"
): StatementDetailData => {
  // If exact match found
  if (STATEMENT_DETAILS_DATA[idOrMonth]) {
    return STATEMENT_DETAILS_DATA[idOrMonth];
  }
  // Default to August 2026 data but update title dynamically if specific month requested
  const base = STATEMENT_DETAILS_DATA["stmt-aug-2026"];
  const displayTitle = idOrMonth.startsWith("stmt-")
    ? base.statementTitle
    : `Statement - ${idOrMonth.slice(0, 3)} ${idOrMonth.slice(-4)}`;

  return {
    ...base,
    statementTitle: displayTitle,
  };
};

export const PORTFOLIO_SEPARATE_INVOICES: PortfolioSeparateInvoice[] = [
  {
    id: "#INV-1024",
    rawId: "inv-1024",
    propertyAddress: "124 Oak Street",
    serviceType: "Residential Lawn Care",
    paymentType: "Monthly",
    issueDate: "Aug 12, 2026",
    status: "Paid",
    amount: "$2,45",
  },
  {
    id: "#INV-1024",
    rawId: "inv-1025",
    propertyAddress: "124 Oak Street",
    serviceType: "Landscape & Propert...",
    paymentType: "Monthly",
    issueDate: "Aug 12, 2026",
    status: "Due",
    amount: "$2,45",
  },
  {
    id: "#INV-1024",
    rawId: "inv-1026",
    propertyAddress: "124 Oak Street",
    serviceType: "Landscape & Propert...",
    paymentType: "Monthly",
    issueDate: "Aug 12, 2026",
    status: "Paid",
    amount: "$2,45",
  },
  {
    id: "#INV-1024",
    rawId: "inv-1027",
    propertyAddress: "125 Rain Street",
    serviceType: "Landscape & Propert...",
    paymentType: "Monthly",
    issueDate: "Aug 12, 2026",
    status: "Paid",
    amount: "$2,45",
  },
  {
    id: "#INV-1024",
    rawId: "inv-1028",
    propertyAddress: "125 Rain Street",
    serviceType: "Landscape & Propert...",
    paymentType: "Monthly",
    issueDate: "Aug 12, 2026",
    status: "Paid",
    amount: "$2,45",
  },
];

export const SEPARATE_MONTHLY_STATEMENTS_DATA: SeparateMonthlyStatementGroup[] = [
  {
    id: "group-aug-2026",
    month: "August 2026",
    propertiesCount: "18 properties",
    totalAmount: "$3,245.00",
    items: [
      {
        id: "item-1",
        propertyAddress: "124 Oak Street",
        visitsCount: "22 visits",
        issueDate: "Aug 12, 2026",
        status: "Paid",
        amount: "$3,240.00",
      },
      {
        id: "item-2",
        propertyAddress: "82 Birch Road, Unit 4",
        visitsCount: "18 visits",
        issueDate: "Aug 12, 2026",
        status: "Paid",
        amount: "$3,240.00",
      },
      {
        id: "item-3",
        propertyAddress: "907 Spruce Street, Suite 5",
        visitsCount: "22 visits",
        issueDate: "Sep 10, 2026",
        status: "Paid",
        amount: "$4,500.00",
      },
      {
        id: "item-4",
        propertyAddress: "789 Elm Avenue, Floor 3",
        visitsCount: "15 visits",
        issueDate: "Oct 05, 2026",
        status: "Paid",
        amount: "$2,600.00",
      },
      {
        id: "item-5",
        propertyAddress: "402 Oak Drive, Building B",
        visitsCount: "20 visits",
        issueDate: "Nov 11, 2026",
        status: "Paid",
        amount: "$3,900.00",
      },
    ],
  },
  {
    id: "group-july-2026",
    month: "July 2026",
    propertiesCount: "18 properties",
    totalAmount: "$3,245.00",
    items: [
      {
        id: "item-j1",
        propertyAddress: "124 Oak Street",
        visitsCount: "18 visits",
        issueDate: "Jul 12, 2026",
        status: "Paid",
        amount: "$3,240.00",
      },
      {
        id: "item-j2",
        propertyAddress: "82 Birch Road, Unit 4",
        visitsCount: "16 visits",
        issueDate: "Jul 12, 2026",
        status: "Paid",
        amount: "$3,240.00",
      },
    ],
  },
  {
    id: "group-sep-2026",
    month: "September 2026",
    propertiesCount: "22 properties",
    totalAmount: "$4,120.50",
    items: [
      {
        id: "item-s1",
        propertyAddress: "907 Spruce Street, Suite 5",
        visitsCount: "22 visits",
        issueDate: "Sep 10, 2026",
        status: "Paid",
        amount: "$4,120.50",
      },
    ],
  },
  {
    id: "group-oct-2026",
    month: "October 2026",
    propertiesCount: "15 properties",
    totalAmount: "$2,850.75",
    items: [
      {
        id: "item-o1",
        propertyAddress: "789 Elm Avenue, Floor 3",
        visitsCount: "15 visits",
        issueDate: "Oct 05, 2026",
        status: "Paid",
        amount: "$2,850.75",
      },
    ],
  },
  {
    id: "group-nov-2026",
    month: "November 2026",
    propertiesCount: "20 properties",
    totalAmount: "$3,900.00",
    items: [
      {
        id: "item-n1",
        propertyAddress: "402 Oak Drive, Building B",
        visitsCount: "20 visits",
        issueDate: "Nov 11, 2026",
        status: "Paid",
        amount: "$3,900.00",
      },
    ],
  },
];

export const getSinglePropertyStatementDetailData = (
  propertyAddress: string = "1142 Cypress Ln",
  month: string = "Aug 2026"
): StatementDetailData => {
  return {
    id: `stmt-${propertyAddress}-${month}`,
    statementTitle: `Statement - ${month}`,
    companyGroup: "Coastline Property Group",
    properties: [
      {
        id: "p-single",
        propertyAddress: propertyAddress,
        visits: "02",
        status: "Paid",
        amount: "$3,450.00",
      },
    ],
    totalBilled: "$3,995.00",
    totalPaid: "-$3,995.00",
    balance: "$0.00",
  };
};



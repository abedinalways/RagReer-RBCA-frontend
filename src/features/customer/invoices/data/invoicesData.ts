import { Invoice, InvoiceDetailData } from "../types/invoicesTypes";

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
    serviceType: "Commercial Services",
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
    serviceType: "Residential Lawn Care",
    paymentType: "One - Time",
    issueDate: "Aug 12, 2026",
    status: "Paid",
    amount: "$2,45",
    customerName: "Sarah Sidd",
    customerEmail: "sarahsidd@gmail.com",
    dueDate: "Aug 20, 2026",
  },
  {
    id: "#INV-1024",
    rawId: "inv-1027",
    propertyAddress: "124 Oak Street",
    serviceType: "Landscape & Property...",
    paymentType: "Monthly",
    issueDate: "Aug 12, 2026",
    status: "Due",
    amount: "$2,45",
    customerName: "Sarah Sidd",
    customerEmail: "sarahsidd@gmail.com",
    dueDate: "Aug 25, 2026",
  },
  {
    id: "#INV-1024",
    rawId: "inv-1028",
    propertyAddress: "124 Oak Street",
    serviceType: "Landscape & Property...",
    paymentType: "Monthly",
    issueDate: "Aug 12, 2026",
    status: "Overdue",
    amount: "$2,45",
    customerName: "Sarah Sidd",
    customerEmail: "sarahsidd@gmail.com",
    dueDate: "Aug 01, 2026",
  },
];

export const getInvoiceDetailData = (
  rawId: string = "inv-1024",
): InvoiceDetailData => {
  // Find matching invoice for status/date or fallback
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
    amountPaid: status === "Paid" ? "$3,995.00" : "$1,500.00",
    remainingAmount: status === "Paid" ? "$0.00" : "$2,495.00",
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

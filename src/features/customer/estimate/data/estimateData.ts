import {
  EstimateItem,
  EstimateStatus,
  EstimateStatusStyle,
} from "../types/estimateTypes";

export const estimateData: EstimateItem[] = [
  {
    id: "est-1",
    estimateId: "#EST-1024",
    requestId: "#RQS-1024",
    propertyAddress: "124 Oak Street",
    serviceType: "Residential Lawn Care",
    issueDate: "Aug 12, 2026",
    status: "Pending Approval",
    amount: "$2,45",
  },
  {
    id: "est-2",
    estimateId: "#EST-1024",
    requestId: "#RQS-1024",
    propertyAddress: "124 Oak Street",
    serviceType: "Residential Lawn Care",
    issueDate: "Aug 12, 2026",
    status: "Pending Approval",
    amount: "$2,45",
  },
  {
    id: "est-3",
    estimateId: "#EST-1024",
    requestId: "#RQS-1024",
    propertyAddress: "124 Oak Street",
    serviceType: "Residential Lawn Care",
    issueDate: "Aug 12, 2026",
    status: "Pending Approval",
    amount: "$2,45",
  },
  {
    id: "est-4",
    estimateId: "#EST-1024",
    requestId: "#RQS-1024",
    propertyAddress: "124 Oak Street",
    serviceType: "Landscape & Property Maintenance",
    issueDate: "Aug 12, 2026",
    status: "Approved",
    amount: "$2,45",
  },
  {
    id: "est-5",
    estimateId: "#EST-1024",
    requestId: "#RQS-1024",
    propertyAddress: "124 Oak Street",
    serviceType: "Commercial Services",
    issueDate: "Aug 12, 2026",
    status: "Approved",
    amount: "$2,45",
  },
  {
    id: "est-6",
    estimateId: "#EST-1024",
    requestId: "#RQS-1024",
    propertyAddress: "124 Oak Street",
    serviceType: "Commercial Services",
    issueDate: "Aug 12, 2026",
    status: "Declined",
    amount: "$2,45",
  },
];

export const estimateStatusStyles: Record<EstimateStatus, EstimateStatusStyle> =
  {
    "Pending Approval": {
      label: "Pending Approval",
      badgeBg: "bg-amber-50",
      badgeText: "text-amber-700",
      badgeBorder: "border-amber-200",
      dotBg: "bg-amber-500",
    },
    Approved: {
      label: "Approved",
      badgeBg: "bg-emerald-50",
      badgeText: "text-emerald-700",
      badgeBorder: "border-emerald-200",
      dotBg: "bg-emerald-500",
    },
    Declined: {
      label: "Declined",
      badgeBg: "bg-rose-50",
      badgeText: "text-rose-700",
      badgeBorder: "border-rose-200",
      dotBg: "bg-rose-500",
    },
  };

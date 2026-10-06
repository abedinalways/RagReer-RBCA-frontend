import {
  ContractItem,
  ContractStatus,
  ContractStatusStyle,
} from "../types/contractsAgreementsTypes";

export const contractsAgreementsData: ContractItem[] = [
  {
    id: "cn-1",
    contractId: "#CN-1024",
    propertyAddress: "124 Oak Street",
    serviceType: "Residential Lawn Care",
    issueDate: "Aug 12, 2026",
    status: "Pending Approval",
    amount: "$2,45",
  },
  {
    id: "cn-2",
    contractId: "#CN-1024",
    propertyAddress: "124 Oak Street",
    serviceType: "Residential Lawn Care",
    issueDate: "Aug 12, 2026",
    status: "Pending Approval",
    amount: "$2,45",
  },
  {
    id: "cn-3",
    contractId: "#CN-1024",
    propertyAddress: "124 Oak Street",
    serviceType: "Landscape & Property Maintenance",
    issueDate: "Aug 12, 2026",
    status: "Active",
    amount: "$2,45",
  },
  {
    id: "cn-4",
    contractId: "#CN-1024",
    propertyAddress: "124 Oak Street",
    serviceType: "Commercial Services",
    issueDate: "Aug 12, 2026",
    status: "Active",
    amount: "$2,45",
  },
];

export const contractStatusStyles: Record<ContractStatus, ContractStatusStyle> =
  {
    "Pending Approval": {
      label: "Pending Approval",
      badgeBg: "bg-amber-50",
      badgeText: "text-amber-700",
      badgeBorder: "border-amber-200",
      dotBg: "bg-amber-500",
    },
    Active: {
      label: "Active",
      badgeBg: "bg-emerald-50",
      badgeText: "text-emerald-700",
      badgeBorder: "border-emerald-200",
      dotBg: "bg-emerald-500",
    },
    "Contract Signed": {
      label: "Contract Signed",
      badgeBg: "bg-badge-active-bg",
      badgeText: "text-badge-active-text",
      badgeBorder: "border-badge-active-border",
      dotBg: "bg-badge-active-dot",
    },
    Expired: {
      label: "Expired",
      badgeBg: "bg-gray-100",
      badgeText: "text-gray-600",
      badgeBorder: "border-gray-200",
      dotBg: "bg-gray-400",
    },
    Declined: {
      label: "Declined",
      badgeBg: "bg-rose-50",
      badgeText: "text-rose-700",
      badgeBorder: "border-rose-200",
      dotBg: "bg-rose-500",
    },
  };

import {
  ContractItem,
  ContractStatus,
  ContractStatusStyle,
} from "../types/contractsAgreementsTypes";

export const contractsAgreementsData: ContractItem[] = [
  {
    id: "cn-1",
    contractId: "#CN-1024",
    propertyAddress: "100 Whispering Pines Blvd at Hwy 43",
    serviceType: "Commercial Lawn Care Agreement",
    issueDate: "Aug 16, 2026",
    status: "Contract Signed",
    amount: "$2,518.00",
  },
  {
    id: "cn-2",
    contractId: "#CN-1024",
    propertyAddress: "100 Whispering Pines Blvd at Hwy 43",
    serviceType: "Commercial Lawn Care Agreement",
    issueDate: "Aug 16, 2026",
    status: "Amendment Signed",
    amount: "$2,518.00",
  },
  {
    id: "cn-3",
    contractId: "#CN-1024",
    propertyAddress: "124 Oak Street",
    serviceType: "Landscape & Property Maintenance",
    issueDate: "Aug 12, 2026",
    status: "Pending Approval",
    amount: "$2,450.00",
  },
  {
    id: "cn-4",
    contractId: "#CN-1024",
    propertyAddress: "124 Oak Street",
    serviceType: "Commercial Services",
    issueDate: "Aug 12, 2026",
    status: "Active",
    amount: "$2,450.00",
  },
];

export const contractStatusStyles: Record<ContractStatus, ContractStatusStyle> =
  {
    "Pending Approval": {
      label: "Pending Approval",
      badgeBg: "bg-badge-pending-bg",
      badgeText: "text-badge-pending-text",
      badgeBorder: "border-badge-pending-border",
      dotBg: "bg-badge-pending-dot",
    },
    Active: {
      label: "Active",
      badgeBg: "bg-badge-active-bg",
      badgeText: "text-badge-active-text",
      badgeBorder: "border-badge-active-border",
      dotBg: "bg-badge-active-dot",
    },
    "Contract Signed": {
      label: "Contract Signed",
      badgeBg: "bg-badge-active-bg",
      badgeText: "text-badge-active-text",
      badgeBorder: "border-badge-active-border",
      dotBg: "bg-badge-active-dot",
    },
    "Amendment Signed": {
      label: "Amendment Signed",
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

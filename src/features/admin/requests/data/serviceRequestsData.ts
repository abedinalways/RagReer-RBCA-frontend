import {
  AdminServiceRequest,
  AdminRequestStatus,
  ServiceRequestActionOption,
} from "../types/serviceRequestsTypes";

export const ADMIN_SERVICE_REQUESTS_DATA: AdminServiceRequest[] = [
  {
    id: "req-1",
    requestId: "#REQ-1048",
    customer: {
      name: "Alex Morgan",
      email: "alexmorgan@gmail.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    },
    propertyAddress: "124 Oak Street",
    serviceType: "Residential Lawn Care",
    submittedOn: "Aug 12, 2026",
    status: "New",
  },
  {
    id: "req-2",
    requestId: "#REQ-1056",
    customer: {
      name: "Emma Davis",
      email: "emma.davis@outlook.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    propertyAddress: "121 Elm Street",
    serviceType: "Commercial Services",
    submittedOn: "Aug 21, 2026",
    status: "Under Review",
  },
  {
    id: "req-3",
    requestId: "#REQ-1052",
    customer: {
      name: "Sophia Chen",
      email: "sophia.chen@domain.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    },
    propertyAddress: "45 Maple Street",
    serviceType: "Residential Lawn Care",
    submittedOn: "Aug 17, 2026",
    status: "Site Visit Requested",
  },
  {
    id: "req-4",
    requestId: "#REQ-1059",
    customer: {
      name: "James Wilson",
      email: "james.wilson@domain.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    },
    propertyAddress: "89 Chestnut Avenue",
    serviceType: "Commercial Services",
    submittedOn: "Aug 24, 2026",
    status: "Reschedule Requested",
  },
  {
    id: "req-5",
    requestId: "#REQ-1059-sched",
    customer: {
      name: "James Wilson",
      email: "james.wilson@domain.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    },
    propertyAddress: "89 Chestnut Avenue",
    serviceType: "Commercial Services",
    submittedOn: "Aug 24, 2026",
    status: "Site Visit Scheduled",
  },
  {
    id: "req-6",
    requestId: "#REQ-1058",
    customer: {
      name: "Ava Thompson",
      email: "ava.thompson@mail.net",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    },
    propertyAddress: "234 Poplar Street",
    serviceType: "Landscaping & Lawn Care",
    submittedOn: "Aug 23, 2026",
    status: "Site Visit Completed",
  },
  {
    id: "req-7",
    requestId: "#REQ-1054",
    customer: {
      name: "Isabella Ramirez",
      email: "isabella.ramirez@email.org",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face",
    },
    propertyAddress: "789 Willow Way",
    serviceType: "Residential Lawn Care",
    submittedOn: "Aug 19, 2026",
    status: "Estimate Sent",
  },
  {
    id: "req-8",
    requestId: "#REQ-1051",
    customer: {
      name: "Ethan Brooks",
      email: "ethan.brooks@example.com",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    },
    propertyAddress: "210 Cedar Lane",
    serviceType: "Commercial Services",
    submittedOn: "Aug 16, 2026",
    status: "Estimate Accepted",
  },
  {
    id: "req-9",
    requestId: "#REQ-1057",
    customer: {
      name: "Oliver Martinez",
      email: "oliver.martinez@mail.com",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
    },
    propertyAddress: "678 Fir Lane",
    serviceType: "Landscaping & Lawn Care",
    submittedOn: "Aug 22, 2026",
    status: "Estimate Declined",
  },
  {
    id: "req-9b",
    requestId: "#REQ-1058",
    customer: {
      name: "Daniel White",
      email: "daniel.white@mail.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    },
    propertyAddress: "404 Cedar Bluff",
    serviceType: "Residential Lawn Care",
    submittedOn: "Aug 19, 2026",
    status: "Estimate Expired",
  },
  {
    id: "req-10",
    requestId: "#REQ-1048-chg",
    customer: {
      name: "Alex Morgan",
      email: "alexmorgan@gmail.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    },
    propertyAddress: "124 Oak Street",
    serviceType: "Residential Lawn Care",
    submittedOn: "Aug 12, 2026",
    status: "Change Requested",
  },
  {
    id: "req-11",
    requestId: "#REQ-1053",
    customer: {
      name: "Liam Johnson",
      email: "liam.johnson@mail.net",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    propertyAddress: "333 Spruce Court",
    serviceType: "Residential Lawn Care",
    submittedOn: "Aug 18, 2026",
    status: "Contract Sent",
  },
  {
    id: "req-12",
    requestId: "#REQ-1049",
    customer: {
      name: "Jordan Lee",
      email: "jordan.lee@email.com",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    },
    propertyAddress: "578 Pine Avenue",
    serviceType: "Commercial Services",
    submittedOn: "Aug 14, 2026",
    status: "Contract Signed",
  },
  {
    id: "req-13",
    requestId: "#REQ-1060",
    customer: {
      name: "Charlotte Green",
      email: "charlotte.green@email.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    },
    propertyAddress: "147 Holly Road",
    serviceType: "Residential Lawn Care",
    submittedOn: "Aug 25, 2026",
    status: "Completed",
  },
  {
    id: "req-14",
    requestId: "#REQ-1055",
    customer: {
      name: "Noah Kim",
      email: "noah.kim@mail.com",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face",
    },
    propertyAddress: "56 Aspen Drive",
    serviceType: "Landscaping & Lawn Care",
    submittedOn: "Aug 20, 2026",
    status: "On Hold",
  },
  {
    id: "req-15",
    requestId: "#REQ-1050",
    customer: {
      name: "Maya Patel",
      email: "maya.patel@mail.com",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    },
    propertyAddress: "902 Birch Road",
    serviceType: "Residential Lawn Care",
    submittedOn: "Aug 15, 2026",
    status: "Payment Complete",
  },
];

export interface StatusStyleConfig {
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  dotBg: string;
  label: string;
}

export const requestStatusStyles: Record<AdminRequestStatus, StatusStyleConfig> = {
  New: {
    badgeBg: "bg-badge-active-bg",
    badgeText: "text-badge-active-text",
    badgeBorder: "border-badge-active-border",
    dotBg: "bg-badge-active-dot",
    label: "New",
  },
  "Under Review": {
    badgeBg: "bg-terms-bg",
    badgeText: "text-badge-pending-text",
    badgeBorder: "border-terms-border",
    dotBg: "bg-badge-pending-dot",
    label: "Under Review",
  },
  "Site Visit Requested": {
    badgeBg: "bg-blue-50",
    badgeText: "text-info",
    badgeBorder: "border-blue-100",
    dotBg: "bg-info",
    label: "Site Visit Requested",
  },
  "Reschedule Requested": {
    badgeBg: "bg-tag-rescheduling-bg",
    badgeText: "text-tag-rescheduling-text",
    badgeBorder: "border-tag-rescheduling-border",
    dotBg: "bg-tag-rescheduling-text",
    label: "Reschedule Requested",
  },
  "Site Visit Scheduled": {
    badgeBg: "bg-blue-50",
    badgeText: "text-info",
    badgeBorder: "border-blue-100",
    dotBg: "bg-info",
    label: "Site Visit Scheduled",
  },
  "Site Visit Completed": {
    badgeBg: "bg-badge-active-bg",
    badgeText: "text-badge-active-text",
    badgeBorder: "border-badge-active-border",
    dotBg: "bg-badge-active-dot",
    label: "Site Visit Completed",
  },
  "Estimate Sent": {
    badgeBg: "bg-blue-50",
    badgeText: "text-info",
    badgeBorder: "border-blue-100",
    dotBg: "bg-info",
    label: "Estimate Sent",
  },
  "Estimate Accepted": {
    badgeBg: "bg-badge-active-bg",
    badgeText: "text-badge-active-text",
    badgeBorder: "border-badge-active-border",
    dotBg: "bg-badge-active-dot",
    label: "Estimate Accepted",
  },
  "Estimate Declined": {
    badgeBg: "bg-decline-secondary",
    badgeText: "text-decline",
    badgeBorder: "border-decline-border",
    dotBg: "bg-decline",
    label: "Estimate Declined",
  },
  "Estimate Expired": {
    badgeBg: "bg-decline-secondary",
    badgeText: "text-decline",
    badgeBorder: "border-decline-border",
    dotBg: "bg-decline",
    label: "Estimate Expired",
  },
  "Change Requested": {
    badgeBg: "bg-terms-bg",
    badgeText: "text-badge-pending-text",
    badgeBorder: "border-terms-border",
    dotBg: "bg-badge-pending-dot",
    label: "Change Requested",
  },
  "Contract Sent": {
    badgeBg: "bg-blue-50",
    badgeText: "text-info",
    badgeBorder: "border-blue-100",
    dotBg: "bg-info",
    label: "Contract Sent",
  },
  "Contract Signed": {
    badgeBg: "bg-badge-active-bg",
    badgeText: "text-badge-active-text",
    badgeBorder: "border-badge-active-border",
    dotBg: "bg-badge-active-dot",
    label: "Contract Signed",
  },
  Completed: {
    badgeBg: "bg-badge-active-bg",
    badgeText: "text-badge-active-text",
    badgeBorder: "border-badge-active-border",
    dotBg: "bg-badge-active-dot",
    label: "Completed",
  },
  "On Hold": {
    badgeBg: "bg-terms-bg",
    badgeText: "text-badge-pending-text",
    badgeBorder: "border-terms-border",
    dotBg: "bg-badge-pending-dot",
    label: "On Hold",
  },
  "Payment Complete": {
    badgeBg: "bg-badge-active-bg",
    badgeText: "text-badge-active-text",
    badgeBorder: "border-badge-active-border",
    dotBg: "bg-badge-active-dot",
    label: "Payment Complete",
  },
};

/**
 * Returns dynamic action buttons according to the Figma specification:
 */
export function getRequestActionOptions(
  status: AdminRequestStatus
): ServiceRequestActionOption[] {
  switch (status) {
    case "New":
    case "Under Review":
    case "Site Visit Requested":
    case "Site Visit Scheduled":
      return [
        { label: "View Details", isPrimary: true, actionKey: "view_details" },
        { label: "View Customer", actionKey: "view_customer" },
        { label: "Request Site Visit", actionKey: "request_site_visit" },
        { label: "Create Estimate", actionKey: "create_estimate" },
      ];

    case "Estimate Sent":
      return [
        { label: "View Details", isPrimary: true, actionKey: "view_details" },
        { label: "View Customer", actionKey: "view_customer" },
        { label: "View Estimate", actionKey: "view_estimate" },
        { label: "Send Reminder", actionKey: "send_reminder" },
      ];

    case "Estimate Accepted":
      return [
        { label: "View Details", isPrimary: true, actionKey: "view_details" },
        { label: "View Customer", actionKey: "view_customer" },
        { label: "View Estimate", actionKey: "view_estimate" },
        { label: "Create Contract & Agreement", actionKey: "create_contract" },
      ];

    case "Estimate Declined":
    case "Estimate Expired":
      return [
        { label: "View Details", isPrimary: true, actionKey: "view_details" },
        { label: "View Customer", actionKey: "view_customer" },
        { label: "View Estimate", actionKey: "view_estimate" },
        { label: "Archive", actionKey: "archive" },
      ];

    case "Change Requested":
      return [
        { label: "View Details", isPrimary: true, actionKey: "view_details" },
        { label: "View Customer", actionKey: "view_customer" },
        { label: "View Estimate", actionKey: "view_estimate" },
      ];

    case "Reschedule Requested":
      return [
        { label: "View Details", isPrimary: true, actionKey: "view_details" },
        { label: "View Customer", actionKey: "view_customer" },
        { label: "Review Request", actionKey: "review_request" },
      ];

    case "Site Visit Completed":
      return [
        { label: "View Details", isPrimary: false, actionKey: "view_details" },
        { label: "View Customer", isPrimary: false, actionKey: "view_customer" },
        { label: "Review Assessment", isPrimary: true, actionKey: "review_assessment" },
      ];

    case "Contract Sent":
      return [
        { label: "View Details", isPrimary: true, actionKey: "view_details" },
        { label: "View Customer", actionKey: "view_customer" },
        { label: "View Contract & Agreement", isPrimary: true, actionKey: "view_contract" },
        { label: "View Estimate", actionKey: "view_estimate" },
      ];

    case "Contract Signed":
      return [
        { label: "View Details", isPrimary: true, actionKey: "view_details" },
        { label: "View Customer", actionKey: "view_customer" },
        { label: "Schedule Service", isPrimary: true, actionKey: "schedule_service" },
        { label: "View Contract", actionKey: "view_contract" },
      ];

    case "Completed":
      return [
        { label: "View Details", isPrimary: true, actionKey: "view_details" },
        { label: "View Customer", actionKey: "view_customer" },
        { label: "View Job Details", isPrimary: true, actionKey: "view_job_details" },
      ];

    case "On Hold":
      return [
        { label: "View Details", isPrimary: true, actionKey: "view_details" },
        { label: "View Customer", actionKey: "view_customer" },
        { label: "View Estimate", actionKey: "view_estimate" },
        { label: "View Contract", actionKey: "view_contract" },
      ];

    case "Payment Complete":
      return [
        { label: "View Details", isPrimary: true, actionKey: "view_details" },
        { label: "View Customer", actionKey: "view_customer" },
        { label: "View Estimate", actionKey: "view_estimate" },
        { label: "View Contract", actionKey: "view_contract" },
        { label: "View Invoice", actionKey: "view_invoice" },
      ];

    default:
      return [
        { label: "View Details", isPrimary: true, actionKey: "view_details" },
        { label: "View Customer", actionKey: "view_customer" },
      ];
  }
}

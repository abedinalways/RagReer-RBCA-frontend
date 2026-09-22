export type RequestStatus =
  | "Draft"
  | "Request Submitted"
  | "Under Review"
  | "Site Visit Required"
  | "Site Visit Pending"
  | "Site Visit Scheduled"
  | "Site Visit in Progress"
  | "Site Visit Completed"
  | "Estimate Approval Needed"
  | "Estimate Declined"
  | "Estimate Revision Requested"
  | "Estimate Accepted"
  | "Contract Awaiting Signature"
  | "Contract Signed"
  | "Scheduled"
  | "In Progress"
  | "Completed"
  | "Waiting For Payment"
  | "Payment Due"
  | "Payment Completed"
  | "On Hold";

export interface RequestItem {
  id: string;
  requestId: string;
  propertyAddress: string;
  serviceType: string;
  submittedOn: string;
  status: RequestStatus;
}

export interface StatusStyle {
  label: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  dotBg: string;
}

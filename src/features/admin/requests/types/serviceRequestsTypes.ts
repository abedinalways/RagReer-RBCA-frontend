export type AdminRequestStatus =
  | "New"
  | "Under Review"
  | "Site Visit Requested"
  | "Reschedule Requested"
  | "Site Visit Scheduled"
  | "Site Visit Completed"
  | "Estimate Sent"
  | "Estimate Accepted"
  | "Estimate Declined"
  | "Change Requested"
  | "Contract Sent"
  | "Contract Signed"
  | "Completed"
  | "On Hold"
  | "Payment Complete";

export interface AdminServiceRequestCustomer {
  name: string;
  email: string;
  avatar: string;
}

export interface AdminServiceRequest {
  id: string;
  requestId: string;
  customer: AdminServiceRequestCustomer;
  propertyAddress: string;
  serviceType: string;
  submittedOn: string;
  status: AdminRequestStatus;
}

export interface ServiceRequestActionOption {
  label: string;
  isPrimary?: boolean;
  actionKey: string;
}

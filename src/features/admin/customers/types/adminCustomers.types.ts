export type CustomerTabKey =
  | "overview"
  | "properties"
  | "services"
  | "proposals"
  | "estimates"
  | "contracts"
  | "contracts-agreements"
  | "invoices"
  | "payments"
  | "billing"
  | "activity"
  | "calendar";

export type CustomerStatus = "Draft" | "Active" | "Inactive" | "Pending";

export interface CustomerUpcomingVisit {
  id: string;
  month: string;
  day: string;
  duration: string;
  status: "Scheduled";
  title: string;
  subtitle: string;
  location: string;
  crewName: string;
  crewAvatars: string[];
}

export interface CustomerActiveJob {
  id: string;
  requestId?: string;
  propertyAddress: string;
  service: string;
  serviceType: "Recurring" | "One-Time";
  assignedCrew: { id: string; name: string; avatar: string }[];
  status:
    | "In Progress"
    | "Scheduled"
    | "Waiting for Review"
    | "Completed"
    | "Site Visit in Progress"
    | "Site Visit Completed"
    | "Site Visit Scheduled"
    | "Estimate Approved"
    | "Estimate Declined"
    | "Estimate Accepted"
    | "Contract Signed"
    | "On Hold"
    | "Waiting For Payment"
    | "Cancelled";
  nextVisit: string;
}

export interface CustomerActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "orange" | "blue" | "amber" | "green";
}

export interface CustomerPropertyItem {
  id: string;
  title: string;
  category: "Residential" | "Commercial" | "Church" | "HOA";
  status: "Active" | "Inactive";
  address: string;
  size: string;
  imageUrl: string;
}

export type CustomerEstimateStatus =
  | "Draft"
  | "Sent"
  | "Pending Approval"
  | "Approved"
  | "Change Requested"
  | "Expired"
  | "Declined"
  | "Cancelled";

export interface CustomerEstimateItem {
  id: string;
  requestId: string;
  propertyAddress: string;
  serviceType: string;
  issueDate: string;
  status: CustomerEstimateStatus;
  amount: string;
}

export interface CustomerItem {
  id: string; // e.g. "CTR-1278"
  customerCode?: string; // e.g. "#CTR-1278"
  name: string;
  avatar: string;
  status: CustomerStatus;
  customerType: "Individual" | "Portfolio" | "Residential" | "Commercial";
  role:
    | "Customer"
    | "Crew Member"
    | "Crew Leader"
    | "Property Owner"
    | "Property Manager"
    | "Tenant"
    | "General Contractor";
  organizationName?: string;
  email: string;
  phone: string;
  billingType:
    | "Per Visit"
    | "Consolidated Monthly"
    | "Separate Per Property"
    | "Monthly"
    | "Prepaid"
    | "Net 30";
  portalAccess: "Sent" | "Pending" | "Joined";
  portalAccessEnabled?: boolean;
  memberSince: string;
  activeServicesCount: number | string;
  propertiesCount: number | string;
  outstandingAmount: string;
}

export interface NewCustomerFormData {
  fullName: string;
  organizationName: string;
  makePrimaryName: boolean;
  customerType: string;
  role: string;
  email: string;
  phone: string;
  billingType: string;
  defaultPassword?: string;
  sendInvitation: boolean;
}

export type CustomerContractStatus =
  | "Draft"
  | "Sent"
  | "Pending"
  | "Signed"
  | "Expired"
  | "Active";

export interface CustomerContractItem {
  id: string;
  contractId: string;
  service: string;
  propertiesCount: number;
  agreement: string;
  billing: string;
  startDate: string;
  endDate: string;
  status: CustomerContractStatus;
}

export interface CustomerBillingSummary {
  poNumber: string;
  accountName: string;
  totalBilledAmount: string;
  paidAmount: string;
  outstandingAmount: string;
  overdueAmount: string;
}

export interface CustomerBillingSettings {
  billingType: string;
  validity: string;
  consolidatedBilling: string;
}

export type CustomerPaymentStatus = "Pending" | "Paid" | "Due";

export interface CustomerPaymentItem {
  id: string;
  invoiceId: string;
  service: string;
  propertiesCount: number;
  billingPeriod: string;
  amount: string;
  dueDate: string;
  method: string;
  status: CustomerPaymentStatus;
}



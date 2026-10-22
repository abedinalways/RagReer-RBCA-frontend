export type CustomerTabKey =
  | "overview"
  | "properties"
  | "services"
  | "proposals"
  | "contracts-agreements"
  | "billing"
  | "activity";

export type CustomerStatus = "Draft" | "Active" | "Inactive";

export interface CustomerItem {
  id: string; // e.g. "CTR-1278"
  name: string;
  avatar: string;
  status: CustomerStatus;
  customerType: "Residential" | "Commercial";
  role: "Property Owner" | "Property Manager" | "Tenant" | "General Contractor";
  organizationName?: string;
  email: string;
  phone: string;
  billingType: "Per Visit" | "Monthly" | "Prepaid" | "Net 30";
  portalAccess: "Sent" | "Pending" | "Joined";
  memberSince: string;
  activeServicesCount: number;
  propertiesCount: number;
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

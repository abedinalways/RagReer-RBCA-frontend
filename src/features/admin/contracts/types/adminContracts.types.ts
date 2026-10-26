export type AdminContractStatus =
  | "Draft"
  | "Sent"
  | "Pending Signature"
  | "Active"
  | "Completed"
  | "Expired"
  | "Terminated";

export interface AdminContractCustomer {
  name: string;
  email: string;
  contact?: string;
  address?: string;
  avatarUrl?: string;
}

export interface ContractScheduleData {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  daysOfWeek: string[];
  estimatedDuration: string;
  estimatedVisits: number;
  perMonth: number;
}

export interface ContractPricingData {
  contractValue: string;
  paymentType: string;
  billingFrequency: string;
  billingDate: string;
  billingTerms: string;
  billingPreferences: string;
}

export type BillingTypeOption =
  | "One-Time"
  | "Monthly"
  | "Consolidated Monthly"
  | "Separate Per Property";

export interface AdminContractItem {
  id: string;
  contractId: string;
  estimateId: string;
  requestId?: string;
  customer: AdminContractCustomer;
  propertyAddress: string;
  serviceType: string;
  serviceAgreementType: string;
  requestType: string;
  frequency: string;
  startDate: string;
  endDate: string;
  amount: string;
  status: AdminContractStatus;
  scopeOfWork?: string;
  schedule?: ContractScheduleData;
  pricing?: ContractPricingData;
  billingType?: BillingTypeOption;
}

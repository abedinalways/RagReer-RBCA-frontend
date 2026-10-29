export type AdminContractStatus =
  | "Draft"
  | "Sent"
  | "Pending Sign"
  | "Pending Signature"
  | "Signed"
  | "Change Requested"
  | "Active"
  | "Cancelled"
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
  estimateId?: string;
  requestId?: string;
  customer: AdminContractCustomer;
  propertyAddress: string;
  serviceType: string;
  agreementType: string;
  period: string;
  serviceAgreementType?: string;
  requestType?: string;
  frequency?: string;
  startDate?: string;
  endDate?: string;
  amount?: string;
  status: AdminContractStatus;
  scopeOfWork?: string;
  schedule?: ContractScheduleData;
  pricing?: ContractPricingData;
  billingType?: BillingTypeOption;
}

export interface ContractLineItem {
  id: string;
  description: string;
  quantity: string;
  rate: string;
  amount: string;
}

export interface ContractPropertyInfo {
  name: string;
  address: string;
  imageUrl?: string;
}

export interface ContractDetailData {
  id: string;
  contractId: string;
  status: AdminContractStatus;
  createdAt: string;
  version: string | number;
  agreementTitle: string;
  provider: {
    name: string;
    email: string;
    phone: string;
  };
  customer: AdminContractCustomer;
  requestedService: string;
  requestType?: string;
  serviceAgreementType: string;
  contractDuration: string;
  contractValue: string;
  scopeOfWork: string;
  includedServices: {
    title: string;
    workIncluded: string[];
  }[];
  lineItems: ContractLineItem[];
  totalEstimates: string;
  termsAndConditions: {
    clauseNumber: string;
    title: string;
    content: string;
  };
  property: ContractPropertyInfo;
  scheduling: {
    frequency: string;
    startDate: string;
    endDate: string;
    preferredTime: string;
    estimateDuration: string;
    estimateVisit: string;
    dayOfWeek?: string;
    daysOfWeek?: string[];
  };
  paymentTerms: {
    monthlyAmount: string;
    nextPaymentDate: string;
    paymentType: string;
    billingFrequency: string;
    paymentDuration: string;
  };
  accessNote: string;
  signatureInfo?: ContractSignatureReviewData;
}

export interface ContractSignatureReviewData {
  organizationName: string;
  authorizedPersonName: string;
  authority: string;
  dateOfSignature: string;
  type: "drawn" | "upload";
  fileName?: string;
  fileSize?: string;
  signatureDataUrl?: string;
  documentVersion?: string;
}


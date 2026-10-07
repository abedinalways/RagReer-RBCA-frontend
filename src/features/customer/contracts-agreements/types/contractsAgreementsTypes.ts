export type ContractStatus =
  | "Pending Approval"
  | "Active"
  | "Contract Signed"
  | "Amendment Signed"
  | "Expired"
  | "Declined";

export interface ContractItem {
  id: string;
  contractId: string;
  propertyAddress: string;
  serviceType: string;
  issueDate: string;
  status: ContractStatus;
  amount: string;
}

export interface ContractStatusStyle {
  label: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  dotBg: string;
}

export interface ContractIncludedService {
  title: string;
  workIncluded: string[];
}

export interface ContractLineItem {
  description: string;
  quantity: string;
  rate: string;
  amount: string;
}

export interface ContractTermItem {
  id: number;
  title: string;
  content: string;
}

export interface ContractPropertyInfo {
  title: string;
  address: string;
  image: string;
  propertyId?: string;
}

export interface ContractSchedulingInfo {
  frequency: string;
  startDate: string;
  endDate: string;
  preferredTime: string;
  estimateDuration: string;
  estimateVisit: string;
}

export interface ContractPaymentInfo {
  monthlyRate: string;
  nextPaymentDate: string;
  paymentType: string;
  billingFrequency: string;
  paymentDuration: string;
}

export interface ContractSignatureData {
  organizationName: string;
  authorizedPersonName: string;
  authority: string;
  dateOfSignature: string;
  method: "file" | "draw";
  signatureDataUrl?: string;
  fileName?: string;
  fileSize?: string;
  documentVersion?: string;
  signedAt?: string;
  consentAgreed?: boolean;
}

export interface ContractVersionHistoryItem {
  id: string;
  versionNumber: number;
  versionLabel: string;
  issuedDate: string;
  signedDate: string;
  status: "Signed" | "Pending" | "Amendment Signed";
  downloadUrl?: string;
  documentVersion?: string;
}

export interface ContractDetailData {
  id: string;
  contractId: string;
  status: ContractStatus;
  issueDate: string;
  version: string;
  documentVersion?: string;
  agreementTitle: string;
  provider: {
    name: string;
    email: string;
    phone: string;
  };
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  requestedService: string;
  requestedServiceType?: string;
  serviceAgreementType: string;
  contractDuration: string;
  contractValue: string;
  totalEstimateAmount?: string;
  signedNotificationEmail?: string;
  serviceDetails: {
    scopeOfWork: string;
    includedServices: ContractIncludedService[];
  };
  pricing: {
    lineItems: ContractLineItem[];
    totalEstimates: string;
  };
  termsAndConditions: ContractTermItem[];
  property: ContractPropertyInfo;
  schedulingDetails: ContractSchedulingInfo;
  paymentTerms: ContractPaymentInfo;
  accessNote: string;
  signatureInfo?: ContractSignatureData;
  versionHistory?: ContractVersionHistoryItem[];
}

export interface ColumnDef<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

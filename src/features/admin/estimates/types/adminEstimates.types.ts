export type AdminEstimateStatus =
  | "Draft"
  | "Sent"
  | "Under Review"
  | "Change Requested"
  | "Approved"
  | "Expired"
  | "Declined";

export interface AdminEstimateCustomer {
  name: string;
  email: string;
  avatarUrl?: string;
  phone?: string;
  address?: string;
}

export interface AdminEstimateLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface AdminEstimateItem {
  id: string;
  estimateId: string;
  requestId: string;
  customer: AdminEstimateCustomer;
  propertyAddress: string;
  serviceType: string;
  issueDate: string;
  amount: string;
  status: AdminEstimateStatus;
  subtotal?: string;
  tax?: string;
  notes?: string;
  lineItems?: AdminEstimateLineItem[];
}

export interface EstimateDetailLineItem {
  id: string;
  description: string;
  quantity: string;
  rate: string;
  amount: string;
}

export interface SiteVisitInfo {
  completed: boolean;
  property: string;
  dateTime: string;
  visitedBy: string;
}

export interface CustomerChangeRequest {
  changeTarget: string;
  reason: string;
  attachedPhotos: string[];
}

export interface EstimateDetailData {
  id: string;
  estimateId: string;
  status: AdminEstimateStatus;
  createdDate: string;
  version: string;
  hasSiteVisit: boolean;
  property: {
    name: string;
    address: string;
    category: string;
    size: string;
    imageUrl: string;
  };
  scopeOfWork: string;
  termsAndConditions: string;
  serviceDetails: {
    lawnCare: string[];
    additionalServices: string[];
  };
  estimateDuration: string;
  siteAssessmentNotes?: string;
  lineItems: EstimateDetailLineItem[];
  siteAssessmentLineItems?: EstimateDetailLineItem[];
  financialSummary: {
    subtotal: string;
    discount: string;
    tax: string;
    total: string;
    priorPayment: string;
    remainingBalance: string;
  };
  requestSummary: {
    requestId: string;
    createdOn: string;
    requestedService: string;
    requestType: string;
    frequency: string;
  };
  validityPeriod: {
    till: string;
    total: string;
  };
  siteVisit?: SiteVisitInfo;
  halfStacheNote?: string;
  changeRequest?: CustomerChangeRequest;
  approvedOn?: string;
  expiredOn?: string;
  declinedOn?: string;
  declineReason?: string;
  siteVisitStatusText?: string;
  siteVisitCompletedOnText?: string;
}


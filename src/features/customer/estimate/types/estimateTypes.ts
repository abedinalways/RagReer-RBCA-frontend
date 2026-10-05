export type EstimateStatus = "Pending Approval" | "Approved" | "Declined";

export interface EstimateItem {
  id: string;
  estimateId: string;
  requestId: string;
  propertyAddress: string;
  serviceType: string;
  issueDate: string;
  status: EstimateStatus;
  amount: string;
  hasSiteVisit?: boolean;
}

export interface EstimateStatusStyle {
  label: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  dotBg: string;
}

export interface ColumnDef<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface EstimateLineItem {
  id: string;
  description: string;
  quantity: string;
  rate: string;
  amount: string;
}

export interface EstimateServiceGroup {
  title: string;
  workIncluded: string[];
}

export interface EstimatePropertyInfo {
  title: string;
  address: string;
  tag: string;
  size: string;
  imageUrl: string;
}

export interface EstimateSiteVisitInfo {
  status: string;
  propertyAddress: string;
  dateTime: string;
  visitedBy: string;
}

export interface EstimateRequestSummaryInfo {
  requestId: string;
  createdOn: string;
  requestedService: string;
  requestType: string;
  frequency: string;
}

export interface EstimateFinancials {
  subtotal: string;
  discount: string;
  tax: string;
  total: string;
  priorPayment?: string;
  remainingBalance?: string;
}

export interface EstimateApprovalInfo {
  approvedOn: string;
  siteVisitStatus: string;
  completedOn: string;
}

export interface EstimateDeclineInfo {
  declinedOn: string;
  reason: string;
}

export interface EstimateDetailData {
  id: string;
  estimateId: string;
  version: string;
  issueDate: string;
  status: EstimateStatus;
  hasSiteVisit: boolean;
  halfStacheNote?: string;
  property: EstimatePropertyInfo;
  scopeOfWork: string;
  serviceDetails: EstimateServiceGroup[];
  estimateDuration: string;
  siteAssessmentNote?: string;
  lineItems: EstimateLineItem[];
  siteAssessmentLineItems?: EstimateLineItem[];
  financials: EstimateFinancials;
  termsAndConditions: string;
  requestSummary: EstimateRequestSummaryInfo;
  validTill?: string;
  siteVisit?: EstimateSiteVisitInfo;
  approvalInfo?: EstimateApprovalInfo;
  declineInfo?: EstimateDeclineInfo;
}


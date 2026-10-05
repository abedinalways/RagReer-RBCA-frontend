import type { RequestStatus } from "./myRequestsTypes";

export type { RequestStatus };

export type RequestDetailStateKey =
  | "draft"
  | "submitted"
  | "submitted-update"
  | "submitted-original"
  | "estimate-approval"
  | "estimate-revision"
  | "estimate-accepted"
  | "estimate-declined"
  | "contract-awaiting"
  | "contract-signed"
  | "scheduled"
  | "in-progress"
  | "completed"
  | "payment-due"
  | "waiting-payment"
  | "on-hold"
  | "on-hold-approved"
  | "site-visit-required"
  | "site-visit-confirmed"
  | "site-visit-in-progress"
  | "site-visit-completed";

export interface ServiceGroup {
  category: string;
  items: string[];
}

export interface PropertyDetails {
  title: string;
  address: string;
  tag: string;
  imageUrl: string;
  description: string;
  size: string;
}

export type DotTextColor = "green" | "red" | "amber" | "grey" | "blue";

export interface EstimateDetails {
  status: string;
  totalAmount: string;
  statusDotColor?: DotTextColor;
  statusTextColor?: DotTextColor;
  buttonLabel?: string;
}

export interface ContractDetails {
  status: string;
  period: string;
  statusDotColor?: DotTextColor;
  statusTextColor?: DotTextColor;
  buttonLabel?: string;
}

export interface PaymentDetails {
  status: string;
  billingCycle: string;
  amount: string;
  statusDotColor?: DotTextColor;
  statusTextColor?: DotTextColor;
  buttonLabel?: string;
}

export interface AdditionalWorkDetails {
  status: string;
  serviceName: string;
  amount: string;
  statusDotColor?: DotTextColor;
  statusTextColor?: DotTextColor;
  buttonLabel?: string;
  isPrimaryButton?: boolean;
}

export interface SchedulingDetails {
  frequency: string;
  startDate: string;
  endDate: string;
  preferredTime: string;
  estimateDuration: string;
  estimateVisit: string;
}

export interface SiteVisitDetails {
  status: string;
  month: string;
  day: string;
  dayOfWeek: string;
  propertyTitle: string;
  address: string;
  time: string;
  crewName: string;
  crewAvatar?: string;
  isConfirmed?: boolean;
  customerWillBeVisiting?: boolean;
}

export interface CompletedSiteVisitSidebarDetails {
  status: string;
  propertyAddress: string;
  dateTime: string;
  visitedBy: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  dotColor?: "grey" | "amber" | "green" | "red" | "blue";
}

export interface CustomerUpdate {
  date: string;
  message: string;
}

export interface RequestDetailData {
  id: string;
  displayId: string;
  version?: string;
  hideHeaderMeta?: boolean;
  topBannerNote?: string;
  title: string;
  createdOn: string;
  status: RequestStatus;
  requestType: string;
  requestedDateTime: string;
  optionalDateTime: string;
  serviceCount: string;
  description: string;
  serviceGroups: ServiceGroup[];
  siteAccessNotes: string;
  attachedPhotos: string[];
  property: PropertyDetails;
  siteVisit?: SiteVisitDetails;
  completedSiteVisit?: CompletedSiteVisitSidebarDetails;
  originalServiceHeading?: boolean;
  estimate?: EstimateDetails;
  contract?: ContractDetails;
  additionalWorkHeading?: string;
  additionalWork?: AdditionalWorkDetails;
  payment?: PaymentDetails;
  scheduling?: SchedulingDetails;
  customerUpdate?: CustomerUpdate;
  halfStacheNote?: string;
  isOriginalView?: boolean;
  activityHistory: ActivityItem[];
}



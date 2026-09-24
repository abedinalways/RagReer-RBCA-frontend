import type { RequestStatus } from "./myRequestsTypes";

export type { RequestStatus };

export type RequestDetailStateKey =
  | "estimate-approval"
  | "draft"
  | "submitted";

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

export interface EstimateDetails {
  status: string;
  totalAmount: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
}

export interface CustomerUpdate {
  date: string;
  message: string;
}

export interface RequestDetailData {
  id: string;
  displayId: string;
  version?: string;
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
  estimate?: EstimateDetails;
  customerUpdate?: CustomerUpdate;
  halfStacheNote?: string;
  activityHistory: ActivityItem[];
}

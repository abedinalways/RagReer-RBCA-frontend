import { JobPipelineStatus } from "./jobPipelineTypes";

export interface JobCustomerDetail {
  id: string;
  name: string;
  customerType: string;
  role: string;
  email: string;
  billingType: string;
}

export interface JobPropertyDetail {
  id: string;
  name: string;
  address: string;
  maintainer: string;
  contact: string;
  siteAccess: string;
}

export interface JobSummaryDetail {
  requestedService: string;
  requestType: string;
  frequency: string;
  serviceAgreementType: string;
  amount: string;
  scheduleDate: string;
  arrivalWindow: string;
}

export interface JobEquipmentDetail {
  name: string;
  category: string;
}

export interface JobCrewMemberDetail {
  id: string;
  name: string;
  role: string;
  avatar: string;
  strikeCount: number;
  isLeader?: boolean;
}

export interface JobTimeTrackingRow {
  id: string;
  name: string;
  role: string;
  avatar: string;
  travelStart: string;
  arrived: string;
  workStart: string;
  breakTime: string;
  workStop: string;
  currentStatus: string;
  totalTime: string;
  billableHours: string;
}

export interface JobTaskCompletionItem {
  id: string;
  task: string;
  assignedCrew: string;
  status: string;
  evidence: string;
}

export interface JobDetailData {
  id: string;
  jobId: string;
  title: string;
  status: JobPipelineStatus;
  createdOn: string;
  customer: JobCustomerDetail;
  property: JobPropertyDetail;
  description: string;
  serviceIncluded: string[];
  equipment: JobEquipmentDetail[];
  summary: JobSummaryDetail;
  crew: JobCrewMemberDetail[];
  additionalCrewCount: number;
  timeTracking: JobTimeTrackingRow[];
  tasks: JobTaskCompletionItem[];
}

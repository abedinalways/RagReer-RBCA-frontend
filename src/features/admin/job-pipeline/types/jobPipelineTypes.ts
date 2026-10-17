export type JobPipelineStatus =
  | "Scheduled"
  | "In Progress"
  | "Awaiting Review"
  | "Completed"
  | "Quality Issue"
  | "Invoice Sent"
  | "Paid"
  | "On Hold";

export interface JobCrewMember {
  id: string;
  name: string;
  avatar: string;
  role?: string;
}

export interface JobPipelineCustomer {
  name: string;
  email: string;
  avatar: string;
}

export interface JobPipelineItem {
  id: string;
  jobId: string;
  customer: JobPipelineCustomer;
  propertyAddress: string;
  service: string;
  serviceType: string;
  assignedCrew: JobCrewMember[];
  taskCompleted: string;
  status: JobPipelineStatus;
  dateCategory: "Today" | "Yesterday" | "This Week" | "This Month" | "All Time";
}

export interface JobPipelineKPI {
  todaysJobs: number;
  inProgress: number;
  awaitingReview: number;
  qualityIssue: number;
  fieldHoursLogged: string;
}

export interface JobPipelineActionOption {
  label: string;
  actionKey: string;
  isPrimary?: boolean;
  isDestructive?: boolean;
}

export interface JobStatusStyle {
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  dotBg: string;
  label: string;
}

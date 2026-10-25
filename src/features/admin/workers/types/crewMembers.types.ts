export type CrewMemberStatus = "Active" | "Inactive" | "Suspended";
export type CrewMemberRole = "Leader" | "Member";

export type CrewTabKey =
  | "overview"
  | "jobs"
  | "time"
  | "performance"
  | "activity";

export interface CrewMemberItem {
  id: string;
  crewId: string;
  name: string;
  firstName?: string;
  lastName?: string;
  profession?: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  address?: string;
  dateJoined?: string;
  avatar: string;
  role: CrewMemberRole;
  jobsThisMonth: string | number;
  payableThisMonth: string;
  strikes: number;
  status: CrewMemberStatus;
  hourlyRate?: string;
  frequency?: string;
  effectiveFrom?: string;
  sendInvitation?: boolean;
  bio?: string;
  activeJobs?: number;
  workedThisMonth?: string;
  netPayable?: string;
  qualityFlags?: number;
}

export interface NewCrewMemberFormData {
  fullName: string;
  email: string;
  phone: string;
  hourlyRate: string;
  frequency: string;
  dateJoined: string;
  defaultPassword?: string;
  sendInvitation: boolean;
  role?: CrewMemberRole;
}

export interface RouteAssignedMember {
  id: string;
  name: string;
  avatar: string;
  strikes: number;
}

export interface TodayRouteItem {
  id: string;
  title: string;
  status: "In Progress" | "Scheduled" | "Completed";
  time: string;
  address: string;
  crewTeamName: string;
  assignedMembers: RouteAssignedMember[];
}

export interface CrewActivityItem {
  id: string;
  type: "travel" | "login" | "assignment" | "status" | "general";
  dotColor: "blue" | "amber" | "green" | "red";
  title: string;
  description: string;
  timestamp: string;
}

export interface CrewMemberLogItem {
  id: string;
  action: string;
  performedBy: string;
  timestamp: string;
  details: string;
  category: "status_change" | "job_assigned" | "strike" | "payroll" | "general";
}

export interface SetHourlyRateFormData {
  hourlyRate: string;
  payFrequency: string;
  effectiveFrom: string;
}

export type CrewJobStatus =
  | "In Progress"
  | "Scheduled"
  | "Completed"
  | "Pending Review"
  | "Revision Requested";

export interface CrewAssignedJob {
  id: string;
  jobCode: string;
  date: string;
  time: string;
  customerName: string;
  customerEmail: string;
  customerAvatar: string;
  propertyAddress: string;
  service: string;
  role: "Leader" | "Member";
  status: CrewJobStatus;
}

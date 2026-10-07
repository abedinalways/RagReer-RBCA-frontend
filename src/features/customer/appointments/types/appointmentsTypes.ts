export type AppointmentStatus =
  | "Preference Submitted"
  | "Pending Confirmation"
  | "Confirmed"
  | "Crew Assigned"
  | "Upcoming"
  | "On Going"
  | "Delayed"
  | "Completed"
  | "Cancelled"
  | "Reschedule Requested";

export interface CrewMember {
  id: string;
  name: string;
  role: "Lead" | "Member";
  avatar: string;
}

export interface AppointmentItem {
  id: string;
  title: string;
  serviceCategory: "Residential Lawn Care" | "Commercial Services" | "Landscape & Property Maintenance";
  propertyType: "Residential" | "Commercial";
  propertyName: string;
  propertyAddress: string;
  propertyImage: string;
  propertyId: string;
  date: string; // "2026-08-04" format
  dateDisplay: string; // "Aug 26, 2026"
  timeSlot: string; // "09.30 AM - 11.30 AM"
  arrivalWindow: string; // "11:00AM-12:00 PM"
  duration: string; // "4-5 hours"
  serviceType: string; // "Recurring, Weekly"
  accessRequirements: string; // "Get code required, No pets outside, Street parking only"
  status: AppointmentStatus;
  assignedCrew: CrewMember[];
  reschedulingPolicy?: string;
  estimateId?: string;
  contractId?: string;
}

export interface StatusStyleConfig {
  label: string;
  dotColor: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  cardBg: string;
  cardBorder: string;
  accentBar: string;
}

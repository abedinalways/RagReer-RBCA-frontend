export type AdminAppointmentStatus =
  | "Scheduled"
  | "Assigned"
  | "In Progress"
  | "Completed"
  | "Rescheduled"
  | "Cancelled"
  | "Holiday"
  | "Weekend";

export interface CrewMember {
  id: string;
  name: string;
  role: "Lead" | "Member";
  avatar: string;
}

export interface AdminAppointmentItem {
  id: string; // e.g. "JOBID12578"
  jobId: string; // e.g. "job-1" or "JOBID12578"
  title: string; // "Residential Lawn Care" | "Commercial Services" | "Landscape & Property Maintenance"
  serviceCategory: string;
  propertyType: "Residential" | "Commercial";
  propertyName: string;
  propertyAddress: string;
  propertyImage: string;
  date: string; // "2026-08-04" format
  dateDisplay: string; // "Aug 26, 2026"
  timeSlot: string; // "09.30 AM - 11.30 AM" or "12:00 PM - 05:00 PM"
  arrivalWindow: string; // "11:00AM-12:00 PM"
  duration: string; // "4-5 hours"
  serviceType: string; // "Recurring, Weekly"
  accessRequirements: string; // "Get code required, No pets outside, Street parking only"
  status: AdminAppointmentStatus;
  assignedCrew: CrewMember[];
  assignedEquipment: string[];
  cancellationReason?: string;
  rescheduleReason?: string;
}

export interface AdminStatusStyleConfig {
  label: AdminAppointmentStatus;
  dotColor: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  cardBg: string;
  cardBorder: string;
  accentBar: string;
}

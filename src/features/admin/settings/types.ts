export type SettingsTabId =
  | "general"
  | "scheduling"
  | "billing"
  | "notifications"
  | "security"
  | "system";

export interface CompanySettings {
  name: string;
  email: string;
  phone: string;
  website: string;
  logoUrl?: string;
  address: string;
  country: string;
  city: string;
  postalCode: string;
  timezone: string;
  currency: string;
  dateFormat: string;
}

export interface SchedulingSettings {
  workingDaysTime: string;
  enableWeekendService: boolean;
  federalHolidays: boolean;
  customHolidays: boolean;
  weatherDelayPolicy: string;
  allowOutsideBusinessHours: boolean;
  allowOverlappingCrewAssignments: boolean;
}

export interface BillingSettings {
  invoiceDueDays: number;
  reminders: {
    sevenDaysBefore: boolean;
    dueDateReminder: boolean;
    threeDaysOverdue: boolean;
    tenDaysOverdue: boolean;
    fourteenDaysOverdue: boolean;
  };
  acceptedMethods: {
    cloverCard: boolean;
    cash: boolean;
    ach: boolean;
  };
  billingTypeDefault: {
    consolidated: boolean;
    separate: boolean;
  };
}

export interface NotificationRow {
  id: string;
  title: string;
  text: boolean;
  email: boolean;
}

export interface NotificationCategory {
  id: string;
  title: string;
  items: NotificationRow[];
}

export interface ActiveSession {
  id: string;
  device: string;
  location: string;
  ip: string;
  type: "laptop" | "mobile";
}

export interface IpWhitelistItem {
  id: string;
  ip: string;
  label: string;
  addedBy: string;
  date: string;
  status: "Active" | "Disabled";
}

export interface SystemSettings {
  userRegistration: boolean;
  crewRegistration: boolean;
  maintenanceMode: boolean;
}

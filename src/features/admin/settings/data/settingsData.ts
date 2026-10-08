import {
  CompanySettings,
  SchedulingSettings,
  BillingSettings,
  NotificationCategory,
  ActiveSession,
  IpWhitelistItem,
  SystemSettings,
} from "../types";

export const INITIAL_SYSTEM_SETTINGS: SystemSettings = {
  userRegistration: true,
  crewRegistration: true,
  maintenanceMode: false,
};

export const INITIAL_COMPANY_SETTINGS: CompanySettings = {
  name: "HALF STACHE",
  email: "halfstache@gmail.com",
  phone: "999-(1245)-555",
  website: "999-(1245)-555",
  logoUrl: "/images/halfstache_logo.png",
  address: "123 Sunset Boulevard, Los Angeles, CA",
  country: "United States",
  city: "Los Angeles",
  postalCode: "90028",
  timezone: "(UTC + 09:00) USA",
  currency: "USD",
  dateFormat: "dd/mm/yyyy",
};

export const INITIAL_SCHEDULING_SETTINGS: SchedulingSettings = {
  workingDaysTime: "Monday - Friday, 08:00 AM - 05:00 PM",
  enableWeekendService: false,
  federalHolidays: false,
  customHolidays: false,
  weatherDelayPolicy: "Auto-reschedule to next available business day",
  allowOutsideBusinessHours: false,
  allowOverlappingCrewAssignments: false,
};

export const INITIAL_BILLING_SETTINGS: BillingSettings = {
  invoiceDueDays: 30,
  reminders: {
    sevenDaysBefore: true,
    dueDateReminder: true,
    threeDaysOverdue: true,
    tenDaysOverdue: true,
    fourteenDaysOverdue: true,
  },
  acceptedMethods: {
    cloverCard: true,
    cash: true,
    ach: false,
  },
  billingTypeDefault: {
    consolidated: true,
    separate: true,
  },
};

export const INITIAL_NOTIFICATION_CATEGORIES: NotificationCategory[] = [
  {
    id: "service-requests",
    title: "Service Requests & Customer",
    items: [
      { id: "new-request", title: "New service request", text: false, email: true },
      { id: "change-request", title: "Customer change request", text: false, email: true },
      { id: "reschedule-request", title: "Customer reschedule request", text: false, email: true },
    ],
  },
  {
    id: "estimate-contract",
    title: "Estimate & Contract",
    items: [
      { id: "est-approved", title: "Estimate approved", text: false, email: true },
      { id: "est-change", title: "Estimate change requested", text: false, email: true },
      { id: "contract-signed", title: "Contract signed", text: false, email: true },
    ],
  },
  {
    id: "jobs-crew",
    title: "Jobs & Crew",
    items: [
      { id: "job-assigned", title: "Job assigned", text: false, email: true },
      { id: "job-rescheduled", title: "Job rescheduled", text: false, email: true },
      { id: "job-completed", title: "Job completed", text: false, email: true },
      { id: "crew-time", title: "Crew time entry & exit", text: false, email: true },
      { id: "completion-review", title: "Completion work review", text: false, email: true },
    ],
  },
  {
    id: "financial",
    title: "Financial",
    items: [
      { id: "inv-paid", title: "Invoice payment received", text: false, email: true },
      { id: "cash-record", title: "Cash payment record", text: false, email: true },
      { id: "overdue-inv", title: "Overdue invoice", text: false, email: true },
      { id: "payment-reminder", title: "Payment reminder", text: false, email: true },
      { id: "refund-process", title: "Refund process", text: false, email: true },
    ],
  },
  {
    id: "system",
    title: "System",
    items: [
      { id: "new-crew", title: "New crew member registered on app", text: false, email: true },
      { id: "accepted-invite", title: "Customer accepted portal invitation", text: false, email: true },
      { id: "connectivity-error", title: "Sync or connectivity error", text: false, email: true },
    ],
  },
];

export const INITIAL_ACTIVE_SESSIONS: ActiveSession[] = [
  {
    id: "sess-1",
    device: "MacBook Pro - Chrome",
    location: "Jakarta, ID • IP: 114.120.0.0",
    ip: "114.120.0.0",
    type: "laptop",
  },
  {
    id: "sess-2",
    device: "Android - Chrome",
    location: "Jakarta, ID • IP: 114.120.0.0",
    ip: "114.120.0.0",
    type: "mobile",
  },
];

export const INITIAL_IP_WHITELIST: IpWhitelistItem[] = [
  {
    id: "ip-1",
    ip: "192.168.1.1",
    label: "Office Network",
    addedBy: "Admin",
    date: "Jul 27, 2026",
    status: "Active",
  },
  {
    id: "ip-2",
    ip: "192.168.1.1",
    label: "Company VPN",
    addedBy: "Admin",
    date: "Jul 27, 2026",
    status: "Active",
  },
  {
    id: "ip-3",
    ip: "192.168.1.1",
    label: "Office Network",
    addedBy: "Admin",
    date: "Jul 27, 2026",
    status: "Disabled",
  },
];

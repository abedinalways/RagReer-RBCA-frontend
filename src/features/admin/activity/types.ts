export type ActivityDateGroup = "Today" | "Yesterday" | "Last Week";

export type ActivityActionType =
  | "All Actions"
  | "Jobs"
  | "Services"
  | "Contracts"
  | "Estimate"
  | "Schedule"
  | "Payments"
  | "Invoices"
  | "Equipments";

export type ActivityUserRole =
  | "All Users"
  | "Admin"
  | "Customers"
  | "Crews";

export type ActivityDateFilter =
  | "Date Range"
  | "Today"
  | "Yesterday"
  | "Last 7 Days"
  | "Last 30 Days";

export type ActivityDotColor = "yellow" | "green" | "blue" | "purple" | "red";

export interface ActivityLogItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  dateGroup: ActivityDateGroup;
  actionType: ActivityActionType;
  userRole: ActivityUserRole;
  dotColor: ActivityDotColor;
  actorName: string;
  targetId?: string;
  createdAt: string;
}

export interface ActivityFilters {
  search: string;
  dateRange: ActivityDateFilter;
  userRole: ActivityUserRole;
  actionType: ActivityActionType;
}

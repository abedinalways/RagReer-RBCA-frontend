

import { getModulePermissions, PERMISSIONS, type Permission, type PermissionModule } from "./permissions";

export interface PermissionGroup {
  module: PermissionModule;
  label: string;
  description: string;
  permissions: Permission[];
}

export const PERMISSION_GROUPS: PermissionGroup[] = [
  {
    module: "DASHBOARD",
    label: "Dashboard",
    description: "Overview & management widgets.",
    permissions: getModulePermissions("DASHBOARD"),
  },
  {
    module: "CRM",
    label: "CRM",
    description: "CRM records, setup and reports.",
    permissions: getModulePermissions("CRM"),
  },
  {
    module: "LEAD",
    label: "Leads",
    description: "Lead lifecycle: import, create, update, convert, delete.",
    permissions: getModulePermissions("LEAD"),
  },
  {
    module: "CUSTOMER",
    label: "Customers",
    description: "Customer records management.",
    permissions: getModulePermissions("CUSTOMER"),
  },
  {
    module: "WORKER",
    label: "Workers",
    description: "Worker records & job assignment.",
    permissions: getModulePermissions("WORKER"),
  },
  {
    module: "REQUEST",
    label: "Requests",
    description: "Service requests across workspaces.",
    permissions: getModulePermissions("REQUEST"),
  },
  {
    module: "PROPERTY",
    label: "Property",
    description: "Customer property visibility.",
    permissions: getModulePermissions("PROPERTY"),
  },
  {
    module: "ESTIMATION",
    label: "Estimations",
    description: "Cost estimations.",
    permissions: getModulePermissions("ESTIMATION"),
  },
  {
    module: "CONTRACT",
    label: "Contracts",
    description: "Contract & agreements lifecycle.",
    permissions: getModulePermissions("CONTRACT"),
  },
  {
    module: "APPOINTMENT",
    label: "Appointments",
    description: "Appointments booking & management.",
    permissions: getModulePermissions("APPOINTMENT"),
  },
  {
    module: "INVOICE",
    label: "Invoices",
    description: "Invoicing, payment and management.",
    permissions: getModulePermissions("INVOICE"),
  },
  {
    module: "JOB",
    label: "Jobs",
    description: "Job lifecycle from assignment to completion.",
    permissions: getModulePermissions("JOB"),
  },
  {
    module: "TIME_TRACKING",
    label: "Time Tracking",
    description: "Work log & timer visibility.",
    permissions: getModulePermissions("TIME_TRACKING"),
  },
  {
    module: "REPORT",
    label: "Reports",
    description: "Reports viewing, management and export.",
    permissions: getModulePermissions("REPORT"),
  },
  {
    module: "SETTING",
    label: "Settings",
    description: "System & staff settings.",
    permissions: getModulePermissions("SETTING"),
  },
  {
    module: "NOTIFICATION",
    label: "Notifications",
    description: "In-app notifications.",
    permissions: getModulePermissions("NOTIFICATION"),
  },
];

/** Convenience alias used by permission-matrices / staff configuration screens. */
export { PERMISSIONS };
/**
 * workspaces/admin/navigation/admin-navigation.ts
 *
 * Admin workspace primary navigation. Items are permission-driven — the
 * sidebar/bottom-nav filter by `PERMISSIONS.*` before rendering.
 */

import { PERMISSIONS } from "@/access-control/permissions/permissions";
import type { WorkspaceNavigationItem } from "../../workspace.types";

export const adminNavigation: WorkspaceNavigationItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "📊", permission: PERMISSIONS.DASHBOARD.VIEW, section: "Overview" },
  { label: "CRM", href: "/admin/crm", icon: "🤝", permission: PERMISSIONS.CRM.VIEW, section: "Business" },
  { label: "Leads", href: "/admin/leads", icon: "🧲", permission: PERMISSIONS.LEAD.VIEW, section: "Business" },
  { label: "Customers", href: "/admin/customers", icon: "👥", permission: PERMISSIONS.CUSTOMER.VIEW, section: "Business" },
  { label: "Workers", href: "/admin/workers", icon: "🛠️", permission: PERMISSIONS.WORKER.VIEW, section: "Business" },
  { label: "Requests", href: "/admin/requests", icon: "📨", permission: PERMISSIONS.REQUEST.VIEW, section: "Operations" },
  { label: "Jobs", href: "/admin/jobs", icon: "🧾", permission: PERMISSIONS.JOB.VIEW, section: "Operations" },
  { label: "Reports", href: "/admin/reports", icon: "📈", permission: PERMISSIONS.REPORT.VIEW, section: "Insights" },
  { label: "Settings", href: "/admin/settings", icon: "⚙️", permission: PERMISSIONS.SETTING.VIEW, section: "System" },
];
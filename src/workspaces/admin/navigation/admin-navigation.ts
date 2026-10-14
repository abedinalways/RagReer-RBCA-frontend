import { PERMISSIONS, type Permission } from "@/access-control/permissions/permissions";
import type { WorkspaceNavigationItem } from "../../workspace.types";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Building2,
  Receipt,
  ShieldCheck,
  Wrench,
  Cog,
  Settings,
  History,
  Inbox,
  HardHat,
  Target,
  BarChart3,
  Home,
  User,
  MoreHorizontal,
  Coins,
  CircleDollarSign,
  HandCoins,
  type LucideIcon,
} from "lucide-react";

export interface AdminSubNavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  permission?: Permission;
}

export interface AdminNavGroup {
  id: string;
  label: string;
  href?: string;
  icon?: LucideIcon;
  items?: AdminSubNavItem[];
  permission?: Permission;
  defaultExpanded?: boolean;
}

export const adminGroupedNavigation: AdminNavGroup[] = [
  {
    id: "dashboard",
    label: "Dashboard Overview",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    permission: PERMISSIONS.DASHBOARD.VIEW,
  },
  {
    id: "operations",
    label: "Operations",
    href: "/admin/requests",
    icon: Briefcase,
    permission: PERMISSIONS.REQUEST.VIEW,
    items: [
      {
        id: "requests",
        label: "Service Requests",
        href: "/admin/requests",
        icon: Inbox,
        permission: PERMISSIONS.REQUEST.VIEW,
      },
      {
        id: "jobs",
        label: "Jobs",
        href: "/admin/jobs",
        icon: Briefcase,
        permission: PERMISSIONS.JOB.VIEW,
      },
    ],
  },
  {
    id: "users",
    label: "Users",
    href: "/admin/customers",
    icon: Users,
    permission: PERMISSIONS.CUSTOMER.VIEW,
    items: [
      {
        id: "customers",
        label: "Customers",
        href: "/admin/customers",
        icon: User,
        permission: PERMISSIONS.CUSTOMER.VIEW,
      },
      {
        id: "workers",
        label: "Workers",
        href: "/admin/workers",
        icon: HardHat,
        permission: PERMISSIONS.WORKER.VIEW,
      },
      {
        id: "leads",
        label: "Leads",
        href: "/admin/leads",
        icon: Target,
        permission: PERMISSIONS.LEAD.VIEW,
      },
    ],
  },
  {
    id: "business",
    label: "Business",
    href: "/admin/crm",
    icon: Building2,
    permission: PERMISSIONS.CRM.VIEW,
    items: [
      {
        id: "crm",
        label: "CRM",
        href: "/admin/crm",
        icon: Building2,
        permission: PERMISSIONS.CRM.VIEW,
      },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    href: "/admin/payroll",
    icon: Receipt,
    permission: PERMISSIONS.REPORT.VIEW,
    items: [
      {
        id: "payroll",
        label: "Payroll",
        href: "/admin/payroll",
        icon: Coins,
        permission: PERMISSIONS.REPORT.VIEW,
      },
      {
        id: "accounts-receivable",
        label: "Accounts Receivable",
        href: "/admin/accounts-receivable",
        icon: CircleDollarSign,
        permission: PERMISSIONS.REPORT.VIEW,
      },
      {
        id: "financial-summary",
        label: "Financial Summary",
        href: "/admin/financial-summary",
        icon: HandCoins,
        permission: PERMISSIONS.REPORT.VIEW,
      },
    ],
  },
  {
    id: "system",
    label: "System Management",
    href: "/admin/roles",
    icon: Settings,
    permission: PERMISSIONS.SETTING.VIEW,
    defaultExpanded: true,
    items: [
      {
        id: "roles-permission",
        label: "Roles & Permission",
        href: "/admin/roles",
        icon: ShieldCheck,
        permission: PERMISSIONS.SETTING.MANAGE,
      },
      {
        id: "equipment",
        label: "Equipment",
        href: "/admin/equipment",
        icon: Wrench,
        permission: PERMISSIONS.SETTING.VIEW,
      },
      {
        id: "services",
        label: "Services",
        href: "/admin/services",
        icon: Cog,
        permission: PERMISSIONS.SETTING.VIEW,
      },
      {
        id: "settings",
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
        permission: PERMISSIONS.SETTING.VIEW,
      },
      {
        id: "activity-log",
        label: "Activity Log",
        href: "/admin/activity",
        icon: History,
        permission: PERMISSIONS.SETTING.VIEW,
      },
    ],
  },
];

export interface AdminMobileNavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  isMoreTrigger?: boolean;
}

export const adminMobileNavigationItems: AdminMobileNavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: Home,
  },
  {
    id: "operations",
    label: "Operations",
    href: "/admin/requests",
    icon: Briefcase,
  },
  {
    id: "users",
    label: "Users",
    href: "/admin/customers",
    icon: User,
  },
  {
    id: "more",
    label: "More",
    href: "/admin/roles",
    icon: MoreHorizontal,
    isMoreTrigger: true,
  },
];

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
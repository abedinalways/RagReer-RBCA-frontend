"use client";

import { usePathname } from "next/navigation";
import { Search, Bell, Menu } from "lucide-react";
import { AdminProfileDropdown } from "./AdminProfileDropdown";

interface HeaderMetadata {
  title: string;
  subtitle: string;
}

interface AdminHeaderProps {
  onMenuToggle?: () => void;
}

/**
 * Route-specific titles and descriptions for the Admin Console.
 * Follows OCP (Open/Closed Principle).
 */
const ADMIN_ROUTE_HEADERS: Record<string, HeaderMetadata> = {
  "/admin/dashboard": {
    title: "Dashboard Overview",
    subtitle: "Real-time summary of business metrics and operations",
  },
  "/admin/requests": {
    title: "Service Requests",
    subtitle: "Manage and triage incoming client requests",
  },
  "/admin/jobs": {
    title: "Operations & Jobs",
    subtitle: "Track live job dispatches and execution status",
  },
  "/admin/customers": {
    title: "Customers Directory",
    subtitle: "Manage customer profiles, contracts, and properties",
  },
  "/admin/workers": {
    title: "Field Crew & Workers",
    subtitle: "Manage technicians, assignments, and tracking",
  },
  "/admin/leads": {
    title: "Leads Pipeline",
    subtitle: "Track potential leads and inbound service inquiries",
  },
  "/admin/crm": {
    title: "CRM Management",
    subtitle: "Client relationship histories and communications",
  },
  "/admin/reports": {
    title: "Financial & Work Reports",
    subtitle: "Business analytics, payroll, and revenue forecasting",
  },
  "/admin/roles": {
    title: "Roles & Permission",
    subtitle: "Configure staff permissions and access controls",
  },
  "/admin/equipment": {
    title: "Equipment & Fleet",
    subtitle: "Inventory, vehicle tracking, and maintenance logs",
  },
  "/admin/services": {
    title: "Service Catalog",
    subtitle: "Manage lawn care offerings, packages, and pricing",
  },
  "/admin/settings": {
    title: "System Settings",
    subtitle: "Global configurations, company info, and preferences",
  },
  "/admin/activity": {
    title: "Activity & Audit Log",
    subtitle: "Immutable record of all admin and system operations",
  },
};

const DEFAULT_HEADER: HeaderMetadata = {
  title: "Admin Console",
  subtitle: "Half Stache administration and management portal",
};

function getHeaderMetadata(pathname: string): HeaderMetadata {
  for (const [route, meta] of Object.entries(ADMIN_ROUTE_HEADERS)) {
    if (pathname === route || pathname.startsWith(`${route}/`)) {
      return meta;
    }
  }
  return DEFAULT_HEADER;
}

export function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const pathname = usePathname();
  const { title, subtitle } = getHeaderMetadata(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-16 sm:h-18 items-center justify-between bg-layout-bg border-b border-border px-3 sm:px-6 py-3 select-none">
      {/* Left: Hamburger (mobile) + Dynamic Title & Subtitle */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
        {onMenuToggle && (
          <button
            type="button"
            onClick={onMenuToggle}
            aria-label="Open navigation sidebar"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-layout-bg text-secondary-subheading hover:text-primary hover:bg-page-bg lg:hidden cursor-pointer transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-semibold tracking-tight text-primary-heading truncate leading-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-0.5 line-clamp-1 leading-tight">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right: Search, Notifications & Functional Profile Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Search Bar */}
        <div className="relative hidden sm:flex items-center">
          <Search className="absolute left-3 h-3.5 w-3.5 text-secondary-subheading pointer-events-none" />
          <input
            type="text"
            placeholder="Search console..."
            className="h-9 w-32 md:w-56 rounded-md border border-border bg-layout-bg pl-8 pr-3 text-xs text-txt-primary placeholder:text-secondary-subheading focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>

        {/* Notifications Icon with Indicator */}
        <button
          type="button"
          aria-label="View notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-layout-bg text-secondary-subheading transition-colors hover:text-primary hover:bg-page-bg cursor-pointer"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-trend-down ring-2 ring-layout-bg" />
        </button>

        {/* Functional Profile Dropdown */}
        <AdminProfileDropdown />
      </div>
    </header>
  );
}
"use client";

import { usePathname } from "next/navigation";
import { Search, Bell, Menu } from "lucide-react";
import { CustomerProfileDropdown } from "./CustomerProfileDropdown";

interface HeaderMetadata {
  title: string;
  subtitle: string;
}

interface CustomerHeaderProps {
  onMenuToggle?: () => void;
}

/**
 * Route-specific titles and descriptions for the Customer Portal.
 * Easily extensible following the Open/Closed Principle (OCP).
 */
const CUSTOMER_ROUTE_HEADERS: Record<string, HeaderMetadata> = {
  "/customer/requests": {
    title: "Service Requests",
    subtitle: "Create a new service request for your property",
  },
  "/customer/property": {
    title: "My Property",
    subtitle: "Manage and view your registered properties",
  },
  "/customer/estimations": {
    title: "Estimation",
    subtitle: "Review cost estimations for your requested services",
  },
  "/customer/contracts": {
    title: "Contract & Agreements",
    subtitle: "View and sign service contracts and agreements",
  },
  "/customer/appointments": {
    title: "Appointments",
    subtitle: "Manage and schedule your service appointments",
  },
  "/customer/invoices": {
    title: "Invoices",
    subtitle: "View and pay invoices for completed services",
  },
};

const DEFAULT_HEADER: HeaderMetadata = {
  title: "Service Requests",
  subtitle: "Create a new service request for your property",
};

function getHeaderMetadata(pathname: string): HeaderMetadata {
  for (const [route, meta] of Object.entries(CUSTOMER_ROUTE_HEADERS)) {
    if (pathname === route || pathname.startsWith(`${route}/`)) {
      return meta;
    }
  }
  return DEFAULT_HEADER;
}

/**
 * CustomerHeader component matching the exact Figma/Screenshot design.
 * Fully responsive across mobile, tablet and desktop viewports.
 * Adheres to SOLID principles and exclusively uses Global CSS tokens.
 */
export function CustomerHeader({ onMenuToggle }: CustomerHeaderProps) {
  const pathname = usePathname();
  const { title, subtitle } = getHeaderMetadata(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-16 sm:h-20 items-center justify-between border-b border-border bg-layout-bg px-3 sm:px-6 py-3 sm:py-4">
      {/* Left: Hamburger (mobile) + Dynamic Title & Subtitle */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        {onMenuToggle && (
          <button
            type="button"
            onClick={onMenuToggle}
            aria-label="Open sidebar menu"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-layout-bg text-secondary-subheading hover:text-primary hover:bg-page-bg lg:hidden cursor-pointer transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <div className="min-w-0">
          <h1 className="text-base sm:text-lg lg:text-xl font-medium tracking-tight text-primary-heading truncate">
            {title}
          </h1>
          <p className="text-[11px] sm:text-xs text-secondary-subheading mt-0.5 line-clamp-1">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right: Search, Notifications & Functional Profile Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
        {/* Search Bar (responsive width) */}
        <div className="relative hidden xs:flex sm:flex items-center">
          <Search className="absolute left-3 h-3.5 w-3.5 sm:h-4 sm:w-4 text-secondary-subheading pointer-events-none" />
          <input
            type="text"
            placeholder="Type to search"
            className="h-9 sm:h-10 w-28 sm:w-44 md:w-64 rounded-md border border-border bg-layout-bg pl-8 sm:pl-9 pr-3 text-xs text-txt-primary placeholder:text-secondary-subheading focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>

        {/* Notifications Icon with Indicator */}
        <button
          type="button"
          aria-label="View notifications"
          className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-md border border-border bg-layout-bg text-secondary-subheading transition-colors hover:text-primary hover:bg-page-bg cursor-pointer"
        >
          <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
          {/* Notification Red Dot */}
          <span className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 h-2 w-2 rounded-full bg-trend-down ring-2 ring-layout-bg" />
        </button>

        {/* Functional Profile Dropdown */}
        <CustomerProfileDropdown />
      </div>
    </header>
  );
}
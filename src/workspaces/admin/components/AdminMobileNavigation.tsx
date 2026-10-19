"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { adminMobileNavigationItems } from "../navigation/admin-navigation";

interface AdminMobileNavigationProps {
  onMoreClick?: () => void;
}

/**
 * AdminMobileNavigation — floating mobile bottom navigation dock matching Image 2.
 * - Light-blue container (bg-blue-50) with rounded-2xl corners & subtle border
 * - 4 items: Dashboard, Operations, Users, More
 * - Inactive: text-primary (#5980A6) with stroke icons
 * - Active: solid filled blue button (bg-primary #5980A6) with white icon and white text
 */
export function AdminMobileNavigation({
  onMoreClick,
}: AdminMobileNavigationProps) {
  const pathname = usePathname();

  // Check which category is active
  const isDashboardActive =
    pathname === "/admin/dashboard" || pathname === "/admin";
  const isOperationsActive =
    pathname.startsWith("/admin/requests") ||
    pathname.startsWith("/admin/jobs");
  const isUsersActive =
    pathname.startsWith("/admin/customers") ||
    pathname.startsWith("/admin/workers") ||
    pathname.startsWith("/admin/leads");

  // "More" covers CRM, Reports, Settings, Roles, Equipment, Services, Activity
  const isMoreActive =
    pathname.startsWith("/admin/roles") ||
    pathname.startsWith("/admin/equipment") ||
    pathname.startsWith("/admin/services") ||
    pathname.startsWith("/admin/settings") ||
    pathname.startsWith("/admin/activity") ||
    pathname.startsWith("/admin/crm") ||
    pathname.startsWith("/admin/reports") ||
    pathname.startsWith("/admin/payroll") ||
    pathname.startsWith("/admin/accounts-receivable") ||
    pathname.startsWith("/admin/financial-summary");

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed inset-x-0 bottom-4 z-40 mx-auto max-w-sm px-3 lg:hidden"
    >
      <div className="flex items-center justify-between gap-1 bg-blue-50/95 backdrop-blur-md rounded-2xl border border-blue-100/80 shadow-lg px-2 py-1.5">
        {adminMobileNavigationItems.map((item) => {
          let isActive = false;
          if (item.id === "dashboard") isActive = isDashboardActive;
          else if (item.id === "operations") isActive = isOperationsActive;
          else if (item.id === "users") isActive = isUsersActive;
          else if (item.id === "more") isActive = isMoreActive;

          const IconComponent = item.icon;

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => {
                if (item.isMoreTrigger && onMoreClick) {
                  onMoreClick();
                }
              }}
              className={cn(
                "flex flex-1 flex-col items-center justify-center py-2 px-2.5 rounded-xl transition-all cursor-pointer active:scale-95",
                isActive
                  ? "bg-primary text-primary-text shadow-xs"
                  : "text-primary hover:bg-blue-100/60",
              )}
            >
              <IconComponent
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive ? "text-primary-text" : "text-primary",
                )}
              />
              <span
                className={cn(
                  "text-[11px] font-medium mt-0.5 leading-tight tracking-tight",
                  isActive ? "text-primary-text font-semibold" : "text-primary",
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

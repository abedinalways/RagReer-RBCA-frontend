"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { usePermission } from "@/access-control/hooks/usePermission";
import { cn } from "@/lib/utils";
import { customerNavigation } from "../navigation/customer-navigation";

import PlusIcon from "@/components/icons/customer/PlusIcon";
import PropertyIcon from "@/components/icons/customer/PropertyIcon";
import EstimateIcon from "@/components/icons/customer/EstimateIcon";
import ContractIcon from "@/components/icons/customer/ContractIcon";
import CalenderIcon from "@/components/icons/customer/CalerderIcon";
import InvoicesIcon from "@/components/icons/customer/InvoicesIcon";

/**
 * Map each customer navigation route to its designated SVG icon component.
 * Follows OCP (Open/Closed Principle) so adding new routes is trivial.
 */
const CUSTOMER_NAV_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "/customer/requests": PlusIcon,
  "/customer/property": PropertyIcon,
  "/customer/estimations": EstimateIcon,
  "/customer/contracts": ContractIcon,
  "/customer/appointments": CalenderIcon,
  "/customer/invoices": InvoicesIcon,
};

interface CustomerSidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

/**
 * CustomerSidebar component matching the Figma/Screenshot design.
 * Fully responsive on mobile (drawer mode with close button) and desktop.
 * Adheres to SOLID principles and exclusively uses Global CSS tokens.
 */
export function CustomerSidebar({ onClose, isMobile = false }: CustomerSidebarProps) {
  const pathname = usePathname();
  const { can } = usePermission();

  const visibleItems = customerNavigation.filter(
    (item) => !item.permission || can(item.permission)
  );

  return (
    <aside className="flex h-full min-h-screen w-64 flex-col border-r border-border bg-layout-bg select-none">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
            <Image
              src="/images/logo.png"
              alt="Half Stache Logo"
              width={44}
              height={44}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-base font-semibold leading-tight tracking-tight text-primary-heading">
              Customer Portal
            </h2>
            <p className="text-[11px] font-normal leading-tight text-secondary-subheading mt-1">
              Powered By HALF STACHE
            </p>
          </div>
        </div>

        {/* Mobile Close Button */}
        {isMobile && onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation sidebar"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-secondary-subheading hover:text-primary hover:bg-page-bg cursor-pointer transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1.5 px-3 py-3 overflow-y-auto">
        {visibleItems.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const IconComponent = CUSTOMER_NAV_ICONS[item.href] || PlusIcon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                if (isMobile && onClose) {
                  onClose();
                }
              }}
              className={cn(
                "flex items-center gap-3 rounded-md px-3.5 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-text shadow-xs"
                  : "text-primary hover:bg-nav-bg active:bg-blue-50"
              )}
            >
              <IconComponent
                className={cn(
                  "h-[18px] w-[18px] shrink-0",
                  active ? "text-primary-text" : "text-primary"
                )}
              />
              <span className="leading-none">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
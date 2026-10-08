"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import { usePermission } from "@/access-control/hooks/usePermission";
import { cn } from "@/lib/utils";
import { adminGroupedNavigation, type AdminNavGroup } from "../navigation/admin-navigation";

interface AdminSidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

export function AdminSidebar({ onClose, isMobile = false }: AdminSidebarProps) {
  const pathname = usePathname();
  const { can } = usePermission();

  // Filter groups and subitems by permissions
  const visibleGroups = useMemo(() => {
    return adminGroupedNavigation
      .filter((group) => !group.permission || can(group.permission))
      .map((group) => {
        if (!group.items) return group;
        return {
          ...group,
          items: group.items.filter((item) => !item.permission || can(item.permission)),
        };
      });
  }, [can]);

  // Track expanded groups in an object/set
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {
      system: true, // Default open matching Image 1
    };
    for (const group of visibleGroups) {
      if (group.defaultExpanded) {
        initial[group.id] = true;
      }
      if (group.items?.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))) {
        initial[group.id] = true;
      }
    }
    return initial;
  });

  // Auto-expand group when route changes to one of its children
  useEffect(() => {
    const matchingGroupIds: string[] = [];
    for (const group of visibleGroups) {
      if (group.items?.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))) {
        matchingGroupIds.push(group.id);
      }
    }

    if (matchingGroupIds.length > 0) {
      setExpandedGroups((prev) => {
        let hasChanges = false;
        const next = { ...prev };
        for (const id of matchingGroupIds) {
          if (!prev[id]) {
            next[id] = true;
            hasChanges = true;
          }
        }
        return hasChanges ? next : prev;
      });
    }
  }, [pathname, visibleGroups]);

  const toggleGroup = (groupId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  return (
    <aside className="flex h-full w-64 md:w-68 flex-col bg-layout-bg border-r border-border">
      {/* Brand Header matching Image 1 */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-border/40">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => {
            if (isMobile && onClose) onClose();
          }}
        >
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-border/50">
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
            <h2 className="font-barlow text-lg font-bold tracking-tight text-primary-heading leading-tight uppercase">
              HALF STACHE
            </h2>
            <p className="text-sm font-normal leading-tight text-secondary-subheading mt-1">
              Admin Console
            </p>
          </div>
        </Link>

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

      {/* Navigation List matching Image 1 & CustomerSidebar typography */}
      <nav className="flex-1 space-y-1.5 px-3 py-3 overflow-y-auto">
        {visibleGroups.map((group: AdminNavGroup) => {
          // Case 1: Direct link without sub-items (e.g. Dashboard Overview)
          if (!group.items || group.items.length === 0) {
            const isDirectActive = pathname === group.href || pathname.startsWith(`${group.href}/`);
            return (
              <Link
                key={group.id}
                href={group.href || "/admin/dashboard"}
                onClick={() => {
                  if (isMobile && onClose) onClose();
                }}
                className={cn(
                  "flex items-center justify-between rounded-md px-3.5 py-2.5 transition-colors cursor-pointer",
                  isDirectActive
                    ? "bg-primary text-primary-text shadow-xs font-semibold"
                    : "text-primary hover:bg-nav-bg active:bg-blue-50 font-medium"
                )}
              >
                <span className="leading-none text-sm md:text-lg">{group.label}</span>
              </Link>
            );
          }

          // Case 2: Group with Sub-items (Operations, Users, Business, Finance, System Management)
          const isExpanded = !!expandedGroups[group.id];
          const hasActiveChild = group.items.some(
            (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
          );
          const primaryGroupHref = group.href || group.items[0]?.href || "#";

          return (
            <div key={group.id} className="space-y-1">
              {/* Group Row: Label navigates, Chevron toggles */}
              <div
                className={cn(
                  "flex items-center justify-between w-full rounded-md transition-colors",
                  hasActiveChild
                    ? "text-primary font-semibold bg-nav-bg/40"
                    : "text-primary hover:bg-nav-bg/70 active:bg-blue-50 font-medium"
                )}
              >
                <Link
                  href={primaryGroupHref}
                  onClick={() => {
                    setExpandedGroups((prev) => ({ ...prev, [group.id]: true }));
                    if (isMobile && onClose) onClose();
                  }}
                  className="flex-1 py-2.5 px-3.5 leading-none text-sm md:text-lg cursor-pointer"
                >
                  {group.label}
                </Link>

                <button
                  type="button"
                  onClick={(e) => toggleGroup(group.id, e)}
                  aria-expanded={isExpanded}
                  aria-label={`Toggle ${group.label} submenu`}
                  className="p-2.5 pr-3 text-primary hover:text-primary-hover cursor-pointer"
                >
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-primary transition-transform duration-200 shrink-0",
                      isExpanded && "rotate-180"
                    )}
                  />
                </button>
              </div>

              {/* Sub-items list */}
              {isExpanded && (
                <div className="space-y-1 pl-1.5 pt-0.5 pb-1 animate-in fade-in slide-in-from-top-1 duration-150">
                  {group.items.map((subItem) => {
                    const isSubActive =
                      pathname === subItem.href || pathname.startsWith(`${subItem.href}/`);
                    const SubIcon = subItem.icon;

                    return (
                      <Link
                        key={subItem.id}
                        href={subItem.href}
                        onClick={() => {
                          if (isMobile && onClose) onClose();
                        }}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3.5 py-2.5 transition-all cursor-pointer",
                          isSubActive
                            ? "bg-primary text-primary-text shadow-xs font-semibold"
                            : "text-primary hover:bg-nav-bg active:bg-blue-50 font-medium"
                        )}
                      >
                        <SubIcon
                          className={cn(
                            "h-[18px] w-[18px] shrink-0 transition-colors",
                            isSubActive ? "text-primary-text" : "text-primary"
                          )}
                        />
                        <span className="leading-none text-sm md:text-lg">{subItem.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer System Status Bar */}
      <div className="border-t border-border px-4 py-3 bg-layout-bg text-[11px] text-secondary-subheading flex items-center justify-between">
        <span className="font-medium text-txt-primary">RBCA Admin</span>
        <span className="inline-flex items-center gap-1.5 text-trend-up">
          <span className="h-1.5 w-1.5 rounded-full bg-trend-up" />
          Active
        </span>
      </div>
    </aside>
  );
}
"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface TopTabItem<T extends string = string> {
  key: T;
  label: string;
  href?: string;
  count?: number | string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TopTabProps<T extends string = string> {
  tabs: TopTabItem<T>[];
  activeTab: T;
  onChange?: (key: T) => void;
  basePath?: string;
  className?: string;
  listClassName?: string;
  tabClassName?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  ariaLabel?: string;
}

export function TopTab<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  basePath,
  className,
  listClassName,
  tabClassName,
  activeClassName,
  inactiveClassName,
  ariaLabel = "Navigation Tabs",
}: TopTabProps<T>) {
  const getTabHref = (tab: TopTabItem<T>): string | undefined => {
    if (tab.href) return tab.href;
    if (basePath) {
      const cleanBase = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
      return `${cleanBase}/${tab.key}`;
    }
    return undefined;
  };

  return (
    <div className={cn("w-full border-b border-border bg-card-bg", className)}>
      <nav
        role="tablist"
        aria-label={ariaLabel}
        className={cn(
          "flex items-center px-4 sm:px-6 gap-6 sm:gap-8 overflow-x-auto scrollbar-none",
          listClassName
        )}
      >
        {tabs.map((tab) => {
          const isActive =
            activeTab.toLowerCase() === tab.key.toLowerCase();
          const href = getTabHref(tab);

          const content = (
            <>
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={cn(
                    "ml-1.5 px-1.5 py-0.5 rounded-full text-[11px] font-medium leading-none",
                    isActive
                      ? "bg-blue-100 text-primary"
                      : "bg-page-bg text-secondary-subheading"
                  )}
                >
                  {tab.count}
                </span>
              )}
            </>
          );

          const commonClasses = cn(
            "inline-flex items-center gap-2 py-3.5 px-1 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer select-none",
            isActive
              ? cn("border-primary text-primary", activeClassName)
              : cn(
                  "border-transparent text-secondary-subheading hover:text-txt-primary hover:border-border",
                  inactiveClassName
                ),
            tab.disabled && "opacity-40 cursor-not-allowed pointer-events-none",
            tabClassName
          );

          if (href && !tab.disabled) {
            return (
              <Link
                key={tab.key}
                href={href}
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange?.(tab.key)}
                className={commonClasses}
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              disabled={tab.disabled}
              aria-selected={isActive}
              onClick={() => onChange?.(tab.key)}
              className={commonClasses}
            >
              {content}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default TopTab;

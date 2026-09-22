"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export interface TabOption<T extends string = string> {
  key: T;
  label: string;
  count?: number;
}

export interface SegmentedTabsProps<T extends string = string> {
  tabs: TabOption<T>[];
  paramName?: string;
  defaultValue?: T;
  onChange?: (key: T) => void;
  className?: string;
}

export function SegmentedTabs<T extends string = string>({
  tabs,
  paramName = "tab",
  defaultValue,
  onChange,
  className,
}: SegmentedTabsProps<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentParam = searchParams.get(paramName);

  // Find matching tab case-insensitively or fallback to default/first tab
  const activeTabKey =
    tabs.find((t) => t.key.toLowerCase() === currentParam?.toLowerCase())?.key ||
    defaultValue ||
    tabs[0]?.key;

  const handleTabClick = (key: T) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramName, key.toLowerCase());

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

    if (onChange) {
      onChange(key);
    }
  };

  return (
    <div
      className={cn(
        "flex w-full items-center justify-between self-stretch overflow-hidden shadow-xs",
        className
      )}
      style={{
        borderRadius: "0.5rem",
        background: "var(--Blue-50, #E7F1FB)",
        display: "flex",
        padding: "0.375rem",
        alignItems: "center",
        gap: "0.75rem",
        alignSelf: "stretch",
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTabKey.toLowerCase() === tab.key.toLowerCase();

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => handleTabClick(tab.key)}
            className={cn(
              "transition-all duration-200 cursor-pointer select-none font-medium text-sm text-center",
              isActive
                ? "text-white shadow-xs"
                : "text-primary hover:bg-white/40 active:scale-98"
            )}
            style={
              isActive
                ? {
                  borderRadius: "0.25rem",
                  background: "var(--Primary, #5980A6)",
                  display: "flex",
                  height: "2.5rem",
                  padding: "0.5rem 1rem",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.5rem",
                  flex: "1 0 0",
                }
                : {
                  borderRadius: "0.25rem",
                  display: "flex",
                  height: "2.5rem",
                  padding: "0.5rem 1rem",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.5rem",
                  flex: "1 0 0",
                  color: "var(--Primary, #5980A6)",
                }
            }
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-sm font-semibold leading-none",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-primary/10 text-primary"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

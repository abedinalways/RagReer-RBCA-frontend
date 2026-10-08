"use client";

import React from "react";
import { SettingsTabId } from "../types";

interface SettingsNavTabsProps {
  activeTab: SettingsTabId;
  onTabChange: (tab: SettingsTabId) => void;
}

const TABS: { id: SettingsTabId; label: string }[] = [
  { id: "general", label: "General" },
  { id: "scheduling", label: "Scheduling" },
  { id: "billing", label: "Billing & Payments" },
  { id: "notifications", label: "Notifications" },
  { id: "security", label: "Security" },
  { id: "system", label: "System" },
];

export function SettingsNavTabs({ activeTab, onTabChange }: SettingsNavTabsProps) {
  return (
    <>
      {/* Mobile Responsive Grid (< md) - All 6 tabs visible without cut-off */}
      <div className="md:hidden p-3 sm:p-4 border-b border-border bg-card-bg">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`w-full min-h-[44px] px-2.5 py-2 rounded text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer flex items-center justify-center text-center leading-tight ${
                  isActive
                    ? "bg-[#5980A6] text-white shadow-xs font-semibold"
                    : "bg-[#F8F9FB] text-txt-primary hover:bg-[#EEF1F5] hover:text-primary-heading active:bg-[#E5E9EE]"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Vertical Tab Menu (>= md) */}
      <aside className="hidden md:block w-52 lg:w-60 shrink-0 border-r border-border p-4 lg:p-5 space-y-2.5 bg-card-bg">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`w-full text-left px-4 py-3 rounded text-sm md:text-base font-medium transition-all duration-150 cursor-pointer block ${
                isActive
                  ? "bg-[#5980A6] text-white shadow-xs font-semibold"
                  : "bg-[#F8F9FB] text-txt-primary hover:bg-[#EEF1F5] hover:text-primary-heading"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </aside>
    </>
  );
}

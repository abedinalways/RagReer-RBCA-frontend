"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { SettingsTabId } from "../types";
import {
  INITIAL_COMPANY_SETTINGS,
  INITIAL_SCHEDULING_SETTINGS,
  INITIAL_BILLING_SETTINGS,
  INITIAL_NOTIFICATION_CATEGORIES,
} from "../data/settingsData";
import { SettingsNavTabs } from "./SettingsNavTabs";
import { GeneralTab } from "./GeneralTab";
import { SchedulingTab } from "./SchedulingTab";
import { BillingPaymentsTab } from "./BillingPaymentsTab";
import { NotificationsTab } from "./NotificationsTab";
import { SecurityTab } from "./SecurityTab";
import { SystemTab } from "./SystemTab";

import { useTabQueryState } from "@/hooks/useTabQueryState";

const VALID_TABS: readonly SettingsTabId[] = [
  "general",
  "scheduling",
  "billing",
  "notifications",
  "security",
  "system",
];

export function SettingsView() {
  const [activeTab, setActiveTab] = useTabQueryState<SettingsTabId>(
    "tab",
    "general",
    VALID_TABS
  );

  // State data for all tabs
  const [companySettings, setCompanySettings] = useState(INITIAL_COMPANY_SETTINGS);
  const [schedulingSettings, setSchedulingSettings] = useState(INITIAL_SCHEDULING_SETTINGS);
  const [billingSettings, setBillingSettings] = useState(INITIAL_BILLING_SETTINGS);
  const [notificationCategories, setNotificationCategories] = useState(INITIAL_NOTIFICATION_CATEGORIES);

  // Save changes toast / feedback
  const [isSaved, setIsSaved] = useState(false);

  const handleGlobalSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2500);
  };

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary-heading">
            Settings
          </h1>
          <p className="text-xs md:text-sm text-secondary-subheading mt-0.5">
            Manage company profile, scheduling rules, billing preferences, and system security.
          </p>
        </div>

        <button
          type="button"
          onClick={handleGlobalSave}
          className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-[#5980A6] text-white hover:bg-[#4A6E91] font-medium text-sm md:text-base transition-all cursor-pointer shadow-xs shrink-0 flex items-center justify-center gap-1.5 active:scale-[0.99]"
        >
          {isSaved ? (
            <>
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Saved</span>
            </>
          ) : (
            <span>Save Changes</span>
          )}
        </button>
      </div>

      {/* Main Settings Card */}
      <div className="w-full border border-border rounded-xl bg-card-bg shadow-xs overflow-hidden flex flex-col md:flex-row md:min-h-[640px]">
        {/* Left Tabs Menu */}
        <SettingsNavTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Right Active Tab Content */}
        <main className="flex-1 p-3.5 sm:p-6 md:p-8 bg-card-bg">
          {activeTab === "general" && (
            <GeneralTab
              settings={companySettings}
              onChange={setCompanySettings}
            />
          )}

          {activeTab === "scheduling" && (
            <SchedulingTab
              settings={schedulingSettings}
              onChange={setSchedulingSettings}
            />
          )}

          {activeTab === "billing" && (
            <BillingPaymentsTab
              settings={billingSettings}
              onChange={setBillingSettings}
            />
          )}

          {activeTab === "notifications" && (
            <NotificationsTab
              categories={notificationCategories}
              onChange={setNotificationCategories}
            />
          )}

          {activeTab === "security" && <SecurityTab />}

          {activeTab === "system" && <SystemTab />}
        </main>
      </div>
    </div>
  );
}

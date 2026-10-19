"use client";

import React, { useState, useEffect } from "react";
import {
  UserPlus,
  Users,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Server,
  Info,
} from "lucide-react";
import { SystemSettings } from "../types";
import { INITIAL_SYSTEM_SETTINGS } from "../data/settingsData";
import { ServiceStatusToggle } from "@/features/admin/services/components/ServiceStatusToggle";

interface SystemTabProps {
  settings?: SystemSettings;
  onChange?: (settings: SystemSettings) => void;
}

export function SystemTab({
  settings = INITIAL_SYSTEM_SETTINGS,
  onChange,
}: SystemTabProps) {
  const [data, setData] = useState<SystemSettings>(settings);

  useEffect(() => {
    setData(settings);
  }, [settings]);

  const handleToggle = (key: keyof SystemSettings, value: boolean) => {
    const updated = { ...data, [key]: value };
    setData(updated);
    if (onChange) {
      onChange(updated);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Maintenance Mode Alert Banner if active */}
      {data.maintenanceMode && (
        <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 transition-all">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <p className="font-semibold text-amber-950 dark:text-amber-100">
              Maintenance Mode is Currently Active
            </p>
            <p className="mt-0.5 text-amber-800/90 dark:text-amber-200/90 leading-relaxed">
              Customer and crew portals are temporarily inaccessible for
              non-admin users. Only administrators can access the system.
            </p>
          </div>
        </div>
      )}

      {/* Main Responsive Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 sm:gap-6 xl:gap-8 items-start">
        {/* Left Column: Title & Info */}
        <div className="xl:col-span-4 space-y-3 sm:space-y-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-primary-heading">
              System Controls
            </h3>
            <p className="text-xs sm:text-sm text-secondary-subheading mt-1 leading-relaxed">
              Manage platform-wide operational settings, registration
              permissions, and system availability.
            </p>
          </div>

          {/* Quick System Status Card */}
          <div className="hidden sm:block p-3.5 sm:p-4 rounded-lg border border-border bg-page-bg/30 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-medium text-secondary-subheading">
              <span className="flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-txt-primary" />
                Platform Status
              </span>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                  data.maintenanceMode
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
                    : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    data.maintenanceMode
                      ? "bg-amber-500 animate-pulse"
                      : "bg-emerald-500"
                  }`}
                />
                {data.maintenanceMode ? "Maintenance" : "Operational"}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-secondary-subheading pt-1 border-t border-border/50">
              <span>Environment</span>
              <span className="font-medium text-txt-primary">
                Production (v1.0)
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Toggle Settings Card */}
        <div className="xl:col-span-8 space-y-4">
          <div className="border border-border rounded-xl bg-card-bg overflow-hidden shadow-2xs divide-y divide-border/60">
            {/* 1. User Registration */}
            <div className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 sm:gap-4 transition-colors hover:bg-page-bg/30">
              <div className="flex items-start gap-3 sm:gap-3.5 min-w-0 flex-1">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#5980A6]/10 text-[#5980A6] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                  <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-sm sm:text-base text-primary-heading">
                      User Registration
                    </span>
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-medium ${
                        data.userRegistration
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                          : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {data.userRegistration ? "Open" : "Closed"}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-secondary-subheading mt-0.5 leading-relaxed">
                    Allow new customers to sign up and book services on the
                    portal.
                  </p>
                </div>
              </div>

              <div className="shrink-0 pl-1 pt-0.5 sm:pt-0">
                <ServiceStatusToggle
                  isActive={data.userRegistration}
                  onChange={(val) => handleToggle("userRegistration", val)}
                />
              </div>
            </div>

            {/* 2. Crew Registration */}
            <div className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 sm:gap-4 transition-colors hover:bg-page-bg/30">
              <div className="flex items-start gap-3 sm:gap-3.5 min-w-0 flex-1">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#5980A6]/10 text-[#5980A6] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-sm sm:text-base text-primary-heading">
                      Crew Registration
                    </span>
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-medium ${
                        data.crewRegistration
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                          : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {data.crewRegistration ? "Open" : "Closed"}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-secondary-subheading mt-0.5 leading-relaxed">
                    Allow new crew members and technicians to register an
                    account.
                  </p>
                </div>
              </div>

              <div className="shrink-0 pl-1 pt-0.5 sm:pt-0">
                <ServiceStatusToggle
                  isActive={data.crewRegistration}
                  onChange={(val) => handleToggle("crewRegistration", val)}
                />
              </div>
            </div>

            {/* 3. Maintenance Mode */}
            <div className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 sm:gap-4 transition-colors hover:bg-page-bg/30">
              <div className="flex items-start gap-3 sm:gap-3.5 min-w-0 flex-1">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 transition-colors ${
                    data.maintenanceMode
                      ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                      : "bg-[#5980A6]/10 text-[#5980A6]"
                  }`}
                >
                  <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-sm sm:text-base text-primary-heading">
                      Maintenance Mode
                    </span>
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-medium ${
                        data.maintenanceMode
                          ? "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 font-semibold"
                          : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                      }`}
                    >
                      {data.maintenanceMode ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-secondary-subheading mt-0.5 leading-relaxed">
                    Temporarily disable platform access for public users during
                    maintenance or updates.
                  </p>
                </div>
              </div>

              <div className="shrink-0 pl-1 pt-0.5 sm:pt-0">
                <ServiceStatusToggle
                  isActive={data.maintenanceMode}
                  onChange={(val) => handleToggle("maintenanceMode", val)}
                />
              </div>
            </div>
          </div>

          {/* Helpful Information Note */}
          <div className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-lg bg-page-bg/50 border border-border/60 text-secondary-subheading">
            <Info className="w-4 h-4 text-txt-primary shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed">
              System changes apply immediately across web and mobile client
              applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

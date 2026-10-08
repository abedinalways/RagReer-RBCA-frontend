"use client";

import React, { useState } from "react";
import { Database, RefreshCw, ShieldCheck, Download, Trash } from "lucide-react";
import { ServiceStatusToggle } from "@/features/admin/services/components/ServiceStatusToggle";

export function SystemTab() {
  const [autoBackup, setAutoBackup] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [debugLogs, setDebugLogs] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const handleClearCache = () => {
    setIsClearing(true);
    setTimeout(() => {
      setIsClearing(false);
    }, 800);
  };

  return (
    <div className="space-y-8 divide-y divide-border/60">
      {/* 1. App Environment & Version */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 pt-0">
        <div className="lg:col-span-5">
          <h3 className="text-[1.125rem] font-bold text-primary-heading">
            System & Environment
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-1 leading-relaxed">
            Platform runtime metadata and application release details.
          </p>
        </div>

        <div className="lg:col-span-7 space-y-3">
          <div className="p-4 border border-border rounded-md bg-card-bg space-y-2">
            <div className="flex items-center justify-between text-sm md:text-base">
              <span className="text-secondary-subheading">Platform Version:</span>
              <span className="font-semibold text-txt-primary">v2.14.0 (Production)</span>
            </div>
            <div className="flex items-center justify-between text-sm md:text-base">
              <span className="text-secondary-subheading">Build Engine:</span>
              <span className="font-medium text-txt-primary">Next.js 16 (Turbopack)</span>
            </div>
            <div className="flex items-center justify-between text-sm md:text-base">
              <span className="text-secondary-subheading">RBAC Engine:</span>
              <span className="text-emerald-600 font-medium flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Configured (access-control)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Automated Backups */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 pt-8">
        <div className="lg:col-span-5">
          <h3 className="text-[1.125rem] font-bold text-primary-heading">
            Data Backup & Export
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-1 leading-relaxed">
            Manage database snapshots, export schedules, and archival storage.
          </p>
        </div>

        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between p-4 border border-border rounded-md bg-card-bg">
            <div>
              <span className="font-semibold text-sm md:text-base text-primary-heading block">
                Daily Automatic Backup
              </span>
              <span className="text-xs sm:text-sm text-secondary-subheading mt-0.5 block">
                Scheduled at 02:00 AM UTC every night.
              </span>
            </div>
            <ServiceStatusToggle
              isActive={autoBackup}
              onChange={setAutoBackup}
            />
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-md bg-card-bg">
            <div>
              <span className="font-semibold text-sm md:text-base text-primary-heading block">
                Download Backup Archive
              </span>
              <span className="text-xs sm:text-sm text-secondary-subheading mt-0.5 block">
                Export encrypted database dump to local machine.
              </span>
            </div>
            <button
              type="button"
              className="px-4 py-2 rounded-md border border-[#5980A6]/60 text-[#2D6A9F] hover:bg-page-bg font-medium text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Cache & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 pt-8">
        <div className="lg:col-span-5">
          <h3 className="text-[1.125rem] font-bold text-primary-heading">
            Cache & Memory
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-1 leading-relaxed">
            Clear server side cached queries and rebuild assets.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="flex items-center justify-between p-4 border border-border rounded-md bg-card-bg">
            <div>
              <span className="font-semibold text-sm md:text-base text-primary-heading block">
                Purge System Cache
              </span>
              <span className="text-xs sm:text-sm text-secondary-subheading mt-0.5 block">
                Forces reload of static assets and client portal caches.
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearCache}
              disabled={isClearing}
              className="px-4 py-2 rounded-md bg-[#5980A6] text-white hover:bg-[#4A6E91] font-medium text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isClearing ? "animate-spin" : ""}`} />
              <span>{isClearing ? "Clearing..." : "Purge Cache"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Maintenance Mode */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 pt-8">
        <div className="lg:col-span-5">
          <h3 className="text-[1.125rem] font-bold text-primary-heading">
            Maintenance Mode
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-1 leading-relaxed">
            Temporarily restrict customer and worker portal access during service windows.
          </p>
        </div>

        <div className="lg:col-span-7 flex items-center justify-between p-4 border border-border rounded-md bg-card-bg">
          <div>
            <span className="font-semibold text-sm md:text-base text-primary-heading block">
              Enable Maintenance Window
            </span>
            <span className="text-xs sm:text-sm text-secondary-subheading mt-0.5 block">
              Only admin accounts can log in while enabled.
            </span>
          </div>
          <ServiceStatusToggle
            isActive={maintenanceMode}
            onChange={setMaintenanceMode}
          />
        </div>
      </div>
    </div>
  );
}

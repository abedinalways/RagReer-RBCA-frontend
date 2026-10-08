"use client";

import React, { useState } from "react";
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

  const handleToggle = (key: keyof SystemSettings, value: boolean) => {
    const updated = { ...data, [key]: value };
    setData(updated);
    if (onChange) {
      onChange(updated);
    }
  };

  return (
    <div className="pt-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 xl:gap-16">
        {/* Left Column: Title & Description */}
        <div className="lg:col-span-5">
          <h3 className="text-[1.125rem] font-bold text-primary-heading">
            System
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-1 leading-relaxed">
            Manage platform-wide operational settings and feature availability.
          </p>
        </div>

        {/* Right Column: Toggle Options */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-7">
          {/* 1. User Registration */}
          <div className="flex items-start sm:items-center justify-between gap-4">
            <div>
              <span className="font-semibold text-sm md:text-base text-primary-heading block">
                User Registration
              </span>
              <span className="text-xs sm:text-sm text-secondary-subheading mt-0.5 block">
                Allow new customers to create accounts.
              </span>
            </div>
            <div className="shrink-0 pt-0.5 sm:pt-0">
              <ServiceStatusToggle
                isActive={data.userRegistration}
                onChange={(val) => handleToggle("userRegistration", val)}
              />
            </div>
          </div>

          {/* 2. Crew Registration */}
          <div className="flex items-start sm:items-center justify-between gap-4">
            <div>
              <span className="font-semibold text-sm md:text-base text-primary-heading block">
                Crew Registration
              </span>
              <span className="text-xs sm:text-sm text-secondary-subheading mt-0.5 block">
                Allow new crew members to create accounts.
              </span>
            </div>
            <div className="shrink-0 pt-0.5 sm:pt-0">
              <ServiceStatusToggle
                isActive={data.crewRegistration}
                onChange={(val) => handleToggle("crewRegistration", val)}
              />
            </div>
          </div>

          {/* 3. Maintenance Mode */}
          <div className="flex items-start sm:items-center justify-between gap-4">
            <div>
              <span className="font-semibold text-sm md:text-base text-primary-heading block">
                Maintenance Mode
              </span>
              <span className="text-xs sm:text-sm text-secondary-subheading mt-0.5 block">
                Temporarily disable platform access for maintenance.
              </span>
            </div>
            <div className="shrink-0 pt-0.5 sm:pt-0">
              <ServiceStatusToggle
                isActive={data.maintenanceMode}
                onChange={(val) => handleToggle("maintenanceMode", val)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

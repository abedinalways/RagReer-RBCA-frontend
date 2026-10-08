"use client";

import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { SchedulingSettings } from "../types";
import { ServiceStatusToggle } from "@/features/admin/services/components/ServiceStatusToggle";

interface SchedulingTabProps {
  settings: SchedulingSettings;
  onChange: (settings: SchedulingSettings) => void;
}

export function SchedulingTab({ settings, onChange }: SchedulingTabProps) {
  const [data, setData] = useState<SchedulingSettings>(settings);
  const [isWorkingHoursOpen, setIsWorkingHoursOpen] = useState(true);
  const [isWeatherOpen, setIsWeatherOpen] = useState(false);

  const handleToggle = (key: keyof SchedulingSettings, val: boolean) => {
    const updated = { ...data, [key]: val };
    setData(updated);
    onChange(updated);
  };

  return (
    <div className="space-y-8 divide-y divide-border/60">
      {/* 1. Business Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 pt-0">
        <div className="lg:col-span-5">
          <h3 className="text-[1.125rem] font-bold text-primary-heading">
            Business Hours
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-1 leading-relaxed">
            Set the hours your business operates and when service work can be scheduled.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="border border-border rounded-md bg-card-bg overflow-hidden">
            <button
              type="button"
              onClick={() => setIsWorkingHoursOpen((prev) => !prev)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-page-bg/40 transition-colors cursor-pointer"
            >
              <div>
                <span className="font-semibold text-sm md:text-base text-primary-heading block">
                  Working Days & Time
                </span>
                <span className="text-xs sm:text-sm text-secondary-subheading mt-0.5 block">
                  Select the days & time your crew is available for jobs.
                </span>
              </div>
              {isWorkingHoursOpen ? (
                <ChevronUp className="w-4 h-4 text-secondary-subheading shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-secondary-subheading shrink-0" />
              )}
            </button>

            {isWorkingHoursOpen && (
              <div className="p-4 pt-0 border-t border-border/50 text-xs sm:text-sm text-secondary-subheading bg-page-bg/20 space-y-2 mt-2">
                <div className="flex items-center justify-between py-1.5 border-b border-border/40">
                  <span className="font-medium text-txt-primary">Monday – Friday</span>
                  <span className="text-secondary-subheading">08:00 AM – 05:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-border/40">
                  <span className="font-medium text-txt-primary">Saturday</span>
                  <span className="text-secondary-subheading">09:00 AM – 01:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="font-medium text-txt-primary">Sunday</span>
                  <span className="text-red-500 font-medium">Closed</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Weekend Service */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 pt-8">
        <div className="lg:col-span-5">
          <h3 className="text-[1.125rem] font-bold text-primary-heading">
            Weekend Service
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-1 leading-relaxed">
            Allow service visits to be scheduled on weekends with an additional service charge.
          </p>
        </div>

        <div className="lg:col-span-7 flex items-center justify-between p-4 border border-border rounded-md bg-card-bg">
          <div>
            <span className="font-semibold text-sm md:text-base text-primary-heading block">
              Enable Weekend Service
            </span>
            <span className="text-xs sm:text-sm text-secondary-subheading mt-0.5 block">
              Select the days your crew is available for jobs.
            </span>
          </div>
          <ServiceStatusToggle
            isActive={data.enableWeekendService}
            onChange={(val) => handleToggle("enableWeekendService", val)}
          />
        </div>
      </div>

      {/* 3. Holidays */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 pt-8">
        <div className="lg:col-span-5">
          <h3 className="text-[1.125rem] font-bold text-primary-heading">
            Holidays
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-1 leading-relaxed">
            Jobs cannot be scheduled on marked holidays. You&apos;ll be warned if an existing job falls on a holiday you add.
          </p>
        </div>

        <div className="lg:col-span-7 space-y-3">
          {/* Federal Holidays */}
          <div className="flex items-center justify-between p-4 border border-border rounded-md bg-card-bg">
            <div>
              <span className="font-semibold text-sm md:text-base text-primary-heading block">
                Federal Holidays
              </span>
              <span className="text-xs sm:text-sm text-secondary-subheading mt-0.5 block">
                Automatically import federal holidays each year.
              </span>
            </div>
            <ServiceStatusToggle
              isActive={data.federalHolidays}
              onChange={(val) => handleToggle("federalHolidays", val)}
            />
          </div>

          {/* Custom Holidays */}
          <div className="flex items-center justify-between p-4 border border-border rounded-md bg-card-bg">
            <div>
              <span className="font-semibold text-sm md:text-base text-primary-heading block">
                Custom Holidays
              </span>
              <span className="text-xs sm:text-sm text-secondary-subheading mt-0.5 block">
                Add company-specific holidays when services should not be scheduled.
              </span>
            </div>
            <ServiceStatusToggle
              isActive={data.customHolidays}
              onChange={(val) => handleToggle("customHolidays", val)}
            />
          </div>
        </div>
      </div>

      {/* 4. Weather Delay Policy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 pt-8">
        <div className="lg:col-span-5">
          <h3 className="text-[1.125rem] font-bold text-primary-heading">
            Weather Delay Policy
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-1 leading-relaxed">
            Set what happens when a job is delayed due to weather.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="border border-border rounded-md bg-card-bg overflow-hidden">
            <button
              type="button"
              onClick={() => setIsWeatherOpen((prev) => !prev)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-page-bg/40 transition-colors cursor-pointer"
            >
              <span className="font-semibold text-sm md:text-base text-primary-heading">
                Select your Preferred Options
              </span>
              {isWeatherOpen ? (
                <ChevronUp className="w-4 h-4 text-secondary-subheading shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-secondary-subheading shrink-0" />
              )}
            </button>

            {isWeatherOpen && (
              <div className="p-4 pt-0 border-t border-border/50 text-xs sm:text-sm text-secondary-subheading bg-page-bg/20 space-y-2 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="weather-policy"
                    defaultChecked
                    className="text-primary focus:ring-primary"
                  />
                  <span>Automatically reschedule to next available business day</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="weather-policy"
                    className="text-primary focus:ring-primary"
                  />
                  <span>Notify customer and prompt admin to pick slot</span>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. Scheduling Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 pt-8">
        <div className="lg:col-span-5">
          <h3 className="text-[1.125rem] font-bold text-primary-heading">
            Scheduling Rules
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-1 leading-relaxed">
            Allow admin to schedule visits outside configured business hours.
          </p>
        </div>

        <div className="lg:col-span-7 space-y-3">
          {/* Allow Outside Business Hours */}
          <div className="flex items-center justify-between p-4 border border-border rounded-md bg-card-bg">
            <span className="font-semibold text-sm md:text-base text-primary-heading">
              Allow Scheduling Outside Business Hours
            </span>
            <ServiceStatusToggle
              isActive={data.allowOutsideBusinessHours}
              onChange={(val) => handleToggle("allowOutsideBusinessHours", val)}
            />
          </div>

          {/* Allow Overlapping Crew */}
          <div className="flex items-center justify-between p-4 border border-border rounded-md bg-card-bg">
            <span className="font-semibold text-sm md:text-base text-primary-heading">
              Allow Overlapping Crew Assignments
            </span>
            <ServiceStatusToggle
              isActive={data.allowOverlappingCrewAssignments}
              onChange={(val) => handleToggle("allowOverlappingCrewAssignments", val)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

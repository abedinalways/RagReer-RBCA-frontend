"use client";

import { useState } from "react";
import { Clock, TrendingUp, TrendingDown, MapPin } from "lucide-react";
import { CustomSelect } from "@/components/ui/CustomSelect";
import {
  MOCK_TIME_SHEET_DATA,
  DailyTimeEntry,
} from "../data/mockWorkerTimeSheet";

const PERIOD_OPTIONS = [
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "day", label: "Day" },
];

export function WorkerTimeSheetView() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("week");

  const currentData =
    MOCK_TIME_SHEET_DATA[selectedPeriod] || MOCK_TIME_SHEET_DATA.week;

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Page Heading */}
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <h1 className="font-barlow text-2xl font-bold leading-tight text-primary-heading">
          Time Sheet per hours
        </h1>
      </div>

      {/* Total Work Time Section Header */}
      <div className="flex items-center justify-between pt-1">
        <h2 className="font-barlow text-xl font-bold text-primary-heading tracking-tight">
          Total Work Time
        </h2>
        <div className="w-28">
          <CustomSelect
            options={PERIOD_OPTIONS}
            value={selectedPeriod}
            onChange={(val) => setSelectedPeriod(val)}
            size="sm"
            align="right"
            triggerClassName="h-9 text-sm font-medium border-border/90 rounded-lg bg-card-bg text-secondary-subheading"
          />
        </div>
      </div>

      {/* Total Hours Card */}
      <div className="rounded-xl border border-border bg-card-bg p-4 shadow-2xs space-y-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-2xs">
            <Clock className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-txt-primary">
            {currentData.periodLabel}
          </span>
        </div>

        <div className="flex items-baseline">
          <span className="text-3xl font-bold tracking-tight text-primary-heading font-barlow">
            {currentData.totalHours}
          </span>
          <span className="ml-1.5 text-sm font-normal text-secondary-subheading">
            h
          </span>
        </div>

        {/* Dual-color Progress Bar (Regular Time vs Over Time) */}
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100 flex">
          <div
            className="h-full bg-primary rounded-l-full transition-all duration-500"
            style={{ width: `${currentData.regularPercentage}%` }}
          />
          <div
            className="h-full bg-trend-down rounded-r-full transition-all duration-500"
            style={{ width: `${currentData.overtimePercentage}%` }}
          />
        </div>
      </div>

      {/* Regular Work Time & Over Time Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Regular Work Time */}
        <div className="flex flex-col justify-between rounded-xl border border-border bg-card-bg p-3.5 shadow-2xs">
          <span className="text-xs font-medium text-[#5980A6] leading-tight">
            Regular Work Time
          </span>
          <div className="flex items-baseline mt-2.5">
            <span className="text-xl font-bold tracking-tight text-primary-heading font-barlow">
              {currentData.regularTime}
            </span>
            <span className="ml-1 text-xs font-normal text-secondary-subheading">
              h
            </span>
          </div>
        </div>

        {/* Over Time */}
        <div className="flex flex-col justify-between rounded-xl border border-border bg-card-bg p-3.5 shadow-2xs">
          <span className="text-xs font-medium text-[#5980A6] leading-tight">
            Over Time
          </span>
          <div className="flex items-baseline justify-between mt-2.5">
            <div className="flex items-baseline">
              <span className="text-xl font-bold tracking-tight text-primary-heading font-barlow">
                {currentData.overTime}
              </span>
              <span className="ml-1 text-xs font-normal text-secondary-subheading">
                h
              </span>
            </div>

            <div
              className={`flex items-center gap-0.5 text-xs font-semibold ${
                currentData.trendType === "up"
                  ? "text-trend-up"
                  : "text-trend-down"
              }`}
            >
              {currentData.trendType === "up" ? (
                <TrendingUp className="h-3 w-3 stroke-[2.5]" />
              ) : (
                <TrendingDown className="h-3 w-3 stroke-[2.5]" />
              )}
              <span>{currentData.trend}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Entries Section */}
      <section className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <h2 className="font-barlow text-xl font-bold text-primary-heading tracking-tight">
            Daily entries
          </h2>
          <span className="text-xs font-semibold text-primary">
            {currentData.entriesCountText}
          </span>
        </div>

        <div className="space-y-3">
          {currentData.dailyEntries.map((entry: DailyTimeEntry) => (
            <div
              key={entry.id}
              className="flex items-center gap-3.5 rounded-xl border border-border bg-card-bg p-3 shadow-2xs transition-all hover:border-primary/40 hover:shadow-xs"
            >
              {/* Date Box */}
              <div className="flex flex-col items-center justify-center rounded-lg bg-blue-50/70 border border-blue-100/50 px-3 py-2 min-w-[70px] shrink-0 text-center">
                <span className="text-xs font-medium text-txt-primary leading-tight">
                  {entry.month}
                </span>
                <span className="text-xl font-bold text-primary-heading leading-tight my-0.5 font-barlow">
                  {entry.day}
                </span>
                <span className="text-[11px] font-normal text-secondary-subheading leading-tight">
                  {entry.weekday}
                </span>
              </div>

              {/* Work Details */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="text-base font-bold text-primary leading-tight">
                  {entry.duration}
                </div>
                <div className="text-sm font-semibold text-primary-heading truncate leading-snug">
                  {entry.title}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-secondary-subheading">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-secondary-subheading" />
                  <span className="truncate">{entry.address}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

"use client";

import React from "react";
import { ChevronRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ApprovedExtraWorkCardProps {
  tagLabel?: string;
  day?: string;
  month?: string;
  title?: string;
  description?: string;
  location?: string;
  distance?: string;
  onViewApprovals?: () => void;
  className?: string;
}


export function ApprovedExtraWorkCard({
  tagLabel = "Rescheduling",
  day = "26",
  month = "Aug",
  title = "1 approved extra work item",
  description = "Re-grade washed gravel along the north...",
  location = "21 Broadway, Manhattan",
  distance = "6.7km",
  onViewApprovals,
  className,
}: ApprovedExtraWorkCardProps) {
  return (
    <section
      className={cn(
        "flex w-full flex-col items-start gap-4 p-3 rounded-md border border-[#CADFF4] bg-white shadow-[0_6px_16px_0_rgba(27,43,53,0.08)]",
        className
      )}
    >
      {/* Rescheduling Tag */}
      <div>
        <span className="inline-flex h-[1.375rem] items-center justify-center gap-0.5 rounded-[2px] border border-[rgba(245,181,23,0.50)] bg-[rgba(245,181,23,0.15)] px-2 py-[0.125rem] text-xs font-medium text-[#B47804]">
          {tagLabel}
        </span>
      </div>

      {/* Main Content: Date Box + Title & Subtitle */}
      <div className="flex gap-3 w-full">
        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-status-running-bg text-center">
          <span className="text-base font-bold leading-none text-primary-heading">
            {day}
          </span>
          <span className="text-[11px] font-semibold uppercase mt-0.5 text-status-running-text">
            {month}
          </span>
        </div>

        <div className="space-y-0.5">
          <h4 className="font-barlow text-xl font-medium leading-[160%] text-txt-primary">
            {title}
          </h4>
          <p className="text-sm text-secondary-subheading line-clamp-1">
            {description}
          </p>
        </div>
      </div>

      {/* Location & Distance Row */}
      <div className="flex w-full items-center justify-between pt-1">
        <div className="flex items-center gap-1 text-xs text-secondary-subheading">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-secondary-subheading" />
          <span>{location}</span>
        </div>
        <span className="rounded-md bg-status-running-bg px-2 py-0.5 text-[11px] font-semibold text-status-running-text">
          {distance}
        </span>
      </div>

      {/* Footer Link */}
      <div className="pt-0.5">
        <button
          type="button"
          onClick={onViewApprovals}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline cursor-pointer"
        >
          View approvals <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { ActivityLogItem } from "../types";
import { cn } from "@/lib/utils";

interface ActivityItemCardProps {
  activity: ActivityLogItem;
}

const DOT_COLOR_CLASSES: Record<string, string> = {
  yellow: "bg-amber-500 ring-2 ring-amber-500/20",
  green: "bg-emerald-500 ring-2 ring-emerald-500/20",
  blue: "bg-blue-500 ring-2 ring-blue-500/20",
  purple: "bg-purple-500 ring-2 ring-purple-500/20",
  red: "bg-rose-500 ring-2 ring-rose-500/20",
};

export function ActivityItemCard({ activity }: ActivityItemCardProps) {
  const dotClass = DOT_COLOR_CLASSES[activity.dotColor] || DOT_COLOR_CLASSES.blue;

  return (
    <div className="group px-4 py-3 sm:px-5 sm:py-3.5 flex items-start justify-between gap-3 hover:bg-[#F9FAFB]/70 transition-colors">
      {/* Left: Dot & Content */}
      <div className="flex items-start gap-3 min-w-0 flex-1">
        {/* Status Dot */}
        <span
          className={cn(
            "w-2 h-2 rounded-full shrink-0 mt-1.5 transition-transform group-hover:scale-125",
            dotClass
          )}
          aria-hidden="true"
        />

        {/* Text Details */}
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-primary-heading leading-tight truncate sm:whitespace-normal">
            {activity.title}
          </h4>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-1 leading-snug break-words">
            {activity.description}
          </p>
        </div>
      </div>

      {/* Right: Timestamp */}
      <span className="text-xs sm:text-sm text-[#8C939D] shrink-0 whitespace-nowrap pt-0.5 font-normal">
        {activity.timestamp}
      </span>
    </div>
  );
}

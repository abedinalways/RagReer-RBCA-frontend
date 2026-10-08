"use client";

import React from "react";
import { RECENT_ACTIVITY_DATA } from "../data/dashboardData";

export const RecentActivityCard: React.FC = () => {
  const getDotColorClass = (color: "amber" | "green" | "blue") => {
    switch (color) {
      case "amber":
        return "bg-password-medium";
      case "green":
        return "bg-trend-up";
      case "blue":
        return "bg-info";
      default:
        return "bg-primary";
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card-bg p-4 sm:p-5 shadow-2xs">
      <div className="pb-3.5 border-b border-border-subtle">
        <h3 className="font-barlow text-lg font-bold text-primary-heading leading-none">
          Recent Activity
        </h3>
      </div>

      <div className="mt-4 space-y-4">
        {RECENT_ACTIVITY_DATA.map((item) => (
          <div key={item.id} className="flex items-start gap-2.5">
            {/* Colored Indicator Dot */}
            <span
              className={`h-2 w-2 rounded-full shrink-0 mt-1.5 ${getDotColorClass(
                item.dotColor
              )}`}
            />

            {/* Content & Timestamp */}
            <div className="flex-1 space-y-0.5">
              <div className="flex items-baseline justify-between gap-2">
                <h4 className="text-xs sm:text-sm font-semibold text-primary-heading leading-tight">
                  {item.title}
                </h4>
                <span className="text-[11px] text-secondary-subheading whitespace-nowrap shrink-0">
                  {item.timeAgo}
                </span>
              </div>
              <p className="text-xs text-secondary-subheading leading-normal">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

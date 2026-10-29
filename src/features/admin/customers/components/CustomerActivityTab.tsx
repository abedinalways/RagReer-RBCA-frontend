"use client";

import React from "react";
import { CUSTOMER_ALL_ACTIVITIES } from "../data/adminCustomersDetailData";
import { CustomerActivityItem } from "../types/adminCustomers.types";

interface CustomerActivityTabProps {
  activities?: CustomerActivityItem[];
}

export const CustomerActivityTab: React.FC<CustomerActivityTabProps> = ({
  activities = CUSTOMER_ALL_ACTIVITIES,
}) => {
  const getDotColor = (type: CustomerActivityItem["type"]) => {
    switch (type) {
      case "blue":
        return "bg-info";
      case "green":
        return "bg-emerald-500";
      case "orange":
      case "amber":
      default:
        return "bg-amber-500";
    }
  };

  return (
    <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-6 shadow-2xs space-y-4">
      {/* Header (Figma Screenshot) */}
      <div className="border-b border-border pb-4">
        <h2 className="text-xl sm:text-2xl font-medium text-primary-heading font-barlow-condensed">
          All Activity
        </h2>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-border/60">
        {activities.map((item) => (
          <div
            key={item.id}
            className="py-4 flex items-start justify-between gap-4 first:pt-1 last:pb-1"
          >
            {/* Left: Dot, Title, Description */}
            <div className="flex items-start gap-3 min-w-0">
              <span
                className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${getDotColor(
                  item.type
                )}`}
              />
              <div className="space-y-0.5 min-w-0">
                <h3 className="text-sm sm:text-base font-medium text-primary-heading leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-secondary-subheading leading-normal">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Right: Timestamp */}
            <span className="text-xs sm:text-sm text-secondary-subheading whitespace-nowrap shrink-0 pt-0.5">
              {item.timestamp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerActivityTab;

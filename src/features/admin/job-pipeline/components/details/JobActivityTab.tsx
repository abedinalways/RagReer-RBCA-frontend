"use client";

import React from "react";
import ActivityIcon from "../../../../../components/icons/admin/ActivityIcon";
import { JobActivityItem } from "../../types/jobDetailsTypes";

interface JobActivityTabProps {
  activities?: JobActivityItem[];
}

export const JobActivityTab: React.FC<JobActivityTabProps> = ({ activities = [] }) => {
  if (activities && activities.length > 0) {
    return (
      <div className="w-full rounded-xl border border-border bg-card-bg shadow-2xs overflow-hidden animate-in fade-in duration-150">
        <div className="p-4 sm:p-5 border-b border-border/60">
          <h3 className="font-barlow text-base sm:text-lg font-medium text-primary-heading leading-tight">
            All Activity
          </h3>
        </div>

        <div className="divide-y divide-border/60 px-4 sm:px-6">
          {activities.map((act) => {
            const dotClass =
              act.dotColor === "amber"
                ? "bg-badge-pending-dot"
                : act.dotColor === "green"
                ? "bg-badge-active-dot"
                : act.dotColor === "orange"
                ? "bg-pipeline-today"
                : "bg-info";

            return (
              <div
                key={act.id}
                className="py-3.5 sm:py-4 flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${dotClass}`} />
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium text-xs sm:text-sm text-txt-primary">
                      {act.title}
                    </span>
                    <span className="text-[11px] sm:text-xs text-secondary-subheading font-normal mt-0.5">
                      {act.description}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] sm:text-xs text-secondary-subheading font-normal shrink-0">
                  {act.timestamp}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl border border-border bg-card-bg shadow-2xs overflow-hidden animate-in fade-in duration-150">
      <div className="p-4 sm:p-5 border-b border-border">
        <h3 className="font-barlow text-base sm:text-lg font-medium text-primary-heading leading-tight">
          Activity
        </h3>
      </div>

      <div className="p-8 sm:p-16 flex flex-col items-center justify-center text-center">
        <div className="p-4 rounded-full bg-table-total-bg/40">
          <ActivityIcon />
        </div>

        <h4 className="font-barlow text-xl sm:text-2xl font-medium text-primary-heading mb-1.5">
          No Activity Yet
        </h4>

        <p className="text-xs sm:text-sm text-secondary-subheading font-normal max-w-sm">
          There is no activity for this job
        </p>
      </div>
    </div>
  );
};


"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { CrewMemberItem } from "../types/crewMembers.types";
import { mockAllActivitiesList } from "../data/crewMembersData";

interface CrewActivityTabProps {
  member: CrewMemberItem;
}

export const CrewActivityTab: React.FC<CrewActivityTabProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  member,
}) => {
  return (
    <div className="bg-card-bg rounded-xl border border-border shadow-2xs overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-border">
        <h2 className="text-base sm:text-lg font-medium text-primary-heading font-barlow-condensed">
          All Activity
        </h2>
      </div>

      {/* Activity List */}
      <div className="p-5 sm:p-6 divide-y divide-border">
        {mockAllActivitiesList.map((act) => (
          <div
            key={act.id}
            className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4 hover:bg-page-bg/30 px-2 rounded-md transition-colors"
          >
            <div className="flex items-start gap-3">
              {/* Colored Dot Indicator */}
              <span
                className={cn(
                  "w-2 h-2 rounded-full mt-1.5 shrink-0",
                  act.dotColor === "amber" && "bg-flagged-amber",
                  act.dotColor === "blue" && "bg-info",
                  act.dotColor === "green" && "bg-badge-active-dot",
                  act.dotColor === "red" && "bg-decline"
                )}
              />

              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm font-medium text-primary-heading">
                  {act.title}
                </p>
                <p className="text-[11px] sm:text-xs text-secondary-subheading">
                  {act.description}
                </p>
              </div>
            </div>

            <span className="text-xs text-secondary-subheading shrink-0 text-right">
              {act.timestamp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrewActivityTab;

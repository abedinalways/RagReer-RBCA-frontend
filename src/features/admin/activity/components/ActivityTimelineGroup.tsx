"use client";

import React from "react";
import { ActivityDateGroup, ActivityLogItem } from "../types";
import { ActivityItemCard } from "./ActivityItemCard";

interface ActivityTimelineGroupProps {
  groupName: ActivityDateGroup;
  items: ActivityLogItem[];
}

export function ActivityTimelineGroup({
  groupName,
  items,
}: ActivityTimelineGroupProps) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-2.5">
      {/* Group Accent Header */}
      <div className="flex items-center gap-2">
        <div className="border-l-[2.5px] border-[#5980A6] pl-2.5 py-0.5">
          <h3 className="text-sm font-semibold text-[#5980A6] tracking-wide">
            {groupName}
          </h3>
        </div>
      </div>

      {/* Group Item Container Card */}
      <div className="bg-white rounded-lg border border-[#EAECF0] shadow-2xs divide-y divide-[#EAECF0]/80 overflow-hidden">
        {items.map((activity) => (
          <ActivityItemCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { useActivityFilters } from "../hooks/useActivityFilters";
import { ActivityHeader } from "./ActivityHeader";
import { ActivityToolbar } from "./ActivityToolbar";
import { ActivityTimelineGroup } from "./ActivityTimelineGroup";
import { ActivityEmptyState } from "./ActivityEmptyState";

export function ActivityLogView() {
  const {
    filters,
    totalCount,
    groupedActivities,
    handleSearchChange,
    handleDateFilterChange,
    handleUserRoleChange,
    handleActionTypeChange,
    handleResetFilters,
    exportToCsv,
  } = useActivityFilters();

  return (
    <div className="space-y-4 sm:space-y-5 ">
      {/* Top Page Header */}
      <ActivityHeader
        onExport={exportToCsv}
        disabled={totalCount === 0}
      />

      {/* Main Events Container Card */}
      <div className="bg-white rounded-xl border border-[#EAECF0] shadow-xs p-4 sm:p-5 md:p-6 space-y-5 sm:space-y-6">
        {/* Events Toolbar & Filter Controls */}
        <ActivityToolbar
          filters={filters}
          onSearchChange={handleSearchChange}
          onDateChange={handleDateFilterChange}
          onUserRoleChange={handleUserRoleChange}
          onActionChange={handleActionTypeChange}
        />

        {/* Timeline Events Group List */}
        {totalCount > 0 ? (
          <div className="space-y-6 sm:space-y-7">
            <ActivityTimelineGroup
              groupName="Today"
              items={groupedActivities.Today}
            />
            <ActivityTimelineGroup
              groupName="Yesterday"
              items={groupedActivities.Yesterday}
            />
            <ActivityTimelineGroup
              groupName="Last Week"
              items={groupedActivities["Last Week"]}
            />
          </div>
        ) : (
          <ActivityEmptyState onReset={handleResetFilters} />
        )}
      </div>
    </div>
  );
}

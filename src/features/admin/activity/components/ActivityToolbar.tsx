"use client";

import React from "react";
import { Search } from "lucide-react";
import {
  ActivityActionType,
  ActivityDateFilter,
  ActivityFilters,
  ActivityUserRole,
} from "../types";
import {
  ACTIVITY_ACTION_OPTIONS,
  ACTIVITY_DATE_OPTIONS,
  ACTIVITY_USER_OPTIONS,
} from "../data/activityData";
import { ActivityFilterDropdown } from "./ActivityFilterDropdown";

interface ActivityToolbarProps {
  filters: ActivityFilters;
  onSearchChange: (val: string) => void;
  onDateChange: (val: ActivityDateFilter) => void;
  onUserRoleChange: (val: ActivityUserRole) => void;
  onActionChange: (val: ActivityActionType) => void;
}

export function ActivityToolbar({
  filters,
  onSearchChange,
  onDateChange,
  onUserRoleChange,
  onActionChange,
}: ActivityToolbarProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 pb-4 border-b border-[#EAECF0]/80">
      {/* Title */}
      <h2 className="text-base sm:text-lg font-semibold text-primary-heading shrink-0">
        Events
      </h2>

      {/* Responsive Filter Bar Matching Screenshots 1 & 3 */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:flex md:items-center gap-2 sm:gap-2.5">
        {/* Search Activity (Row 1 Col 1 on mobile, 1st on desktop) */}
        <div className="relative col-span-1 md:w-52 lg:w-60 order-1">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Activity"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#EAECF0] bg-white text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-2xs"
          />
          <Search className="w-4 h-4 text-secondary-subheading absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* All Actions Dropdown (Row 1 Col 2 on mobile, 4th on desktop) */}
        <div className="col-span-1 order-2 md:order-4">
          <ActivityFilterDropdown
            value={filters.actionType}
            options={ACTIVITY_ACTION_OPTIONS}
            onChange={onActionChange}
            menuWidthClass="w-36"
            className="w-full"
          />
        </div>

        {/* Date Range Dropdown (Row 2 Col 1 on mobile, 2nd on desktop) */}
        <div className="col-span-1 order-3 md:order-2">
          <ActivityFilterDropdown
            value={filters.dateRange}
            options={ACTIVITY_DATE_OPTIONS}
            onChange={onDateChange}
            menuWidthClass="w-36"
            className="w-full"
          />
        </div>

        {/* All Users Dropdown (Row 2 Col 2 on mobile, 3rd on desktop) */}
        <div className="col-span-1 order-4 md:order-3">
          <ActivityFilterDropdown
            value={filters.userRole}
            options={ACTIVITY_USER_OPTIONS}
            onChange={onUserRoleChange}
            menuWidthClass="w-36"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState, useCallback } from "react";
import {
  ActivityDateFilter,
  ActivityFilters,
  ActivityLogItem,
  ActivityActionType,
  ActivityUserRole,
  ActivityDateGroup,
} from "../types";
import { INITIAL_ACTIVITY_LOGS } from "../data/activityData";

const INITIAL_FILTERS: ActivityFilters = {
  search: "",
  dateRange: "Date Range",
  userRole: "All Users",
  actionType: "All Actions",
};

export function useActivityFilters() {
  const [filters, setFilters] = useState<ActivityFilters>(INITIAL_FILTERS);
  const [activities] = useState<ActivityLogItem[]>(INITIAL_ACTIVITY_LOGS);

  const handleSearchChange = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const handleDateFilterChange = useCallback((dateRange: ActivityDateFilter) => {
    setFilters((prev) => ({ ...prev, dateRange }));
  }, []);

  const handleUserRoleChange = useCallback((userRole: ActivityUserRole) => {
    setFilters((prev) => ({ ...prev, userRole }));
  }, []);

  const handleActionTypeChange = useCallback((actionType: ActivityActionType) => {
    setFilters((prev) => ({ ...prev, actionType }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  // Filter items based on active criteria
  const filteredActivities = useMemo(() => {
    return activities.filter((item) => {
      // Search matching (title, description, actor, target ID)
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesActor = item.actorName.toLowerCase().includes(query);
        const matchesTarget = item.targetId?.toLowerCase().includes(query) ?? false;

        if (!matchesTitle && !matchesDesc && !matchesActor && !matchesTarget) {
          return false;
        }
      }

      // User role filter
      if (filters.userRole !== "All Users" && item.userRole !== filters.userRole) {
        return false;
      }

      // Action type filter
      if (filters.actionType !== "All Actions" && item.actionType !== filters.actionType) {
        return false;
      }

      // Date range filter
      if (filters.dateRange !== "Date Range") {
        if (filters.dateRange === "Today" && item.dateGroup !== "Today") {
          return false;
        }
        if (filters.dateRange === "Yesterday" && item.dateGroup !== "Yesterday") {
          return false;
        }
        if (
          filters.dateRange === "Last 7 Days" &&
          item.dateGroup !== "Today" &&
          item.dateGroup !== "Yesterday"
        ) {
          return false;
        }
      }

      return true;
    });
  }, [activities, filters]);

  // Group filtered items by dateGroup in display order
  const groupedActivities = useMemo(() => {
    const groups: Record<ActivityDateGroup, ActivityLogItem[]> = {
      Today: [],
      Yesterday: [],
      "Last Week": [],
    };

    filteredActivities.forEach((item) => {
      if (groups[item.dateGroup]) {
        groups[item.dateGroup].push(item);
      }
    });

    return groups;
  }, [filteredActivities]);

  // CSV Export utility
  const exportToCsv = useCallback(() => {
    if (filteredActivities.length === 0) return;

    const headers = ["ID", "Title", "Description", "Time", "Date Group", "Action", "User Role", "Actor"];
    const rows = filteredActivities.map((act) => [
      act.id,
      `"${act.title.replace(/"/g, '""')}"`,
      `"${act.description.replace(/"/g, '""')}"`,
      act.timestamp,
      act.dateGroup,
      act.actionType,
      act.userRole,
      `"${act.actorName.replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `activity-log-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [filteredActivities]);

  return {
    filters,
    totalCount: filteredActivities.length,
    groupedActivities,
    handleSearchChange,
    handleDateFilterChange,
    handleUserRoleChange,
    handleActionTypeChange,
    handleResetFilters,
    exportToCsv,
  };
}

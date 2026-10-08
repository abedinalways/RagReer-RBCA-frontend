"use client";

import React from "react";
import { Search, ChevronDown } from "lucide-react";
import { EquipmentFilters } from "../types";
import {
  EQUIPMENT_TYPES,
  EQUIPMENT_CONDITIONS,
  EQUIPMENT_STATUSES,
} from "../data/equipmentData";

interface EquipmentToolbarProps {
  filters: EquipmentFilters;
  onFilterChange: (filters: EquipmentFilters) => void;
}

export function EquipmentToolbar({
  filters,
  onFilterChange,
}: EquipmentToolbarProps) {
  return (
    <div className="p-4 sm:p-5 border-b border-border flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-layout-bg">
      {/* Title */}
      <h2 className="text-base sm:text-lg font-semibold text-primary-heading shrink-0">
        All Equipment List
      </h2>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 flex-wrap">
        {/* Search */}
        <div className="relative w-full sm:w-56 md:w-64">
          <input
            type="text"
            value={filters.search}
            onChange={(e) =>
              onFilterChange({ ...filters, search: e.target.value })
            }
            placeholder="Search equipment"
            className="w-full pl-9 pr-3.5 py-2 rounded-md border border-border bg-card-bg text-sm text-txt-primary placeholder:text-secondary-subheading/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
          <Search className="w-4 h-4 text-secondary-subheading absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Dropdowns Row */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Equipment Type Dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={filters.type}
              onChange={(e) =>
                onFilterChange({ ...filters, type: e.target.value })
              }
              className="appearance-none w-full sm:w-auto bg-card-bg border border-border rounded-md px-3 py-2 pr-8 text-xs sm:text-sm text-secondary-subheading font-medium hover:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors"
            >
              <option value="">All Equipment Type</option>
              {EQUIPMENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Condition Dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={filters.condition}
              onChange={(e) =>
                onFilterChange({ ...filters, condition: e.target.value })
              }
              className="appearance-none w-full sm:w-auto bg-card-bg border border-border rounded-md px-3 py-2 pr-8 text-xs sm:text-sm text-secondary-subheading font-medium hover:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors"
            >
              <option value="">All Condition</option>
              {EQUIPMENT_CONDITIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Status Dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={filters.status}
              onChange={(e) =>
                onFilterChange({ ...filters, status: e.target.value })
              }
              className="appearance-none w-full sm:w-auto bg-card-bg border border-border rounded-md px-3 py-2 pr-8 text-xs sm:text-sm text-secondary-subheading font-medium hover:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors"
            >
              <option value="">All Status</option>
              {EQUIPMENT_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useMemo } from "react";
import { Search } from "lucide-react";
import { EquipmentFilters } from "../types";
import {
  EQUIPMENT_TYPES,
  EQUIPMENT_CONDITIONS,
  EQUIPMENT_STATUSES,
} from "../data/equipmentData";
import { CustomSelect } from "@/components/ui/CustomSelect";

interface EquipmentToolbarProps {
  filters: EquipmentFilters;
  onFilterChange: (filters: EquipmentFilters) => void;
}

export function EquipmentToolbar({
  filters,
  onFilterChange,
}: EquipmentToolbarProps) {
  const typeOptions = useMemo(
    () => [
      { value: "", label: "All Equipment Type" },
      ...EQUIPMENT_TYPES.map((t) => ({ value: t, label: t })),
    ],
    []
  );

  const conditionOptions = useMemo(
    () => [
      { value: "", label: "All Condition" },
      ...EQUIPMENT_CONDITIONS,
    ],
    []
  );

  const statusOptions = useMemo(
    () => [
      { value: "", label: "All Status" },
      ...EQUIPMENT_STATUSES,
    ],
    []
  );

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
            className="w-full h-9 pl-9 pr-3.5 rounded-md border border-border bg-card-bg text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
          <Search className="w-4 h-4 text-secondary-subheading absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Dropdowns Row */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap w-full sm:w-auto">
          {/* Equipment Type Dropdown */}
          <div className="w-full sm:w-44">
            <CustomSelect
              value={filters.type}
              onChange={(val) => onFilterChange({ ...filters, type: val })}
              options={typeOptions}
              size="sm"
              align="right"
            />
          </div>

          {/* Condition Dropdown */}
          <div className="w-full sm:w-36">
            <CustomSelect
              value={filters.condition}
              onChange={(val) => onFilterChange({ ...filters, condition: val })}
              options={conditionOptions}
              size="sm"
              align="right"
            />
          </div>

          {/* Status Dropdown */}
          <div className="w-full sm:w-36">
            <CustomSelect
              value={filters.status}
              onChange={(val) => onFilterChange({ ...filters, status: val })}
              options={statusOptions}
              size="sm"
              align="right"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

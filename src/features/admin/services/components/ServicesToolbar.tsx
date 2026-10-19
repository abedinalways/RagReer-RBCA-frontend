"use client";

import React, { useMemo } from "react";
import { Search } from "lucide-react";
import { ServiceFilters } from "../types";
import {
  SERVICE_CATEGORIES,
  SERVICE_APPLICABLE_OPTIONS,
  SERVICE_PRICING_TYPES,
} from "../data/servicesData";
import { CustomSelect } from "@/components/ui/CustomSelect";

interface ServicesToolbarProps {
  filters: ServiceFilters;
  onFilterChange: (filters: ServiceFilters) => void;
}

export function ServicesToolbar({
  filters,
  onFilterChange,
}: ServicesToolbarProps) {
  const categoryOptions = useMemo(
    () => [
      { value: "", label: "All Categories" },
      ...SERVICE_CATEGORIES.map((cat) => ({ value: cat, label: cat })),
    ],
    [],
  );

  const applicableOptions = useMemo(
    () => [
      { value: "", label: "Applicable To" },
      ...SERVICE_APPLICABLE_OPTIONS.map((app) => ({ value: app, label: app })),
    ],
    [],
  );

  const pricingOptions = useMemo(
    () => [
      { value: "", label: "Pricing Type" },
      ...SERVICE_PRICING_TYPES.map((pt) => ({ value: pt, label: pt })),
    ],
    [],
  );

  const statusOptions = useMemo(
    () => [
      { value: "", label: "All Status" },
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
    [],
  );

  return (
    <div className="p-4 sm:p-5 border-b border-border flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-layout-bg">
      {/* Title */}
      <h2 className="text-base sm:text-lg font-semibold text-primary-heading shrink-0">
        All Service List
      </h2>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 flex-wrap">
        {/* Search */}
        <div className="relative w-full sm:w-52 md:w-60">
          <input
            type="text"
            value={filters.search}
            onChange={(e) =>
              onFilterChange({ ...filters, search: e.target.value })
            }
            placeholder="Search service"
            className="w-full h-9 pl-9 pr-3.5 rounded-md border border-border bg-card-bg text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
          <Search className="w-4 h-4 text-secondary-subheading absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Dropdowns Row */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap w-full sm:w-auto">
          {/* Categories Dropdown */}
          <div className="w-full sm:w-40">
            <CustomSelect
              value={filters.category}
              onChange={(val) => onFilterChange({ ...filters, category: val })}
              options={categoryOptions}
              size="sm"
              align="right"
            />
          </div>

          {/* Applicable To Dropdown */}
          <div className="w-full sm:w-40">
            <CustomSelect
              value={filters.applicableTo}
              onChange={(val) =>
                onFilterChange({ ...filters, applicableTo: val })
              }
              options={applicableOptions}
              size="sm"
              align="right"
            />
          </div>

          {/* Pricing Type Dropdown */}
          <div className="w-full sm:w-36">
            <CustomSelect
              value={filters.pricingType}
              onChange={(val) =>
                onFilterChange({ ...filters, pricingType: val })
              }
              options={pricingOptions}
              size="sm"
              align="right"
            />
          </div>

          {/* Status Dropdown */}
          <div className="w-full sm:w-32">
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

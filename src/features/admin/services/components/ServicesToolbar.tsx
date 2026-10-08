"use client";

import React from "react";
import { Search, ChevronDown } from "lucide-react";
import { ServiceFilters } from "../types";
import {
  SERVICE_CATEGORIES,
  SERVICE_APPLICABLE_OPTIONS,
  SERVICE_PRICING_TYPES,
} from "../data/servicesData";

interface ServicesToolbarProps {
  filters: ServiceFilters;
  onFilterChange: (filters: ServiceFilters) => void;
}

export function ServicesToolbar({
  filters,
  onFilterChange,
}: ServicesToolbarProps) {
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
            className="w-full pl-9 pr-3.5 py-2 rounded-md border border-border bg-card-bg text-sm text-txt-primary placeholder:text-secondary-subheading/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
          <Search className="w-4 h-4 text-secondary-subheading absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Dropdowns Row */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          {/* Categories Dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={filters.category}
              onChange={(e) =>
                onFilterChange({ ...filters, category: e.target.value })
              }
              className="appearance-none w-full sm:w-auto bg-card-bg border border-border rounded-md px-3 py-2 pr-8 text-xs sm:text-sm text-secondary-subheading font-medium hover:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors"
            >
              <option value="">All Categories</option>
              {SERVICE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Applicable To Dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={filters.applicableTo}
              onChange={(e) =>
                onFilterChange({ ...filters, applicableTo: e.target.value })
              }
              className="appearance-none w-full sm:w-auto bg-card-bg border border-border rounded-md px-3 py-2 pr-8 text-xs sm:text-sm text-secondary-subheading font-medium hover:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors"
            >
              <option value="">Applicable To</option>
              {SERVICE_APPLICABLE_OPTIONS.map((app) => (
                <option key={app} value={app}>
                  {app.length > 25 ? app.slice(0, 22) + "..." : app}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Pricing Type Dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={filters.pricingType}
              onChange={(e) =>
                onFilterChange({ ...filters, pricingType: e.target.value })
              }
              className="appearance-none w-full sm:w-auto bg-card-bg border border-border rounded-md px-3 py-2 pr-8 text-xs sm:text-sm text-secondary-subheading font-medium hover:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer transition-colors"
            >
              <option value="">Pricing Type</option>
              {SERVICE_PRICING_TYPES.map((pt) => (
                <option key={pt} value={pt}>
                  {pt}
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

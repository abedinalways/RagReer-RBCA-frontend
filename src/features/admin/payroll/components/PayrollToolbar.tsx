"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import { PayrollStatus } from "../types";

interface PayrollToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: PayrollStatus;
  onStatusChange: (status: PayrollStatus) => void;
}

const STATUS_OPTIONS: { label: string; value: PayrollStatus }[] = [
  { label: "All Status", value: "All" },
  { label: "Paid", value: "Paid" },
  { label: "Pending", value: "Pending" },
  { label: "Processing", value: "Processing" },
];

export function PayrollToolbar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: PayrollToolbarProps) {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setIsStatusOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-4 sm:p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 bg-card-bg">
      {/* Title */}
      <h2 className="text-base sm:text-lg font-bold text-primary-heading">
        All Payroll List
      </h2>

      {/* Search & Status Filter */}
      <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
        {/* Search Input */}
        <div className="relative flex-1 sm:w-56 md:w-64">
          <Search className="w-4 h-4 text-secondary-subheading absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Crew"
            className="w-full h-9 pl-9 pr-3.5 rounded-lg border border-border bg-card-bg text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
        </div>

        {/* Status Dropdown */}
        <div className="relative shrink-0" ref={statusRef}>
          <button
            type="button"
            onClick={() => setIsStatusOpen((prev) => !prev)}
            className="h-9 px-3.5 rounded-lg border border-border bg-card-bg text-secondary-subheading hover:text-txt-primary text-xs sm:text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>{statusFilter === "All" ? "Status" : statusFilter}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-secondary-subheading transition-transform duration-200 ${
                isStatusOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isStatusOpen && (
            <div className="absolute right-0 mt-1.5 w-36 bg-card-bg border border-border rounded-xl shadow-lg py-1.5 z-30 animate-in fade-in slide-in-from-top-1 duration-150">
              {STATUS_OPTIONS.map((opt) => {
                const isSelected = statusFilter === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onStatusChange(opt.value);
                      setIsStatusOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? "text-primary font-medium bg-blue-50/60"
                        : "text-txt-primary hover:bg-page-bg"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

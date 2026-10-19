"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import { BillingType, ReceivableStatus } from "../types";

interface AccountsReceivableToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  billingFilter: BillingType | "All";
  onBillingFilterChange: (filter: BillingType | "All") => void;
  statusFilter: ReceivableStatus | "All";
  onStatusFilterChange: (filter: ReceivableStatus | "All") => void;
}

const BILLING_OPTIONS: { label: string; value: BillingType | "All" }[] = [
  { label: "All Billing Type", value: "All" },
  { label: "Pending", value: "Pending" },
  { label: "Consolidated", value: "Consolidated" },
  { label: "Confirmed", value: "Confirmed" },
];

const STATUS_OPTIONS: { label: string; value: ReceivableStatus | "All" }[] = [
  { label: "All Status", value: "All" },
  { label: "Awaiting Payment", value: "Awaiting Payment" },
  { label: "Overdue", value: "Overdue" },
  { label: "Paid", value: "Paid" },
];

export function AccountsReceivableToolbar({
  searchQuery,
  onSearchChange,
  billingFilter,
  onBillingFilterChange,
  statusFilter,
  onStatusFilterChange,
}: AccountsReceivableToolbarProps) {
  const [isBillingOpen, setIsBillingOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const billingRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (billingRef.current && !billingRef.current.contains(event.target as Node)) {
        setIsBillingOpen(false);
      }
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setIsStatusOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-4 sm:p-5 border-b border-border flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 bg-card-bg">
      {/* Title */}
      <h2 className="text-lg md:text-xl font-normal text-primary-heading">
        All Accounts Receivable List
      </h2>

      {/* Controls: Search & Dropdowns */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 w-full lg:w-auto">
        {/* Search */}
        <div className="relative flex-1 sm:w-56 md:w-64 min-w-[180px]">
          <Search className="w-4 h-4 text-secondary-subheading absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Type to search"
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-page-bg/40 text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
        </div>

        {/* Billing Type Dropdown */}
        <div className="relative shrink-0" ref={billingRef}>
          <button
            type="button"
            onClick={() => {
              setIsBillingOpen((prev) => !prev);
              setIsStatusOpen(false);
            }}
            className="h-9 px-3 rounded-lg border border-border bg-card-bg text-secondary-subheading hover:text-txt-primary text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>{billingFilter === "All" ? "All Billing Type" : billingFilter}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-secondary-subheading transition-transform duration-200 ${
                isBillingOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isBillingOpen && (
            <div className="absolute right-0 mt-1.5 w-44 bg-card-bg border border-border rounded-xl shadow-lg py-1.5 z-30 animate-in fade-in slide-in-from-top-1 duration-150">
              {BILLING_OPTIONS.map((opt) => {
                const isSelected = billingFilter === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onBillingFilterChange(opt.value);
                      setIsBillingOpen(false);
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

        {/* Status Dropdown */}
        <div className="relative shrink-0" ref={statusRef}>
          <button
            type="button"
            onClick={() => {
              setIsStatusOpen((prev) => !prev);
              setIsBillingOpen(false);
            }}
            className="h-9 px-3 rounded-lg border border-border bg-card-bg text-secondary-subheading hover:text-txt-primary text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>{statusFilter === "All" ? "All Status" : statusFilter}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-secondary-subheading transition-transform duration-200 ${
                isStatusOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isStatusOpen && (
            <div className="absolute right-0 mt-1.5 w-44 bg-card-bg border border-border rounded-xl shadow-lg py-1.5 z-30 animate-in fade-in slide-in-from-top-1 duration-150">
              {STATUS_OPTIONS.map((opt) => {
                const isSelected = statusFilter === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onStatusFilterChange(opt.value);
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

"use client";

import React from "react";
import { useAccountsReceivableFilters } from "../hooks/useAccountsReceivableFilters";
import { AccountsReceivableHeader } from "./AccountsReceivableHeader";
import { AccountsReceivableMetricsCards } from "./AccountsReceivableMetricsCards";
import { AccountsReceivableToolbar } from "./AccountsReceivableToolbar";
import { AccountsReceivableTable } from "./AccountsReceivableTable";
import { ReceivableAgingCard } from "./ReceivableAgingCard";

export function AccountsReceivableView() {
  const {
    metrics,
    agingData,
    filteredInvoices,
    searchQuery,
    setSearchQuery,
    billingFilter,
    setBillingFilter,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    handleExport,
  } = useAccountsReceivableFilters();

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <AccountsReceivableHeader onExport={handleExport} />

      {/* 4 Top Metric Cards */}
      <AccountsReceivableMetricsCards metrics={metrics} />

      {/* Main Table Card */}
      <div className="rounded border border-surface bg-pure-white-bg shadow-[2px_2px_22px_0px_rgba(55,36,31,0.01)] overflow-hidden">
        <AccountsReceivableToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          billingFilter={billingFilter}
          onBillingFilterChange={setBillingFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
        <AccountsReceivableTable
          invoices={filteredInvoices}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>

      {/* Receivable Aging Card */}
      <ReceivableAgingCard data={agingData} />
    </div>
  );
}

"use client";

import React from "react";
import { usePayrollFilters } from "../hooks/usePayrollFilters";
import { PayrollHeader } from "./PayrollHeader";
import { PayrollMetricsCards } from "./PayrollMetricsCards";
import { PayrollToolbar } from "./PayrollToolbar";
import { PayrollDesktopTable } from "./PayrollDesktopTable";
import { PayrollMobileCardList } from "./PayrollMobileCardList";
import { PayrollExportModal } from "./PayrollExportModal";

export function PayrollView() {
  const {
    data,
    metrics,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    selectedPeriod,
    setSelectedPeriod,
    selectedIds,
    isAllSelected,
    handleSelectAll,
    handleToggleRow,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    isExportModalOpen,
    setIsExportModalOpen,
    handleExport,
  } = usePayrollFilters();

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* Top Header & Global Actions */}
      <PayrollHeader
        selectedPeriod={selectedPeriod}
        onSelectPeriod={setSelectedPeriod}
        onExport={() => setIsExportModalOpen(true)}
      />

      {/* 4 Metrics Summary Cards */}
      <PayrollMetricsCards metrics={metrics} />

      {/* Main Payroll List Card */}
      <div className="w-full border border-border rounded-xl bg-card-bg shadow-2xs overflow-hidden">
        {/* Toolbar: Title, Search & Status Filter */}
        <PayrollToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        {/* Desktop / Laptop / Tablet Table View (Uses ReusableTable) */}
        <PayrollDesktopTable
          data={data}
          selectedIds={selectedIds}
          isAllSelected={isAllSelected}
          onSelectAll={handleSelectAll}
          onToggleRow={handleToggleRow}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />

        {/* Mobile View (Cards list matching Image 4) */}
        <PayrollMobileCardList
          data={data}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>

      {/* Export Format Selection Modal */}
      <PayrollExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />
    </div>
  );
}

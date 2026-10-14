"use client";

import { useState, useMemo, useCallback } from "react";
import { PayrollItem, PayrollStatus, PayPeriodOption } from "../types";
import { INITIAL_PAYROLL_DATA, PAYROLL_METRICS, PAY_PERIOD_OPTIONS } from "../data/payrollData";
import { exportPayrollCsv, exportPayrollPdf } from "../utils/payrollExport";

export function usePayrollFilters() {
  const [data] = useState<PayrollItem[]>(INITIAL_PAYROLL_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PayrollStatus>("All");
  const [selectedPeriod, setSelectedPeriod] = useState<PayPeriodOption>(PAY_PERIOD_OPTIONS[0]);
  const [customRange, setCustomRange] = useState<{ start: number | null; end: number | null }>({
    start: 10,
    end: 20,
  });

  // Checkbox selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Filtered data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Search matching name or email
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase());

      // Status matching
      const matchesStatus =
        statusFilter === "All" || item.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [data, searchQuery, statusFilter]);

  // Total pages
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  // Paginated items
  const paginatedData = useMemo(() => {
    const start = (validCurrentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, validCurrentPage, itemsPerPage]);

  // Selection handlers
  const isAllSelected =
    paginatedData.length > 0 && paginatedData.every((item) => selectedIds.includes(item.id));

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        const pageIds = paginatedData.map((d) => d.id);
        setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
      } else {
        const pageIds = paginatedData.map((d) => d.id);
        setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
      }
    },
    [paginatedData]
  );

  const handleToggleRow = useCallback((id: string, checked: boolean) => {
    setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((i) => i !== id)));
  }, []);

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Export CSV and PDF handler
  const handleExport = useCallback(
    (format: "pdf" | "csv") => {
      const itemsToExport =
        selectedIds.length > 0
          ? filteredData.filter((item) => selectedIds.includes(item.id))
          : filteredData;

      if (format === "csv") {
        exportPayrollCsv(itemsToExport, selectedPeriod.label);
      } else if (format === "pdf") {
        exportPayrollPdf(itemsToExport, PAYROLL_METRICS, selectedPeriod.label);
      }
    },
    [filteredData, selectedIds, selectedPeriod]
  );

  return {
    data: filteredData,
    paginatedData,
    metrics: PAYROLL_METRICS,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    selectedPeriod,
    setSelectedPeriod,
    customRange,
    setCustomRange,
    selectedIds,
    isAllSelected,
    handleSelectAll,
    handleToggleRow,
    currentPage: validCurrentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    isExportModalOpen,
    setIsExportModalOpen,
    handleExport,
  };
}

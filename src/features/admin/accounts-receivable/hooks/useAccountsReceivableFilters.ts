"use client";

import { useState, useMemo } from "react";
import {
  INITIAL_RECEIVABLE_INVOICES,
  RECEIVABLE_METRICS,
  RECEIVABLE_AGING_DATA,
} from "../data/accountsReceivableData";
import { BillingType, ReceivableInvoice, ReceivableStatus } from "../types";

export function useAccountsReceivableFilters() {
  const [invoices] = useState<ReceivableInvoice[]>(INITIAL_RECEIVABLE_INVOICES);
  const [searchQuery, setSearchQuery] = useState("");
  const [billingFilter, setBillingFilter] = useState<BillingType | "All">("All");
  const [statusFilter, setStatusFilter] = useState<ReceivableStatus | "All">("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((item) => {
      // Search
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.invoiceNumber.toLowerCase().includes(q) ||
        item.customer.name.toLowerCase().includes(q) ||
        item.customer.email.toLowerCase().includes(q);

      // Billing Type
      const matchesBilling =
        billingFilter === "All" || item.billingType === billingFilter;

      // Status
      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesBilling && matchesStatus;
    });
  }, [invoices, searchQuery, billingFilter, statusFilter]);

  const handleExport = () => {
    const csvContent = [
      ["Invoice ID", "Customer", "Email", "Billing", "Invoice Date", "Due Date", "Amount", "Status"].join(","),
      ...filteredInvoices.map((inv) =>
        [
          inv.invoiceNumber,
          `"${inv.customer.name}"`,
          inv.customer.email,
          inv.billingType,
          inv.invoiceDate,
          inv.dueDate,
          inv.formattedAmount,
          inv.status,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `accounts-receivable-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    metrics: RECEIVABLE_METRICS,
    agingData: RECEIVABLE_AGING_DATA,
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
  };
}

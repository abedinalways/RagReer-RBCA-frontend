"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";
import { OUTSTANDING_INVOICES_DATA } from "../data/dashboardData";
import { OutstandingInvoice, InvoicePaymentStatus } from "../types/dashboardTypes";

export const OutstandingInvoicesTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const filteredInvoices = useMemo(() => {
    return OUTSTANDING_INVOICES_DATA.filter((inv) => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        inv.invoiceNumber.toLowerCase().includes(query) ||
        inv.customerName.toLowerCase().includes(query) ||
        inv.amount.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const renderStatusBadge = (status: InvoicePaymentStatus) => {
    switch (status) {
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-badge-pending-bg text-badge-pending-text border border-badge-pending-border">
            <span className="h-1.5 w-1.5 rounded-full bg-badge-pending-dot" />
            Pending
          </span>
        );
      case "Paid":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-badge-active-bg text-badge-active-text border border-badge-active-border">
            <span className="h-1.5 w-1.5 rounded-full bg-badge-active-dot" />
            Paid
          </span>
        );
      case "Overdue":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-decline-secondary text-decline border border-decline-border">
            <span className="h-1.5 w-1.5 rounded-full bg-decline" />
            Overdue
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card-bg shadow-2xs overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-5 border-b border-border-subtle">
        <h3 className="font-barlow text-lg font-bold text-primary-heading leading-none">
          Outstanding Invoices
        </h3>

        <div className="flex items-center gap-3">
          {/* Search box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-secondary-subheading" />
            <input
              type="text"
              placeholder="Type to search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-40 sm:w-56 rounded-lg border border-border bg-page-bg/60 pl-8.5 pr-3 py-1.5 text-xs text-txt-primary placeholder:text-secondary-subheading/60 focus:border-primary focus:bg-card-bg focus:outline-hidden transition-all"
            />
          </div>

          <Link
            href="/admin/reports"
            className="inline-flex items-center gap-0.5 text-xs font-medium text-primary hover:text-primary-hover transition-colors shrink-0"
          >
            <span>View All</span>
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-border bg-page-bg/50 text-[11px] sm:text-xs font-semibold text-secondary-subheading">
              <th className="py-3 px-4 sm:px-5">Invoice ID</th>
              <th className="py-3 px-4 sm:px-5">Customer Name</th>
              <th className="py-3 px-4 sm:px-5">Payment Type</th>
              <th className="py-3 px-4 sm:px-5">Due</th>
              <th className="py-3 px-4 sm:px-5">Amount</th>
              <th className="py-3 px-4 sm:px-5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filteredInvoices.map((inv, idx) => (
              <tr
                key={`${inv.id}-${idx}`}
                className="hover:bg-blue-50/20 transition-colors"
              >
                {/* Invoice ID */}
                <td className="py-3 px-4 sm:px-5 whitespace-nowrap">
                  <Link
                    href={`/admin/reports`}
                    className="font-medium text-primary hover:underline"
                  >
                    {inv.invoiceNumber}
                  </Link>
                </td>

                {/* Customer Name & Avatar */}
                <td className="py-3 px-4 sm:px-5 whitespace-nowrap">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={inv.customerAvatar}
                      alt={inv.customerName}
                      className="h-7 w-7 rounded-full object-cover border border-border"
                    />
                    <span className="font-medium text-txt-primary">
                      {inv.customerName}
                    </span>
                  </div>
                </td>

                {/* Payment Type */}
                <td className="py-3 px-4 sm:px-5 whitespace-nowrap text-secondary-subheading">
                  {inv.paymentType}
                </td>

                {/* Due */}
                <td className="py-3 px-4 sm:px-5 whitespace-nowrap text-secondary-subheading">
                  {inv.due}
                </td>

                {/* Amount */}
                <td className="py-3 px-4 sm:px-5 whitespace-nowrap font-bold font-barlow text-primary-heading">
                  {inv.amount}
                </td>

                {/* Status */}
                <td className="py-3 px-4 sm:px-5 whitespace-nowrap">
                  {renderStatusBadge(inv.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer matching Figma */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 sm:px-5 border-t border-border bg-card-bg text-xs text-secondary-subheading">
        {/* Show items select */}
        <div className="flex items-center gap-2">
          <span>Show items</span>
          <div className="relative">
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="appearance-none rounded-md border border-border bg-card-bg px-2.5 py-1 pr-6 text-xs text-txt-primary focus:border-primary focus:outline-hidden cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-secondary-subheading pointer-events-none" />
          </div>
        </div>

        {/* Page buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card-bg text-secondary-subheading hover:text-primary hover:border-primary/50 disabled:opacity-50 transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className={`flex h-7 w-7 items-center justify-center rounded-md font-medium text-xs transition-colors ${
              currentPage === 1
                ? "bg-primary text-white shadow-2xs"
                : "border border-border text-txt-primary hover:bg-page-bg"
            }`}
          >
            1
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage(2)}
            className={`flex h-7 w-7 items-center justify-center rounded-md font-medium text-xs transition-colors ${
              currentPage === 2
                ? "bg-primary text-white shadow-2xs"
                : "border border-border text-txt-primary hover:bg-page-bg"
            }`}
          >
            2
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage(3)}
            className={`flex h-7 w-7 items-center justify-center rounded-md font-medium text-xs transition-colors ${
              currentPage === 3
                ? "bg-primary text-white shadow-2xs"
                : "border border-border text-txt-primary hover:bg-page-bg"
            }`}
          >
            3
          </button>
          <span className="px-1 text-secondary-subheading">...</span>
          <button
            type="button"
            onClick={() => setCurrentPage(4)}
            className={`flex h-7 w-7 items-center justify-center rounded-md font-medium text-xs transition-colors ${
              currentPage === 4
                ? "bg-primary text-white shadow-2xs"
                : "border border-border text-txt-primary hover:bg-page-bg"
            }`}
          >
            4
          </button>

          <button
            type="button"
            disabled={currentPage === 4}
            onClick={() => setCurrentPage((p) => Math.min(4, p + 1))}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card-bg text-secondary-subheading hover:text-primary hover:border-primary/50 disabled:opacity-50 transition-colors"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

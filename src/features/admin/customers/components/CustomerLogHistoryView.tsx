"use client";

import React, { useState, useMemo } from "react";
import { Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { MOCK_CUSTOMER_LOG_HISTORY } from "../data/customerLogHistoryData";
import { CustomerLogItem } from "../types/customerLogHistory.types";
import { CustomerItem } from "../types/adminCustomers.types";
import { UserLogDetailsModal } from "./UserLogDetailsModal";
import { DeleteLogConfirmModal } from "./DeleteLogConfirmModal";
import { Pagination } from "@/components/reusable/Pagination";

interface CustomerLogHistoryViewProps {
  customer?: CustomerItem | null;
  onBack: () => void;
}

export const CustomerLogHistoryView: React.FC<CustomerLogHistoryViewProps> = ({
  customer,
  onBack,
}) => {
  const [logs, setLogs] = useState<CustomerLogItem[]>(MOCK_CUSTOMER_LOG_HISTORY);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeLogDetails, setActiveLogDetails] = useState<CustomerLogItem | null>(null);
  const [deletingLog, setDeletingLog] = useState<CustomerLogItem | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const totalPages = Math.max(1, Math.ceil(logs.length / itemsPerPage));
  const visibleLogs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return logs.slice(start, start + itemsPerPage);
  }, [logs, currentPage, itemsPerPage]);

  const isAllSelected =
    visibleLogs.length > 0 && visibleLogs.every((l) => selectedIds.includes(l.id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(visibleLogs.map((l) => l.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleConfirmDeleteLog = () => {
    if (!deletingLog) return;
    setLogs((prev) => prev.filter((l) => l.id !== deletingLog.id));
    toast.success(`Log entry deleted successfully!`);
    setDeletingLog(null);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-secondary-subheading">
        <button
          type="button"
          onClick={onBack}
          className="hover:text-primary transition-colors cursor-pointer"
        >
          Customers
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-secondary-subheading/60" />
        <span className="text-primary-heading font-medium">Customer Log History</span>
      </div>

      {/* Main Table Card (Figma Image 1) */}
      <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-6 shadow-2xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="space-y-0.5">
            <h2 className="text-xl sm:text-2xl font-medium text-primary-heading font-barlow-condensed">
              Customer Log History
            </h2>
            {customer && (
              <p className="text-xs text-secondary-subheading">
                Showing logs for: {customer.organizationName || customer.name} ({customer.email})
              </p>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-page-bg border-b border-border text-secondary-subheading font-medium">
                <th className="py-2.5 px-3 w-10">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 accent-primary cursor-pointer"
                  />
                </th>
                <th className="py-2.5 px-3 whitespace-nowrap">User ID</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Role</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Last Login</th>
                <th className="py-2.5 px-3 whitespace-nowrap">IP</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Country</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Device</th>
                <th className="py-2.5 px-3 whitespace-nowrap">OS</th>
                <th className="py-2.5 px-3 text-center whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visibleLogs.map((log) => {
                const isSelected = selectedIds.includes(log.id);
                return (
                  <tr
                    key={log.id}
                    className={`hover:bg-page-bg/50 transition-colors ${
                      isSelected ? "bg-page-bg/40" : ""
                    }`}
                  >
                    <td className="py-3 px-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectRow(log.id)}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 accent-primary cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-3 text-secondary-subheading whitespace-nowrap font-normal">
                      {log.userId}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {log.role}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-secondary-subheading whitespace-nowrap font-normal">
                      {log.lastLogin}
                    </td>
                    <td className="py-3 px-3 text-secondary-subheading whitespace-nowrap font-normal">
                      {log.ip}
                    </td>
                    <td className="py-3 px-3 text-secondary-subheading whitespace-nowrap font-normal">
                      {log.country}
                    </td>
                    <td className="py-3 px-3 text-secondary-subheading whitespace-nowrap font-normal">
                      {log.device}
                    </td>
                    <td className="py-3 px-3 text-secondary-subheading whitespace-nowrap font-normal">
                      {log.os}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* Eye Button -> Opens User Log Details Modal (Image 2) */}
                        <button
                          type="button"
                          onClick={() => setActiveLogDetails(log)}
                          title="View Log Details"
                          className="p-1.5 rounded-md border border-border bg-card-bg text-secondary-subheading hover:text-primary hover:border-primary/40 hover:bg-page-bg transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Trash Button -> Opens Are you sure Modal (Image 3) */}
                        <button
                          type="button"
                          onClick={() => setDeletingLog(log)}
                          title="Delete Log"
                          className="p-1.5 rounded-md border border-border bg-card-bg text-secondary-subheading hover:text-decline hover:border-decline/40 hover:bg-decline/10 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="pt-4 border-t border-border">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(newSize) => {
              setItemsPerPage(newSize);
              setCurrentPage(1);
            }}
            pageSizeOptions={[10, 25, 50]}
          />
        </div>
      </div>

      {/* User Log Details Modal (Image 2) */}
      <UserLogDetailsModal
        log={activeLogDetails}
        isOpen={Boolean(activeLogDetails)}
        onClose={() => setActiveLogDetails(null)}
      />

      {/* Delete Log Confirmation Modal (Image 3) */}
      <DeleteLogConfirmModal
        isOpen={Boolean(deletingLog)}
        onClose={() => setDeletingLog(null)}
        onConfirm={handleConfirmDeleteLog}
      />
    </div>
  );
};

export default CustomerLogHistoryView;

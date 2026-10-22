"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronDown } from "lucide-react";
import { CUSTOMER_ESTIMATES_LIST } from "../data/adminCustomersDetailData";
import { CustomerEstimateItem, CustomerEstimateStatus } from "../types/adminCustomers.types";
import { EstimateActionMenu } from "./EstimateActionMenu";
import { Pagination } from "@/components/reusable/Pagination";

export const CustomerEstimatesTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const filteredEstimates = useMemo(() => {
    return CUSTOMER_ESTIMATES_LIST.filter((est) => {
      const matchSearch =
        !searchTerm ||
        est.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        est.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        est.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        est.serviceType.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        selectedStatus === "All" || est.status === selectedStatus;

      return matchSearch && matchStatus;
    });
  }, [searchTerm, selectedStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredEstimates.length / itemsPerPage));
  const visibleEstimates = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredEstimates.slice(start, start + itemsPerPage);
  }, [filteredEstimates, currentPage, itemsPerPage]);

  const getStatusBadge = (status: CustomerEstimateStatus) => {
    switch (status) {
      case "Draft":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            {status}
          </span>
        );
      case "Sent":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-info border border-blue-100 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-info" />
            {status}
          </span>
        );
      case "Pending Approval":
      case "Change Requested":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium bg-terms-bg text-badge-pending-text border border-terms-border whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-badge-pending-dot" />
            {status}
          </span>
        );
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium bg-badge-active-bg text-badge-active-text border border-badge-active-border whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-badge-active-dot" />
            {status}
          </span>
        );
      case "Expired":
      case "Declined":
      case "Cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium bg-decline-secondary text-decline border border-decline-border whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-decline" />
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium bg-page-bg text-secondary-subheading border border-border whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-subheading" />
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-6 shadow-2xs space-y-4">
      {/* Header and Filter Row (Figma Screenshot 4) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <h2 className="text-xl sm:text-2xl font-medium text-primary-heading font-barlow-condensed">
          All Estimate
        </h2>

        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-subheading" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Type to search"
              className="pl-9 pr-3 py-2 bg-page-bg border border-border rounded-md text-xs sm:text-sm text-primary-heading placeholder:text-secondary-subheading focus:outline-hidden focus:border-primary w-48 sm:w-56"
            />
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none bg-card-bg border border-border text-xs sm:text-sm text-primary-heading pl-3 pr-8 py-2 rounded-md focus:outline-hidden focus:border-primary cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Draft">Draft</option>
              <option value="Sent">Sent</option>
              <option value="Pending Approval">Pending Approval</option>
              <option value="Approved">Approved</option>
              <option value="Change Requested">Change Requested</option>
              <option value="Expired">Expired</option>
              <option value="Declined">Declined</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Estimates Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-page-bg border-b border-border text-secondary-subheading font-medium">
              <th className="py-2.5 px-3 whitespace-nowrap">Estimate ID</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Request ID</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Property Address</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Service Type</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Issue Date</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Status</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Amount</th>
              <th className="py-2.5 px-3 text-center whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {visibleEstimates.map((est) => (
              <tr
                key={est.id}
                className="hover:bg-page-bg/50 transition-colors"
              >
                <td className="py-3 px-3 font-medium text-info cursor-pointer hover:underline whitespace-nowrap">
                  {est.id}
                </td>
                <td className="py-3 px-3 font-medium text-info cursor-pointer hover:underline whitespace-nowrap">
                  {est.requestId}
                </td>
                <td className="py-3 px-3 text-primary-heading font-medium whitespace-nowrap">
                  {est.propertyAddress}
                </td>
                <td className="py-3 px-3 text-secondary-subheading whitespace-nowrap">
                  {est.serviceType}
                </td>
                <td className="py-3 px-3 text-secondary-subheading whitespace-nowrap">
                  {est.issueDate}
                </td>
                <td className="py-3 px-3 whitespace-nowrap">
                  {getStatusBadge(est.status)}
                </td>
                <td className="py-3 px-3 text-primary-heading font-medium whitespace-nowrap">
                  {est.amount}
                </td>
                <td className="py-3 px-3 text-center whitespace-nowrap">
                  <EstimateActionMenu estimate={est} />
                </td>
              </tr>
            ))}
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
  );
};

export default CustomerEstimatesTab;

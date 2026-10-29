"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronDown, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { CUSTOMER_SERVICES_LIST } from "../data/adminCustomersDetailData";
import { CustomerActiveJob } from "../types/adminCustomers.types";
import { Pagination } from "@/components/reusable/Pagination";

export const CustomerServicesTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const filteredJobs = useMemo(() => {
    return CUSTOMER_SERVICES_LIST.filter((job) => {
      const matchSearch =
        !searchTerm ||
        job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.service.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        selectedStatus === "All" || job.status === selectedStatus;

      return matchSearch && matchStatus;
    });
  }, [searchTerm, selectedStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / itemsPerPage));
  const visibleJobs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredJobs.slice(start, start + itemsPerPage);
  }, [filteredJobs, currentPage, itemsPerPage]);

  const getStatusBadge = (status: CustomerActiveJob["status"]) => {
    switch (status) {
      case "In Progress":
      case "Scheduled":
      case "Site Visit in Progress":
      case "Site Visit Scheduled":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-info border border-blue-100 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-info" />
            {status}
          </span>
        );
      case "Completed":
      case "Site Visit Completed":
      case "Estimate Accepted":
      case "Contract Signed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-badge-active-bg text-badge-active-text border border-badge-active-border whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-badge-active-dot" />
            {status}
          </span>
        );
      case "Waiting for Review":
      case "Estimate Approved":
      case "On Hold":
      case "Waiting For Payment":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-terms-bg text-badge-pending-text border border-terms-border whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-badge-pending-dot" />
            {status}
          </span>
        );
      case "Estimate Declined":
      case "Cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-decline-secondary text-decline border border-decline-border whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-decline" />
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-page-bg text-secondary-subheading border border-border whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-subheading" />
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-6 shadow-2xs space-y-4">
      {/* Header and Filter Row (Figma Screenshot 3) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <h2 className="text-xl sm:text-2xl font-medium text-primary-heading font-barlow-condensed">
          Active Services
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
              <option value="In Progress">In Progress</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-page-bg border-b border-border text-secondary-subheading font-medium">
              <th className="py-2.5 px-3 whitespace-nowrap">Job ID</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Property Address</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Service</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Service Type</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Assigned Crew</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Status</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Next Visit</th>
              <th className="py-2.5 px-3 text-center whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {visibleJobs.map((job, idx) => (
              <tr
                key={`${job.id}-${idx}`}
                className="hover:bg-page-bg/50 transition-colors"
              >
                <td className="py-3 px-3 font-medium text-info whitespace-nowrap">
                  <Link
                    href={`/admin/requests/${job.requestId || "req-1"}`}
                    className="hover:underline cursor-pointer"
                  >
                    {job.id}
                  </Link>
                </td>
                <td className="py-3 px-3 text-primary-heading font-medium whitespace-nowrap">
                  {job.propertyAddress}
                </td>
                <td className="py-3 px-3 text-secondary-subheading whitespace-nowrap">
                  {job.service}
                </td>
                <td className="py-3 px-3 text-secondary-subheading whitespace-nowrap">
                  {job.serviceType}
                </td>
                <td className="py-3 px-3 whitespace-nowrap">
                  <div className="flex items-center -space-x-1.5">
                    {job.assignedCrew.map((c, i) => (
                      <div
                        key={i}
                        className="relative w-6 h-6 rounded-full border-2 border-white overflow-hidden shadow-2xs"
                      >
                        <Image
                          src={c.avatar}
                          alt={c.name}
                          fill
                          sizes="24px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                    {idx % 3 === 0 && (
                      <div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-white flex items-center justify-center text-[10px] font-medium text-primary shadow-2xs">
                        +
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-3 px-3 whitespace-nowrap">
                  {getStatusBadge(job.status)}
                </td>
                <td className="py-3 px-3 text-secondary-subheading text-xs whitespace-nowrap">
                  {job.nextVisit}
                </td>
                <td className="py-3 px-3 text-center whitespace-nowrap">
                  <Link
                    href={`/admin/requests/${job.requestId || "req-1"}`}
                    className="p-1.5 rounded border border-border hover:bg-page-bg text-secondary-subheading hover:text-primary transition-colors cursor-pointer inline-flex items-center justify-center"
                    title={`View Service Request Details (${job.requestId || "req-1"})`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
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

export default CustomerServicesTab;

"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronDown, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { ReusableTable } from "@/components/reusable/ReusableTable";
import { ADMIN_SERVICE_REQUESTS_DATA } from "../data/serviceRequestsData";
import { AdminServiceRequest, AdminRequestStatus } from "../types/serviceRequestsTypes";
import { createServiceRequestsColumns } from "./ServiceRequestsColumns";
import { CustomSelect } from "@/components/ui/CustomSelect";

const ALL_STATUS_OPTIONS: (string | AdminRequestStatus)[] = [
  "All Status",
  "New",
  "Under Review",
  "Site Visit Requested",
  "Reschedule Requested",
  "Site Visit Scheduled",
  "Site Visit Completed",
  "Estimate Sent",
  "Estimate Accepted",
  "Estimate Declined",
  "Change Requested",
  "Contract Sent",
  "Contract Signed",
  "Completed",
  "On Hold",
  "Payment Complete",
];

const ALL_SERVICE_TYPES = [
  "All Services",
  "Residential Lawn Care",
  "Commercial Services",
  "Landscaping & Lawn Care",
];

export const AdminServiceRequestsView: React.FC = () => {
  const [requests] = useState<AdminServiceRequest[]>(ADMIN_SERVICE_REQUESTS_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedServiceType, setSelectedServiceType] = useState("All Services");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Detail Modal / View State
  const [selectedRequest, setSelectedRequest] = useState<AdminServiceRequest | null>(null);

  const handleActionClick = (actionKey: string, request: AdminServiceRequest) => {
    switch (actionKey) {
      case "view_details":
        setSelectedRequest(request);
        toast.success(`Opening details for ${request.requestId}`);
        break;
      case "view_customer":
        toast(`Viewing customer: ${request.customer.name}`, { icon: "👤" });
        break;
      case "create_estimate":
      case "view_estimate":
        toast(`Estimate action for ${request.requestId}`, { icon: "📄" });
        break;
      case "request_site_visit":
      case "review_request":
        toast(`Site visit request for ${request.requestId}`, { icon: "📍" });
        break;
      case "review_assessment":
        toast(`Reviewing assessment for ${request.requestId}`, { icon: "📋" });
        break;
      case "send_reminder":
        toast.success(`Reminder sent to ${request.customer.email}`);
        break;
      case "create_contract":
      case "view_contract":
        toast(`Contract action for ${request.requestId}`, { icon: "📝" });
        break;
      case "view_invoice":
        toast(`Viewing invoice for ${request.requestId}`, { icon: "💳" });
        break;
      case "archive":
        toast(`Archived ${request.requestId}`);
        break;
      default:
        toast(`Action: ${actionKey}`);
        break;
    }
  };

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        req.requestId.toLowerCase().includes(q) ||
        req.customer.name.toLowerCase().includes(q) ||
        req.customer.email.toLowerCase().includes(q) ||
        req.propertyAddress.toLowerCase().includes(q) ||
        req.serviceType.toLowerCase().includes(q);

      const matchesStatus =
        selectedStatus === "All Status" || req.status === selectedStatus;

      const matchesServiceType =
        selectedServiceType === "All Services" ||
        req.serviceType === selectedServiceType;

      return matchesSearch && matchesStatus && matchesServiceType;
    });
  }, [requests, searchQuery, selectedStatus, selectedServiceType]);

  const columns = useMemo(
    () => createServiceRequestsColumns(handleActionClick),
    []
  );

  return (
    <div className="w-full space-y-5 md:space-y-6 max-w-[1600px] mx-auto animate-in fade-in duration-200">
      {/* 1. Page Header with Title and Create Estimate Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="font-barlow text-xl sm:text-2xl font-medium tracking-tight text-primary-heading">
          Service Requests
        </h1>

        <button
          type="button"
          onClick={() => toast("Opening estimate creator...", { icon: "📋" })}
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm md:text-base font-medium text-white shadow-2xs hover:bg-primary-hover transition-colors cursor-pointer self-start sm:self-auto"
        >
          <span>Create Estimate</span>
        </button>
      </div>

      {/* 2. Main Card Container containing Filters and ReusableTable */}
      <div className="rounded-xl border border-border bg-card-bg shadow-2xs overflow-hidden">
        {/* Table Controls / Filter Bar matching Figma */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 p-4 sm:p-5 border-b border-border-subtle">
          <h2 className="font-barlow text-lg md:text-xl font-medium text-primary-heading leading-none">
            All Service Request
          </h2>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Search Box */}
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-secondary-subheading" />
              <input
                type="text"
                placeholder="Search customers"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full sm:w-56 h-9 rounded-md border border-border bg-page-bg/50 pl-8.5 pr-3 text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/60 focus:border-primary focus:bg-card-bg focus:outline-hidden transition-all"
              />
            </div>

            {/* Status Dropdown */}
            <div className="w-full sm:w-44">
              <CustomSelect
                value={selectedStatus}
                onChange={(val) => {
                  setSelectedStatus(val);
                  setCurrentPage(1);
                }}
                options={ALL_STATUS_OPTIONS as string[]}
                size="sm"
                align="right"
              />
            </div>

            {/* Service Type Dropdown */}
            <div className="w-full sm:w-48">
              <CustomSelect
                value={selectedServiceType}
                onChange={(val) => {
                  setSelectedServiceType(val);
                  setCurrentPage(1);
                }}
                options={ALL_SERVICE_TYPES}
                size="sm"
                align="right"
              />
            </div>
          </div>
        </div>

        {/* 3. ReusableTable Integration */}
        <ReusableTable
          data={filteredRequests}
          columns={columns}
          keyExtractor={(item) => item.id}
          emptyMessage="No service requests found."
          pagination={{
            currentPage,
            itemsPerPage,
            onPageChange: setCurrentPage,
            onItemsPerPageChange: (newSize) => {
              setItemsPerPage(newSize);
              setCurrentPage(1);
            },
            pageSizeOptions: [10, 25, 50],
          }}
        />
      </div>

      {/* 4. Quick Details Preview Modal if an item is clicked */}
      {selectedRequest && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="w-full max-w-lg rounded-xl border border-border bg-card-bg p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-barlow text-xl font-bold text-primary-heading">
                  {selectedRequest.requestId} Details
                </h3>
                <p className="text-xs text-secondary-subheading">
                  Submitted on {selectedRequest.submittedOn}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="rounded-md border border-border p-1.5 text-secondary-subheading hover:bg-page-bg hover:text-txt-primary"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-page-bg/60">
                <img
                  src={selectedRequest.customer.avatar}
                  alt={selectedRequest.customer.name}
                  className="h-10 w-10 rounded-full object-cover border border-border"
                />
                <div>
                  <p className="font-medium text-txt-primary">
                    {selectedRequest.customer.name}
                  </p>
                  <p className="text-xs text-secondary-subheading">
                    {selectedRequest.customer.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-2.5 rounded-lg border border-border-subtle bg-card-bg">
                  <span className="text-[11px] text-secondary-subheading block">Property</span>
                  <span className="font-medium text-txt-primary">{selectedRequest.propertyAddress}</span>
                </div>
                <div className="p-2.5 rounded-lg border border-border-subtle bg-card-bg">
                  <span className="text-[11px] text-secondary-subheading block">Service</span>
                  <span className="font-medium text-txt-primary">{selectedRequest.serviceType}</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg border border-border-subtle bg-card-bg">
                <span className="text-xs text-secondary-subheading">Current Status</span>
                <span className="text-xs font-semibold text-primary">{selectedRequest.status}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="rounded-sm border border-border px-4 py-2 text-xs font-medium text-txt-primary hover:bg-page-bg"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  toast.success(`Action initiated for ${selectedRequest.requestId}`);
                  setSelectedRequest(null);
                }}
                className="rounded-sm bg-primary px-4 py-2 text-xs font-medium text-white hover:bg-primary-hover shadow-2xs"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServiceRequestsView;

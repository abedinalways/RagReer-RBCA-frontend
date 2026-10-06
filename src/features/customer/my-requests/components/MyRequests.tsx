"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Clock,
  FileText,
  MapPin,
  X,
} from "lucide-react";
import { createMyRequestsColumns } from "./MyRequestsColumns";
import { myRequestsData } from "../data/myRequestsData";
import { RequestItem } from "../types/myRequestsTypes";
import { ReusableTable } from "@/components/reusable/ReusableTable";
import EmptyStateCard from "@/components/reusable/EmptyStateCard";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { CustomSelect } from "@/components/ui/CustomSelect";

const STATUS_OPTIONS = [
  "All Status",
  "Draft",
  "Request Submitted",
  "Under Review",
  "Site Visit Required",
  "Site Visit Pending",
  "Site Visit Confirmed",
  "Site Visit Scheduled",
  "Site Visit in Progress",
  "Site Visit Completed",
  "Estimate Approval Needed",
  "Estimate Declined",
  "Estimate Revision Requested",
  "Estimate Accepted",
  "Contract Awaiting Signature",
  "Contract Signed",
  "Scheduled",
  "In Progress",
  "Completed",
  "Waiting For Payment",
  "Payment Due",
  "Payment Completed",
  "On Hold",
];

export const MyRequests: React.FC = () => {
  const [requests] = useState<RequestItem[]>(myRequestsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const [hasActionRequired, setHasActionRequired] = useState(true);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchesSearch =
        req.requestId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.serviceType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "All Status" ? true : req.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [requests, searchQuery, selectedStatus]);

  const columns = useMemo(
    () => createMyRequestsColumns((req) => console.log("Action on:", req)),
    [],
  );

  const handleNewRequestClick = () => {
    console.log("New Request clicked");
  };

  return (
    <div className="space-y-6">
      {/* Action Required Card (Figma Screenshot 1 & 3) */}
      {hasActionRequired && (
        <div className="bg-card-bg border border-border rounded-lg p-5 max-w-md shadow-2xs space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-2.5">
              <div className="p-0.5 text-amber-500 shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-500 stroke-[2]" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-base font-semibold text-primary-heading">
                  Action Required
                </h3>
                <Link
                  href="/customer/requests/req-6"
                  className="text-sm text-primary font-medium hover:underline inline-block"
                >
                  #REQ-125
                </Link>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsRescheduleModalOpen(true)}
              className="px-4 py-2 text-xs sm:text-sm font-medium bg-primary hover:bg-primary-hover text-white rounded transition-colors cursor-pointer shrink-0"
            >
              Review & Approve
            </button>
          </div>

          <div className="border-t border-border-subtle pt-3 space-y-1">
            <h4 className="text-xs font-semibold text-primary-heading">
              Note
            </h4>
            <p className="text-xs text-secondary-subheading font-medium">
              Weather Delay Issue
            </p>
            <p className="text-xs text-secondary-subheading leading-relaxed">
              Due to the current weather situation, we are rescheduling the service
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      {filteredRequests.length === 0 ? (
        <EmptyStateCard
          icon={<PlusIcon className="w-7 h-7 text-primary" />}
          title="No Requests Found"
          description="You don't have any requests yet."
          actionLabel="Create New Request"
          onAction={handleNewRequestClick}
        />
      ) : (
        <div className="bg-card-bg rounded-sm border border-border">
          {/* Header Section */}
          <div className="p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-[1.25rem] font-medium text-primary-heading">
              My Requests
            </h2>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:w-auto sm:items-center">
              <div className="w-full sm:w-48">
                <CustomSelect
                  value={selectedStatus}
                  onChange={(val) => setSelectedStatus(val)}
                  options={STATUS_OPTIONS}
                  size="sm"
                  align="right"
                />
              </div>
              <Link
                href="/customer/requests/new-request"
                className="flex items-center justify-center gap-2 bg-primary text-white px-4 h-9 rounded-md text-sm font-medium hover:opacity-90 cursor-pointer w-full sm:w-auto shrink-0"
              >
                <PlusIcon className="w-4 h-4" />
                New Request
              </Link>
            </div>
          </div>

          <ReusableTable
            data={filteredRequests}
            columns={columns}
            keyExtractor={(item, idx) => idx}
            pagination={{
              currentPage,
              itemsPerPage,
              onPageChange: setCurrentPage,
              onItemsPerPageChange: setItemsPerPage,
            }}
          />
        </div>
      )}

      {/* Reschedule Request Modal (Figma Screenshot 2) */}
      {isRescheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-card-bg w-full max-w-[500px] rounded-xl shadow-2xl border border-border p-6 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <h3 className="text-lg font-semibold text-primary-heading">
                  Reschedule Request
                </h3>
                <Link
                  href="/customer/requests/req-6"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Request #REQ124</span>
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setIsRescheduleModalOpen(false)}
                className="p-1 rounded-md text-secondary-subheading hover:text-txt-primary hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Inner Service Card */}
            <div className="bg-[#F0F7FD]/70 border border-[#D5E7F7] rounded-lg p-3.5 space-y-3">
              <div className="flex items-start gap-3.5">
                {/* Date Square */}
                <div className="w-16 h-16 rounded-md bg-[#E0F2FE]/80 border border-[#BAE6FD] flex flex-col items-center justify-center text-center shrink-0">
                  <span className="text-[11px] font-bold text-primary-heading uppercase tracking-wider leading-none">
                    SEP
                  </span>
                  <span className="text-xl font-bold text-primary-heading leading-tight mt-0.5">
                    29
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-primary">
                      Service Rescheduled
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#EAF3FA] text-[#5980A6] border border-[#5980A6]/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Rescheduled
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-semibold text-primary-heading truncate">
                    North Entrance Monument & Islands
                  </h4>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-secondary-subheading">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-secondary-subheading shrink-0" />
                      <span>100 Whispering Pines Blvd at Hwy 43</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-secondary-subheading shrink-0" />
                      <span>10:00 AM -02:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Crew row with overlapping avatars */}
              <div className="border-t border-[#D5E7F7]/80 pt-2.5 flex items-center justify-between">
                <span className="text-xs text-secondary-subheading">
                  Crew: <span className="font-medium text-txt-primary">Marcus Team</span>
                </span>
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                    alt="Crew 1"
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80"
                    alt="Crew 2"
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80"
                    alt="Crew 3"
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Form Fields: Reason & Note */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-primary-heading mb-1.5">
                  Reason
                </label>
                <div className="w-full px-3.5 py-2.5 border border-border rounded-md text-xs sm:text-sm text-txt-primary bg-card-bg">
                  Weather Delay Issue
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary-heading mb-1.5">
                  Note
                </label>
                <div className="w-full px-3.5 py-2.5 border border-border rounded-md text-xs sm:text-sm text-secondary-subheading bg-card-bg leading-relaxed">
                  Due to the current weather situation, we are rescheduling the service
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsRescheduleModalOpen(false);
                }}
                className="flex-1 h-10 border border-[#F04438] text-[#F04438] hover:bg-[#F04438]/5 rounded text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center justify-center"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsRescheduleModalOpen(false);
                  setHasActionRequired(false);
                }}
                className="flex-1 h-10 bg-[#5980A6] hover:bg-primary-hover text-white rounded text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center justify-center"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

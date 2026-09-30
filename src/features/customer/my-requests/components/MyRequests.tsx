"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
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
    <div>
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
    </div>
  );
};

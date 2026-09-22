"use client";
import React, { useState, useMemo } from "react";
import { createMyRequestsColumns } from "./MyRequestsColumns";
import { myRequestsData } from "../data/myRequestsData";
import { RequestItem } from "../types/myRequestsTypes";
import { ReusableTable } from "@/components/reusable/ReusableTable";
import EmptyStateCard from "@/components/reusable/EmptyStateCard";
import { PlusIcon } from "@/components/icons/PlusIcon";

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
        <div className="bg-card-bg rounded-xl border border-border">
          {/* Header Section */}
          <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-[1.25rem] font-medium text-primary-heading">
              My Requests
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-border bg-input-bg rounded-lg px-3 py-1.5 text-[1rem] text-txt-primary"
              >
                <option value="All Status">All Status</option>
                <option value="Draft">Draft</option>
                <option value="Request Submitted">Request Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Site Visit Required">Site Visit Required</option>
                <option value="Site Visit Pending">Site Visit Pending</option>
                <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                <option value="Site Visit in Progress">
                  Site Visit in Progress
                </option>
                <option value="Site Visit Completed">
                  Site Visit Completed
                </option>
                <option value="Estimate Approval Needed">
                  Estimate Approval Needed
                </option>
                <option value="Estimate Declined">Estimate Declined</option>
                <option value="Estimate Revision Requested">
                  Estimate Revision Requested
                </option>
                <option value="Estimate Accepted">Estimate Accepted</option>
                <option value="Contract Awaiting Signature">
                  Contract Awaiting Signature
                </option>
                <option value="Contract Signed">Contract Signed</option>
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Waiting For Payment">
                  Waiting For Payment
                </option>
                <option value="Payment Due">Payment Due</option>
                <option value="Payment Completed">Payment Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
              <button
                onClick={handleNewRequestClick}
                className="flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-lg text-[1rem] font-medium hover:opacity-90 cursor-pointer"
              >
                <PlusIcon className="w-4 h-4" />
                New Request
              </button>
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

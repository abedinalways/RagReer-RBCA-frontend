"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
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
        <div className="bg-card-bg rounded-sm border border-border">
          {/* Header Section */}
          <div className="p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-[1.25rem] font-medium text-primary-heading">
              My Requests
            </h2>
          
            <div className="flex w-full flex-col gap-3 md:grid md:w-fit md:grid-cols-2 md:items-center md:pr-2">
              <button className="relative w-full md:w-36">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="appearance-none border border-border bg-input-bg rounded-sm pl-3 pr-8 py-1.5 text-[1rem] text-txt-primary w-full cursor-pointer focus:outline-none focus:ring-0 text-center"
                >
                  <option value="All Status">All Status</option>
                  <option value="Draft">Draft</option>
                  <option value="Request Submitted">Request Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Site Visit Required">Site Visit Required</option>
                  <option value="Site Visit Pending">Site Visit Pending</option>
                  <option value="Site Visit Scheduled">
                    Site Visit Scheduled
                  </option>
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
                  <option value="Waiting For Payment">Waiting For Payment</option>
                  <option value="Payment Due">Payment Due</option>
                  <option value="Payment Completed">Payment Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>

                {/* Custom chevron — the native arrow is removed via `appearance-none`
                    and sits at the right edge, so the select needs `pr-8`. */}
                <ChevronDown className="w-4 h-4 text-secondary-subheading absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </button>
              <Link
                href="/customer/requests/new-request"
                className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-1.5 rounded-sm text-[1rem] font-medium hover:opacity-90 cursor-pointer w-full md:w-36"
              >
                <PlusIcon className="w-5 h-5" />
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

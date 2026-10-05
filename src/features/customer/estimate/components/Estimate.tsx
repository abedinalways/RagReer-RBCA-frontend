"use client";
import React, { useState, useMemo } from "react";
import { createEstimateColumns } from "./EstimateColumns";
import { estimateData } from "../data/estimateData";
import { EstimateItem } from "../types/estimateTypes";
import { ReusableTable } from "@/components/reusable/ReusableTable";
import EmptyStateCard from "@/components/reusable/EmptyStateCard";
import { DocumentIcon } from "@/components/icons/DocumentIcon";
import { CustomSelect } from "@/components/ui/CustomSelect";

import { useRouter } from "next/navigation";

export const Estimate: React.FC = () => {
  const router = useRouter();
  const [estimates] = useState<EstimateItem[]>(estimateData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const filteredEstimates = useMemo(() => {
    return estimates.filter((est) => {
      const matchesSearch =
        est.estimateId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        est.requestId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        est.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        est.serviceType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "All Status" ? true : est.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [estimates, searchQuery, selectedStatus]);

  const columns = useMemo(
    () =>
      createEstimateColumns((est) => {
        router.push(`/customer/estimations/${est.id}`);
      }),
    [router],
  );

  const handleRequestClick = () => {
    router.push("/customer/requests");
  };

  return (
    <div>
      {filteredEstimates.length === 0 ? (
        <EmptyStateCard
          icon={<DocumentIcon className="w-7 h-7 text-primary" />}
          title="No Estimations Found"
          description="You don't have any estimations yet."
          actionLabel="Go to My Requests"
          onAction={handleRequestClick}
        />
      ) : (
        <div className="bg-card-bg rounded-sm border border-border">
          {/* Header Section */}
          <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-[1.25rem] font-medium text-primary-heading">
              All Estimations
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type to search"
                className="w-full sm:w-48 h-9 border border-border bg-input-bg rounded-md px-3 text-sm text-txt-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <div className="w-full sm:w-44">
                <CustomSelect
                  value={selectedStatus}
                  onChange={(val) => setSelectedStatus(val)}
                  options={["All Status", "Pending Approval", "Approved", "Declined"]}
                  size="sm"
                  align="right"
                />
              </div>
            </div>
          </div>

          <ReusableTable
            data={filteredEstimates}
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

export default Estimate;

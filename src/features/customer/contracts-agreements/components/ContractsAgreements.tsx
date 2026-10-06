"use client";
import React, { useState, useMemo } from "react";
import { createContractsColumns } from "./ContractsAgreementsColumns";
import { contractsAgreementsData } from "../data/contractsAgreementsData";
import { ContractItem } from "../types/contractsAgreementsTypes";
import { ReusableTable } from "@/components/reusable/ReusableTable";
import EmptyStateCard from "@/components/reusable/EmptyStateCard";
import { DocumentIcon } from "@/components/icons/DocumentIcon";
import { CustomSelect } from "@/components/ui/CustomSelect";

export const ContractsAgreements: React.FC = () => {
  const [contracts] = useState<ContractItem[]>(contractsAgreementsData);
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const filteredContracts = useMemo(() => {
    return contracts.filter((cn) => {
      const matchesStatus =
        selectedStatus === "All Status" ? true : cn.status === selectedStatus;
      return matchesStatus;
    });
  }, [contracts, selectedStatus]);

  const columns = useMemo(
    () =>
      createContractsColumns((cn) => {
        console.log("View contract:", cn);
      }),
    [],
  );

  return (
    <div className="space-y-4">
      {filteredContracts.length === 0 ? (
        <div className="pt-8 sm:pt-14 pb-12 flex flex-col items-center justify-center p-4">
          <EmptyStateCard
            icon={<DocumentIcon className="w-7 h-7 text-primary" />}
            title="No Contract on Record"
            description="After a proposal is approved, a formal master service agreement will be issued for digital execution."
            actionLabel="Go to My Requests"
            actionHref="/customer/requests"
            className="max-w-xl"
          />
          {selectedStatus !== "All Status" && (
            <button
              type="button"
              onClick={() => setSelectedStatus("All Status")}
              className="mt-4 text-xs text-primary hover:underline cursor-pointer font-medium"
            >
              Reset Status Filter
            </button>
          )}
        </div>
      ) : (
        <div className="bg-card-bg rounded-sm border border-border">
          {/* Header Section */}
          <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-[1.25rem] font-medium text-primary-heading">
              All Contracts & Agreements
            </h2>
            <div className="w-full sm:w-36">
              <CustomSelect
                value={selectedStatus}
                onChange={(val) => setSelectedStatus(val)}
                options={["All Status", "Pending Approval", "Active"]}
                size="sm"
                align="right"
              />
            </div>
          </div>

          <ReusableTable
            data={filteredContracts}
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

export default ContractsAgreements;

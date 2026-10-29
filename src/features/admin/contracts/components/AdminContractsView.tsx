"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import { ReusableTable } from "@/components/reusable/ReusableTable";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { ADMIN_CONTRACTS_DATA } from "../data/adminContractsData";
import {
  AdminContractItem,
  AdminContractStatus,
} from "../types/adminContracts.types";
import { createAdminContractsColumns } from "./AdminContractsColumns";
import { ContractsEmptyState } from "./ContractsEmptyState";

const ALL_STATUS_OPTIONS: (string | AdminContractStatus)[] = [
  "All Status",
  "Draft",
  "Sent",
  "Pending Sign",
  "Signed",
  "Change Requested",
  "Active",
  "Cancelled",
];

export const AdminContractsView: React.FC = () => {
  const router = useRouter();
  const [contracts, setContracts] =
    useState<AdminContractItem[]>(ADMIN_CONTRACTS_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const handleActionClick = (
    actionKey: string,
    contract: AdminContractItem
  ) => {
    switch (actionKey) {
      case "view_details":
        router.push(
          `/admin/contracts/${contract.id}?status=${encodeURIComponent(
            contract.status
          )}`
        );
        break;
      case "edit":
        router.push(
          `/admin/contracts/create?contractId=${encodeURIComponent(
            contract.id
          )}`
        );
        break;
      case "view_customer":
        toast(`Viewing customer: ${contract.customer.name}`, { icon: "👤" });
        break;
      case "send_to_customer":
        toast.success(`Contract & agreement sent to ${contract.customer.email}`);
        setContracts((prev) =>
          prev.map((c) =>
            c.id === contract.id ? { ...c, status: "Sent" } : c
          )
        );
        break;
      case "cancel":
      case "terminate":
        toast.error(`Contract ${contract.contractId} cancelled`);
        setContracts((prev) =>
          prev.map((c) =>
            c.id === contract.id ? { ...c, status: "Cancelled" } : c
          )
        );
        break;
      default:
        toast(`Action ${actionKey} triggered for ${contract.contractId}`);
        break;
    }
  };

  const filteredContracts = useMemo(() => {
    return contracts.filter((c) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.contractId.toLowerCase().includes(q) ||
        (c.estimateId && c.estimateId.toLowerCase().includes(q)) ||
        c.customer.name.toLowerCase().includes(q) ||
        c.customer.email.toLowerCase().includes(q) ||
        c.propertyAddress.toLowerCase().includes(q) ||
        c.serviceType.toLowerCase().includes(q) ||
        (c.agreementType && c.agreementType.toLowerCase().includes(q)) ||
        (c.period && c.period.toLowerCase().includes(q));

      const matchesStatus =
        selectedStatus === "All Status" ||
        c.status === selectedStatus ||
        (selectedStatus === "Pending Sign" &&
          (c.status === "Pending Sign" || c.status === "Pending Signature")) ||
        (selectedStatus === "Cancelled" &&
          (c.status === "Cancelled" || c.status === "Terminated"));

      return matchesSearch && matchesStatus;
    });
  }, [contracts, searchQuery, selectedStatus]);

  const columns = useMemo(
    () => createAdminContractsColumns(handleActionClick),
    []
  );

  return (
    <div className="w-full space-y-5 md:space-y-6 max-w-[1600px] mx-auto animate-in fade-in duration-200">
      {/* 1. Page Header matching Screenshot 2 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="font-barlow-condensed text-xl md:text-2xl font-medium tracking-tight text-primary-heading">
          Contracts & Agreements
        </h1>

        <button
          type="button"
          onClick={() => router.push("/admin/contracts/create")}
          className="inline-flex items-center justify-center gap-2 rounded-xs bg-primary px-4 py-2 text-xs md:text-sm font-medium text-white shadow-2xs hover:bg-primary-hover transition-colors cursor-pointer self-start sm:self-auto"
        >
          <span>Create Contract & Agreements</span>
        </button>
      </div>

      {/* 2. Main Card Container containing Filters and ReusableTable */}
      {contracts.length === 0 ? (
        <ContractsEmptyState
          onCreateContract={() => router.push("/admin/contracts/create")}
        />
      ) : (
        <div className="rounded-sm border border-border bg-card-bg shadow-2xs overflow-hidden">
          {/* Table Controls / Filter Bar matching Figma Screenshot 2 */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-5 border-b border-border-subtle">
            <h2 className="font-barlow-condensed text-lg md:text-xl font-medium text-primary-heading leading-none">
              All Contracts & Agreements List
            </h2>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {/* Search Box */}
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-secondary-subheading" />
                <input
                  type="text"
                  placeholder="Search contracts"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full sm:w-56 h-9 rounded-xs border border-border bg-card-bg pl-8.5 pr-3 text-xs md:text-sm text-txt-primary placeholder:text-secondary-subheading/60 focus:border-primary focus:outline-hidden transition-all"
                />
              </div>

              {/* Status Filter */}
              <CustomSelect
                options={ALL_STATUS_OPTIONS}
                value={selectedStatus}
                onChange={(val) => {
                  setSelectedStatus(val);
                  setCurrentPage(1);
                }}
                className="w-32 sm:w-36"
                triggerClassName="h-9 text-xs md:text-sm bg-card-bg border-border rounded-xs"
                size="sm"
              />
            </div>
          </div>

          {/* ReusableTable matching project requirements */}
          <ReusableTable
            data={filteredContracts}
            columns={columns}
            keyExtractor={(item) => item.id}
            emptyMessage="No contracts found matching your search."
            pagination={{
              currentPage,
              itemsPerPage,
              onPageChange: setCurrentPage,
              onItemsPerPageChange: (size) => {
                setItemsPerPage(size);
                setCurrentPage(1);
              },
              pageSizeOptions: [10, 25, 50, 100],
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AdminContractsView;

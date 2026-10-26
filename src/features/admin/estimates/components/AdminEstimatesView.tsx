"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import { ReusableTable } from "@/components/reusable/ReusableTable";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { ADMIN_ESTIMATES_DATA } from "../data/adminEstimatesData";
import {
  AdminEstimateItem,
  AdminEstimateStatus,
} from "../types/adminEstimates.types";
import { createAdminEstimatesColumns } from "./AdminEstimatesColumns";
import { EstimatesEmptyState } from "./EstimatesEmptyState";
import { EstimateDetailsModal } from "./EstimateDetailsModal";

const ALL_STATUS_OPTIONS: (string | AdminEstimateStatus)[] = [
  "All Status",
  "Draft",
  "Sent",
  "Under Review",
  "Change Requested",
  "Approved",
  "Expired",
  "Declined",
];

const ALL_SERVICE_TYPES = [
  "Service Type",
  "Residential Lawn Care",
  "Residential Roof Cleaning",
  "Residential Pest Control",
  "Office Carpet Cleaning",
  "Commercial HVAC Maintenance",
];

export const AdminEstimatesView: React.FC = () => {
  const router = useRouter();
  const [estimates, setEstimates] =
    useState<AdminEstimateItem[]>(ADMIN_ESTIMATES_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedServiceType, setSelectedServiceType] =
    useState("Service Type");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Modal State
  const [selectedEstimate, setSelectedEstimate] =
    useState<AdminEstimateItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleActionClick = (
    actionKey: string,
    estimate: AdminEstimateItem
  ) => {
    switch (actionKey) {
      case "view_details":
        router.push(`/admin/estimates/${estimate.id}`);
        break;
      case "edit":
        router.push(
          `/admin/requests/create-estimate?estimateId=${encodeURIComponent(
            estimate.estimateId
          )}`
        );
        break;
      case "view_customer":
        toast(`Viewing customer: ${estimate.customer.name}`, { icon: "👤" });
        break;
      case "send_to_customer":
        toast.success(`Estimate sent to ${estimate.customer.email}`);
        setEstimates((prev) =>
          prev.map((e) =>
            e.id === estimate.id ? { ...e, status: "Sent" } : e
          )
        );
        break;
      case "view_request":
        router.push(`/admin/requests`);
        break;
      default:
        toast(`Action ${actionKey} triggered for ${estimate.estimateId}`);
        break;
    }
  };

  const filteredEstimates = useMemo(() => {
    return estimates.filter((est) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        est.estimateId.toLowerCase().includes(q) ||
        est.requestId.toLowerCase().includes(q) ||
        est.customer.name.toLowerCase().includes(q) ||
        est.customer.email.toLowerCase().includes(q) ||
        est.propertyAddress.toLowerCase().includes(q) ||
        est.serviceType.toLowerCase().includes(q);

      const matchesStatus =
        selectedStatus === "All Status" || est.status === selectedStatus;

      const matchesServiceType =
        selectedServiceType === "Service Type" ||
        est.serviceType.toLowerCase().includes(selectedServiceType.toLowerCase()) ||
        selectedServiceType.toLowerCase().includes(est.serviceType.toLowerCase().replace("...", ""));

      return matchesSearch && matchesStatus && matchesServiceType;
    });
  }, [estimates, searchQuery, selectedStatus, selectedServiceType]);

  const columns = useMemo(
    () => createAdminEstimatesColumns(handleActionClick),
    []
  );

  return (
    <div className="w-full space-y-5 md:space-y-6 max-w-[1600px] mx-auto animate-in fade-in duration-200">
      {/* 1. Page Header matching Screenshot 2 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="font-barlow-condensed text-xl md:text-2xl font-medium tracking-tight text-primary-heading">
          Estimate
        </h1>

        <button
          type="button"
          onClick={() => router.push("/admin/requests/create-estimate")}
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm md:text-base font-medium text-white shadow-2xs hover:bg-primary-hover transition-colors cursor-pointer self-start sm:self-auto"
        >
          <span>Create Estimate</span>
        </button>
      </div>

      {/* 2. Main Card Container containing Filters and ReusableTable */}
      {estimates.length === 0 ? (
        <EstimatesEmptyState
          onCreateEstimate={() =>
            router.push("/admin/requests/create-estimate")
          }
        />
      ) : (
        <div className="rounded-sm border border-border bg-card-bg shadow-2xs overflow-hidden">
          {/* Table Controls / Filter Bar matching Figma */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 p-4 sm:p-5 border-b border-border-subtle">
            <h2 className="font-barlow-condensed text-lg md:text-xl font-medium text-primary-heading leading-none">
              All Estimate List
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

              {/* Status Filter */}
              <CustomSelect
                options={ALL_STATUS_OPTIONS}
                value={selectedStatus}
                onChange={(val) => {
                  setSelectedStatus(val);
                  setCurrentPage(1);
                }}
                className="w-32 sm:w-36"
                triggerClassName="h-9 text-xs sm:text-sm bg-page-bg/50 border-border"
                size="sm"
              />

              {/* Service Type Filter */}
              <CustomSelect
                options={ALL_SERVICE_TYPES}
                value={selectedServiceType}
                onChange={(val) => {
                  setSelectedServiceType(val);
                  setCurrentPage(1);
                }}
                className="w-36 sm:w-40"
                triggerClassName="h-9 text-xs sm:text-sm bg-page-bg/50 border-border"
                size="sm"
              />
            </div>
          </div>

          {/* ReusableTable matching project requirements */}
          <ReusableTable
            data={filteredEstimates}
            columns={columns}
            keyExtractor={(item) => item.id}
            emptyMessage="No estimates found matching your search."
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

      {/* Estimate Details Modal */}
      <EstimateDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        estimate={selectedEstimate}
        onEdit={(est) => {
          setIsModalOpen(false);
          router.push(
            `/admin/requests/create-estimate?estimateId=${encodeURIComponent(
              est.estimateId
            )}`
          );
        }}
        onSend={(est) => {
          setIsModalOpen(false);
          handleActionClick("send_to_customer", est);
        }}
      />
    </div>
  );
};

export default AdminEstimatesView;

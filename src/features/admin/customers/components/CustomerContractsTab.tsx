"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronDown, FileCheck } from "lucide-react";
import toast from "react-hot-toast";
import { CUSTOMER_CONTRACTS_LIST } from "../data/adminCustomersDetailData";
import {
  CustomerContractItem,
  CustomerContractStatus,
} from "../types/adminCustomers.types";
import { ContractActionMenu } from "./ContractActionMenu";
import { Pagination } from "@/components/reusable/Pagination";

interface CustomerContractsTabProps {
  onSelectContract?: (contract: CustomerContractItem) => void;
}

export const CustomerContractsTab: React.FC<CustomerContractsTabProps> = ({
  onSelectContract,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const filteredContracts = useMemo(() => {
    return CUSTOMER_CONTRACTS_LIST.filter((ctr) => {
      const matchSearch =
        !searchTerm ||
        ctr.contractId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ctr.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ctr.agreement.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ctr.billing.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ctr.startDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ctr.endDate.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        selectedStatus === "All" || ctr.status === selectedStatus;

      return matchSearch && matchStatus;
    });
  }, [searchTerm, selectedStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredContracts.length / itemsPerPage));
  const visibleContracts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredContracts.slice(start, start + itemsPerPage);
  }, [filteredContracts, currentPage, itemsPerPage]);

  const getStatusBadge = (status: CustomerContractStatus) => {
    switch (status) {
      case "Draft":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            Draft
          </span>
        );
      case "Sent":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-info border border-blue-100 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-info" />
            Sent
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-600 border border-amber-200 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Pending
          </span>
        );
      case "Signed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-200 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Signed
          </span>
        );
      case "Expired":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-medium bg-rose-50 text-rose-600 border border-rose-200 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Expired
          </span>
        );
      case "Active":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-info border border-blue-100 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-info" />
            Active
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-medium bg-page-bg text-secondary-subheading border border-border whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-subheading" />
            {status}
          </span>
        );
    }
  };

  const handleContractClick = (ctr: CustomerContractItem) => {
    if (onSelectContract) {
      onSelectContract(ctr);
    } else {
      toast.success(`Viewing contract: ${ctr.contractId}`);
    }
  };

  return (
    <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-6 shadow-2xs space-y-4">
      {/* Header and Filter Row (Figma Screenshot) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <h2 className="text-xl sm:text-2xl font-medium text-primary-heading font-barlow-condensed">
          Contracts & Agreements
        </h2>

        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-subheading pointer-events-none" />
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
              <option value="Draft">Draft</option>
              <option value="Sent">Sent</option>
              <option value="Pending">Pending</option>
              <option value="Signed">Signed</option>
              <option value="Expired">Expired</option>
              <option value="Active">Active</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Contracts Table */}
      {visibleContracts.length === 0 ? (
        <div className="py-16 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-nav-bg flex items-center justify-center text-primary mx-auto">
            <FileCheck className="w-6 h-6 text-primary" strokeWidth={1.75} />
          </div>
          <p className="text-sm font-medium text-primary-heading">
            No Contracts or Agreements Found
          </p>
          <p className="text-xs text-secondary-subheading max-w-sm mx-auto">
            Try adjusting your search query or status filter to find contracts.
          </p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-page-bg border-b border-border text-secondary-subheading font-medium">
                <th className="py-2.5 px-3 whitespace-nowrap">Contract ID</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Service</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Properties</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Agreement</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Billing</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Start Date</th>
                <th className="py-2.5 px-3 whitespace-nowrap">End Date</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Status</th>
                <th className="py-2.5 px-3 text-center whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visibleContracts.map((ctr) => (
                <tr
                  key={ctr.id}
                  className="hover:bg-page-bg/50 transition-colors"
                >
                  <td className="py-3 px-3 font-medium whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => handleContractClick(ctr)}
                      className="text-info hover:underline cursor-pointer focus:outline-hidden"
                    >
                      {ctr.contractId}
                    </button>
                  </td>
                  <td className="py-3 px-3 text-secondary-subheading whitespace-nowrap">
                    {ctr.service}
                  </td>
                  <td className="py-3 px-3 text-secondary-subheading whitespace-nowrap">
                    {ctr.propertiesCount}
                  </td>
                  <td className="py-3 px-3 text-secondary-subheading whitespace-nowrap">
                    {ctr.agreement}
                  </td>
                  <td className="py-3 px-3 text-secondary-subheading whitespace-nowrap">
                    {ctr.billing}
                  </td>
                  <td className="py-3 px-3 text-secondary-subheading whitespace-nowrap">
                    {ctr.startDate}
                  </td>
                  <td className="py-3 px-3 text-secondary-subheading whitespace-nowrap">
                    {ctr.endDate}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    {getStatusBadge(ctr.status)}
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <ContractActionMenu
                      contract={ctr}
                      onActionClick={(actionKey, contractItem) => {
                        switch (actionKey) {
                          case "view":
                            handleContractClick(contractItem);
                            break;
                          case "edit":
                            toast.success(`Editing contract ${contractItem.contractId}`);
                            break;
                          case "send":
                            toast.success(`Sending contract ${contractItem.contractId} for signature`);
                            break;
                          case "reminder":
                            toast.success(`Reminder notification sent for ${contractItem.contractId}`);
                            break;
                          case "download":
                            toast.success(`Downloading PDF for contract ${contractItem.contractId}`);
                            break;
                          default:
                            toast.success(`${actionKey} action triggered for ${contractItem.contractId}`);
                        }
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Footer */}
      {visibleContracts.length > 0 && (
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
      )}
    </div>
  );
};

export default CustomerContractsTab;

"use client";
import React, { useState, useMemo } from "react";
import { createInvoicesColumns } from "./InvoicesColumns";
import { INITIAL_INVOICES_DATA } from "../data/invoicesData";
import { Invoice } from "../types/invoicesTypes";
import { ReusableTable } from "@/components/reusable/ReusableTable";
import EmptyStateCard from "@/components/reusable/EmptyStateCard";
import { DocumentIcon } from "@/components/icons/DocumentIcon";
import { CustomSelect } from "@/components/ui/CustomSelect";

export const Invoices: React.FC = () => {
  const [invoices] = useState<Invoice[]>(INITIAL_INVOICES_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesSearch =
        inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.serviceType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "All Status" ? true : inv.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [invoices, searchQuery, selectedStatus]);

  const columns = useMemo(
    () => createInvoicesColumns((inv) => console.log("Action on:", inv)),
    [],
  );

  const handleRequestClick = () => {
    console.log("Redirecting to requests...");
  };
  return (
    <div>
      {filteredInvoices.length === 0 ? (
        <EmptyStateCard
          icon={<DocumentIcon className="w-7 h-7 text-primary" />}
          title="No Invoices Found"
          description="You don't have any invoices yet."
          actionLabel="Go to My Requests"
          onAction={handleRequestClick}
        />
      ) : (
        <div className="bg-card-bg rounded-sm border border-border">
          {/* Header Section */}
          <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-[1.25rem] font-medium text-primary-heading">
              All Invoices
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
                  options={[
                    "All Status",
                    "Pending",
                    "Paid",
                    "Due",
                    "Overdue",
                  ]}
                  size="sm"
                  align="right"
                />
              </div>
            </div>
          </div>

          <ReusableTable
            data={filteredInvoices}
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

"use client";
import React, { useState, useMemo } from "react";
import { createInvoicesColumns } from "./InvoicesColumns";
import { INITIAL_INVOICES_DATA } from "../data/invoicesData";
import { Invoice } from "../types/invoicesTypes";
import { Pagination } from "@/components/reusable/Pagination";
import { ReusableTable } from "@/components/reusable/ReusableTable";
import EmptyStateCard from "@/components/reusable/EmptyStateCard";
import { DocumentIcon } from "@/components/icons/DocumentIcon";

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
        <div className="bg-card-bg rounded-xl border border-border">
          <div className="p-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary-heading">
              All Invoices
            </h2>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type to search"
                className="border border-border bg-input-bg rounded-lg px-3 py-1.5 text-sm text-txt-primary"
              />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-border bg-input-bg rounded-lg px-3 py-1.5 text-sm text-txt-primary"
              >
                <option value="All Status">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Due">Due</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
          </div>

          <ReusableTable
            data={filteredInvoices.slice(0, itemsPerPage)}
            columns={columns}
            keyExtractor={(item, idx) => idx}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredInvoices.length / itemsPerPage)}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>
      )}
    </div>
  );
};

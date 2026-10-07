"use client";

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { createInvoicesColumns } from "./InvoicesColumns";
import {
  INITIAL_INVOICES_DATA,
  BILLING_HISTORY_DATA,
} from "../data/invoicesData";
import { Invoice, BillingHistoryItem } from "../types/invoicesTypes";
import { ReusableTable } from "@/components/reusable/ReusableTable";
import EmptyStateCard from "@/components/reusable/EmptyStateCard";
import InvoicesIcon from "@/components/icons/customer/InvoicesIcon";
import { CustomSelect } from "@/components/ui/CustomSelect";
import BillingHistory from "./BillingHistory";
import PaymentReceiptModal from "./PaymentReceiptModal";

export const Invoices: React.FC = () => {
  const [invoices] = useState<Invoice[]>(INITIAL_INVOICES_DATA);
  const [billingHistory] = useState<BillingHistoryItem[]>(BILLING_HISTORY_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Receipt Modal State
  const [selectedReceipt, setSelectedReceipt] =
    useState<BillingHistoryItem | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const handleViewReceipt = (item: BillingHistoryItem) => {
    setSelectedReceipt(item);
    setIsReceiptModalOpen(true);
  };

  const handleDownloadReceipt = (item: BillingHistoryItem) => {
    console.log("Download receipt for:", item);
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
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

  return (
    <div className="space-y-6 sm:space-y-7">
      {invoices.length === 0 ? (
        /* Empty State matching Figma Screenshot 1 */
        <div className="pt-8 sm:pt-14 pb-12 flex flex-col items-center justify-center p-4">
          <EmptyStateCard
            icon={<InvoicesIcon className="w-8 h-8 text-primary" />}
            title="No Invoices Yet"
            description="Invoices are generated upon completion and quality review of scheduled property maintenance services"
            actionLabel="Go to My Requests"
            actionHref="/customer/requests"
            className="max-w-xl"
          />
        </div>
      ) : (
        /* Invoices Table Section matching Figma Screenshot 2 & 3 */
        <div className="bg-card-bg rounded-sm border border-border">
          {/* Header Section */}
          <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-lg md:text-xl font-medium text-primary-heading">
              All Invoices
            </h2>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search with input icon */}
              <div className="relative w-full sm:w-56">
                <Search className="w-4 h-4 text-secondary-subheading absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Type to search"
                  className="w-full h-9 pl-9 pr-3 border border-border bg-input-bg rounded-md text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/70 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/50"
                />
              </div>

              {/* Status Select */}
              <div className="w-full sm:w-36">
                <CustomSelect
                  value={selectedStatus}
                  onChange={(val) => {
                    setSelectedStatus(val);
                    setCurrentPage(1);
                  }}
                  options={[
                    "All Status",
                    "Pending",
                    "Paid",
                    "Payment Due",
                    "Active",
                  ]}
                  size="sm"
                  align="right"
                />
              </div>
            </div>
          </div>

          {filteredInvoices.length === 0 ? (
            <div className="p-8 text-center text-sm text-secondary-subheading">
              No invoices match your filter or search criteria.
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedStatus("All Status");
                }}
                className="block mx-auto mt-2 text-xs text-primary hover:underline font-medium cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
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
          )}
        </div>
      )}

      {/* Billing History Section (Figma Screenshot 3) */}
      {billingHistory.length > 0 && (
        <BillingHistory
          items={billingHistory}
          onViewReceipt={handleViewReceipt}
          onDownloadReceipt={handleDownloadReceipt}
        />
      )}

      {/* Payment Receipt Modal (Figma Screenshot 1) */}
      <PaymentReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        receiptData={
          selectedReceipt
            ? {
                transactionId: selectedReceipt.transactionId,
                customerName: selectedReceipt.billedTo,
                paymentDate: selectedReceipt.paymentCompletionDate,
                totalPaid: selectedReceipt.amount,
                paymentMethod: selectedReceipt.paymentMethod,
                invoiceId: selectedReceipt.invoiceId,
                completedService: selectedReceipt.completedService,
                totalVisit: selectedReceipt.totalVisit,
                serviceCompletionDate: selectedReceipt.serviceCompletionDate,
              }
            : undefined
        }
      />
    </div>
  );
};

export default Invoices;

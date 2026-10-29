"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronDown, Receipt } from "lucide-react";
import toast from "react-hot-toast";
import {
  CUSTOMER_BILLING_SUMMARY,
  CUSTOMER_BILLING_SETTINGS,
  CUSTOMER_PAYMENTS_LIST,
} from "../data/adminCustomersDetailData";
import {
  CustomerPaymentItem,
  CustomerPaymentStatus,
  CustomerItem,
} from "../types/adminCustomers.types";
import { PaymentActionMenu } from "./PaymentActionMenu";
import { Pagination } from "@/components/reusable/Pagination";

interface CustomerBillingTabProps {
  customer?: CustomerItem;
  onSelectPayment?: (payment: CustomerPaymentItem) => void;
}

export const CustomerBillingTab: React.FC<CustomerBillingTabProps> = ({
  customer,
  onSelectPayment,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const accountName = customer?.organizationName || customer?.name || CUSTOMER_BILLING_SUMMARY.accountName;

  const filteredPayments = useMemo(() => {
    return CUSTOMER_PAYMENTS_LIST.filter((pay) => {
      const matchSearch =
        !searchTerm ||
        pay.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pay.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pay.billingPeriod.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pay.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pay.dueDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pay.method.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        selectedStatus === "All" || pay.status === selectedStatus;

      return matchSearch && matchStatus;
    });
  }, [searchTerm, selectedStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredPayments.length / itemsPerPage));
  const visiblePayments = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPayments.slice(start, start + itemsPerPage);
  }, [filteredPayments, currentPage, itemsPerPage]);

  const getStatusBadge = (status: CustomerPaymentStatus) => {
    switch (status) {
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-600 border border-amber-200 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Pending
          </span>
        );
      case "Paid":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-600 border border-emerald-200 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Paid
          </span>
        );
      case "Due":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-medium bg-rose-50 text-rose-600 border border-rose-200 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Due
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

  const handleInvoiceClick = (pay: CustomerPaymentItem) => {
    if (onSelectPayment) {
      onSelectPayment(pay);
    } else {
      toast.success(`Viewing invoice ${pay.invoiceId}`);
    }
  };

  return (
    <div className="space-y-5">
      {/* Top 2 Cards: Billing Summary & Billing Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: Billing Summary */}
        <div className="bg-card-bg rounded-xl border border-border p-5 sm:p-6 shadow-2xs space-y-4">
          <h2 className="text-base sm:text-lg font-medium text-primary-heading font-barlow-condensed">
            Billing Summary
          </h2>

          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-secondary-subheading">PO Number</span>
              <span className="text-info font-medium">
                {CUSTOMER_BILLING_SUMMARY.poNumber}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-secondary-subheading">Account Name</span>
              <span className="text-primary-heading font-medium">
                {accountName}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-secondary-subheading">Total Billed Amount</span>
              <span className="text-primary-heading font-medium">
                {CUSTOMER_BILLING_SUMMARY.totalBilledAmount}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-secondary-subheading">Paid</span>
              <span className="text-primary-heading font-medium">
                {CUSTOMER_BILLING_SUMMARY.paidAmount}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-secondary-subheading">Outstanding</span>
              <span className="text-primary-heading font-medium">
                {customer?.outstandingAmount || CUSTOMER_BILLING_SUMMARY.outstandingAmount}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-secondary-subheading">Over Due</span>
              <span className="text-primary-heading font-medium">
                {CUSTOMER_BILLING_SUMMARY.overdueAmount}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Billing Settings */}
        <div className="bg-card-bg rounded-xl border border-border p-5 sm:p-6 shadow-2xs space-y-4">
          <h2 className="text-base sm:text-lg font-medium text-primary-heading font-barlow-condensed">
            Billing Settings
          </h2>

          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-secondary-subheading">Billing Type</span>
              <span className="text-primary-heading font-medium">
                {customer?.billingType || CUSTOMER_BILLING_SETTINGS.billingType}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-secondary-subheading">Validity</span>
              <span className="text-primary-heading font-medium">
                {CUSTOMER_BILLING_SETTINGS.validity}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-secondary-subheading">Consolidated Billing</span>
              <span className="text-primary-heading font-medium">
                {accountName}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payments Card with Table */}
      <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-6 shadow-2xs space-y-4">
        {/* Header and Filter Row (Figma Screenshot) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
          <h2 className="text-xl sm:text-2xl font-medium text-primary-heading font-barlow-condensed">
            Payments
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
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Due">Due</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Payments Table */}
        {visiblePayments.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-nav-bg flex items-center justify-center text-primary mx-auto">
              <Receipt className="w-6 h-6 text-primary" strokeWidth={1.75} />
            </div>
            <p className="text-sm font-medium text-primary-heading">
              No Payments Found
            </p>
            <p className="text-xs text-secondary-subheading max-w-sm mx-auto">
              Try adjusting your search query or status filter to find payments.
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-page-bg border-b border-border text-secondary-subheading font-medium">
                  <th className="py-2.5 px-3 whitespace-nowrap">Invoice</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Service</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Properties</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Billing Period</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Amount</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Due Date</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Method</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Status</th>
                  <th className="py-2.5 px-3 text-center whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {visiblePayments.map((pay) => (
                  <tr
                    key={pay.id}
                    className="hover:bg-page-bg/50 transition-colors"
                  >
                    <td className="py-3 px-3 font-medium whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleInvoiceClick(pay)}
                        className="text-info hover:underline cursor-pointer focus:outline-hidden"
                      >
                        {pay.invoiceId}
                      </button>
                    </td>
                    <td className="py-3 px-3 text-secondary-subheading whitespace-nowrap">
                      {pay.service}
                    </td>
                    <td className="py-3 px-3 text-secondary-subheading whitespace-nowrap">
                      {pay.propertiesCount}
                    </td>
                    <td className="py-3 px-3 text-secondary-subheading whitespace-nowrap">
                      {pay.billingPeriod}
                    </td>
                    <td className="py-3 px-3 text-primary-heading font-medium whitespace-nowrap">
                      {pay.amount}
                    </td>
                    <td className="py-3 px-3 text-secondary-subheading whitespace-nowrap">
                      {pay.dueDate}
                    </td>
                    <td className="py-3 px-3 text-secondary-subheading whitespace-nowrap">
                      {pay.method}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      {getStatusBadge(pay.status)}
                    </td>
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <PaymentActionMenu
                        payment={pay}
                        onActionClick={(actionKey, paymentItem) => {
                          switch (actionKey) {
                            case "view_invoice":
                              handleInvoiceClick(paymentItem);
                              break;
                            case "view_receipt":
                              toast.success(`Viewing receipt for ${paymentItem.invoiceId}`);
                              break;
                            case "reminder":
                              toast.success(`Payment reminder sent for ${paymentItem.invoiceId}`);
                              break;
                            case "archive":
                              toast.success(`Invoice ${paymentItem.invoiceId} archived`);
                              break;
                            default:
                              toast.success(`${actionKey} action triggered for ${paymentItem.invoiceId}`);
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
        {visiblePayments.length > 0 && (
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
    </div>
  );
};

export default CustomerBillingTab;

"use client";

import React from "react";
import Image from "next/image";
import { MoreHorizontal, Building2 } from "lucide-react";
import { ReceivableInvoice } from "../types";
import { Pagination } from "@/components/reusable/Pagination";
import { useDragToScroll } from "@/hooks/useDragToScroll";

interface AccountsReceivableTableProps {
  invoices: ReceivableInvoice[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

export function AccountsReceivableTable({
  invoices,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: AccountsReceivableTableProps) {
  const { ref, events, dragClassName } = useDragToScroll<HTMLDivElement>();

  const totalPages = Math.max(1, Math.ceil(invoices.length / itemsPerPage));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const visibleData = invoices.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage
  );

  return (
    <div className="w-full">
      {/* Scrollable table container */}
      <div
        ref={ref}
        {...events}
        className={`w-full overflow-x-auto ${dragClassName}`}
      >
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-page-bg/40 border-b border-border">
              <th className="py-3 px-4 font-medium text-secondary-subheading whitespace-nowrap">
                Invoice ID
              </th>
              <th className="py-3 px-4 font-medium text-secondary-subheading whitespace-nowrap">
                Customer
              </th>
              <th className="py-3 px-4 font-medium text-secondary-subheading whitespace-nowrap">
                Billing
              </th>
              <th className="py-3 px-4 font-medium text-secondary-subheading whitespace-nowrap">
                Invoice Date
              </th>
              <th className="py-3 px-4 font-medium text-secondary-subheading whitespace-nowrap">
                Due Date
              </th>
              <th className="py-3 px-4 font-medium text-secondary-subheading whitespace-nowrap">
                Amount
              </th>
              <th className="py-3 px-4 font-medium text-secondary-subheading whitespace-nowrap">
                Status
              </th>
              <th className="py-3 px-4 font-medium text-secondary-subheading whitespace-nowrap text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {visibleData.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-12 text-center text-secondary-subheading"
                >
                  No accounts receivable records found.
                </td>
              </tr>
            ) : (
              visibleData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-page-bg/50 transition-colors"
                >
                  {/* Invoice ID */}
                  <td className="py-3.5 px-4 font-medium text-primary whitespace-nowrap">
                    {item.invoiceNumber}
                  </td>

                  {/* Customer */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {item.customer.avatarUrl ? (
                        <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-border">
                          <Image
                            src={item.customer.avatarUrl}
                            alt={item.customer.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-50/90 text-primary border border-blue-100 flex items-center justify-center shrink-0">
                          <Building2 className="w-4 h-4 text-[#EC7032]" />
                        </div>
                      )}
                      <div>
                        <span className="block font-medium text-txt-primary">
                          {item.customer.name}
                        </span>
                        <span className="block text-[11px] text-secondary-subheading">
                          {item.customer.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Billing */}
                  <td className="py-3.5 px-4 text-txt-primary whitespace-nowrap font-normal">
                    {item.billingType}
                  </td>

                  {/* Invoice Date */}
                  <td className="py-3.5 px-4 text-txt-primary whitespace-nowrap font-normal">
                    {item.invoiceDate}
                  </td>

                  {/* Due Date */}
                  <td className="py-3.5 px-4 text-txt-primary whitespace-nowrap font-normal">
                    {item.dueDate}
                  </td>

                  {/* Amount */}
                  <td className="py-3.5 px-4 font-medium text-txt-primary whitespace-nowrap">
                    {item.formattedAmount}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {item.status === "Awaiting Payment" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#FEFBF0] text-[#B54708] border border-[#FEDF89]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F79009]" />
                        Awaiting Payment
                      </span>
                    )}
                    {item.status === "Overdue" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#FEF3F2] text-[#D92D20] border border-[#FDA29B]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D92D20]" />
                        Overdue
                      </span>
                    )}
                    {item.status === "Paid" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
                        Paid
                      </span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-center">
                    <button
                      type="button"
                      aria-label="Actions"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-border bg-card-bg text-secondary-subheading hover:text-txt-primary hover:border-primary transition-colors cursor-pointer"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3 sm:p-4 border-t border-border">
        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
          pageSizeOptions={[10, 25, 50, 100]}
        />
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { Pagination } from "@/components/reusable/Pagination";
import { PayrollItem } from "../types";

interface PayrollMobileCardListProps {
  data: PayrollItem[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

export function PayrollMobileCardList({
  data,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PayrollMobileCardListProps) {
  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const visibleData = data.slice(
    (validCurrentPage - 1) * itemsPerPage,
    validCurrentPage * itemsPerPage
  );

  return (
    <div className="md:hidden">
      {visibleData.length > 0 ? (
        <div className="divide-y divide-border/60">
          {visibleData.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-card-bg transition-colors hover:bg-page-bg/30 space-y-3"
            >
              {/* Top: Crew Avatar & Info */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 ring-1 ring-border/50 bg-page-bg">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm text-primary-heading truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs text-secondary-subheading truncate">
                    {item.email}
                  </p>
                </div>
              </div>

              {/* Middle: Hours & Rate */}
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <span className="text-secondary-subheading">Hours: </span>
                  <span className="font-medium text-txt-primary">{item.hours}</span>
                </div>
                <div>
                  <span className="text-secondary-subheading">Rate: </span>
                  <span className="text-secondary-subheading">{item.rate}</span>
                </div>
              </div>

              {/* Bottom: Total Payable Amount */}
              <div className="flex items-center justify-between pt-1 text-xs sm:text-sm">
                <span className="text-txt-primary font-normal">
                  Total Payable Amount
                </span>
                <span className="font-bold text-txt-primary text-sm">
                  {item.totalPayable}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-10 text-center text-xs text-secondary-subheading">
          No payroll records found.
        </div>
      )}

      {/* Pagination Footer */}
      <Pagination
        currentPage={validCurrentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
        pageSizeOptions={[10, 25, 50]}
      />
    </div>
  );
}

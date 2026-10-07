"use client";

import React from "react";
import { BillingHistoryItem } from "../types/invoicesTypes";
import EyeIcon from "@/components/icons/customer/EyeIcon";
import DownloadIcon from "@/components/icons/customer/DownloadIcon";

export interface BillingHistoryProps {
  items: BillingHistoryItem[];
  onViewReceipt?: (item: BillingHistoryItem) => void;
  onDownloadReceipt?: (item: BillingHistoryItem) => void;
  className?: string;
}

export const BillingHistory: React.FC<BillingHistoryProps> = ({
  items,
  onViewReceipt,
  onDownloadReceipt,
  className = "",
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-base md:text-lg font-medium text-primary-heading">
        Billing History
      </h3>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-border rounded-lg bg-card-bg p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/40 transition-colors shadow-2xs"
          >
            {/* Grid of Transaction Info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4 flex-1 text-xs md:text-sm">
              <div>
                <p className="text-[11px] md:text-xs text-secondary-subheading font-normal">
                  Transaction ID
                </p>
                <p className="font-semibold text-primary-heading mt-0.5">
                  {item.transactionId}
                </p>
              </div>

              <div>
                <p className="text-[11px] md:text-xs text-secondary-subheading font-normal">
                  Billed To
                </p>
                <p className="font-medium text-primary-heading mt-0.5 truncate">
                  {item.billedTo}
                </p>
              </div>

              <div>
                <p className="text-[11px] md:text-xs text-secondary-subheading font-normal">
                  Payment Completion Date
                </p>
                <p className="font-medium text-primary-heading mt-0.5">
                  {item.paymentCompletionDate}
                </p>
              </div>

              <div>
                <p className="text-[11px] md:text-xs text-secondary-subheading font-normal">
                  Amount
                </p>
                <p className="font-semibold text-primary-heading mt-0.5">
                  {item.amount}
                </p>
              </div>

              <div>
                <p className="text-[11px] md:text-xs text-secondary-subheading font-normal">
                  Payment Method
                </p>
                <p className="font-medium text-primary-heading mt-0.5">
                  {item.paymentMethod}
                </p>
              </div>
            </div>

            {/* Action Buttons: View Receipt (Eye) & Download (Download) */}
            <div className="flex items-center gap-2 self-end md:self-center shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-border/60 w-full md:w-auto justify-end">
              <button
                type="button"
                onClick={() => onViewReceipt?.(item)}
                aria-label="View receipt"
                className="p-2 border border-border rounded-md hover:bg-page-bg text-secondary-subheading hover:text-primary transition-colors cursor-pointer"
              >
                <EyeIcon className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => onDownloadReceipt?.(item)}
                aria-label="Download receipt"
                className="p-2 border border-border rounded-md hover:bg-page-bg text-secondary-subheading hover:text-primary transition-colors cursor-pointer"
              >
                <DownloadIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillingHistory;

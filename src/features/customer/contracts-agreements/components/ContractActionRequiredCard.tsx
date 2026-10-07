"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export interface ContractActionRequiredCardProps {
  contractId?: string;
  contractSlug?: string;
  amendmentLabel?: string;
  date?: string;
  priceEstimateLabel?: string;
  previousPrice?: string;
  newPrice?: string;
  reason?: string;
  onRequestRevision: () => void;
  onReviewAndSign: () => void;
}

export const ContractActionRequiredCard: React.FC<
  ContractActionRequiredCardProps
> = ({
  contractId = "#CN-1245",
  contractSlug = "cn-1",
  amendmentLabel = "Amendment #1",
  date = "Aug 25, 2026",
  priceEstimateLabel = "Price Estimate",
  previousPrice = "$650/mo",
  newPrice = "$720/mo",
  reason = "Annual pricing review tied to labor and fuel costs.",
  onRequestRevision,
  onReviewAndSign,
}) => {
  return (
    <div className="bg-card-bg rounded-xs border border-border p-4 sm:p-5 w-full max-w-xl transition-shadow">
      {/* Top Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
          <h3 className="text-base sm:text-[1.0625rem] font-semibold text-primary-heading">
            Action Required
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-secondary-subheading pl-7">
          <Link
            href={`/customer/contracts/${contractSlug}`}
            className="text-primary hover:underline font-medium"
          >
            {contractId}
          </Link>
          <span>•</span>
          <span>{amendmentLabel}</span>
          <span>•</span>
          <span>{date}</span>
        </div>
      </div>

      {/* Thin Horizontal Divider */}
      <div className="border-t border-border my-3 sm:my-3.5" />

      {/* What's Changing */}
      <div className="space-y-1">
        <h4 className="text-xs sm:text-sm font-semibold text-primary-heading">
          What&apos;s Changing:
        </h4>
        <div className="text-xs sm:text-sm text-secondary-subheading space-y-0.5">
          {priceEstimateLabel && <p>{priceEstimateLabel}</p>}
          {previousPrice && <p>Previous: {previousPrice}</p>}
          <p className="text-primary-heading font-medium">Now: {newPrice}</p>
        </div>
      </div>

      {/* Reason */}
      <div className="mt-3 sm:mt-3.5 space-y-1">
        <h4 className="text-xs sm:text-sm font-semibold text-primary-heading">
          Reason:
        </h4>
        <p className="text-xs sm:text-sm text-secondary-subheading leading-relaxed">
          {reason}
        </p>
      </div>

      {/* Bottom Buttons */}
      <div className="mt-4 sm:mt-5 flex items-center justify-end gap-2.5 sm:gap-3">
        <button
          type="button"
          onClick={onRequestRevision}
          className="px-4 py-2 text-xs sm:text-sm font-medium text-primary hover:text-primary-hover border border-primary/50 hover:border-primary bg-card-bg hover:bg-slate-50/50 rounded-xs transition-colors cursor-pointer"
        >
          Request Revision
        </button>
        <button
          type="button"
          onClick={onReviewAndSign}
          className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-xs transition-colors cursor-pointer shadow-2xs"
        >
          Review & Sign
        </button>
      </div>
    </div>
  );
};

export default ContractActionRequiredCard;

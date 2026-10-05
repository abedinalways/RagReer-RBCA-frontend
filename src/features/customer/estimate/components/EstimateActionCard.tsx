"use client";
import React from "react";
import Link from "next/link";
import { EstimateDetailData } from "../types/estimateTypes";

interface EstimateActionCardProps {
  data: EstimateDetailData;
  onApprove: () => void;
  onRequestRevision: () => void;
  onDecline: () => void;
}

export const EstimateActionCard: React.FC<EstimateActionCardProps> = ({
  data,
  onApprove,
  onRequestRevision,
  onDecline,
}) => {
  const { status, financials, validTill, approvalInfo, hasSiteVisit } = data;

  if (status === "Approved") {
    return (
      <div className="bg-card-bg rounded-lg border border-border p-5 space-y-4 shadow-2xs">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-base md:text-lg font-semibold text-primary-heading">
            Estimate Status
          </h3>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-xs md:text-sm font-medium bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6]">
            <span className="w-1.5 h-1.5 rounded-xs bg-note-green-bg" />
            Approved
          </span>
        </div>

        {/* Big Blue Total Card */}
        <div className="rounded-lg bg-[#A3BFDB] p-4 text-center text-white space-y-0.5 shadow-2xs">
          <p className="text-[0.8125rem] text-slate-800 font-medium tracking-wide">
            Total
          </p>
          <p className="text-[1.625rem] sm:text-[1.75rem] font-bold drop-shadow-2xs">
            {financials.total}
          </p>
        </div>

        {/* Details list */}
        <div className="space-y-2 pt-1 text-[0.8125rem]">
          <div className="flex items-center justify-between">
            <span className="text-secondary-subheading">Approved on</span>
            <span className="text-primary font-medium">
              {approvalInfo?.approvedOn || "Aug 16, 2026, 02:00 PM"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-secondary-subheading">Site Visit</span>
            <span className="text-primary font-medium">
              {hasSiteVisit ? approvalInfo?.siteVisitStatus || "Completed" : "N/A"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-secondary-subheading">Completed on</span>
            <span className="text-primary font-medium">
              {approvalInfo?.completedOn || "Aug 16, 2026, 02:00 PM"}
            </span>
          </div>
        </div>

        {/* Helper text */}
        <p className="text-[0.75rem] text-secondary-subheading leading-relaxed text-center pt-1">
          A contracts & agreements has been sent for your signature.
        </p>

        {/* Action Button */}
        <div className="pt-1">
          <Link
            href="/customer/contracts-agreements"
            className="w-full h-10 flex items-center justify-center rounded-md bg-primary hover:bg-primary-hover text-white font-medium text-[0.875rem] transition-colors cursor-pointer shadow-2xs text-center"
          >
            View Contracts & Agreements
          </Link>
        </div>
      </div>
    );
  }

  if (status === "Declined") {
    return (
      <div className="bg-card-bg rounded-lg border border-border p-5 space-y-4 shadow-2xs">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-base md:text-lg font-semibold text-primary-heading">
            Estimate Status
          </h3>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-xs md:text-sm font-medium bg-[#FEF3F2] text-decline border border-[#FECDCA]">
            <span className="w-1.5 h-1.5 rounded-full bg-decline" />
            Declined
          </span>
        </div>

        {/* Big Blue Total Card */}
        <div className="rounded-lg bg-[#A3BFDB] p-4 text-center text-white space-y-0.5 shadow-2xs">
          <p className="text-sm md:text-base text-slate-800 font-medium tracking-wide">
            Total
          </p>
          <p className="text-xl md:text-2xl font-bold drop-shadow-2xs">
            {financials.total}
          </p>
        </div>

        {/* Details list */}
        <div className="space-y-2 pt-1 text-xs md:text-sm">
          <div className="flex items-center justify-between">
            <span className="text-secondary-subheading">Declined On</span>
            <span className="text-primary font-normal">
              {data.declineInfo?.declinedOn || "Aug 16, 2026, 02:00 PM"}
            </span>
          </div>

          <div className="flex items-start justify-between gap-3">
            <span className="text-secondary-subheading shrink-0">Reason</span>
            <span className="text-primary font-normal text-right">
              {data.declineInfo?.reason || "Price is higher than expected."}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Pending Approval State (Validity Period Card)
  return (
    <div className="bg-card-bg rounded-lg border border-border p-5 space-y-4 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base md:text-lg font-semibold text-primary-heading">
          Validity Period
        </h3>
        <span className="text-base md:text-lg text-secondary-subheading font-normal">
          Till {validTill || "Oct 06, 2026"}
        </span>
      </div>

      {/* Big Blue Total Card */}
      <div className="rounded-lg bg-[#A3BFDB] p-4 text-center text-white space-y-0.5 shadow-2xs">
        <p className="text-sm md:text-base text-slate-800 font-medium tracking-wide">
          Total
        </p>
        <p className="text-xl md:text-2xl font-bold drop-shadow-2xs">
          {financials.total}
        </p>
      </div>

      {/* Helper text */}
      <p className="text-xs md:text-sm text-secondary-subheading leading-relaxed">
        A contracts & agreements will be sent for your signature after accepting this estimate.
      </p>

      {/* Action Buttons Stack */}
      <div className="space-y-2.5 pt-1">
        <button
          type="button"
          onClick={onApprove}
          className="w-full h-9 rounded-md bg-primary hover:bg-primary-hover text-white font-medium text-sm transition-colors cursor-pointer shadow-2xs flex items-center justify-center"
        >
          Approve
        </button>

        <button
          type="button"
          onClick={onRequestRevision}
          className="w-full h-9 rounded-md border border-primary text-primary hover:bg-primary/5 font-medium text-sm transition-colors cursor-pointer bg-card-bg flex items-center justify-center"
        >
          Request Estimate Revision
        </button>

        <button
          type="button"
          onClick={onDecline}
          className="w-full h-9 rounded-md border border-decline-border text-decline hover:bg-decline-secondary font-medium text-sm transition-colors cursor-pointer bg-card-bg flex items-center justify-center"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

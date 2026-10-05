"use client";
import React from "react";
import Link from "next/link";
import { EstimateRequestSummaryInfo } from "../types/estimateTypes";

interface EstimateRequestSummaryCardProps {
  summary: EstimateRequestSummaryInfo;
}

export const EstimateRequestSummaryCard: React.FC<
  EstimateRequestSummaryCardProps
> = ({ summary }) => {
  const reqSlug = summary.requestId.toLowerCase().replace("#", "").trim();
  const requestUrl = `/customer/requests/${reqSlug || "req-1048"}`;

  return (
    <div className="bg-card-bg rounded-lg border border-border p-5 space-y-4 shadow-2xs">
      <div>
        <h3 className="text-base md:text-lg font-semibold text-primary-heading">
          Request Summary
        </h3>
        <p className="text-xs md:text-sm text-secondary-subheading mt-0.5">
          Reference for this estimate
        </p>
      </div>

      <div className="border-t border-border pt-3 space-y-2.5 text-sm md:text-base">
        <div className="flex items-center justify-between">
          <span className="text-secondary-subheading">Request ID</span>
          <Link
            href={requestUrl}
            className="text-primary hover:underline font-medium"
          >
            {summary.requestId}
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-secondary-subheading">Created On</span>
          <span className="text-primary-heading font-medium">
            {summary.createdOn}
          </span>
        </div>

        <div className="flex items-start justify-between gap-3">
          <span className="text-secondary-subheading shrink-0">
            Requested Service
          </span>
          <span className="text-primary font-medium text-right">
            {summary.requestedService}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-secondary-subheading">Request Type</span>
          <span className="text-primary font-medium">
            {summary.requestType}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-secondary-subheading">Frequency</span>
          <span className="text-primary font-medium">{summary.frequency}</span>
        </div>
      </div>

      <div className="pt-2">
        <Link
          href={requestUrl}
          className="w-full h-9 flex items-center justify-center rounded-md border border-border hover:border-primary/60 text-primary font-medium text-xs md:text-sm transition-colors bg-card-bg hover:bg-slate-50 cursor-pointer"
        >
          View Your Request
        </Link>
      </div>
    </div>
  );
};

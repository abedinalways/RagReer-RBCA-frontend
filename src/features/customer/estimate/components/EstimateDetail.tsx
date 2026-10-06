"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Download, Check } from "lucide-react";
import { getEstimateDetailData } from "../data/estimateDetailData";
import { EstimateDetailData, EstimateStatus } from "../types/estimateTypes";
import { estimateStatusStyles } from "../data/estimateData";
import { EstimatePropertyCard } from "./EstimatePropertyCard";
import { EstimateServiceDetailsCard } from "./EstimateServiceDetailsCard";
import { EstimateRequestSummaryCard } from "./EstimateRequestSummaryCard";
import { EstimateSiteVisitCard } from "./EstimateSiteVisitCard";
import { EstimateActionCard } from "./EstimateActionCard";
import { ApproveModal, RevisionModal, DeclineModal } from "./EstimateModals";

interface EstimateDetailProps {
  estimateId?: string;
}

export const EstimateDetail: React.FC<EstimateDetailProps> = ({
  estimateId = "est-1",
}) => {
  const router = useRouter();

  // Load baseline estimate data by ID
  const initialData = getEstimateDetailData(estimateId);
  const [data, setData] = useState<EstimateDetailData>(initialData);

  // Modals state
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRevisionOpen, setIsRevisionOpen] = useState(false);
  const [isDeclineOpen, setIsDeclineOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show a toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleApprove = () => {
    setData((prev) => ({
      ...prev,
      status: "Approved",
      approvalInfo: {
        approvedOn: "Aug 16, 2026, 02:00 PM",
        siteVisitStatus: "Completed",
        completedOn: "Aug 16, 2026, 02:00 PM",
      },
    }));
    showToast("Estimate approved successfully! Contracts & agreements will be prepared.");
  };

  const handleRevisionSubmit = (formData: {
    reasons: string[];
    description: string;
    attachment?: File | null;
  }) => {
    setData((prev) => ({
      ...prev,
      revisionInfo: {
        submittedOn: "Aug 16, 2026, 02:00 PM",
        validUntil: "Aug 16, 2026, 02:00 PM",
        reasons: formData.reasons,
        description: formData.description,
        note: "Your change request has been submitted. We'll review your request and provide an updated estimate.",
      },
    }));
    showToast("Revision request submitted. We'll review your request and provide an updated estimate.");
  };

  const handleRescheduleAppointment = () => {
    setIsRevisionOpen(false);
    const reqSlug = data.requestSummary.requestId
      .toLowerCase()
      .replace("#", "")
      .trim();
    router.push(`/customer/requests/${reqSlug || "req-1048"}`);
  };

  const handleDecline = (reason: string) => {
    setData((prev) => ({
      ...prev,
      status: "Declined",
      declineInfo: {
        declinedOn: "Aug 16, 2026, 02:00 PM",
        reason: reason.trim() || "Price is higher than expected.",
      },
    }));
    showToast("Estimate has been declined.");
  };

  const handleDownloadEstimate = () => {
    showToast("Downloading estimate PDF...");
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Status Badge Renderer
  const renderStatusBadge = (status: EstimateStatus) => {
    if (status === "Declined") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-xs md:text-sm font-medium bg-[#FEF3F2] text-decline border border-[#FECDCA]">
          <span className="w-1.5 h-1.5 rounded-full bg-decline" />
          Declined
        </span>
      );
    }
    if (status === "Approved") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-xs md:text-sm font-medium bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
          Approved
        </span>
      );
    }
    if (status === "Pending Approval") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-xs md:text-sm font-medium bg-[#FEF6EE] text-[#B54708] border border-[#FECDCA]/50">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F79009]" />
          Pending Approval
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-xs md:text-sm font-medium bg-[#E9E9EA]/50 text-secondary-subheading border border-[#E4E7EC]">
        <span className="w-1.5 h-1.5 rounded-full bg-secondary-subheading" />
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-page-bg pb-14">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#1D1F20] text-white px-4 py-2.5 rounded-md shadow-lg flex items-center gap-2 text-sm animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="space-y-4">

        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => router.push("/customer/estimations")}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl md:text-2xl font-semibold text-primary-heading tracking-tight">
                {data.estimateId}
              </h1>
              {renderStatusBadge(data.status)}
            </div>

            <p className="text-sm sm:text-base text-secondary-subheading">
              Issued on {data.issueDate} • {data.version}
            </p>
          </div>

          {/* Top Right Actions */}
          <div className="flex items-center gap-3">
            {data.status === "Approved" && (
              <button
                type="button"
                onClick={handleDownloadEstimate}
                className="px-4 py-2 text-sm font-medium bg-primary hover:bg-primary-hover text-white rounded-md transition-colors cursor-pointer flex items-center gap-2 shadow-2xs"
              >
                <Download className="w-4 h-4" />
                <span>Download Estimate</span>
              </button>
            )}
          </div>
        </div>

        {/* HALF STACHE NOTE (When With Site Visit & Not Declined) */}
        {data.status !== "Declined" && data.hasSiteVisit && data.halfStacheNote && (
          <div className="bg-note-green-bg border border-note-green-border rounded-lg p-3.5 sm:p-4 space-y-1 shadow-2xs">
            <h3 className="text-base md:text-lg font-bold text-primary-heading tracking-wider uppercase">
              HALF STACHE NOTE
            </h3>
            <p className="text-xs sm:text-sm text-secondary-heading leading-relaxed">
              {data.halfStacheNote}
            </p>
          </div>
        )}

        {/* Main 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Property Overview Card */}
            <EstimatePropertyCard property={data.property} />

            {/* Service Estimate Details Card */}
            <EstimateServiceDetailsCard data={data} />
          </div>

          {/* Right Column (1/3 width) */}
          <div className="space-y-4">
            {/* Request Summary Card */}
            <EstimateRequestSummaryCard summary={data.requestSummary} />

            {/* Site Visit Details Card (if site visit occurred) */}
            {data.hasSiteVisit && data.siteVisit && (
              <EstimateSiteVisitCard siteVisit={data.siteVisit} />
            )}

            {/* Action / Status Card */}
            <EstimateActionCard
              data={data}
              onApprove={() => setIsApproveOpen(true)}
              onRequestRevision={() => setIsRevisionOpen(true)}
              onDecline={() => setIsDeclineOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Action Modals */}
      <ApproveModal
        isOpen={isApproveOpen}
        onClose={() => setIsApproveOpen(false)}
        onConfirm={handleApprove}
        totalAmount={data.financials.total}
      />

      <RevisionModal
        isOpen={isRevisionOpen}
        onClose={() => setIsRevisionOpen(false)}
        onSubmit={handleRevisionSubmit}
        onRescheduleAppointment={handleRescheduleAppointment}
      />

      <DeclineModal
        isOpen={isDeclineOpen}
        onClose={() => setIsDeclineOpen(false)}
        onConfirm={handleDecline}
      />
    </div>
  );
};

export default EstimateDetail;

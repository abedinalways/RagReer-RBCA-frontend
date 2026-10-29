"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  MapPin,
  Briefcase,
  FileText,
  Calendar,
  User,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  AdminEstimateStatus,
  EstimateDetailData,
} from "../types/adminEstimates.types";
import { DEFAULT_ESTIMATE_DETAIL } from "../data/adminEstimateDetailData";
import { ADMIN_ESTIMATES_DATA } from "../data/adminEstimatesData";

interface AdminEstimateDetailViewProps {
  estimateId?: string;
  initialStatus?: AdminEstimateStatus;
  initialHasSiteVisit?: boolean;
}

const STATUS_CONFIG: Record<
  AdminEstimateStatus,
  { pill: string; dot: string; label: string }
> = {
  Draft: {
    pill: "bg-[#F2F4F7] text-[#344054] border-[#D0D5DD]",
    dot: "bg-[#475467]",
    label: "Draft",
  },
  Sent: {
    pill: "bg-[#EFF8FF] text-[#175CD3] border-[#B2DDFF]",
    dot: "bg-[#1570EF]",
    label: "Sent",
  },
  "Under Review": {
    pill: "bg-[#FEF7E6] text-[#B54708] border-[#FEDF89]",
    dot: "bg-[#F79009]",
    label: "Under Review",
  },
  "Change Requested": {
    pill: "bg-[#FFF4ED] text-[#C2410C] border-[#FED7AA]",
    dot: "bg-[#EA580C]",
    label: "Change Requested",
  },
  Approved: {
    pill: "bg-[#ECFDF3] text-[#027A48] border-[#ABEFC6]",
    dot: "bg-[#12B76A]",
    label: "Approved",
  },
  Expired: {
    pill: "bg-[#FEF3F2] text-[#E11D48] border-[#FECDCA]",
    dot: "bg-[#E11D48]",
    label: "Expired",
  },
  Declined: {
    pill: "bg-[#FEF3F2] text-[#D92D20] border-[#FDA29B]",
    dot: "bg-[#D92D20]",
    label: "Declined",
  },
};

export const AdminEstimateDetailView: React.FC<
  AdminEstimateDetailViewProps
> = ({ estimateId, initialStatus, initialHasSiteVisit }) => {
  const router = useRouter();

  // State
  const [data, setData] = useState<EstimateDetailData>(DEFAULT_ESTIMATE_DETAIL);
  const [currentStatus, setCurrentStatus] = useState<AdminEstimateStatus>(
    initialStatus || "Draft"
  );
  const [hasSiteVisit, setHasSiteVisit] = useState<boolean>(
    initialHasSiteVisit !== undefined ? initialHasSiteVisit : false
  );
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  // Hydrate from existing list if ID matches
  useEffect(() => {
    if (estimateId) {
      const match = ADMIN_ESTIMATES_DATA.find(
        (e) =>
          e.id.toLowerCase() === estimateId.toLowerCase() ||
          e.estimateId.replace("#", "").toLowerCase() ===
            estimateId.replace("#", "").toLowerCase()
      );
      if (match) {
        setCurrentStatus(match.status);
        setData((prev) => ({
          ...prev,
          id: match.id,
          estimateId: match.estimateId,
          status: match.status,
          property: {
            ...prev.property,
            address: match.propertyAddress,
          },
          requestSummary: {
            ...prev.requestSummary,
            requestId: match.requestId,
          },
        }));
      }
    }
  }, [estimateId]);

  const statusStyle = STATUS_CONFIG[currentStatus] || STATUS_CONFIG.Draft;

  // Handlers
  const handleSendToCustomer = () => {
    setCurrentStatus("Sent");
    setData((prev) => ({ ...prev, status: "Sent" }));
    toast.success("Estimate successfully sent to the customer!");
  };

  const handleSendReminder = () => {
    toast.success("Reminder notification sent to customer!");
  };

  const handleEditEstimate = () => {
    router.push(
      `/admin/requests/create-estimate?estimateId=${encodeURIComponent(
        data.estimateId
      )}`
    );
  };

  const handleCreateContract = () => {
    router.push(
      `/admin/contracts/create?estimateId=${encodeURIComponent(data.estimateId)}`
    );
  };

  const handleDownload = () => {
    toast.success("Downloading Estimate PDF...");
  };

  const handleResend = () => {
    setCurrentStatus("Sent");
    toast.success("Estimate resent to customer!");
  };

  const handleArchive = () => {
    toast.success("Estimate archived");
  };

  return (
    <div className="w-full space-y-4 md:space-y-5 max-w-[1600px] mx-auto animate-in fade-in duration-200">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-secondary-subheading font-normal">
        <Link
          href="/admin/estimates"
          className="hover:text-primary transition-colors cursor-pointer"
        >
          Estimates
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-secondary-subheading/70" />
        <span className="text-txt-primary font-medium">Details</span>
      </nav>

      {/* 2. Interactive State Switcher for Figma Screen Verification */}
      {/* <div className="flex flex-wrap items-center justify-between gap-2.5 bg-card-bg p-3 rounded-sm border border-border shadow-3xs text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-secondary-subheading font-medium">
            Figma Variant:
          </span>
          <button
            type="button"
            onClick={() => {
              setHasSiteVisit(false);
              setCurrentStatus("Draft");
            }}
            className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer font-medium ${
              !hasSiteVisit && currentStatus === "Draft"
                ? "bg-primary text-white shadow-2xs"
                : "bg-page-bg text-txt-primary hover:bg-page-bg/80"
            }`}
          >
            1. Without Site Visit (Draft)
          </button>
          <button
            type="button"
            onClick={() => {
              setHasSiteVisit(true);
              setCurrentStatus("Draft");
            }}
            className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer font-medium ${
              hasSiteVisit && currentStatus === "Draft"
                ? "bg-primary text-white shadow-2xs"
                : "bg-page-bg text-txt-primary hover:bg-page-bg/80"
            }`}
          >
            2. With Site Visit (Draft)
          </button>
          <button
            type="button"
            onClick={() => {
              setHasSiteVisit(true);
              setCurrentStatus("Sent");
            }}
            className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer font-medium ${
              hasSiteVisit && currentStatus === "Sent"
                ? "bg-primary text-white shadow-2xs"
                : "bg-page-bg text-txt-primary hover:bg-page-bg/80"
            }`}
          >
            3. With Site Visit (Sent)
          </button>
          <button
            type="button"
            onClick={() => {
              setHasSiteVisit(true);
              setCurrentStatus("Under Review");
            }}
            className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer font-medium ${
              hasSiteVisit && currentStatus === "Under Review"
                ? "bg-primary text-white shadow-2xs"
                : "bg-page-bg text-txt-primary hover:bg-page-bg/80"
            }`}
          >
            4. With Site Visit (Under Review)
          </button>
          <button
            type="button"
            onClick={() => {
              setHasSiteVisit(true);
              setCurrentStatus("Change Requested");
            }}
            className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer font-medium ${
              hasSiteVisit && currentStatus === "Change Requested"
                ? "bg-primary text-white shadow-2xs"
                : "bg-page-bg text-txt-primary hover:bg-page-bg/80"
            }`}
          >
            5. With Site Visit (Change Requested)
          </button>
          <button
            type="button"
            onClick={() => {
              setHasSiteVisit(true);
              setCurrentStatus("Approved");
            }}
            className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer font-medium ${
              currentStatus === "Approved"
                ? "bg-primary text-white shadow-2xs"
                : "bg-page-bg text-txt-primary hover:bg-page-bg/80"
            }`}
          >
            6. Approved
          </button>
          <button
            type="button"
            onClick={() => {
              setHasSiteVisit(true);
              setCurrentStatus("Expired");
            }}
            className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer font-medium ${
              currentStatus === "Expired"
                ? "bg-primary text-white shadow-2xs"
                : "bg-page-bg text-txt-primary hover:bg-page-bg/80"
            }`}
          >
            7. Expired
          </button>
          <button
            type="button"
            onClick={() => {
              setHasSiteVisit(true);
              setCurrentStatus("Declined");
            }}
            className={`px-2.5 py-1 rounded-sm transition-colors cursor-pointer font-medium ${
              currentStatus === "Declined"
                ? "bg-primary text-white shadow-2xs"
                : "bg-page-bg text-txt-primary hover:bg-page-bg/80"
            }`}
          >
            8. Declined
          </button>
        </div>
      </div> */}

      {/* 3. Header Row: Title, Badge, Subtitle & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-barlow-condensed font-medium text-xl sm:text-2xl text-primary-heading tracking-tight">
              {data.estimateId}
            </h1>
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs text-xs font-medium border ${statusStyle.pill}`}
            >
              <span className={`w-2 h-2 rounded-full ${statusStyle.dot} shrink-0`} />
              {statusStyle.label}
            </span>
          </div>
          <p className="text-xs text-secondary-subheading font-normal mt-0.5">
            Created on {data.createdDate} • {data.version}
          </p>
        </div>

        {/* Dynamic Action Buttons according to Figma */}
        <div className="flex items-center gap-2.5">
          {currentStatus === "Draft" && (
            <>
              <button
                type="button"
                onClick={handleSendToCustomer}
                className="inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-2xs hover:bg-primary-hover transition-colors cursor-pointer"
              >
                Send to Customer
              </button>
              <button
                type="button"
                onClick={handleEditEstimate}
                className="inline-flex items-center justify-center rounded-sm border border-border bg-card-bg px-4 py-2 text-xs sm:text-sm font-medium text-txt-primary hover:bg-page-bg transition-colors cursor-pointer"
              >
                Edit Estimate
              </button>
            </>
          )}

          {(currentStatus === "Sent" || currentStatus === "Under Review") && (
            <button
              type="button"
              onClick={handleSendReminder}
              className="inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-2xs hover:bg-primary-hover transition-colors cursor-pointer"
            >
              Send Reminder
            </button>
          )}

          {currentStatus === "Change Requested" && (
            <button
              type="button"
              onClick={handleEditEstimate}
              className="inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-2xs hover:bg-primary-hover transition-colors cursor-pointer"
            >
              Edit Estimate
            </button>
          )}

          {currentStatus === "Approved" && (
            <>
              <button
                type="button"
                onClick={handleCreateContract}
                className="inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-2xs hover:bg-primary-hover transition-colors cursor-pointer"
              >
                Create Contract & Agreement
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center justify-center rounded-sm border border-border bg-card-bg px-4 py-2 text-xs sm:text-sm font-medium text-txt-primary hover:bg-page-bg transition-colors cursor-pointer"
              >
                Download
              </button>
            </>
          )}

          {currentStatus === "Expired" && (
            <button
              type="button"
              onClick={handleResend}
              className="inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-2xs hover:bg-primary-hover transition-colors cursor-pointer"
            >
              Resend to Customer
            </button>
          )}

          {currentStatus === "Declined" && (
            <button
              type="button"
              onClick={handleArchive}
              className="inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-2xs hover:bg-primary-hover transition-colors cursor-pointer"
            >
              Archive
            </button>
          )}
        </div>
      </div>

      {/* 4. Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (8 cols on desktop) */}
        <div className="lg:col-span-8 space-y-4 md:space-y-5">
          {/* A. Customer Change Request Card (ONLY for 'Change Requested') */}
          {currentStatus === "Change Requested" && data.changeRequest && (
            <div className="rounded-sm border border-border bg-card-bg p-4 sm:p-5 space-y-3.5 shadow-2xs">
              <h3 className="font-barlow-condensed font-medium text-base sm:text-lg text-primary leading-none">
                Customer Change Request
              </h3>

              <div className="space-y-1">
                <span className="text-xs text-secondary-subheading font-normal">
                  Customer Wants to Change
                </span>
                <p className="text-xs sm:text-sm font-medium text-txt-primary">
                  {data.changeRequest.changeTarget}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-secondary-subheading font-normal">
                  Reason
                </span>
                <p className="text-xs sm:text-sm font-normal text-txt-primary leading-relaxed">
                  {data.changeRequest.reason}
                </p>
              </div>

              {data.changeRequest.attachedPhotos &&
                data.changeRequest.attachedPhotos.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-xs text-secondary-subheading font-normal">
                      Attached Photos
                    </span>
                    <div className="flex items-center gap-2.5 flex-wrap pt-0.5">
                      {data.changeRequest.attachedPhotos.map((photo, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setPreviewPhoto(photo)}
                          className="h-12 w-12 rounded-sm overflow-hidden border border-border hover:border-primary transition-colors cursor-pointer"
                        >
                          <img
                            src={photo}
                            alt={`Attached ${i + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={handleEditEstimate}
                  className="rounded-sm bg-primary px-4 py-1.5 text-xs font-medium text-white hover:bg-primary-hover shadow-2xs transition-colors cursor-pointer"
                >
                  Edit Estimate
                </button>
              </div>
            </div>
          )}

          {/* B. Property Header Card */}
          <div className="rounded-sm border border-border bg-card-bg p-4 flex flex-col sm:flex-row sm:items-center gap-4 shadow-2xs">
            <div className="w-full sm:w-28 h-20 rounded-sm overflow-hidden bg-page-bg shrink-0 border border-border">
              <img
                src={data.property.imageUrl}
                alt={data.property.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <span className="inline-flex items-center text-[11px] font-normal px-2 py-0.5 rounded-sm bg-blue-50 text-primary">
                {data.property.category}
              </span>
              <h2 className="font-barlow-condensed font-medium text-base sm:text-lg text-primary-heading truncate leading-tight">
                {data.property.name}
              </h2>
              <p className="text-xs text-secondary-subheading font-normal flex items-center gap-1.5 truncate">
                <MapPin className="h-3 w-3 text-secondary-subheading shrink-0" />
                <span>{data.property.address}</span>
              </p>
              <p className="text-xs text-primary font-normal">
                {data.property.size}
              </p>
            </div>
          </div>

          {/* C. Service Estimate Details Main Card */}
          <div className="rounded-sm border border-border bg-card-bg p-4 sm:p-5 space-y-5 shadow-2xs">
            {/* Header */}
            <div>
              <h2 className="font-barlow-condensed font-medium text-base sm:text-lg text-primary-heading leading-tight">
                Service Estimate Details
              </h2>
              <p className="text-xs text-secondary-subheading font-normal mt-0.5">
                Proposed work and pricing
              </p>
            </div>

            <hr className="border-border-subtle" />

            {/* Scope of Work */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-primary-heading">
                <Briefcase className="h-4 w-4 text-secondary-subheading" />
                <span>Scope of Work</span>
              </div>
              <p className="text-xs text-secondary-subheading font-normal leading-relaxed pl-6">
                {data.scopeOfWork}
              </p>
            </div>

            {/* Service Details with 2 Side-by-Side Boxes */}
            <div className="space-y-3">
              <h3 className="text-xs sm:text-sm font-medium text-primary-heading">
                Service Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Lawn Care */}
                <div className="rounded-sm border border-border bg-card-bg p-3.5 space-y-2">
                  <h4 className="text-xs font-medium text-primary">
                    Lawn Care
                  </h4>
                  <p className="text-xs text-secondary-subheading font-medium">
                    Work Included:
                  </p>
                  <ul className="text-xs text-secondary-subheading font-normal space-y-1">
                    {data.serviceDetails.lawnCare.map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-[10px] text-secondary-subheading">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Additional Services */}
                <div className="rounded-sm border border-border bg-card-bg p-3.5 space-y-2">
                  <h4 className="text-xs font-medium text-primary">
                    Additional Services
                  </h4>
                  <p className="text-xs text-secondary-subheading font-medium">
                    Work Included:
                  </p>
                  <ul className="text-xs text-secondary-subheading font-normal space-y-1">
                    {data.serviceDetails.additionalServices.map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-[10px] text-secondary-subheading">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Estimate Duration */}
            <div className="text-xs">
              <span className="font-medium text-primary-heading">
                Estimate Duration:{" "}
              </span>
              <span className="font-normal text-secondary-subheading">
                {data.estimateDuration}
              </span>
            </div>

            {/* Site Assessment & Required Adjustments (ONLY when hasSiteVisit is true) */}
            {hasSiteVisit && data.siteAssessmentNotes && (
              <div className="space-y-1.5 pt-1">
                <h3 className="text-xs sm:text-sm font-medium text-primary-heading">
                  Site Assessment & Required Adjustments
                </h3>
                <p className="text-xs text-secondary-subheading font-normal leading-relaxed">
                  {data.siteAssessmentNotes}
                </p>
              </div>
            )}

            {/* Line Items Table */}
            <div className="space-y-3 pt-1">
              <h3 className="text-xs sm:text-sm font-medium text-primary-heading">
                Line Items
              </h3>
              <div className="rounded-sm border border-border overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-page-bg/60 border-b border-border text-secondary-subheading font-normal">
                    <tr>
                      <th className="py-2.5 px-3">Description</th>
                      <th className="py-2.5 px-3">Quantity</th>
                      <th className="py-2.5 px-3">Rate</th>
                      <th className="py-2.5 px-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle bg-card-bg font-normal">
                    {data.lineItems.map((item) => (
                      <tr key={item.id} className="hover:bg-page-bg/30">
                        <td className="py-2.5 px-3 text-primary hover:underline cursor-pointer">
                          {item.description}
                        </td>
                        <td className="py-2.5 px-3 text-txt-primary">
                          {item.quantity}
                        </td>
                        <td className="py-2.5 px-3 text-txt-primary">
                          {item.rate}
                        </td>
                        <td className="py-2.5 px-3 font-medium text-txt-primary">
                          {item.amount}
                        </td>
                      </tr>
                    ))}

                    {/* Site Assessment Line Items Section (ONLY when hasSiteVisit is true) */}
                    {hasSiteVisit &&
                      data.siteAssessmentLineItems &&
                      data.siteAssessmentLineItems.length > 0 && (
                        <>
                          <tr className="bg-page-bg/50 border-y border-border">
                            <td
                              colSpan={4}
                              className="py-2 px-3 text-xs font-medium text-primary-heading"
                            >
                              Required Services after Site Assessment
                            </td>
                          </tr>
                          {data.siteAssessmentLineItems.map((item) => (
                            <tr key={item.id} className="hover:bg-page-bg/30">
                              <td className="py-2.5 px-3 text-primary hover:underline cursor-pointer">
                                {item.description}
                              </td>
                              <td className="py-2.5 px-3 text-txt-primary">
                                {item.quantity}
                              </td>
                              <td className="py-2.5 px-3 text-txt-primary">
                                {item.rate}
                              </td>
                              <td className="py-2.5 px-3 font-medium text-txt-primary">
                                {item.amount}
                              </td>
                            </tr>
                          ))}
                        </>
                      )}
                  </tbody>
                </table>
              </div>

              {/* Totals Breakdown */}
              <div className="pt-2 space-y-2">
                <div className="w-52 rounded-sm border border-border p-3 space-y-1.5 text-xs">
                  <div className="flex justify-between text-secondary-subheading font-normal">
                    <span>Subtotal</span>
                    <span className="text-txt-primary">
                      {data.financialSummary.subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between text-secondary-subheading font-normal">
                    <span>Discount</span>
                    <span className="text-txt-primary">
                      {data.financialSummary.discount}
                    </span>
                  </div>
                  <div className="flex justify-between text-secondary-subheading font-normal">
                    <span>Tax</span>
                    <span className="text-txt-primary">
                      {data.financialSummary.tax}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-border font-medium text-txt-primary">
                    <span>Total</span>
                    <span className="text-primary">
                      {data.financialSummary.total}
                    </span>
                  </div>
                </div>

                <div className="text-xs space-y-0.5 pt-1">
                  <div className="flex items-center gap-6">
                    <span className="font-normal text-txt-primary w-28">
                      Prior Payment
                    </span>
                    <span className="text-primary font-normal">
                      {data.financialSummary.priorPayment}
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-normal text-txt-primary w-28">
                      Remaining Balance
                    </span>
                    <span className="text-primary font-normal">
                      {data.financialSummary.remainingBalance}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-border-subtle" />

            {/* Terms & Conditions */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-primary-heading">
                <FileText className="h-4 w-4 text-secondary-subheading" />
                <span>Terms & Conditions</span>
              </div>
              <p className="text-xs text-secondary-subheading font-normal leading-relaxed pl-6">
                {data.termsAndConditions}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols on desktop) */}
        <div className="lg:col-span-4 space-y-4 md:space-y-5">
          {/* Card 1: Request Summary */}
          <div className="rounded-sm border border-border bg-card-bg p-4 sm:p-5 space-y-3.5 shadow-2xs">
            <div>
              <h3 className="font-barlow-condensed font-medium text-base text-primary-heading leading-tight">
                Request Summary
              </h3>
              <p className="text-xs text-secondary-subheading font-normal mt-0.5">
                Reference for this estimate
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-secondary-subheading font-normal">
                  Request ID
                </span>
                <Link
                  href="/admin/requests"
                  className="text-primary hover:underline font-medium"
                >
                  {data.requestSummary.requestId}
                </Link>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-secondary-subheading font-normal">
                  Created On
                </span>
                <span className="text-primary font-normal">
                  {data.requestSummary.createdOn}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-secondary-subheading font-normal">
                  Requested Service
                </span>
                <span className="text-primary font-normal text-right">
                  {data.requestSummary.requestedService}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-secondary-subheading font-normal">
                  Request Type
                </span>
                <span className="text-primary font-normal">
                  {data.requestSummary.requestType}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-secondary-subheading font-normal">
                  Frequency
                </span>
                <span className="text-primary font-normal">
                  {data.requestSummary.frequency}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-border-subtle">
              <Link
                href="/admin/requests"
                className="flex-1 py-2 rounded-sm border border-border bg-card-bg text-center text-xs font-medium text-txt-primary hover:bg-page-bg transition-colors cursor-pointer"
              >
                View Request
              </Link>
              <Link
                href="/admin/customers"
                className="flex-1 py-2 rounded-sm border border-border bg-card-bg text-center text-xs font-medium text-txt-primary hover:bg-page-bg transition-colors cursor-pointer"
              >
                View Customer
              </Link>
            </div>
          </div>

          {/* Card 2: Estimate Summary (for Approved, Expired, Declined) OR Validity Period & Site Visit */}
          {["Approved", "Expired", "Declined"].includes(currentStatus) ? (
            <div className="rounded-sm border border-border bg-card-bg p-4 sm:p-5 space-y-3.5 shadow-2xs">
              <h3 className="font-barlow-condensed font-medium text-base text-primary-heading leading-tight">
                Estimate Summary
              </h3>

              <div className="space-y-2.5 text-xs">
                {currentStatus === "Approved" && (
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-subheading font-normal">
                      Approved On
                    </span>
                    <span className="text-primary font-normal">
                      {data.approvedOn || "Aug 16, 2026, 02:00 PM"}
                    </span>
                  </div>
                )}

                {currentStatus === "Expired" && (
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-subheading font-normal">
                      Expired On
                    </span>
                    <span className="text-primary font-normal">
                      {data.expiredOn || "Aug 16, 2026, 02:00 PM"}
                    </span>
                  </div>
                )}

                {currentStatus === "Declined" && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-secondary-subheading font-normal">
                        Declined On
                      </span>
                      <span className="text-primary font-normal">
                        {data.declinedOn || "Aug 16, 2026, 02:00 PM"}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <span className="text-secondary-subheading font-normal">
                        Reason
                      </span>
                      <span className="text-primary font-normal text-right">
                        {data.declineReason || "Price is hire than expected."}
                      </span>
                    </div>
                  </>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-secondary-subheading font-normal">
                    Site Visit
                  </span>
                  <span className="text-primary font-normal">
                    {data.siteVisitStatusText || "Not Required/ Completed"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-secondary-subheading font-normal">
                    Site Visit Completed On
                  </span>
                  <span className="text-primary font-normal">
                    {data.siteVisitCompletedOnText || "— / Aug 16, 2026, 02:00 PM"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Site Visit Details Card (ONLY when hasSiteVisit is true) */}
              {hasSiteVisit && data.siteVisit && (
                <div className="rounded-sm border border-border bg-card-bg p-4 sm:p-5 space-y-3.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-barlow-condensed font-medium text-base text-primary-heading leading-tight">
                      Site Visit Details
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-normal bg-badge-active-bg text-badge-active-text border border-badge-active-border">
                      <span className="w-1.5 h-1.5 rounded-full bg-badge-active-dot" />
                      Completed
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs text-secondary-subheading font-normal">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="text-primary font-medium block">
                          Property
                        </span>
                        <span className="text-secondary-subheading">
                          {data.siteVisit.property}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Calendar className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="text-primary font-medium block">
                          Date & Time
                        </span>
                        <span className="text-secondary-subheading">
                          {data.siteVisit.dateTime}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <User className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="text-primary font-medium block">
                          Visited By
                        </span>
                        <span className="text-secondary-subheading">
                          {data.siteVisit.visitedBy}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Card 3: Validity Period Card */}
              <div className="rounded-sm border border-border bg-card-bg p-4 sm:p-5 space-y-3.5 shadow-2xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-barlow-condensed font-medium text-base text-primary-heading">
                    Validity Period
                  </span>
                  <span className="text-secondary-subheading font-normal">
                    {data.validityPeriod.till}
                  </span>
                </div>

                {/* Big Blue Banner */}
                <div className="rounded-sm p-4 bg-[#A3BFDB] text-center space-y-0.5">
                  <span className="text-xs text-white/90 font-normal block">
                    Total
                  </span>
                  <span className="text-2xl font-medium text-white tracking-tight block">
                    {data.validityPeriod.total}
                  </span>
                </div>

                <p className="text-[11px] text-secondary-subheading font-normal leading-relaxed">
                  A contracts & agreements will be sent for your signature after
                  accepting this estimate.
                </p>
              </div>

              {/* Card 4: HALF STACHE NOTE (ONLY when hasSiteVisit is true) */}
              {hasSiteVisit && data.halfStacheNote && (
                <div className="rounded-sm border border-[#ABEFC6] bg-[#ECFDF3]/40 p-4 space-y-1.5 shadow-2xs">
                  <h4 className="text-xs font-medium text-[#1D1F20] tracking-wide uppercase">
                    HALF STACHE NOTE
                  </h4>
                  <p className="text-xs text-secondary-subheading font-normal leading-relaxed">
                    {data.halfStacheNote}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      {previewPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
          onClick={() => setPreviewPhoto(null)}
        >
          <div
            className="relative max-w-2xl max-h-[85vh] rounded-sm overflow-hidden bg-card-bg border border-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewPhoto(null)}
              className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={previewPhoto}
              alt="Photo preview"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEstimateDetailView;

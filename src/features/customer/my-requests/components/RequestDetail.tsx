"use client";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Clock,
  FileText,
  MapPin,
  User,
  X,
} from "lucide-react";

import { getRequestDetailData } from "../data/requestDetailData";
import { requestStatusStyles } from "../data/myRequestsData";
import type {
  RequestDetailData,
  RequestStatus,
} from "../types/requestDetailTypes";

interface RequestDetailProps {
  requestId?: string;
}

export const RequestDetail: React.FC<RequestDetailProps> = ({
  requestId: propRequestId,
}) => {
  const router = useRouter();
  const params = useParams();
  const activeId = propRequestId || (params?.id as string) || "req-1048";

  const [showOriginalVersion, setShowOriginalVersion] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isChangeDateModalOpen, setIsChangeDateModalOpen] = useState(false);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<number>(11);
  const [startTime, setStartTime] = useState("02:00");
  const [endTime, setEndTime] = useState("03:00");
  const [rescheduleReason, setRescheduleReason] = useState(
    "I'm not available. Change the date."
  );

  const requestData: RequestDetailData = getRequestDetailData(
    activeId,
    showOriginalVersion
  );

  const renderStatusBadge = (status: RequestStatus) => {
    const style = requestStatusStyles[status];
    if (style) {
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs sm:text-sm font-medium ${style.badgeBg} ${style.badgeText} border ${style.badgeBorder}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${style.dotBg}`} />
          {style.label}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs sm:text-sm font-medium bg-[#E9E9EA]/50 text-secondary-subheading border border-[#E4E7EC]">
        <span className="w-1.5 h-1.5 rounded-full bg-secondary-subheading" />
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-page-bg pb-12">
      <div className="space-y-4">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-semibold text-primary-heading tracking-tight">
                {requestData.title}
              </h1>
              {renderStatusBadge(requestData.status)}
            </div>
            {!requestData.hideHeaderMeta && requestData.createdOn && requestData.version && (
              <p className="text-sm text-secondary-subheading">
                Created on {requestData.createdOn} • {requestData.version}
              </p>
            )}
          </div>

          {/* Action Buttons Top Right */}
          <div className="flex items-center gap-3">
            {requestData.status === "Draft" && (
              <>
                <button
                  type="button"
                  className="px-5 h-10 text-sm font-medium bg-primary hover:bg-primary-hover text-primary-text rounded-md transition-colors cursor-pointer flex items-center justify-center"
                >
                  Submit Request Now
                </button>
                <button
                  type="button"
                  className="px-5 h-10 text-sm font-medium border border-border-input hover:border-primary/60 bg-card-bg text-secondary-subheading hover:text-txt-primary rounded-md transition-colors cursor-pointer flex items-center justify-center"
                >
                  Edit Draft
                </button>
              </>
            )}

            {requestData.status === "Request Submitted" && !requestData.isOriginalView && (
              <button
                type="button"
                className="px-5 h-10 text-sm font-medium border border-border-input hover:border-primary/60 bg-card-bg text-secondary-subheading hover:text-txt-primary rounded-md transition-colors cursor-pointer flex items-center justify-center"
              >
                Edit Request
              </button>
            )}

            {requestData.status === "Request Submitted" && requestData.isOriginalView && (
              <button
                type="button"
                onClick={() => setShowOriginalVersion(false)}
                className="px-5 h-10 text-sm font-medium bg-primary hover:bg-primary-hover text-primary-text rounded-md transition-colors cursor-pointer flex items-center justify-center"
              >
                View Updated Request
              </button>
            )}
          </div>
        </div>

        {/* Top Notice Banner: e.g. Site Visit Required HALF STACHE NOTE */}
        {requestData.topBannerNote && (
          <div className="bg-[#FEF6EE] border border-[#F9DBAF] rounded-lg p-4 space-y-1 shadow-2xs">
            <h3 className="text-xs font-bold text-primary-heading tracking-wide uppercase">
              HALF STACHE NOTE
            </h3>
            <p className="text-xs sm:text-sm text-secondary-subheading leading-relaxed">
              {requestData.topBannerNote}
            </p>
          </div>
        )}

        {/* Main Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Customer Update Banner (Shown on Version 2 when present) */}
            {requestData.customerUpdate && !requestData.isOriginalView && (
              <div className="bg-card-bg rounded-lg p-4 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div>
                  <h3 className="text-sm font-semibold text-primary-heading">
                    Customer Update
                  </h3>
                  <p className="mt-1 text-sm text-secondary-subheading">
                    <span className="font-medium text-primary mr-2">
                      {requestData.customerUpdate.date}
                    </span>
                    <span>{requestData.customerUpdate.message}</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowOriginalVersion(true)}
                  className="px-4 h-9 text-xs sm:text-sm font-medium bg-primary hover:bg-primary-hover text-primary-text rounded-md transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
                >
                  View Original Request
                </button>
              </div>
            )}

            {/* Site Visit Scheduled Card */}
            {requestData.siteVisit && (
              <div className="bg-card-bg rounded-lg border border-border p-4 sm:p-5 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    {/* Date Box */}
                    <div className="w-16 h-16 rounded-md bg-[#F2F4F7] border border-[#EAECF0] flex flex-col items-center justify-center text-center shrink-0">
                      <span className="text-[10px] text-secondary-subheading leading-none font-medium">
                        {requestData.siteVisit.month}
                      </span>
                      <span className="text-lg font-bold text-txt-primary leading-tight">
                        {requestData.siteVisit.day}
                      </span>
                      <span className="text-[10px] text-secondary-subheading leading-none font-medium">
                        {requestData.siteVisit.dayOfWeek}
                      </span>
                    </div>

                    {/* Site Visit Info */}
                    <div className="space-y-0.5">
                      <h3 className="text-sm sm:text-base font-semibold text-primary">
                        {requestData.siteVisit.status}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-txt-primary">
                        {requestData.siteVisit.propertyTitle}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-secondary-subheading">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span>{requestData.siteVisit.address}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          <span>{requestData.siteVisit.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions: only when not confirmed */}
                  {!requestData.siteVisit.isConfirmed && (
                    <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-center">
                      <button
                        type="button"
                        className="px-4 h-9 bg-primary hover:bg-primary-hover text-white rounded text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                      >
                        Confirm Site Visit
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsChangeDateModalOpen(true)}
                        className="px-4 h-9 border border-[#5980A6]/40 hover:border-primary text-[#5980A6] hover:bg-[#5980A6]/5 rounded text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                      >
                        Change Request
                      </button>
                    </div>
                  )}
                </div>

                {/* Bottom row: Crew assigned & Availability radio OR Customer will be visiting checkbox */}
                <div className="border-t border-border-subtle pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={
                        requestData.siteVisit.crewAvatar ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      }
                      alt={requestData.siteVisit.crewName}
                      className="w-7 h-7 rounded-full object-cover border border-border"
                    />
                    <div>
                      <span className="block text-[10px] text-secondary-subheading leading-none">
                        Crew Assigned
                      </span>
                      <span className="text-xs font-semibold text-txt-primary">
                        {requestData.siteVisit.crewName}
                      </span>
                    </div>
                  </div>

                  {requestData.siteVisit.isConfirmed ||
                  requestData.siteVisit.customerWillBeVisiting ? (
                    <div className="flex items-center gap-2 text-txt-primary font-medium">
                      <div className="w-4 h-4 rounded-[3px] border border-primary bg-white flex items-center justify-center text-primary shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-xs text-txt-primary font-medium">
                        Customer will be on visiting site
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-secondary-subheading font-medium">
                      <span>Are you available on visiting site?</span>
                      <label className="inline-flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name="site-availability"
                          className="accent-primary"
                          defaultChecked
                        />
                        <span>Yes</span>
                      </label>
                      <label className="inline-flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name="site-availability"
                          className="accent-primary"
                        />
                        <span>No</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Request Summary Card */}
            <div className="bg-card-bg rounded-lg border border-border p-5 sm:p-6 space-y-5 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-border-subtle pb-3">
                <FileText className="w-5 h-5 text-primary-heading stroke-[1.8]" />
                <h2 className="text-lg font-medium text-primary-heading">
                  Request Summary
                </h2>
              </div>

              {/* 6 Grid Fields */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-4">
                <div>
                  <span className="block text-xs text-secondary-subheading mb-0.5">
                    Request ID
                  </span>
                  <span className="block text-sm font-semibold text-primary-heading">
                    {requestData.displayId}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-secondary-subheading mb-0.5">
                    Created On
                  </span>
                  <span className="block text-sm font-semibold text-primary-heading">
                    {requestData.createdOn}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-secondary-subheading mb-0.5">
                    Request Type
                  </span>
                  <span className="block text-sm font-semibold text-primary-heading">
                    {requestData.requestType}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-secondary-subheading mb-0.5">
                    Requested Date & Time
                  </span>
                  <span className="block text-sm font-semibold text-primary-heading">
                    {requestData.requestedDateTime}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-secondary-subheading mb-0.5">
                    Optional Date & Time
                  </span>
                  <span className="block text-sm font-semibold text-primary-heading">
                    {requestData.optionalDateTime}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-secondary-subheading mb-0.5">
                    No. of Requested Services
                  </span>
                  <span className="block text-sm font-semibold text-primary-heading">
                    {requestData.serviceCount}
                  </span>
                </div>
              </div>

              <div className="border-t border-border-subtle pt-4 space-y-1.5">
                <h3 className="text-sm font-semibold text-primary-heading">
                  Description
                </h3>
                <p className="text-sm text-secondary-subheading leading-relaxed">
                  {requestData.description}
                </p>
              </div>

              {/* Service Details */}
              <div className="space-y-2.5">
                <h3 className="text-sm font-semibold text-primary-heading">
                  Service Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {requestData.serviceGroups.map((group, idx) => (
                    <div
                      key={idx}
                      className="bg-card-bg border border-border rounded-md p-4"
                    >
                      <h4 className="text-sm font-medium text-primary mb-2.5">
                        {group.category}
                      </h4>
                      <ul className="space-y-2">
                        {group.items.map((item, i) => (
                          <li
                            key={i}
                            className="text-sm text-secondary-subheading flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary-subheading shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Site Access Notes */}
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold text-primary-heading">
                  Site Access Notes
                </h3>
                <p className="text-sm text-secondary-subheading leading-relaxed">
                  {requestData.siteAccessNotes}
                </p>
              </div>

              {/* Attached Photos */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-primary-heading">
                  Attached Photos
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {requestData.attachedPhotos.map((photo, i) => (
                    <div
                      key={i}
                      className="w-14 h-11 sm:w-16 sm:h-12 rounded-md overflow-hidden border border-border"
                    >
                      <img
                        src={photo}
                        alt={`Attached ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* HALF STACHE NOTE (Conditional: shown when note is provided) */}
              {requestData.halfStacheNote && (
                <div className="pt-4 border-t border-border-subtle space-y-1">
                  <h3 className="text-xs font-bold text-primary-heading tracking-wide uppercase">
                    HALF STACHE NOTE
                  </h3>
                  <p className="text-sm text-secondary-subheading leading-relaxed">
                    {requestData.halfStacheNote}
                  </p>
                </div>
              )}
            </div>

            {/* Action Cards: Service Estimate, Contracts, Additional Work, Service Payment */}
            {(() => {
              const renderEstimateCard = (
                estimate: NonNullable<RequestDetailData["estimate"]>
              ) => (
                <div
                  key="estimate"
                  className="bg-card-bg rounded-lg border border-border p-5 text-txt-primary space-y-3 shadow-2xs"
                >
                  <h2 className="text-base sm:text-lg font-medium text-primary-heading">
                    Service Estimate
                  </h2>
                  <div className="p-4 bg-card-bg border border-border rounded-md space-y-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          estimate.statusDotColor === "green"
                            ? "bg-[#12B76A]"
                            : estimate.statusDotColor === "red"
                            ? "bg-[#E53935]"
                            : estimate.statusDotColor === "amber"
                            ? "bg-[#F5B517]"
                            : "bg-secondary-subheading"
                        }`}
                      />
                      <span
                        className={`text-xs font-semibold ${
                          estimate.statusTextColor === "green"
                            ? "text-[#12B76A]"
                            : estimate.statusTextColor === "red"
                            ? "text-[#E53935]"
                            : estimate.statusTextColor === "amber"
                            ? "text-[#F5B517]"
                            : "text-secondary-subheading"
                        }`}
                      >
                        {estimate.status}
                      </span>
                    </div>

                    <div>
                      <span className="block text-xs text-secondary-subheading">
                        Total estimate amount
                      </span>
                      <span className="text-lg font-semibold text-primary">
                        {estimate.totalAmount}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="mt-2 w-full py-2 px-3 text-xs sm:text-sm font-medium border border-[#5980A6]/40 hover:border-primary text-[#5980A6] hover:bg-[#5980A6]/5 rounded transition-colors cursor-pointer"
                    >
                      {estimate.buttonLabel || "View Estimate Details"}
                    </button>
                  </div>
                </div>
              );

              const renderContractCard = (
                contract: NonNullable<RequestDetailData["contract"]>
              ) => (
                <div
                  key="contract"
                  className="bg-card-bg rounded-lg border border-border p-5 text-txt-primary space-y-3 shadow-2xs"
                >
                  <h2 className="text-base sm:text-lg font-medium text-primary-heading">
                    Service Contracts & Agreements
                  </h2>
                  <div className="p-4 bg-card-bg border border-border rounded-md space-y-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          contract.statusDotColor === "green"
                            ? "bg-[#12B76A]"
                            : contract.statusDotColor === "red"
                            ? "bg-[#E53935]"
                            : contract.statusDotColor === "amber"
                            ? "bg-[#F5B517]"
                            : "bg-secondary-subheading"
                        }`}
                      />
                      <span
                        className={`text-xs font-semibold ${
                          contract.statusTextColor === "green"
                            ? "text-[#12B76A]"
                            : contract.statusTextColor === "red"
                            ? "text-[#E53935]"
                            : contract.statusTextColor === "amber"
                            ? "text-[#F5B517]"
                            : "text-secondary-subheading"
                        }`}
                      >
                        {contract.status}
                      </span>
                    </div>

                    <div>
                      <span className="block text-xs text-secondary-subheading">
                        Contracts & Agreements Period
                      </span>
                      <span className="text-base sm:text-lg font-semibold text-primary">
                        {contract.period}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="mt-2 w-full py-2 px-3 text-xs sm:text-sm font-medium border border-[#5980A6]/40 hover:border-primary text-[#5980A6] hover:bg-[#5980A6]/5 rounded transition-colors cursor-pointer"
                    >
                      {contract.buttonLabel || "View Contract Details"}
                    </button>
                  </div>
                </div>
              );

              const renderAdditionalWorkCard = (
                additionalWork: NonNullable<RequestDetailData["additionalWork"]>,
                isServiceRequired = false
              ) => (
                <div
                  key="additionalWork"
                  className="bg-card-bg rounded-lg border border-border p-5 text-txt-primary space-y-3 shadow-2xs"
                >
                  <h2 className="text-base sm:text-lg font-medium text-primary-heading">
                    {isServiceRequired
                      ? "Service Required"
                      : "Additional Work Proposed"}
                  </h2>
                  <div className="p-4 bg-card-bg border border-border rounded-md space-y-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          additionalWork.statusDotColor === "green"
                            ? "bg-[#12B76A]"
                            : additionalWork.statusDotColor === "red"
                            ? "bg-[#E53935]"
                            : additionalWork.statusDotColor === "amber"
                            ? "bg-[#F5B517]"
                            : "bg-secondary-subheading"
                        }`}
                      />
                      <span
                        className={`text-xs font-semibold ${
                          additionalWork.statusTextColor === "green"
                            ? "text-[#12B76A]"
                            : additionalWork.statusTextColor === "red"
                            ? "text-[#E53935]"
                            : additionalWork.statusTextColor === "amber"
                            ? "text-[#F5B517]"
                            : "text-secondary-subheading"
                        }`}
                      >
                        {additionalWork.status}
                      </span>
                    </div>

                    <div>
                      <span className="block text-xs text-secondary-subheading">
                        {additionalWork.serviceName}
                      </span>
                      <span className="text-lg font-semibold text-primary">
                        {additionalWork.amount}
                      </span>
                    </div>

                    <button
                      type="button"
                      className={`mt-2 w-full py-2 px-3 text-xs sm:text-sm font-medium rounded transition-colors cursor-pointer ${
                        additionalWork.isPrimaryButton
                          ? "bg-[#5980A6] hover:bg-primary-hover text-white"
                          : "border border-[#5980A6]/40 hover:border-primary text-[#5980A6] hover:bg-[#5980A6]/5"
                      }`}
                    >
                      {additionalWork.buttonLabel || "View Details & Approve"}
                    </button>
                  </div>
                </div>
              );

              const renderPaymentCard = (
                payment: NonNullable<RequestDetailData["payment"]>
              ) => (
                <div
                  key="payment"
                  className="bg-card-bg rounded-lg border border-border p-5 text-txt-primary space-y-3 shadow-2xs"
                >
                  <h2 className="text-base sm:text-lg font-medium text-primary-heading">
                    Service Payment
                  </h2>
                  <div className="p-4 bg-card-bg border border-border rounded-md space-y-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          payment.statusDotColor === "green"
                            ? "bg-[#12B76A]"
                            : payment.statusDotColor === "red"
                            ? "bg-[#E53935]"
                            : payment.statusDotColor === "amber"
                            ? "bg-[#F5B517]"
                            : "bg-secondary-subheading"
                        }`}
                      />
                      <span
                        className={`text-xs font-semibold ${
                          payment.statusTextColor === "green"
                            ? "text-[#12B76A]"
                            : payment.statusTextColor === "red"
                            ? "text-[#E53935]"
                            : payment.statusTextColor === "amber"
                            ? "text-[#F5B517]"
                            : "text-secondary-subheading"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </div>

                    <div>
                      <span className="block text-xs text-secondary-subheading">
                        {payment.billingCycle}
                      </span>
                      <span className="text-lg font-semibold text-primary">
                        {payment.amount}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="mt-2 w-full py-2 px-3 text-xs sm:text-sm font-medium border border-[#5980A6]/40 hover:border-primary text-[#5980A6] hover:bg-[#5980A6]/5 rounded transition-colors cursor-pointer"
                    >
                      {payment.buttonLabel || "View Invoice & Pay"}
                    </button>
                  </div>
                </div>
              );

              // If originalServiceHeading is set (On Hold status from Figma screenshot 1 & 2)
              if (requestData.originalServiceHeading) {
                return (
                  <div className="space-y-6">
                    {/* Original Service Details */}
                    <div className="space-y-3">
                      <h2 className="text-base font-semibold text-primary-heading">
                        Original Service Details
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {requestData.estimate &&
                          renderEstimateCard(requestData.estimate)}
                        {requestData.contract &&
                          renderContractCard(requestData.contract)}
                      </div>
                    </div>

                    {/* Additional Work Proposed - Approval Needed */}
                    {requestData.additionalWork && (
                      <div className="space-y-3">
                        <h2 className="text-base font-semibold text-primary-heading">
                          {requestData.additionalWorkHeading ||
                            "Additional Work Proposed - Approval Needed"}
                        </h2>
                        <div className="max-w-xs">
                          {renderAdditionalWorkCard(
                            requestData.additionalWork,
                            true
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const actionCards = [
                requestData.estimate && renderEstimateCard(requestData.estimate),
                requestData.contract && renderContractCard(requestData.contract),
                requestData.additionalWork &&
                  renderAdditionalWorkCard(requestData.additionalWork),
                requestData.payment && renderPaymentCard(requestData.payment),
              ].filter(Boolean);

              if (actionCards.length === 0) return null;

              return (
                <div
                  className={`grid gap-4 ${
                    actionCards.length === 1
                      ? "grid-cols-1 max-w-xs"
                      : actionCards.length === 2
                      ? "grid-cols-1 sm:grid-cols-2"
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {actionCards}
                </div>
              );
            })()}

            {/* Activity History Card */}
            <div className="bg-card-bg rounded-lg border border-border p-5 sm:p-6 space-y-4 shadow-2xs">
              <h2 className="text-lg font-medium text-primary-heading">
                Activity History
              </h2>

              <div className="space-y-4 divide-y divide-border-subtle">
                {requestData.activityHistory.map((item) => (
                  <div
                    key={item.id}
                    className="pt-3.5 first:pt-0 flex items-start justify-between gap-4 text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            item.dotColor === "green"
                              ? "bg-[#12B76A]"
                              : item.dotColor === "red"
                              ? "bg-[#E53935]"
                              : item.dotColor === "amber"
                              ? "bg-[#F5B517]"
                              : "bg-secondary-subheading/60"
                          }`}
                        />
                        <h4 className="text-sm font-medium text-txt-primary">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-secondary-subheading pl-4 text-xs">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-secondary-subheading whitespace-nowrap text-xs">
                      {item.timeAgo}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Property & Scheduling Cards */}
          <div className="space-y-4">
            {/* Property Sidebar Card */}
            <div className="bg-card-bg rounded-lg border border-border overflow-hidden shadow-2xs">
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={requestData.property.imageUrl}
                  alt={requestData.property.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 space-y-4">
                <div className="space-y-1.5">
                  <span className="inline-block px-2 py-0.5 text-xs font-medium bg-blue-50 text-primary rounded">
                    {requestData.property.tag}
                  </span>
                  <h3 className="text-base font-semibold text-primary-heading">
                    {requestData.property.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm text-secondary-subheading">
                    <MapPin className="w-3.5 h-3.5 text-secondary-subheading shrink-0" />
                    <span>{requestData.property.address}</span>
                  </div>
                </div>

                <div className="space-y-1 border-t border-border-subtle pt-3">
                  <h4 className="text-sm font-semibold text-primary-heading">
                    Description
                  </h4>
                  <p className="text-sm text-secondary-subheading leading-relaxed">
                    {isDescriptionExpanded
                      ? requestData.property.description +
                        " lush greenery and walking paths."
                      : requestData.property.description}{" "}
                    <button
                      type="button"
                      onClick={() =>
                        setIsDescriptionExpanded(!isDescriptionExpanded)
                      }
                      className="underline font-semibold text-txt-primary hover:text-primary cursor-pointer"
                    >
                      {isDescriptionExpanded ? "see less" : "see more"}
                    </button>
                  </p>
                </div>

                <div className="space-y-1 border-t border-border-subtle pt-3">
                  <h4 className="text-sm font-semibold text-primary-heading">
                    Property Size
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-secondary-subheading">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-subheading shrink-0" />
                    <span>{requestData.property.size}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Scheduling Details Card */}
            {requestData.scheduling && (
              <div className="bg-card-bg rounded-lg border border-border overflow-hidden shadow-2xs p-5 space-y-4">
                <h3 className="text-base font-semibold text-primary-heading">
                  Service Scheduling Details
                </h3>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-subheading">Frequency</span>
                    <span className="font-medium text-primary">
                      {requestData.scheduling.frequency}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-subheading">Start Date</span>
                    <span className="font-medium text-primary">
                      {requestData.scheduling.startDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-subheading">End Date</span>
                    <span className="font-medium text-primary">
                      {requestData.scheduling.endDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-subheading">Preferred Time</span>
                    <span className="font-medium text-primary">
                      {requestData.scheduling.preferredTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-subheading">Estimate Duration</span>
                    <span className="font-medium text-primary">
                      {requestData.scheduling.estimateDuration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-subheading">Estimate Visit</span>
                    <span className="font-medium text-primary">
                      {requestData.scheduling.estimateVisit}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full h-10 bg-[#5980A6] hover:bg-primary-hover text-white rounded font-medium text-sm transition-colors cursor-pointer flex items-center justify-center mt-2"
                >
                  View Appointments
                </button>
              </div>
            )}

            {/* Site Visit Details Card (Figma Screenshot 4) */}
            {requestData.completedSiteVisit && (
              <div className="bg-card-bg rounded-lg border border-border overflow-hidden shadow-2xs p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-primary-heading">
                    Site Visit Details
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-[#ECFDF3] text-[#12B76A] border border-[#ABEFC6]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
                    {requestData.completedSiteVisit.status}
                  </span>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm">
                  {/* Property */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-primary font-medium">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Property</span>
                    </div>
                    <p className="text-secondary-subheading pl-5 text-xs">
                      {requestData.completedSiteVisit.propertyAddress}
                    </p>
                  </div>

                  {/* Date & Time */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-primary font-medium">
                      <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Date & Time</span>
                    </div>
                    <p className="text-secondary-subheading pl-5 text-xs">
                      {requestData.completedSiteVisit.dateTime}
                    </p>
                  </div>

                  {/* Visited By */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-primary font-medium">
                      <User className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Visited By</span>
                    </div>
                    <p className="text-secondary-subheading pl-5 text-xs">
                      {requestData.completedSiteVisit.visitedBy}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Choose Preferred Date & Time Modal (Figma Screenshot 4) */}
      {isChangeDateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-card-bg w-full max-w-[430px] rounded-xl shadow-2xl border border-border p-6 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-1">
              <h3 className="text-base sm:text-lg font-semibold text-primary-heading">
                Choose Preferred Date & Time
              </h3>
              <button
                type="button"
                onClick={() => setIsChangeDateModalOpen(false)}
                className="p-1 rounded-md text-secondary-subheading hover:text-txt-primary hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Calendar Widget */}
            <div className="border border-border rounded-lg p-3.5 space-y-3 bg-card-bg">
              {/* Month Navigation */}
              <div className="flex items-center justify-center gap-6 text-sm font-semibold text-primary-heading">
                <button
                  type="button"
                  className="p-1 text-secondary-subheading hover:text-primary transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span>Aug 2026</span>
                <button
                  type="button"
                  className="p-1 text-secondary-subheading hover:text-primary transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Day Names */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-secondary-subheading pt-1">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {/* 4 blank cells before Aug 1 matching screenshot */}
                <div />
                <div />
                <div />
                <div />

                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const isSelected = selectedCalendarDate === day;
                  const isAvailable = [
                    16, 17, 18, 19, 23, 24, 25, 26, 27, 28, 29,
                  ].includes(day);

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedCalendarDate(day)}
                      className={`h-8 w-8 mx-auto flex items-center justify-center rounded text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-[#5980A6] text-white font-semibold shadow-xs"
                          : isAvailable
                          ? "bg-[#EAF3FA] text-[#5980A6] font-medium hover:bg-[#5980A6]/20"
                          : "text-txt-primary hover:bg-neutral-100"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Start Time & End Time */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-primary-heading mb-1.5">
                  Start Time
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full h-10 px-3.5 border border-border rounded-md text-sm text-txt-primary focus:outline-none focus:border-primary pr-9"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none text-secondary-subheading">
                    <ChevronUp className="w-3.5 h-3.5 -mb-1" />
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary-heading mb-1.5">
                  End Time
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full h-10 px-3.5 border border-border rounded-md text-sm text-txt-primary focus:outline-none focus:border-primary pr-9"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none text-secondary-subheading">
                    <ChevronUp className="w-3.5 h-3.5 -mb-1" />
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-primary-heading mb-1.5">
                  Reason
                </label>
                <textarea
                  rows={2}
                  value={rescheduleReason}
                  onChange={(e) => setRescheduleReason(e.target.value)}
                  placeholder="I'm not available. Change the date."
                  className="w-full px-3.5 py-2.5 border border-border rounded-md text-sm text-txt-primary focus:outline-none focus:border-primary resize-none"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsChangeDateModalOpen(false)}
                className="flex-1 h-10 border border-[#5980A6]/40 hover:border-primary text-[#5980A6] hover:bg-[#5980A6]/5 rounded text-sm font-medium transition-colors cursor-pointer flex items-center justify-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setIsChangeDateModalOpen(false)}
                className="flex-1 h-10 bg-[#5980A6] hover:bg-primary-hover text-white rounded text-sm font-medium transition-colors cursor-pointer flex items-center justify-center"
              >
                Save & Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

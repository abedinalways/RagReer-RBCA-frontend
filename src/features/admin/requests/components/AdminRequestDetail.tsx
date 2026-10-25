"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  FileText,
  MapPin,
  ExternalLink,
  X,
  FileIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import { AdminRequestStatus } from "../types/serviceRequestsTypes";
import {
  requestStatusStyles,
  ADMIN_SERVICE_REQUESTS_DATA,
} from "../data/serviceRequestsData";
import {
  DEFAULT_ADMIN_REQUEST_DETAIL,
  AdminRequestDetailData,
} from "../data/adminRequestDetailData";
import {
  SiteVisitRequestModal,
  SiteVisitDetailsModal,
} from "./SiteVisitRequestModal";

interface AdminRequestDetailProps {
  requestId?: string;
  initialStatus?: AdminRequestStatus;
}

export const AdminRequestDetail: React.FC<AdminRequestDetailProps> = ({
  requestId,
  initialStatus,
}) => {
  const router = useRouter();

  // Support dynamic status switching to preview and test all 5 Figma designs
  const [currentStatus, setCurrentStatus] = useState<AdminRequestStatus>(
    initialStatus || "New"
  );
  const [data, setData] = useState<AdminRequestDetailData>({
    ...DEFAULT_ADMIN_REQUEST_DETAIL,
    status: initialStatus || "New",
  });

  // If a specific requestId was passed, hydrate with matching request data
  useEffect(() => {
    if (requestId) {
      const match = ADMIN_SERVICE_REQUESTS_DATA.find(
        (r) =>
          r.id.toLowerCase() === requestId.toLowerCase() ||
          r.requestId.replace("#", "").toLowerCase() ===
            requestId.replace("#", "").toLowerCase()
      );
      if (match) {
        setCurrentStatus(match.status);
        setData((prev) => ({
          ...prev,
          id: match.id,
          requestId: match.requestId,
          status: match.status,
          title: match.serviceType,
          customer: {
            ...prev.customer,
            name: match.customer.name,
          },
          property: {
            ...prev.property,
            address: match.propertyAddress,
          },
        }));
      }
    }
  }, [requestId]);

  const [isSiteVisitModalOpen, setIsSiteVisitModalOpen] = useState(false);
  const [isReviewAssessmentModalOpen, setIsReviewAssessmentModalOpen] = useState(false);

  const handleSiteVisitSuccess = () => {
    setCurrentStatus("Site Visit Requested");
    setData((prev) => ({ ...prev, status: "Site Visit Requested" }));
  };

  const [noteText, setNoteText] = useState("");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  // Status badge config
  const statusConfig = requestStatusStyles[currentStatus] || {
    badgeBg: "bg-badge-active-bg",
    badgeText: "text-badge-active-text",
    badgeBorder: "border-badge-active-border",
    dotBg: "bg-badge-active-dot",
    label: currentStatus,
  };

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    toast.success("Note added for the customer");
    setNoteText("");
  };

  // Dynamic Header Action Buttons based on Status (matching the 5 Figma screenshots)
  const renderHeaderActions = () => {
    switch (currentStatus) {
      case "New":
      case "Under Review":
        return (
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <button
              type="button"
              onClick={() =>
                router.push(
                  `/admin/requests/create-estimate?requestId=${encodeURIComponent(
                    data.requestId
                  )}`
                )
              }
              className="bg-primary hover:bg-primary-hover text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-sm text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs"
            >
              Create Estimate
            </button>
            <button
              type="button"
              onClick={() => setIsSiteVisitModalOpen(true)}
              className="border border-primary text-primary hover:bg-page-bg px-4 sm:px-5 py-2 sm:py-2.5 rounded-sm text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              Request Site Visit
            </button>
          </div>
        );

      case "Site Visit Completed":
        return (
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => setIsReviewAssessmentModalOpen(true)}
              className="bg-primary hover:bg-primary-hover text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-sm text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs"
            >
              Review Assessment
            </button>
            <button
              type="button"
              onClick={() =>
                router.push(
                  `/admin/requests/create-estimate?requestId=${encodeURIComponent(
                    data.requestId
                  )}`
                )
              }
              className="border border-primary text-primary hover:bg-page-bg px-4 sm:px-5 py-2 sm:py-2.5 rounded-sm text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              Create Estimate
            </button>
          </div>
        );

      case "Estimate Sent":
        return (
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => toast.success("Opening Estimate view...")}
              className="bg-primary hover:bg-primary-hover text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-sm text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs"
            >
              View Estimate
            </button>
            <button
              type="button"
              onClick={() => toast.success("Reminder notification sent to customer!")}
              className="border border-primary text-primary hover:bg-page-bg px-4 sm:px-5 py-2 sm:py-2.5 rounded-sm text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              Send Reminder
            </button>
          </div>
        );

      case "Estimate Accepted":
        return (
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => toast.success("Opening Contract & Agreement Creator...")}
              className="bg-primary hover:bg-primary-hover text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-sm text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs"
            >
              Create Contract & Agreement
            </button>
          </div>
        );

      case "Estimate Declined":
      case "Estimate Expired":
        return (
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => toast.success("Opening Estimate view...")}
              className="bg-primary hover:bg-primary-hover text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-sm text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs"
            >
              View Estimate
            </button>
            <button
              type="button"
              onClick={() => toast("Request archived", { icon: "📦" })}
              className="border border-primary text-primary hover:bg-page-bg px-4 sm:px-5 py-2 sm:py-2.5 rounded-sm text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              Archive
            </button>
          </div>
        );

      case "Change Requested":
        return (
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => toast.success("Opening Estimate view...")}
              className="bg-primary hover:bg-primary-hover text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-sm text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs"
            >
              View Estimate
            </button>
          </div>
        );

      case "Contract Sent":
        return (
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => toast.success("Opening Contract & Agreement...")}
              className="bg-primary hover:bg-primary-hover text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-sm text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs"
            >
              View Contract & Agreement
            </button>
            <button
              type="button"
              onClick={() => toast.success("Opening Estimate view...")}
              className="border border-primary text-primary hover:bg-page-bg px-4 sm:px-5 py-2 sm:py-2.5 rounded-sm text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              View Estimate
            </button>
          </div>
        );

      case "Contract Signed":
        return (
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => toast.success("Opening Service Scheduler...")}
              className="bg-primary hover:bg-primary-hover text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-sm text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs"
            >
              Schedule Service
            </button>
          </div>
        );

      case "Completed":
        return (
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => toast.success("Viewing Job Details...")}
              className="bg-primary hover:bg-primary-hover text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-sm text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs"
            >
              View Job Details
            </button>
          </div>
        );

      default:
        return (
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => toast.success("Action initiated")}
              className="bg-primary hover:bg-primary-hover text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-sm text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs"
            >
              View Details
            </button>
          </div>
        );
    }
  };

  return (
    <div className="w-full space-y-5 md:space-y-6 max-w-[1600px] mx-auto animate-in fade-in duration-200">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm md:text-base text-secondary-subheading font-normal">
        <Link
          href="/admin/requests"
          className="hover:text-primary transition-colors cursor-pointer"
        >
          Service Requests
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-txt-primary text-sm md:text-base font-medium">Details</span>
      </nav>

      {/* Status Switcher Banner for previewing all 10 Figma states */}
      {/* <div className="flex flex-wrap items-center gap-2 bg-card-bg p-2.5 sm:px-4 rounded-xl border border-border shadow-3xs text-xs">
        <span className="text-secondary-subheading font-medium">
          Status Preview:
        </span>
        {(
          [
            "New",
            "Under Review",
            "Estimate Sent",
            "Estimate Accepted",
            "Estimate Declined",
            "Estimate Expired",
            "Change Requested",
            "Contract Sent",
            "Contract Signed",
            "Completed",
          ] as AdminRequestStatus[]
        ).map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => setCurrentStatus(st)}
            className={`px-2.5 py-1 rounded-sm text-xs transition-colors cursor-pointer ${
              currentStatus === st
                ? "bg-primary text-white font-medium shadow-2xs"
                : "bg-page-bg hover:bg-border text-txt-primary font-normal"
            }`}
          >
            {st}
          </button>
        ))}
      </div> */}

      {/* 2. Top Title and Dynamic Action Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Title + Status Badge */}
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-barlow text-xl sm:text-2xl font-medium tracking-tight text-primary-heading">
              {data.title}
            </h1>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-xs font-medium ${statusConfig.badgeBg} ${statusConfig.badgeText} border ${statusConfig.badgeBorder}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dotBg}`} />
              {statusConfig.label}
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-secondary-subheading font-normal">
            Created on {data.createdDate} • {data.version}
          </p>
        </div>

        {/* Dynamic Action Buttons */}
        <div>{renderHeaderActions()}</div>
      </div>

      {/* 3. Main Content Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-start">
        {/* LEFT COLUMN: Outer Card wrapping Request Summary Box + Half Stache Note (8 Cols) */}
        <div className="lg:col-span-8 rounded-xl border border-border bg-card-bg p-4 sm:p-5 shadow-2xs space-y-4 sm:space-y-5 min-w-0">
          {/* Inner Bordered Box for Request Summary */}
          <div className="rounded-lg border border-border bg-card-bg p-4 sm:p-5 space-y-4">
            {/* Card Header with Divider */}
            <div className="flex items-center gap-2 pb-3.5 border-b border-border-subtle">
              <FileIcon className="h-5 w-5 text-txt-primary stroke-[1.7]" />
              <h2 className="font-barlow text-lg md:text-xl font-medium text-primary-heading">
                Request Summary
              </h2>
            </div>

            {/* 6-Field Metadata Grid with Divider */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6 pb-4 border-b border-border-subtle">
              <div>
                <span className="text-xs md:text-sm text-secondary-subheading font-normal block mb-1">
                  Request ID
                </span>
                <span className="font-barlow text-base text-primary-heading font-medium">
                  {data.requestId}
                </span>
              </div>
              <div>
                <span className="text-xs md:text-sm text-secondary-subheading font-normal block mb-1">
                  Requested Service
                </span>
                <span className="text-sm sm:text-base text-primary-heading font-medium">
                  {data.requestedService}
                </span>
              </div>
              <div>
                <span className="text-xs md:text-sm text-secondary-subheading font-normal block mb-1">
                  Request Type
                </span>
                <span className="text-sm sm:text-base text-primary-heading font-medium">
                  {data.requestType}
                </span>
              </div>

              <div>
                <span className="text-xs md:text-sm text-secondary-subheading font-normal block mb-1">
                  Requested Date & Time
                </span>
                <span className="text-xs sm:text-sm text-primary-heading font-medium">
                  {data.requestedDateTime}
                </span>
              </div>
              <div>
                <span className="text-xs md:text-sm text-secondary-subheading font-normal block mb-1">
                  Optional Date & Time
                </span>
                <span className="text-xs sm:text-sm text-primary-heading font-medium">
                  {data.optionalDateTime}
                </span>
              </div>
              <div>
                <span className="text-xs md:text-sm text-secondary-subheading font-normal block mb-1">
                  No. of Requested Services
                </span>
                <span className="text-xs sm:text-sm text-primary-heading font-medium">
                  {data.servicesCount}
                </span>
              </div>
            </div>

            {/* Content Details: Description, Service Requested, Site Access Notes, Attached Photos */}
            <div className="space-y-4 pt-1">
              {/* Description */}
              <div className="space-y-1.5">
                <h3 className="text-base md:text-lg font-medium text-primary-heading">
                  Description
                </h3>
                <p className="text-xs md:text-sm text-secondary-subheading font-normal leading-relaxed">
                  {data.description}
                </p>
              </div>

              {/* Service Requested 2-Box Grid */}
              <div className="space-y-2 pt-1">
                <h3 className="text-base md:text-lg font-medium text-primary-heading">
                  Service Requested
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.serviceRequested.map((group, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-border-card bg-card-bg p-3.5 space-y-2"
                    >
                      <h4 className="text-sm md:text-base font-medium text-primary">
                        {group.title}
                      </h4>
                      <ul className="space-y-1.5 text-xs md:text-sm text-secondary-subheading font-normal">
                        {group.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-1.5">
                            <span className="text-secondary-subheading select-none">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Site Access Notes */}
              <div className="space-y-1.5 pt-1">
                <h3 className="text-base md:text-lg font-medium text-primary-heading">
                  Site Access Notes
                </h3>
                <p className="text-xs md:text-sm text-secondary-subheading font-normal leading-relaxed">
                  {data.siteAccessNotes}
                </p>
              </div>

              {/* Attached Photos */}
              <div className="space-y-2 pt-1">
                <h3 className="text-base md:text-lg font-medium text-primary-heading">
                  Attached Photos
                </h3>
                <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                  {data.attachedPhotos.map((photo, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPreviewPhoto(photo)}
                      className="group relative h-12 w-12 sm:h-14 sm:w-14 rounded-md overflow-hidden border border-border hover:border-primary transition-all cursor-pointer"
                    >
                      <img
                        src={photo}
                        alt={`Attachment ${idx + 1}`}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Half Stache Note (Inside the outer card, directly below the inner Request Summary card) */}
          {currentStatus !== "New" && data.halfStacheNote && (
            <div className="space-y-1 px-1 pt-1">
              <h4 className="font-barlow text-sm md:text-base font-medium text-primary-heading uppercase tracking-wide">
                HALF STACHE NOTE
              </h4>
              <p className="text-xs md:text-sm text-secondary-subheading font-normal leading-relaxed">
                {data.halfStacheNote}
              </p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Customer, Property, and Add Note (4 Cols) */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-5 min-w-0">
          {/* 1. Customer Card */}
          <div className="rounded-xl border border-border bg-card-bg p-4 sm:p-5 shadow-2xs space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full border border-border overflow-hidden bg-page-bg p-1 shrink-0 flex items-center justify-center">
                <img
                  src={data.customer.logo}
                  alt={data.customer.name}
                  className="h-full w-full object-contain rounded-full"
                />
              </div>
              <div className="min-w-0">
                <h3 className="font-medium text-sm sm:text-base text-primary-heading truncate">
                  {data.customer.name}
                </h3>
                <p className="text-xs text-secondary-subheading font-normal truncate">
                  {data.customer.customerId}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <Link
                href={`/admin/customers`}
                className="flex-1 py-1.5 rounded-sm border border-primary text-primary hover:bg-page-bg font-medium text-xs sm:text-sm text-center transition-colors cursor-pointer"
              >
                Profile
              </Link>
              <Link
                href={`/admin/customers`}
                className="flex-1 py-1.5 rounded-sm border border-primary text-primary hover:bg-page-bg font-medium text-xs sm:text-sm text-center transition-colors cursor-pointer"
              >
                Properties
              </Link>
            </div>
          </div>

          {/* 2. Property Card */}
          <div className="rounded-xl border border-border bg-card-bg p-4 sm:p-5 shadow-2xs space-y-3">
            <div className="relative w-full h-44 sm:h-48 rounded-lg overflow-hidden border border-border bg-page-bg">
              <img
                src={data.property.image}
                alt={data.property.title}
                className="w-full h-full object-cover"
              />
            </div>

            <span className="inline-block bg-blue-50 text-primary border border-blue-100 rounded-sm px-2 py-0.5 text-xs font-normal">
              {data.property.type}
            </span>

            <h3 className="font-medium text-sm sm:text-base text-primary-heading">
              {data.property.title}
            </h3>

            <div className="flex items-center gap-1.5 text-xs text-secondary-subheading font-normal">
              <MapPin className="h-3.5 w-3.5 text-secondary-subheading shrink-0" />
              <span className="truncate">{data.property.address}</span>
            </div>

            <div className="space-y-1 pt-1">
              <span className="text-xs font-medium text-primary-heading block">
                Description
              </span>
              <p className="text-xs text-secondary-subheading font-normal leading-relaxed">
                {isDescriptionExpanded
                  ? data.property.description
                  : `${data.property.description.slice(0, 160)}... `}
                <button
                  type="button"
                  onClick={() => setIsDescriptionExpanded((p) => !p)}
                  className="text-primary hover:underline font-medium cursor-pointer"
                >
                  {isDescriptionExpanded ? "see less" : "see more"}
                </button>
              </p>
            </div>

            <button
              type="button"
              onClick={() => toast("Opening full property details...", { icon: "🏢" })}
              className="w-full py-2.5 rounded-sm bg-primary text-white hover:bg-primary-hover font-medium text-xs sm:text-sm text-center transition-colors cursor-pointer shadow-2xs"
            >
              View Full Details
            </button>
          </div>

          {/* 3. Add Note Card */}
          <div className="rounded-xl border border-border bg-card-bg p-4 sm:p-5 shadow-2xs space-y-3">
            <h3 className="font-medium text-sm sm:text-base text-primary-heading">
              Add Note
            </h3>

            <div className="relative">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value.slice(0, 200))}
                placeholder="Add any note for the customer."
                className="w-full h-24 rounded-md border border-border bg-card-bg p-3 text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/60 focus:border-primary focus:outline-hidden resize-none transition-colors"
              />
              <span className="absolute right-2.5 bottom-2 text-[11px] text-secondary-subheading/60 select-none">
                {noteText.length}/200
              </span>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAddNote}
                disabled={!noteText.trim()}
                className="px-4 py-2 rounded-sm bg-primary text-white hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed font-medium text-xs sm:text-sm transition-colors cursor-pointer shadow-2xs"
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Enlarge Lightbox Modal */}
      {previewPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setPreviewPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl max-h-[85vh] rounded-xl overflow-hidden bg-card-bg shadow-2xl p-2"
          >
            <button
              type="button"
              onClick={() => setPreviewPhoto(null)}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={previewPhoto}
              alt="Preview"
              className="max-h-[80vh] w-auto object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Site Visit Request Modal */}
      <SiteVisitRequestModal
        isOpen={isSiteVisitModalOpen}
        onClose={() => setIsSiteVisitModalOpen(false)}
        request={{
          id: data.id,
          requestId: data.requestId,
          customer: {
            name: data.customer.name,
          },
          propertyName: data.property.title,
          propertyAddress: data.property.address,
          preferredDate: "21 Sep, 2026",
          alternateDate: "22 Sep, 2026",
        }}
        onSuccess={handleSiteVisitSuccess}
      />

      {/* Review Assessment Modal */}
      <SiteVisitDetailsModal
        isOpen={isReviewAssessmentModalOpen}
        onClose={() => setIsReviewAssessmentModalOpen(false)}
        request={{
          id: data.id,
          requestId: data.requestId,
          customer: {
            name: data.customer.name,
          },
          propertyName: data.property.title,
          propertyAddress: data.property.address,
        }}
      />
    </div>
  );
};

export default AdminRequestDetail;

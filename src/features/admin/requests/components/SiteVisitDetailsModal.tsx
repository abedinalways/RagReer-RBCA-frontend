"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/reusable/Modal";
import { X, ZoomIn } from "lucide-react";
import toast from "react-hot-toast";
import { AdminServiceRequest } from "../types/serviceRequestsTypes";
import {
  MOCK_SITE_ASSESSMENTS,
  SiteVisitAssessmentData,
} from "../data/siteVisitAssessmentData";

export interface SiteVisitDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request?: AdminServiceRequest | {
    id?: string;
    requestId?: string;
    propertyName?: string;
    propertyAddress?: string;
    customer?: {
      name: string;
      email?: string;
      avatar?: string;
    };
  } | null;
  initialScenario?: "withAdjustments" | "withoutAdjustments";
  onCreateEstimate?: (requestId: string) => void;
}

export const SiteVisitDetailsModal: React.FC<SiteVisitDetailsModalProps> = ({
  isOpen,
  onClose,
  request,
  initialScenario = "withAdjustments",
  onCreateEstimate,
}) => {
  // Scenario selector: "withAdjustments" (Figma 1) or "withoutAdjustments" (Figma 2)
  const [scenario, setScenario] = useState<"withAdjustments" | "withoutAdjustments">(initialScenario);
  const [notes, setNotes] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Sync state whenever modal opens or scenario changes
  useEffect(() => {
    if (isOpen) {
      const data = MOCK_SITE_ASSESSMENTS[scenario];
      setNotes(data.assessmentNotes);
      setPreviewImage(null);
    }
  }, [isOpen, scenario]);

  const currentData: SiteVisitAssessmentData = MOCK_SITE_ASSESSMENTS[scenario];

  const requestIdDisplay = request?.requestId
    ? request.requestId.startsWith("#")
      ? request.requestId
      : `#${request.requestId}`
    : currentData.requestId;

  const propertyName =
    (request as any)?.propertyName ||
    currentData.propertyName;

  const propertyAddress =
    request?.propertyAddress || currentData.propertyAddress;

  const handleCreateEstimate = () => {
    toast.success(`Opening Estimate Creator for ${requestIdDisplay}`);
    if (onCreateEstimate && request?.requestId) {
      onCreateEstimate(request.requestId);
    }
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        maxWidth="lg"
        headerClassName="border-b-0 px-5 sm:px-6 pt-5 sm:pt-6 pb-2"
        title={
          <div className="space-y-0.5">
            <h2 className="font-barlow text-2xl font-medium tracking-tight text-primary-heading">
              Site Visit Details
            </h2>
            <a
              href={request?.id ? `/admin/requests/${request.id}` : "#"}
              className="text-xs sm:text-sm text-primary underline font-normal block hover:opacity-80 transition-opacity w-fit"
            >
              {requestIdDisplay}
            </a>
          </div>
        }
        className="p-0 overflow-hidden rounded-xl border border-border"
        contentClassName="px-5 sm:px-6 pb-6 pt-1 space-y-4 max-h-[82vh] overflow-y-auto"
      >
        <div className="space-y-4">
          {/* Top Summary Card (Property details + Visit Completed highlights) */}
          <div className="rounded-lg border border-border bg-card-bg p-3.5 sm:p-4 flex items-center justify-between gap-3">
            <div className="space-y-2.5 min-w-0 flex-1">
              <div>
                <span className="text-xs text-secondary-subheading font-normal block">
                  Property Name
                </span>
                <p className="text-sm font-medium text-primary-heading truncate mt-0.5">
                  {propertyName}
                </p>
              </div>
              <div>
                <span className="text-xs text-secondary-subheading font-normal block">
                  Property Address
                </span>
                <p className="text-sm text-secondary-subheading font-normal truncate mt-0.5">
                  {propertyAddress}
                </p>
              </div>
            </div>

            {/* Visit Details Badge Box (Solid light blue matching Figma #EAF2F9) */}
            <div className="rounded-lg bg-[#EAF2F9] p-3 min-w-[140px] sm:min-w-[155px] shrink-0 space-y-2">
              <div>
                <span className="text-[11px] text-secondary-subheading font-normal block">
                  Visit Completed On
                </span>
                <span className="text-sm font-medium text-primary-heading block mt-0.5">
                  {currentData.visitCompletedOn}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-secondary-subheading font-normal block">
                  Visit Completed By
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <img
                    src={currentData.completedBy.avatar}
                    alt={currentData.completedBy.name}
                    className="h-5 w-5 rounded-full object-cover border border-border shrink-0"
                  />
                  <span className="text-xs sm:text-sm font-medium text-primary-heading truncate">
                    {currentData.completedBy.name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Site Assessment & Required Adjustments Note Box */}
          <div className="space-y-1">
            <label className="block font-barlow text-base font-medium text-primary-heading">
              Site Assessment & Required Adjustments
            </label>
            <div className="relative">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value.slice(0, 200))}
                rows={3}
                placeholder="Site assessment notes..."
                className="w-full rounded-md border border-border bg-card-bg p-3 text-xs sm:text-sm text-secondary-subheading leading-relaxed focus:border-primary focus:outline-hidden resize-none min-h-[82px]"
              />
              <span className="absolute right-2.5 bottom-2 text-[11px] text-secondary-subheading/60 select-none">
                {notes.length}/200
              </span>
            </div>
          </div>

          {/* Required Services */}
          <div className="space-y-1">
            <h3 className="font-barlow text-base font-medium text-primary-heading">
              Required Services
            </h3>
            {currentData.requiredServices && currentData.requiredServices.length > 0 ? (
              <ul className="space-y-1 text-xs sm:text-sm text-secondary-subheading font-normal">
                {currentData.requiredServices.map((service, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-subheading/70 shrink-0" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs sm:text-sm text-secondary-subheading font-normal">
                N/A
              </p>
            )}
          </div>

          {/* Estimate Duration */}
          <div className="space-y-1">
            <h3 className="font-barlow text-base font-medium text-primary-heading">
              Estimate Duration
            </h3>
            <p className="text-xs sm:text-sm text-secondary-subheading font-normal">
              {currentData.estimateDuration || "N/A"}
            </p>
          </div>

          {/* Attachments */}
          <div className="space-y-2">
            <h3 className="font-barlow text-base font-medium text-primary-heading">
              Attachments
            </h3>
            <div className="flex items-center gap-3 flex-wrap">
              {currentData.attachments.map((imgSrc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPreviewImage(imgSrc)}
                  className="group relative h-20 w-20 sm:h-22 sm:w-22 overflow-hidden rounded-lg border border-border bg-page-bg/40 hover:border-primary transition-all cursor-pointer shadow-2xs"
                  title="Click to view full photo"
                >
                  <img
                    src={imgSrc}
                    alt={`Site Attachment ${idx + 1}`}
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <ZoomIn className="h-5 w-5" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-sm border border-border text-secondary-subheading hover:text-primary-heading hover:bg-page-bg font-medium text-xs sm:text-sm text-center transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCreateEstimate}
              className="flex-1 py-2.5 px-4 rounded-sm bg-primary text-white hover:bg-primary-hover font-medium text-xs sm:text-sm text-center shadow-2xs transition-colors cursor-pointer"
            >
              Create Estimate
            </button>
          </div>
        </div>
      </Modal>

      {/* Lightbox Preview Modal for Attachments */}
      {previewImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 p-4 animate-in fade-in duration-150 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-card-bg rounded-xl overflow-hidden border border-border shadow-2xl p-2"
          >
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80 transition-colors cursor-pointer"
              aria-label="Close preview"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={previewImage}
              alt="Attachment preview"
              className="w-full h-auto max-h-[75vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SiteVisitDetailsModal;

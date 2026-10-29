"use client";

import React from "react";
import { X } from "lucide-react";

interface AdminContractSignatureReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentVersion?: string;
  organizationName?: string;
  authorizedPersonName?: string;
  authority?: string;
  dateOfSignature?: string;
  onRequestCorrection: () => void;
  onVerifySignature: () => void;
}

export const AdminContractSignatureReviewModal: React.FC<
  AdminContractSignatureReviewModalProps
> = ({
  isOpen,
  onClose,
  documentVersion = "Document version #CN-1024-v1",
  organizationName = "Coastline Group",
  authorizedPersonName = "Sarah William",
  authority = "Property Owner",
  dateOfSignature = "27.08.2026",
  onRequestCorrection,
  onVerifySignature,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-card-bg w-full max-w-[480px] rounded-sm shadow-2xl border border-border p-5 sm:p-6 space-y-4 max-h-[92vh] overflow-y-auto">
        {/* Header matching Figma */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-barlow-condensed font-medium text-xl md:text-2xl text-primary-heading tracking-tight leading-tight">
              Signature
            </h2>
            <p className="text-xs text-secondary-subheading font-normal mt-0.5">
              {documentVersion}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-xs text-secondary-subheading hover:text-txt-primary hover:bg-page-bg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Read-only Signature Details Card matching Figma */}
        <div className="border border-border/80 rounded-xs p-4 space-y-3 bg-card-bg">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-secondary-subheading font-normal block">
                Organization Name
              </span>
              <p className="text-xs md:text-sm font-medium text-primary-heading mt-0.5">
                {organizationName}
              </p>
            </div>

            <div>
              <span className="text-xs text-secondary-subheading font-normal block">
                Authorized Person Name
              </span>
              <p className="text-xs md:text-sm font-medium text-primary-heading mt-0.5">
                {authorizedPersonName}
              </p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4 pt-1">
            <div>
              <span className="text-xs text-secondary-subheading font-normal block">
                Authority
              </span>
              <p className="text-xs md:text-sm font-medium text-primary-heading mt-0.5">
                {authority}
              </p>
            </div>

            <div>
              <span className="text-xs text-secondary-subheading font-normal block">
                Date of Signature
              </span>
              <p className="text-xs md:text-sm font-medium text-primary-heading mt-0.5">
                {dateOfSignature}
              </p>
            </div>
          </div>
        </div>

        {/* Dashed Signature Box matching Figma */}
        <div className="border border-dashed border-[#D0D5DD] rounded-xs bg-white h-36 flex items-center justify-center p-4">
          <svg
            viewBox="0 0 140 70"
            className="w-28 h-16 text-txt-primary fill-none stroke-current"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Signature loop & stroke matching Figma */}
            <path d="M42 55 C35 52 32 44 38 38 C44 32 50 42 46 52 C42 60 36 54 48 53 C56 52 62 50 66 48" />
            <path d="M64 50 C66 36 64 18 66 10 C67 18 68 38 71 48 C76 45 88 38 96 34" />
          </svg>
        </div>

        {/* Consent Recorded */}
        <div className="space-y-1">
          <span className="text-xs text-secondary-subheading font-normal block">
            Consent Recorded
          </span>
          <p className="font-barlow-condensed font-normal text-base md:text-lg text-primary-heading leading-snug">
            I have reviewed and agree to the terms and conditions of this contract.
          </p>
        </div>

        {/* Bottom Actions matching Figma: Request Correction & Verify Signature */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={onRequestCorrection}
            className="w-full py-2.5 px-4 rounded-xs border border-primary text-primary hover:bg-page-bg text-xs md:text-sm font-medium transition-colors cursor-pointer text-center"
          >
            Request Correction
          </button>
          <button
            type="button"
            onClick={onVerifySignature}
            className="w-full py-2.5 px-4 rounded-xs bg-primary text-white hover:bg-primary-hover text-xs md:text-sm font-medium shadow-2xs transition-colors cursor-pointer text-center"
          >
            Verify Signature
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminContractSignatureReviewModal;

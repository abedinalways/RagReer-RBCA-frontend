import React from "react";
import { X, Download } from "lucide-react";
import { ContractSignatureData } from "../types/contractsAgreementsTypes";

interface ContractSignedReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  signatureInfo?: ContractSignatureData;
  documentVersion?: string;
}

export const ContractSignedReviewModal: React.FC<
  ContractSignedReviewModalProps
> = ({
  isOpen,
  onClose,
  signatureInfo,
  documentVersion = "Document version #CN-1024-v1",
}) => {
  if (!isOpen) return null;

  const orgName = signatureInfo?.organizationName || "Coastline Group";
  const personName = signatureInfo?.authorizedPersonName || "Sarah William";
  const authority = signatureInfo?.authority || "Property Owner";
  const dateOfSignature = signatureInfo?.dateOfSignature
    ? signatureInfo.dateOfSignature.includes("-")
      ? signatureInfo.dateOfSignature.split("-").reverse().join(".")
      : signatureInfo.dateOfSignature
    : "27.08.2026";
  const fileName = signatureInfo?.fileName || "signature.pdf";
  const fileSize = signatureInfo?.fileSize || "10.21 MB";
  const signatureDataUrl = signatureInfo?.signatureDataUrl;

  const handleDownload = () => {
    if (signatureDataUrl) {
      const link = document.createElement("a");
      link.href = signatureDataUrl;
      link.download = fileName.replace(".pdf", ".png");
      link.click();
    } else {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-card-bg w-full max-w-[540px] rounded-xl shadow-2xl border border-border p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-1">
          <div>
            <h2 className="text-xl md:text-2xl font-medium text-primary-heading">
              Signature
            </h2>
            <p className="text-xs md:text-sm text-secondary-subheading mt-0.5">
              {documentVersion}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-secondary-subheading hover:text-txt-primary hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Read-only Signature Details Card */}
        <div className="border border-border rounded-lg p-4 sm:p-5 space-y-3.5 bg-card-bg">
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <span className="text-xs md:text-sm text-secondary-subheading font-medium block">
                Organization Name
              </span>
              <p className="text-base md:text-lg font-medium text-primary-heading mt-0.5">
                {orgName}
              </p>
            </div>

            <div>
              <span className="text-xs md:text-sm text-secondary-subheading font-medium block">
                Authorized Person Name
              </span>
              <p className="text-base md:text-lg font-medium text-primary-heading mt-0.5">
                {personName}
              </p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 border-t border-border-subtle">
            <div>
              <span className="text-xs md:text-sm text-secondary-subheading font-medium block">
                Authority
              </span>
              <p className="text-base md:text-lg font-medium text-primary-heading mt-0.5">
                {authority}
              </p>
            </div>

            <div>
              <span className="text-xs md:text-sm text-secondary-subheading font-medium block">
                Date of Signature
              </span>
              <p className="text-base md:text-lg font-medium text-primary-heading mt-0.5">
                {dateOfSignature}
              </p>
            </div>
          </div>
        </div>

        {/* File / Drawn Signature Preview Box */}
        <div className="bg-[#F9FAFB] border border-border rounded-lg p-3.5 sm:p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Red PDF Icon */}
            <div className="w-10 h-10 rounded-md bg-[#F04438] flex flex-col items-center justify-center text-white shrink-0 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider leading-none">
                PDF
              </span>
            </div>

            <div className="min-w-0">
              <h4 className="text-sm md:text-base font-semibold text-primary-heading truncate">
                {fileName}
              </h4>
              <p className="text-xs text-secondary-subheading">
                File size : {fileSize}
              </p>
            </div>
          </div>

          {/* Download button */}
          <button
            type="button"
            onClick={handleDownload}
            className="w-9 h-9 rounded-md border border-border bg-white hover:bg-slate-50 flex items-center justify-center text-secondary-subheading hover:text-primary transition-colors cursor-pointer shadow-2xs shrink-0"
            title="Download signed file"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Drawn Signature Image Preview (if signature was drawn) */}
        {signatureDataUrl && (
          <div className="border border-border rounded-lg p-3 bg-white flex flex-col items-center justify-center space-y-1">
            <span className="text-[11px] text-secondary-subheading font-medium self-start">
              Drawn Signature Preview:
            </span>
            <img
              src={signatureDataUrl}
              alt="Drawn Signature"
              className="max-h-24 object-contain"
            />
          </div>
        )}

        {/* Consent Recorded */}
        <div className="pt-1 space-y-1">
          <span className="text-xs text-secondary-subheading font-medium block">
            Consent Recorded
          </span>
          <p className="text-xs md:text-sm text-txt-primary leading-relaxed">
            I have reviewed and agree to the terms and conditions of this contract.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContractSignedReviewModal;

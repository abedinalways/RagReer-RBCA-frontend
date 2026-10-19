"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Modal } from "@/components/reusable/Modal";

export type ExportFormat = "pdf" | "csv";

interface PayrollExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: ExportFormat) => void;
}

export function PayrollExportModal({
  isOpen,
  onClose,
  onExport,
}: PayrollExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>("pdf");

  const handleExportClick = () => {
    onExport(selectedFormat);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      className="p-5 sm:p-7 rounded-2xl max-w-[420px]"
      contentClassName="p-0 space-y-5"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary-heading tracking-tight">
            Export Your Data
          </h2>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-2 leading-relaxed">
            Easily transfer your data to other platforms with our seamless export feature. Ensure your information is always accessible and organized.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close export dialog"
          className="text-secondary-subheading hover:text-txt-primary p-1 -mt-1 -mr-1 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[2]" />
        </button>
      </div>

      {/* Format Selection Cards */}
      <div className="space-y-3">
        {/* 1. As PDF */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setSelectedFormat("pdf")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setSelectedFormat("pdf");
            }
          }}
          className={`flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer ${
            selectedFormat === "pdf"
              ? "border-primary bg-blue-50/20 shadow-xs ring-1 ring-primary"
              : "border-border bg-card-bg hover:border-border-subtle hover:bg-page-bg/30"
          }`}
        >
          {/* Red PDF Icon matching Image */}
          <div className="w-11 h-13 sm:w-12 sm:h-14 rounded-lg bg-[#E53935] flex flex-col items-center justify-center text-white shrink-0 relative overflow-hidden shadow-2xs">
            <div className="absolute top-0 right-0 w-3 h-3 bg-white/25 rounded-bl-md" />
            <span className="font-extrabold text-[11px] sm:text-xs tracking-wider uppercase">
              PDF
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm sm:text-base text-primary-heading">
              As PDF
            </h3>
            <p className="text-xs sm:text-[13px] text-secondary-subheading mt-0.5 leading-snug">
              Easily convert your documents to PDF. Save without hassle.
            </p>
          </div>
        </div>

        {/* 2. As CSV */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setSelectedFormat("csv")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setSelectedFormat("csv");
            }
          }}
          className={`flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer ${
            selectedFormat === "csv"
              ? "border-primary bg-blue-50/20 shadow-xs ring-1 ring-primary"
              : "border-border bg-card-bg hover:border-border-subtle hover:bg-page-bg/30"
          }`}
        >
          {/* Green CSV Icon matching Image */}
          <div className="w-11 h-13 sm:w-12 sm:h-14 rounded-lg bg-[#107C41] flex flex-col items-center justify-center text-white shrink-0 relative overflow-hidden shadow-2xs">
            <div className="absolute top-0 right-0 w-3 h-3 bg-white/25 rounded-bl-md" />
            <span className="font-extrabold text-[11px] sm:text-xs tracking-wider uppercase">
              CSV
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm sm:text-base text-primary-heading">
              As CSV
            </h3>
            <p className="text-xs sm:text-[13px] text-secondary-subheading mt-0.5 leading-snug">
              Easy CSV format, simply export and save data.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="pt-1 flex items-center justify-end">
        <button
          type="button"
          onClick={handleExportClick}
          className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium text-xs sm:text-sm shadow-xs transition-all cursor-pointer active:scale-[0.99]"
        >
          Export Data
        </button>
      </div>
    </Modal>
  );
}

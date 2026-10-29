"use client";

import React, { useState, useRef } from "react";
import { X, Calendar } from "lucide-react";
import toast from "react-hot-toast";

export const AMENDMENT_CHANGE_OPTIONS = [
  "Scope of work",
  "Service Details",
  "Schedule Service",
  "Contract Pricing",
  "Terms & Conditions",
];

interface AdminCreateAmendmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentVersion?: string;
  contractId?: string;
  customerName?: string;
  propertyAddress?: string;
  onOpenExistingForm?: () => void;
  onSubmit?: (data: {
    selectedChanges: string[];
    effectiveDate: string;
    reason: string;
  }) => void;
}

export const AdminCreateAmendmentModal: React.FC<
  AdminCreateAmendmentModalProps
> = ({
  isOpen,
  onClose,
  documentVersion = "Document version #CN-1024-v1",
  contractId = "#CN-1024",
  customerName = "Alex Morgan",
  propertyAddress = "100 Whispering Pines Blvd at Hwy 43",
  onOpenExistingForm,
  onSubmit,
}) => {
  const [selectedChanges, setSelectedChanges] = useState<string[]>([]);
  const [effectiveDate, setEffectiveDate] = useState("");
  const [reason, setReason] = useState("");

  const datePickerRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const toggleChangeOption = (option: string) => {
    setSelectedChanges((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleNativeDatePick = (isoDate: string) => {
    if (!isoDate) return;
    const parts = isoDate.split("-");
    if (parts.length === 3) {
      setEffectiveDate(`${parts[2]}/${parts[1]}/${parts[0]}`);
    }
  };

  const triggerDatePicker = () => {
    if (datePickerRef.current) {
      if (typeof datePickerRef.current.showPicker === "function") {
        datePickerRef.current.showPicker();
      } else {
        datePickerRef.current.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedChanges.length === 0) {
      toast.error("Please select at least one section that is changing.");
      return;
    }

    if (onSubmit) {
      onSubmit({
        selectedChanges,
        effectiveDate,
        reason: reason.trim(),
      });
    }

    toast.success("Amendment created and sent to customer successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-card-bg w-full max-w-[500px] rounded-sm shadow-2xl border border-border p-5 sm:p-6 space-y-4 max-h-[92vh] overflow-y-auto">
        {/* Header matching Figma */}
        <div className="flex items-start justify-between pb-1">
          <div className="space-y-0.5">
            <h2 className="font-barlow-condensed font-medium text-xl md:text-2xl text-primary-heading tracking-tight">
              Create Amendment
            </h2>
            <p className="text-xs text-secondary-subheading font-normal">
              {documentVersion}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-xs text-secondary-subheading hover:text-txt-primary hover:bg-page-bg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Card: Customer Name & Property Address */}
        <div className="rounded-xs border border-border bg-[#F9FAFB] p-3 sm:p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <p className="text-xs text-secondary-subheading font-normal">
              Customer Name
            </p>
            <p className="text-xs md:text-sm font-medium text-txt-primary mt-0.5">
              {customerName}
            </p>
          </div>
          <div>
            <p className="text-xs text-secondary-subheading font-normal">
              Property Address
            </p>
            <p className="text-xs md:text-sm font-medium text-txt-primary mt-0.5 leading-snug">
              {propertyAddress}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* What's Changing Section */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs md:text-sm font-medium text-primary-heading">
                What&apos;s Changing?
              </h3>
              {selectedChanges.length > 0 && onOpenExistingForm && (
                <button
                  type="button"
                  onClick={onOpenExistingForm}
                  className="text-xs font-normal text-primary hover:underline cursor-pointer transition-colors"
                >
                  Open Existing Form
                </button>
              )}
            </div>

            {/* Checkbox Options matching Figma */}
            <div className="space-y-2">
              {AMENDMENT_CHANGE_OPTIONS.map((option) => {
                const isChecked = selectedChanges.includes(option);
                return (
                  <label
                    key={option}
                    className="flex items-center gap-2.5 text-xs md:text-sm text-txt-primary font-normal cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleChangeOption(option)}
                      className="h-4 w-4 rounded-xs border-border text-primary focus:ring-primary/20 cursor-pointer"
                    />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Effective Date Section */}
          <div>
            <label className="block text-xs font-normal text-txt-primary mb-1">
              Effective Date
            </label>
            <div className="relative">
              <input
                type="text"
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
                placeholder="dd/mm/yyyy"
                className="w-full rounded-xs border border-border bg-card-bg px-3 py-2 text-xs md:text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary pr-9"
              />
              <input
                type="date"
                ref={datePickerRef}
                onChange={(e) => handleNativeDatePick(e.target.value)}
                className="sr-only"
                tabIndex={-1}
              />
              <button
                type="button"
                onClick={triggerDatePicker}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary-subheading hover:text-txt-primary cursor-pointer transition-colors"
                title="Pick date"
              >
                <Calendar className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Reason for Amendment Section */}
          <div>
            <label className="block text-xs font-normal text-txt-primary mb-1">
              Reason for Amendment
            </label>
            <div className="relative">
              <textarea
                value={reason}
                onChange={(e) => {
                  if (e.target.value.length <= 200) {
                    setReason(e.target.value);
                  }
                }}
                rows={3}
                placeholder="Explain what looked wrong and what they need to re-submit"
                className="w-full rounded-xs border border-border bg-card-bg p-3 text-xs md:text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none placeholder:text-secondary-subheading/60 pb-6"
              />
              <span className="absolute bottom-2 right-3 text-[11px] text-secondary-subheading font-normal">
                {reason.length}/200
              </span>
            </div>
          </div>

          {/* Footer Actions matching Figma: Cancel & Send to Customer */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xs border border-border bg-card-bg text-txt-primary hover:bg-page-bg text-xs md:text-sm font-medium transition-colors cursor-pointer text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xs bg-primary text-white hover:bg-primary-hover text-xs md:text-sm font-medium shadow-2xs transition-colors cursor-pointer text-center"
            >
              Send to Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateAmendmentModal;

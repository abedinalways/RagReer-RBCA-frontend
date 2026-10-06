"use client";
import React, { useState } from "react";
import { X, CheckCircle, AlertTriangle } from "lucide-react";

interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalAmount: string;
}

export const ApproveModal: React.FC<ApproveModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  totalAmount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-card-bg w-full max-w-md rounded-xl shadow-xl border border-border overflow-hidden">
        <div className="p-5 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <h3 className="text-[1.0625rem] font-semibold text-primary-heading">
              Approve Estimate
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-secondary-subheading hover:text-primary-heading hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          <p className="text-[0.875rem] text-secondary-subheading leading-relaxed">
            Are you sure you want to approve this estimate for a total of{" "}
            <span className="font-semibold text-primary-heading">
              {totalAmount}
            </span>
            ? Once approved, a service contract and agreements will be prepared for your signature.
          </p>
        </div>

        <div className="p-4 bg-slate-50 flex items-center justify-end gap-3 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-secondary-subheading hover:text-primary-heading cursor-pointer rounded-md border border-border bg-card-bg"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-hover cursor-pointer rounded-md shadow-2xs"
          >
            Confirm & Approve
          </button>
        </div>
      </div>
    </div>
  );
};

import { Modal } from "@/components/reusable/Modal";
import { useRef } from "react";
import { FileUp, FileText } from "lucide-react";

export interface RevisionFormData {
  reasons: string[];
  description: string;
  attachment?: File | null;
}

interface RevisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RevisionFormData) => void;
  onRescheduleAppointment?: () => void;
}

const REVISION_OPTIONS = ["Price", "Service", "Appointment", "Other"];

export const RevisionModal: React.FC<RevisionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onRescheduleAppointment,
}) => {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleToggleReason = (opt: string) => {
    setSelectedReasons((prev) =>
      prev.includes(opt) ? prev.filter((item) => item !== opt) : [...prev, opt]
    );
  };

  const handleReset = () => {
    setSelectedReasons([]);
    setDescription("");
    setAttachment(null);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleSubmit = () => {
    onSubmit({
      reasons: selectedReasons,
      description,
      attachment,
    });
    handleReset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        <span className="text-base md:text-lg font-bold text-primary-heading">
          Request Estimate Revision
        </span>
      }
      maxWidth="lg"
      contentClassName="p-5 sm:p-6 space-y-4 text-left"
      footer={
        <div className="flex items-center gap-3 w-full">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 h-9 md:h-10 rounded-md border border-border hover:border-primary/50 text-primary hover:bg-slate-50 font-medium text-xs md:text-sm transition-colors cursor-pointer bg-card-bg flex items-center justify-center"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 h-9 md:h-10 rounded-md bg-primary hover:bg-primary-hover text-white font-medium text-xs md:text-sm transition-colors cursor-pointer shadow-2xs flex items-center justify-center"
          >
            Submit Request
          </button>
        </div>
      }
    >
      {/* What would you like to change? */}
      <div className="space-y-2">
        <label className="block text-xs md:text-sm font-semibold text-primary-heading">
          What would you like to change?
        </label>
        <div className="space-y-2 pt-0.5">
          {REVISION_OPTIONS.map((opt) => (
            <div key={opt} className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={selectedReasons.includes(opt)}
                  onChange={() => handleToggleReason(opt)}
                  className="w-4 h-4 rounded border-border-input text-primary focus:ring-primary/20 accent-primary cursor-pointer"
                />
                <span className="text-xs md:text-sm text-primary-heading font-normal">
                  {opt}
                </span>
              </label>

              {opt === "Appointment" && selectedReasons.includes("Appointment") && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onRescheduleAppointment?.();
                  }}
                  className="text-primary hover:underline text-xs md:text-sm font-medium transition-colors cursor-pointer"
                >
                  Reschedule appointment here
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Describe the reason: */}
      <div className="space-y-1.5 pt-1">
        <label className="block text-xs md:text-sm font-semibold text-primary-heading">
          Describe the reason:
        </label>
        <div className="relative border border-border-input rounded-md focus-within:ring-1 focus-within:ring-primary/40 focus-within:border-primary/50 bg-card-bg">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 200))}
            rows={4}
            placeholder="Please describe the changes you'd like to request..."
            className="w-full p-3 pb-6 text-xs md:text-sm focus:outline-none text-primary-heading placeholder:text-secondary-subheading/60 resize-none bg-transparent"
          />
          <div className="absolute bottom-2 right-2.5 text-[11px] text-secondary-subheading select-none">
            {description.length}/200
          </div>
        </div>
      </div>

      {/* Attachments (optional) */}
      <div className="space-y-1.5 pt-1">
        <label className="block text-xs md:text-sm font-semibold text-primary-heading">
          Attachments{" "}
          <span className="font-normal text-secondary-subheading">(optional)</span>
        </label>

        {attachment ? (
          <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-page-bg/50">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded bg-[#EAF2F9] flex items-center justify-center text-primary shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs md:text-sm font-medium text-primary-heading truncate">
                  {attachment.name}
                </p>
                <p className="text-[11px] text-secondary-subheading">
                  {(attachment.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAttachment(null)}
              className="p-1 text-secondary-subheading hover:text-decline transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                setAttachment(e.dataTransfer.files[0]);
              }
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`border border-dashed rounded-lg p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border-input bg-card-bg hover:bg-slate-50/50"
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setAttachment(e.target.files[0]);
                }
              }}
              className="hidden"
            />
            <div className="w-10 h-10 rounded-full bg-[#EAF2F9] flex items-center justify-center text-primary mb-2 shadow-2xs">
              <FileUp className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xs md:text-sm font-medium text-primary-heading">
              Drag & Drop image or{" "}
              <span className="text-primary hover:underline">Browse file</span>
            </p>
            <p className="text-[11px] text-secondary-subheading mt-0.5">
              JPG, PNG or PDF (Max 5MB)
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

interface DeclineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export const DeclineModal: React.FC<DeclineModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-card-bg w-full max-w-[460px] rounded-lg shadow-xl border border-border p-6 relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary-subheading hover:text-primary-heading cursor-pointer p-1 rounded-md transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title & Description */}
        <div className="pt-2 text-center">
          <h3 className="text-base md:text-lg font-bold text-primary-heading leading-snug">
            Are you sure you want to decline the estimate?
          </h3>
          <p className="text-xs md:text-sm text-secondary-subheading mt-2 max-w-sm mx-auto leading-relaxed">
            By doing this the estimate will be cancelled and the request wil mark as closed.
          </p>
        </div>

        {/* Reason Textarea */}
        <div className="mt-5 space-y-1.5 text-left">
          <label className="block text-xs md:text-sm font-semibold text-primary-heading">
            Describe the reason:
          </label>
          <div className="relative border border-border-input rounded-md focus-within:ring-1 focus-within:ring-primary/40 focus-within:border-primary/50 bg-card-bg">
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value.slice(0, 200))}
              rows={4}
              placeholder="Please describe the reason"
              className="w-full p-3 pb-6 text-xs md:text-sm focus:outline-none text-primary-heading placeholder:text-secondary-subheading/60 resize-none bg-transparent"
            />
            <div className="absolute bottom-2 right-2.5 text-[11px] text-secondary-subheading select-none">
              {reason.length}/200
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center gap-3 w-full">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-9 md:h-10 rounded-md border border-primary text-primary hover:bg-primary/5 font-medium text-xs md:text-sm transition-colors cursor-pointer bg-card-bg flex items-center justify-center"
          >
            No! Back to estimate
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(reason);
              onClose();
            }}
            className="flex-1 h-9 md:h-10 rounded-md border border-decline-border text-decline hover:bg-decline-secondary font-medium text-xs md:text-sm transition-colors cursor-pointer bg-card-bg flex items-center justify-center"
          >
            Yes, Decline
          </button>
        </div>
      </div>
    </div>
  );
};

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

interface RevisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (notes: string) => void;
}

export const RevisionModal: React.FC<RevisionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-card-bg w-full max-w-lg rounded-xl shadow-xl border border-border overflow-hidden">
        <div className="p-5 flex items-center justify-between border-b border-border">
          <h3 className="text-[1.0625rem] font-semibold text-primary-heading">
            Request Estimate Revision
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-secondary-subheading hover:text-primary-heading hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          <p className="text-[0.875rem] text-secondary-subheading leading-relaxed">
            Please describe what changes or adjustments you would like to request on this estimate:
          </p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="e.g., Please adjust the mulch area, or modify the service schedule..."
            className="w-full border border-border-input rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-primary-heading"
          />
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
              onSubmit(notes);
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-hover cursor-pointer rounded-md shadow-2xs"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
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

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
  const [reason, setReason] = useState("Budget constraints");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-card-bg w-full max-w-md rounded-xl shadow-xl border border-border overflow-hidden">
        <div className="p-5 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-500" />
            <h3 className="text-[1.0625rem] font-semibold text-primary-heading">
              Decline Estimate
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
            Please let us know the reason for declining this estimate:
          </p>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border border-border-input rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-primary-heading bg-card-bg"
          >
            <option value="Budget constraints">Budget constraints</option>
            <option value="Timeline does not match">Timeline does not match</option>
            <option value="Found alternative provider">Found alternative provider</option>
            <option value="Project cancelled">Project cancelled</option>
            <option value="Other">Other</option>
          </select>
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
              onConfirm(reason);
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 cursor-pointer rounded-md shadow-2xs"
          >
            Confirm Decline
          </button>
        </div>
      </div>
    </div>
  );
};

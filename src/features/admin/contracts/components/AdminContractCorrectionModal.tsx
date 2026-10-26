"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

interface AdminContractCorrectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { selectedIssues: string[]; message: string }) => void;
}

const CORRECTION_OPTIONS = [
  "Authorized Person Name",
  "Organization Name",
  "Authority",
  "Signature image or mark",
  "Re - upload document",
];

export const AdminContractCorrectionModal: React.FC<
  AdminContractCorrectionModalProps
> = ({ isOpen, onClose, onSubmit }) => {
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const toggleIssue = (issue: string) => {
    setSelectedIssues((prev) =>
      prev.includes(issue)
        ? prev.filter((i) => i !== issue)
        : [...prev, issue]
    );
  };

  const handleSubmit = () => {
    if (selectedIssues.length === 0 && !message.trim()) {
      toast.error("Please select at least one item or write a message.");
      return;
    }

    onSubmit({
      selectedIssues,
      message: message.trim(),
    });
    setSelectedIssues([]);
    setMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-card-bg w-full max-w-[500px] rounded-sm shadow-2xl border border-border p-5 sm:p-6 space-y-4 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-1 border-b border-border-subtle">
          <h2 className="font-barlow-condensed text-xl md:text-2xl font-medium text-primary-heading">
            Correction Request
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-xs text-secondary-subheading hover:text-txt-primary hover:bg-page-bg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* What needs correcting? Checkbox list */}
        <div className="space-y-2.5 pt-1">
          <h3 className="text-xs md:text-sm font-medium text-primary-heading">
            What needs correcting?
          </h3>

          <div className="space-y-2">
            {CORRECTION_OPTIONS.map((opt) => {
              const isChecked = selectedIssues.includes(opt);
              return (
                <label
                  key={opt}
                  className="flex items-center gap-2.5 text-xs md:text-sm text-txt-primary font-normal cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleIssue(opt)}
                    className="h-4 w-4 rounded-xs border-border text-primary focus:ring-0 cursor-pointer"
                  />
                  <span>{opt}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Message for Customer */}
        <div className="space-y-1.5 pt-1">
          <label className="block text-xs md:text-sm font-medium text-primary-heading">
            Message for Customer
          </label>
          <div className="relative">
            <textarea
              rows={4}
              maxLength={200}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Explain what looked wrong and what they need to re-submit"
              className="w-full rounded-xs border border-border bg-card-bg p-3 text-xs md:text-sm text-txt-primary placeholder:text-secondary-subheading/60 focus:border-primary focus:outline-hidden transition-colors resize-none pb-7"
            />
            <span className="absolute right-2.5 bottom-2 text-[11px] text-secondary-subheading/70 font-normal">
              {message.length}/200
            </span>
          </div>
        </div>

        {/* Bottom Actions matching Screenshot 4: Cancel & Submit Request */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xs border border-border bg-card-bg text-secondary-subheading hover:text-txt-primary hover:bg-page-bg text-xs md:text-sm font-medium transition-colors cursor-pointer text-center"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-2.5 px-4 rounded-xs bg-primary text-white hover:bg-primary-hover text-xs md:text-sm font-medium shadow-2xs transition-colors cursor-pointer text-center"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminContractCorrectionModal;

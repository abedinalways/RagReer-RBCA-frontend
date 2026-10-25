"use client";

import React, { useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import { CrewMemberItem } from "../types/crewMembers.types";

interface SuspendMemberModalProps {
  member: CrewMemberItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const SuspendMemberModal: React.FC<SuspendMemberModalProps> = ({
  member,
  isOpen,
  onClose,
  onConfirm,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !member) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-card-bg rounded-xl border border-border shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150 text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-secondary-subheading hover:text-primary-heading p-1 rounded-md hover:bg-page-bg transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Warning Icon Container */}
        <div className="mx-auto w-14 h-14 rounded-full border-2 border-decline/30 bg-decline-secondary/40 text-decline flex items-center justify-center">
          <AlertCircle className="w-7 h-7 text-decline" />
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-medium text-primary-heading font-barlow-condensed leading-snug">
            Are you sure want to suspend this member?
          </h2>
          <p className="text-xs sm:text-sm text-secondary-subheading leading-relaxed max-w-sm mx-auto">
            Suspending <span className="font-semibold text-primary-heading">{member.name}</span> will permanently block the access to the platform. User will not be able to log in or perform any actions.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-md border border-border text-xs sm:text-sm font-medium hover:bg-page-bg text-txt-primary cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full py-2.5 px-4 rounded-md border border-decline text-decline hover:bg-decline hover:text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            Suspend
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuspendMemberModal;

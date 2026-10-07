"use client";

import { useEffect } from "react";
import { ChevronRight } from "lucide-react";

interface TravelCompletedConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function TravelCompletedConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: TravelCompletedConfirmModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="travel-completed-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-card-bg rounded-lg p-6 max-w-sm w-full space-y-5 shadow-2xl border border-border text-center transform transition-all animate-in zoom-in-95 duration-200">
        {/* Main Title matching Image 3 */}
        <h2
          id="travel-completed-title"
          className="font-barlow text-3xl font-bold tracking-tight text-primary"
        >
          Travel Completed
        </h2>

        {/* Message Container Card */}
        <div className="rounded-md bg-page-bg p-5 text-center space-y-2">
          <h3 className="font-barlow text-lg font-bold text-primary-heading leading-tight">
            You&apos;ve Arrived. Let&apos;s Begin.
          </h3>
          <p className="text-xs text-secondary-subheading leading-relaxed">
            Your travel to the property is complete. Confirm your arrival to
            proceed with the site visit and start the assessment.
          </p>
        </div>

        {/* Action Button: Travel Completed > */}
        <div className="pt-1 space-y-2">
          <button
            type="button"
            onClick={onConfirm}
            className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-md bg-primary hover:bg-primary-hover text-primary-text font-medium text-sm transition-all shadow-sm cursor-pointer active:scale-[0.99]"
          >
            <span>Travel Completed</span>
            <ChevronRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-1.5 text-xs font-medium text-secondary-subheading hover:text-txt-primary transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

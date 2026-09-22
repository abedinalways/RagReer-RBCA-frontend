"use client";

import { CheckCircle2 } from "lucide-react";

interface TravelCompletedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartVisit: () => void;
}

export function TravelCompletedModal({
  isOpen,
  onClose,
  onStartVisit,
}: TravelCompletedModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full space-y-4 shadow-xl border border-border text-center">
        {/* Success Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-primary">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>

        {/* Headings */}
        <div className="space-y-1.5">
          <h3 className="font-barlow text-2xl font-semibold text-primary-heading">
            Travel Completed
          </h3>
          <p className="text-sm font-medium text-txt-primary">
            You've Arrived. Let's Begin.
          </p>
        </div>

        {/* Explanatory Body */}
        <p className="text-xs text-secondary-subheading leading-relaxed">
          Once you've arrived at the property, click 'Start Property Visit' to record the exact arrival time and automatically begin your on-site work session.
        </p>

        {/* Actions */}
        <div className="pt-2 space-y-2">
          <button
            type="button"
            onClick={onStartVisit}
            className="w-full py-3 px-4 rounded-sm bg-primary text-white font-medium text-sm transition-all hover:bg-primary-hover active:scale-[0.99] cursor-pointer shadow-sm"
          >
            Start Property Visit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-xs font-medium text-secondary-subheading hover:text-txt-primary transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

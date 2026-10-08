"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

export interface PasswordSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PasswordSuccessModal: React.FC<PasswordSuccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Auto-close after 5s or user click
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-card-bg w-full max-w-[390px] rounded-xl shadow-2xl border border-border flex flex-col items-center text-center p-7 sm:p-8 relative animate-in zoom-in-95 duration-150">
        {/* Success Icon matching Figma Screenshot 3 */}
        <div className="w-13 h-13 rounded-full bg-blue-50/70 flex items-center justify-center mb-3.5">
          <Check className="w-6 h-6 text-primary stroke-[2.5]" />
        </div>

        {/* Title matching Figma Screenshot 3 */}
        <h3 className="text-base sm:text-lg font-semibold text-primary-heading">
          Password changed successfully.
        </h3>

        {/* Subtitle matching Figma Screenshot 3 */}
        <p className="text-xs sm:text-sm text-secondary-subheading font-normal mt-1.5 max-w-[280px]">
          You&apos;ve successfully changed the password. You&apos;ll receive an alert about this change.
        </p>

        {/* Link to Main Dashboard matching Figma Screenshot 3 */}
        <Link
          href="/customer"
          onClick={onClose}
          className="mt-4 text-xs sm:text-sm text-primary font-medium hover:underline cursor-pointer"
        >
          Go to the main dashboard
        </Link>
      </div>
    </div>
  );
};

export default PasswordSuccessModal;

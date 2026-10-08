"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure want to delete this item?",
  description = "This action can not be undone. Do you want to continue?",
}: DeleteConfirmationModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-card-bg w-full max-w-[420px] rounded-xl shadow-2xl border border-border p-6 sm:p-7 relative animate-in zoom-in-95 duration-150">
        {/* Close X Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-1 rounded-md text-secondary-subheading hover:text-txt-primary hover:bg-page-bg transition-colors cursor-pointer"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Content */}
        <div className="text-center pt-2">
          {/* Red Alert Exclamation Icon */}
          <div className="w-12 h-12 rounded-full border-2 border-[#F04438] flex items-center justify-center text-[#F04438] mx-auto mb-4">
            <span className="text-xl font-bold leading-none select-none">!</span>
          </div>

          {/* Heading */}
          <h3 className="text-lg sm:text-xl font-bold text-primary-heading leading-snug">
            {title}
          </h3>

          {/* Subtext */}
          <p className="text-xs sm:text-sm text-secondary-subheading mt-2 max-w-xs mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3.5 sm:gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-5 rounded-md border border-[#5980A6]/60 text-[#2D6A9F] hover:bg-page-bg font-medium text-sm md:text-base transition-colors cursor-pointer text-center"
          >
            No
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 px-5 rounded-md border border-[#F04438] text-[#F04438] hover:bg-[#F04438]/10 font-medium text-sm md:text-base transition-colors cursor-pointer text-center"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

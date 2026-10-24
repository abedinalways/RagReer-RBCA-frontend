"use client";

import React, { useEffect } from "react";
import { X, AlertCircle } from "lucide-react";

interface DeleteLogConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteLogConfirmModal: React.FC<DeleteLogConfirmModalProps> = ({
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-card-bg rounded-xl border border-border shadow-2xl max-w-sm w-full p-6 text-center space-y-4 relative animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-secondary-subheading hover:text-primary-heading p-1 rounded-md hover:bg-page-bg transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Red Exclamation Icon Circle (Figma Image 3) */}
        <div className="w-14 h-14 rounded-full border-2 border-decline/80 flex items-center justify-center mx-auto text-decline">
          <span className="text-2xl font-bold font-serif leading-none">!</span>
        </div>

        {/* Title & Description */}
        <div className="space-y-1">
          <h2 className="text-xl font-medium text-primary-heading font-barlow-condensed">
            Are you sure?
          </h2>
          <p className="text-xs sm:text-sm text-secondary-subheading leading-relaxed">
            This action can not be undone. Do you want to continue?
          </p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 px-4 rounded-md border border-border text-xs sm:text-sm font-medium hover:bg-page-bg text-txt-primary cursor-pointer transition-colors"
          >
            No
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full py-2 px-4 rounded-md border border-decline text-decline hover:bg-decline hover:text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteLogConfirmModal;

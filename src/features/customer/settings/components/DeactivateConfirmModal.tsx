"use client";

import React from "react";

export interface DeactivateConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeactivateConfirmModal: React.FC<DeactivateConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
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
      <div className="bg-card-bg w-full max-w-[490px] rounded-xl shadow-2xl border border-border flex flex-col items-center text-center p-7 sm:p-9 relative animate-in zoom-in-95 duration-150">
        {/* Title matching Figma Screenshot 5 */}
        <h3 className="text-xl sm:text-2xl font-semibold text-primary-heading">
          Are you sure?
        </h3>

        {/* Description matching Figma Screenshot 5 */}
        <p className="text-xs sm:text-sm text-secondary-subheading font-normal mt-3 max-w-sm sm:max-w-md mx-auto leading-relaxed">
          All business records including contracts, invoices, payments, and
          approvals cannot be deleted and will be retained by Half-Stache
          Enterprises.
        </p>

        {/* Two Action Buttons matching Figma Screenshot 5 */}
        <div className="grid grid-cols-2 gap-3.5 w-full mt-7">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xs border border-primary text-primary hover:bg-page-bg font-medium text-xs sm:text-sm transition-colors cursor-pointer text-center"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full py-2.5 rounded-xs border border-rose-400 bg-white hover:bg-rose-50 text-rose-500 font-medium text-xs sm:text-sm transition-colors cursor-pointer text-center"
          >
            Yes, deactivate
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeactivateConfirmModal;

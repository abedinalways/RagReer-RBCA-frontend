"use client";

import React from "react";
import { Modal } from "@/components/reusable/Modal";
import CrossIcon from "@/components/icons/customer/CrossIcon";

export interface PaymentFailedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTryAgain?: () => void;
  onContactUs?: () => void;
  errorMessage?: string;
}

export const PaymentFailedModal: React.FC<PaymentFailedModalProps> = ({
  isOpen,
  onClose,
  onTryAgain,
  onContactUs,
  errorMessage = "Your payment has been failed. Please try again or contact with the HALF STACHE team.",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      className="max-w-[420px]"
      contentClassName="p-6 text-center"
      footer={
        <div className="grid grid-cols-2 gap-3 w-full">
          <button
            type="button"
            onClick={onContactUs || onClose}
            className="w-full py-2.5 rounded-xs border border-border hover:bg-slate-50 text-secondary-subheading font-medium text-xs sm:text-sm transition-colors cursor-pointer bg-card-bg flex items-center justify-center"
          >
            Contact Us
          </button>
          <button
            type="button"
            onClick={onTryAgain || onClose}
            className="w-full py-2.5 rounded-xs bg-primary hover:bg-primary-hover text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer shadow-2xs flex items-center justify-center"
          >
            Try Again
          </button>
        </div>
      }
    >
      {/* Failed Cross Icon */}
      <div className="w-13 h-13 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
        <CrossIcon className="w-6 h-6 text-secondary-subheading" />
      </div>

      <h3 className="text-lg sm:text-xl font-medium text-primary-heading">
        Payment Failed
      </h3>

      <p className="text-xs sm:text-sm text-secondary-subheading leading-relaxed max-w-xs mx-auto mt-2">
        {errorMessage}
      </p>
    </Modal>
  );
};

export default PaymentFailedModal;

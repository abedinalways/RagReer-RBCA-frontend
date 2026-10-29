"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { CustomerItem } from "../types/adminCustomers.types";

interface DeleteCustomerModalProps {
  customer: CustomerItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ASSOCIATED_ITEMS = [
  { id: "portal", label: "Access their customer portal" },
  { id: "properties", label: "Customer Property Details" },
  { id: "services", label: "Customer Service Requests" },
  { id: "estimates", label: "Estimates" },
  { id: "contracts", label: "Contracts & Agreements" },
  { id: "jobs", label: "Jobs & Visits" },
  { id: "invoices", label: "Invoices & Payments" },
  { id: "profitability", label: "Profitability" },
];

export const DeleteCustomerModal: React.FC<DeleteCustomerModalProps> = ({
  customer,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      setCheckedItems([]);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !customer) return null;

  const toggleItem = (id: string) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-card-bg rounded-xl border border-border shadow-2xl max-w-md w-full p-6 space-y-5 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-xl font-medium text-primary-heading font-barlow-condensed">
            Delete This Customer?
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-secondary-subheading hover:text-primary-heading p-1 rounded-md hover:bg-page-bg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning Subtitle */}
        <p className="text-xs sm:text-sm text-secondary-subheading leading-relaxed">
          Deleting this customer will permanently remove them from Half Stache.
          You will also be deleting the following items and their associated information.
        </p>

        {/* Checkbox List (Figma Image 4) */}
        <div className="space-y-2.5 pt-1">
          {ASSOCIATED_ITEMS.map((item) => {
            const isChecked = checkedItems.includes(item.id);
            return (
              <label
                key={item.id}
                className="flex items-center gap-2.5 text-xs sm:text-sm text-txt-primary cursor-pointer select-none hover:text-primary-heading"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleItem(item.id)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 accent-primary cursor-pointer"
                />
                <span>{item.label}</span>
              </label>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 px-4 rounded-md border border-border text-xs sm:text-sm font-medium hover:bg-page-bg text-txt-primary cursor-pointer transition-colors text-center"
          >
            No, Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full py-2 px-4 rounded-md border border-decline text-decline hover:bg-decline hover:text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer text-center"
          >
            Yes, Delete!
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCustomerModal;

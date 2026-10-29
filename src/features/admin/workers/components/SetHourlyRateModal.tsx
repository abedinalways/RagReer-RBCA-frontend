"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { DatePickerInput } from "@/components/ui/DatePickerInput";
import { SetHourlyRateFormData } from "../types/crewMembers.types";

interface SetHourlyRateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRate?: string;
  currentFrequency?: string;
  onSave: (data: SetHourlyRateFormData) => void;
}

const FREQUENCY_OPTIONS = [
  { value: "Hourly", label: "Hourly" },
  { value: "Weekly", label: "Weekly" },
  { value: "Bi-weekly", label: "Bi-weekly" },
  { value: "Monthly", label: "Monthly" },
];

export const SetHourlyRateModal: React.FC<SetHourlyRateModalProps> = ({
  isOpen,
  onClose,
  currentRate = "65.00",
  currentFrequency = "Monthly",
  onSave,
}) => {
  const [formData, setFormData] = useState<SetHourlyRateFormData>({
    hourlyRate: currentRate.replace(/[^0-9.]/g, "") || "65.00",
    payFrequency: currentFrequency || "Monthly",
    effectiveFrom: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
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
            Set Hourly Rate
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Hourly Rate */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-primary-heading">
              Hourly Rate <span className="text-decline">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.hourlyRate}
              onChange={(e) =>
                setFormData({ ...formData, hourlyRate: e.target.value })
              }
              placeholder="65.00"
              className="w-full px-3 py-2 text-xs sm:text-sm border border-border-input rounded-md bg-input-bg text-txt-primary placeholder:text-secondary-subheading/60 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Pay Frequency */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-primary-heading">
              Pay Frequency <span className="text-decline">*</span>
            </label>
            <CustomSelect
              value={formData.payFrequency}
              onChange={(val) =>
                setFormData({ ...formData, payFrequency: val })
              }
              options={FREQUENCY_OPTIONS}
              size="sm"
              triggerClassName="h-[38px] px-3 text-xs sm:text-sm border-border-input"
            />
          </div>

          {/* Effective From with interactive Calendar */}
          <DatePickerInput
            label="Effective From"
            required
            value={formData.effectiveFrom}
            onChange={(val) =>
              setFormData({ ...formData, effectiveFrom: val })
            }
            placeholder="dd/mm/yyyy"
          />

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-border rounded-md text-xs sm:text-sm font-medium text-secondary-subheading hover:bg-page-bg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs"
            >
              Save & Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetHourlyRateModal;

"use client";
import React, { useState } from "react";
import { Check } from "lucide-react";
import { Modal } from "@/components/reusable/Modal";
import { AdminAppointmentItem } from "../types/adminSchedule.types";

interface AdminCancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: AdminAppointmentItem | null;
  onCancelSuccess: (cancelledAppointment: AdminAppointmentItem) => void;
}

export const AdminCancelModal: React.FC<AdminCancelModalProps> = ({
  isOpen,
  onClose,
  appointment,
  onCancelSuccess,
}) => {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [note, setNote] = useState<string>("Our Crew member has injured.");

  if (!appointment) return null;

  const reasonsList = [
    "Customer requested",
    "Crew unavailable",
    "Safety concern",
    "Payment issue",
    "Weather Issue",
    "Other",
  ];

  const handleToggleReason = (reason: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  const handleConfirmCancel = () => {
    const updated: AdminAppointmentItem = {
      ...appointment,
      status: "Cancelled",
      cancellationReason: selectedReasons.join(", ") || "Other",
    };
    onCancelSuccess(updated);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      title={
        <h3 className="text-xl font-medium text-primary-heading font-barlow-condensed leading-tight">
          Cancel This Appointment?
        </h3>
      }
      footer={
        <div className="w-full flex items-center justify-between gap-3 text-xs sm:text-sm">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 sm:flex-none px-6 py-2.5 border border-primary text-primary hover:bg-blue-50/60 rounded-md font-medium transition-colors cursor-pointer text-center"
          >
            No, Go Back
          </button>
          <button
            type="button"
            onClick={handleConfirmCancel}
            className="flex-1 sm:flex-none px-6 py-2.5 border border-decline text-decline hover:bg-decline-secondary rounded-md font-medium transition-colors cursor-pointer text-center"
          >
            Yes, Cancel Appointment!
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Select Reason */}
        <div className="space-y-2.5">
          <label className="block text-xs sm:text-sm font-medium text-primary-heading">
            Select Reason
          </label>
          <div className="space-y-2">
            {reasonsList.map((reason) => {
              const isChecked = selectedReasons.includes(reason);
              return (
                <label
                  key={reason}
                  className="flex items-center gap-2.5 text-xs sm:text-sm text-secondary-subheading hover:text-primary-heading cursor-pointer select-none"
                >
                  <button
                    type="button"
                    onClick={() => handleToggleReason(reason)}
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-colors cursor-pointer ${
                      isChecked
                        ? "border-primary bg-primary text-white"
                        : "border-border-input bg-card-bg text-transparent"
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </button>
                  <span>{reason}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Add Note to Customer (Optional) */}
        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-medium text-primary-heading">
            Add Note to Customer <span className="text-secondary-subheading font-normal">(Optional)</span>
          </label>
          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add explanation or note..."
            className="w-full border border-border rounded-md p-3 text-xs sm:text-sm text-primary-heading bg-card-bg focus:outline-none focus:border-primary resize-none placeholder:text-secondary-subheading/60"
          />
        </div>
      </div>
    </Modal>
  );
};

export default AdminCancelModal;

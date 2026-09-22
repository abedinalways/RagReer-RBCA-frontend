"use client";

import { Pencil } from "lucide-react";

interface DiscardChangesModalProps {
  isOpen: boolean;
  onConfirmDiscard: () => void;
  onCancel: () => void;
}

export function DiscardChangesModal({
  isOpen,
  onConfirmDiscard,
  onCancel,
}: DiscardChangesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-xs rounded-2xl bg-white p-6 shadow-2xl flex flex-col items-center text-center border border-slate-100 animate-in zoom-in-95 duration-150">
        {/* Pencil Badge */}
        <div className="h-14 w-14 rounded-full bg-[#E7F1FB] flex items-center justify-center mb-3">
          <Pencil className="h-6 w-6 text-primary" />
        </div>

        {/* Title */}
        <h3 className="font-barlow text-lg font-bold text-primary-heading leading-tight">
          Discard changes?
        </h3>

        {/* Subtitle */}
        <p className="text-xs text-secondary-subheading mt-1 mb-5">
          Unsaved changes will be lost.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-2.5 w-full">
          <button
            type="button"
            onClick={onConfirmDiscard}
            className="w-full py-2.5 rounded-sm bg-primary text-white text-xs font-semibold hover:bg-primary-hover active:scale-[0.99] transition-all shadow-xs cursor-pointer"
          >
            Yes, Change
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="w-full py-2.5 rounded-sm border border-primary text-primary text-xs font-semibold hover:bg-primary/5 active:scale-[0.99] transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

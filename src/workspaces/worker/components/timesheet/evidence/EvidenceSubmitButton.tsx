"use client";

import { ChevronRight } from "lucide-react";

interface EvidenceSubmitButtonProps {
  isSubmitting: boolean;
  onSubmit: (e?: React.FormEvent) => void;
}

export function EvidenceSubmitButton({
  isSubmitting,
  onSubmit,
}: EvidenceSubmitButtonProps) {
  return (
    <div className="pt-2">
      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-md bg-primary hover:bg-primary-hover text-primary-text font-medium text-sm transition-all shadow-sm cursor-pointer active:scale-[0.99] disabled:opacity-50"
      >
        <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { ChevronRight } from "lucide-react";

interface AssignTasksPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export function AssignTasksPromptModal({
  isOpen,
  onClose,
  onProceed,
}: AssignTasksPromptModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="assign-tasks-prompt-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-card-bg rounded-lg p-6 max-w-sm w-full space-y-5 shadow-2xl border border-border text-center transform transition-all animate-in zoom-in-95 duration-200">
        {/* Title matching Image 4 */}
        <h2
          id="assign-tasks-prompt-title"
          className="font-barlow text-3xl font-bold tracking-tight text-primary"
        >
          Assign Tasks
        </h2>

        {/* Message Container Card */}
        <div className="rounded-md bg-page-bg p-5 text-center space-y-2">
          <h3 className="font-barlow text-lg font-bold text-primary-heading leading-tight">
            Before start, assign all tasks among the members.
          </h3>
          <p className="text-xs text-secondary-subheading leading-relaxed">
            This will help the admin to track each of yours task activity on the
            field.
          </p>
        </div>

        {/* Action Button: Assign Tasks > */}
        <div className="pt-1 space-y-2">
          <button
            type="button"
            onClick={onProceed}
            className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-md bg-primary hover:bg-primary-hover text-primary-text font-medium text-sm transition-all shadow-sm cursor-pointer active:scale-[0.99]"
          >
            <span>Assign Tasks</span>
            <ChevronRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-1.5 text-xs font-medium text-secondary-subheading hover:text-txt-primary transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

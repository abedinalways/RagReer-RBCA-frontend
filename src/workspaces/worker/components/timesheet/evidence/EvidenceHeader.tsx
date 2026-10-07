"use client";

import { ArrowLeft } from "lucide-react";

interface EvidenceHeaderProps {
  title?: string;
  onBack: () => void;
}

export function EvidenceHeader({
  title = "Work Completed",
  onBack,
}: EvidenceHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 bg-pure-white-bg border-b border-border px-4 py-3.5 shadow-2xs">
      <button
        type="button"
        onClick={onBack}
        className="p-1 -ml-1 rounded-md text-primary-heading hover:bg-blue-50/60 transition-colors cursor-pointer active:scale-95"
        aria-label="Back"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <h1 className="font-barlow text-xl sm:text-2xl font-bold tracking-tight text-primary-heading">
        {title}
      </h1>
    </header>
  );
}

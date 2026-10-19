"use client";

import React from "react";
import { Download } from "lucide-react";

interface ActivityHeaderProps {
  onExport: () => void;
  disabled?: boolean;
}

export function ActivityHeader({ onExport, disabled }: ActivityHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 pb-1">
      {/* Page Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-primary-heading tracking-tight">
        Activity Log
      </h1>

      {/* Export Action Button */}
      <button
        type="button"
        onClick={onExport}
        disabled={disabled}
        aria-label="Export activity logs"
        className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-lg bg-[#5980A6] hover:bg-[#4A6E91] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-medium shadow-xs hover:shadow-sm active:scale-98 transition-all cursor-pointer"
      >
        <span>Export</span>
        <Download className="w-4 h-4 shrink-0 stroke-[2.2]" />
      </button>
    </div>
  );
}

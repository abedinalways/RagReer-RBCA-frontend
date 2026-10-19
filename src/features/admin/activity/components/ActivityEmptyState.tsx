"use client";

import React from "react";
import { Clock, RotateCcw } from "lucide-react";

interface ActivityEmptyStateProps {
  onReset: () => void;
}

export function ActivityEmptyState({ onReset }: ActivityEmptyStateProps) {
  return (
    <div className="py-12 sm:py-16 text-center flex flex-col items-center justify-center px-4">
      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3.5 text-[#5980A6]">
        <Clock className="w-6 h-6 stroke-[1.8]" />
      </div>
      <h3 className="text-base font-semibold text-primary-heading">
        No activities found
      </h3>
      <p className="text-xs sm:text-sm text-secondary-subheading mt-1 max-w-sm">
        We couldn&apos;t find any events matching your current search or filter criteria.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#EAECF0] bg-white text-xs sm:text-sm font-medium text-primary hover:bg-[#F9FAFB] transition-colors cursor-pointer shadow-2xs"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset Filters</span>
      </button>
    </div>
  );
}

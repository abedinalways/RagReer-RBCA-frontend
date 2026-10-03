"use client";

import React from "react";
import { Layers, Plus } from "lucide-react";
import { ImportIcon } from "@/components/icons/ImportIcon";

interface PropertyEmptyStateProps {
  onImportClick: () => void;
  onAddClick: () => void;
}

export const PropertyEmptyState: React.FC<PropertyEmptyStateProps> = ({
  onImportClick,
  onAddClick,
}) => {
  return (
    <div className="w-full py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-xl bg-card-bg border border-border rounded-xl p-8 sm:p-12 text-center shadow-xs flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-5 shrink-0">
          <Layers className="w-8 h-8 text-primary stroke-[1.75]" />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-primary-heading tracking-tight mb-2">
          Want to add your property?
        </h3>

        <p className="text-secondary-subheading text-sm sm:text-base max-w-md mx-auto mb-8">
          Add your property and track every details you need.
        </p>

        <div className="flex items-center justify-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onImportClick}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-card-bg border border-border text-txt-primary hover:bg-blue-50/60 text-sm font-medium rounded-md transition-colors cursor-pointer select-none"
          >
            <span>Import</span>
            <ImportIcon className="w-4 h-4 text-primary" />
          </button>

          <button
            type="button"
            onClick={onAddClick}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-md shadow-xs transition-colors cursor-pointer select-none"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </button>
        </div>
      </div>
    </div>
  );
};

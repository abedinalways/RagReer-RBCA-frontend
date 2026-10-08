"use client";

import React from "react";
import { X } from "lucide-react";

interface PermissionTagProps {
  label: string;
  onRemove?: () => void;
  readOnly?: boolean;
}

export function PermissionTag({ label, onRemove, readOnly = false }: PermissionTagProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 md:px-3.5 py-1 md:py-2 rounded-md text-sm md:text-base font-medium bg-[#EAF2F9] text-[#2D6A9F] border border-[#CADFF4]/70 transition-all select-none">
      <span>{label}</span>
      {!readOnly && onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="text-[#2D6A9F]/70 hover:text-red-500 hover:bg-red-50 rounded p-0.5 transition-colors cursor-pointer"
          aria-label={`Remove ${label}`}
        >
          <X className="w-3 h-3 stroke-[2.5]" />
        </button>
      )}
    </span>
  );
}

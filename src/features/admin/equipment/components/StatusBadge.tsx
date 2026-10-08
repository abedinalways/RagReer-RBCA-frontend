"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { EquipmentStatus } from "../types";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: EquipmentStatus;
  onChange?: (status: EquipmentStatus) => void;
  interactive?: boolean;
}

const STATUS_CONFIGS: Record<EquipmentStatus, { bg: string; text: string; border: string; dot: string }> = {
  "In Use": {
    bg: "bg-[#EAF2F9]",
    text: "text-[#2D6A9F]",
    border: "border-[#CADFF4]",
    dot: "bg-[#0777F6]",
  },
  Available: {
    bg: "bg-[#ECFDF3]",
    text: "text-[#027A48]",
    border: "border-[#ABEFC6]",
    dot: "bg-[#12B76A]",
  },
  Damaged: {
    bg: "bg-[#FEF3F2]",
    text: "text-[#D92D20]",
    border: "border-[#FDA29B]",
    dot: "bg-[#D92D20]",
  },
  "In Repair": {
    bg: "bg-[#FEF6EE]",
    text: "text-[#B54708]",
    border: "border-[#FEDF89]",
    dot: "bg-[#F79009]",
  },
};

const ALL_STATUSES: EquipmentStatus[] = ["In Use", "Available", "Damaged", "In Repair"];

export function StatusBadge({
  status,
  onChange,
  interactive = true,
}: StatusBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const config = STATUS_CONFIGS[status] || STATUS_CONFIGS.Available;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className={cn("relative inline-block", isOpen ? "z-50" : "z-10")} ref={containerRef}>
      <button
        type="button"
        disabled={!interactive}
        onClick={(e) => {
          e.stopPropagation();
          if (interactive) setIsOpen((prev) => !prev);
        }}
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm md:text-base font-medium border transition-colors",
          config.bg,
          config.text,
          config.border,
          interactive ? "cursor-pointer hover:opacity-90" : "cursor-default"
        )}
      >
        <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", config.dot)} />
        <span>{status}</span>
        {interactive && <ChevronDown className="w-3.5 h-3.5 opacity-70" />}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1.5 w-42 rounded-lg bg-card-bg border border-border shadow-2xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-100">
          {ALL_STATUSES.map((st) => {
            const isSelected = st === status;
            const sConfig = STATUS_CONFIGS[st];
            return (
              <button
                key={st}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange?.(st);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-3 py-1.5 text-left text-sm md:text-base flex items-center justify-between transition-colors hover:bg-page-bg cursor-pointer",
                  isSelected ? "font-semibold" : "font-normal"
                )}
              >
                <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-xs sm:text-sm font-medium", sConfig.bg, sConfig.text, sConfig.border)}>
                  <span className={cn("w-1.5 h-1.5 rounded-full", sConfig.dot)} />
                  {st}
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-primary stroke-[3]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

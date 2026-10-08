"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { EquipmentCondition } from "../types";
import { cn } from "@/lib/utils";

interface ConditionBadgeProps {
  condition: EquipmentCondition;
  onChange?: (condition: EquipmentCondition) => void;
  interactive?: boolean;
}

const CONDITION_STYLES: Record<EquipmentCondition, { bg: string; text: string; border: string }> = {
  Good: {
    bg: "bg-[#EAF2F9]",
    text: "text-[#2D6A9F]",
    border: "border-[#CADFF4]",
  },
  Fair: {
    bg: "bg-[#ECFDF3]",
    text: "text-[#027A48]",
    border: "border-[#ABEFC6]",
  },
  Poor: {
    bg: "bg-[#FEF3F2]",
    text: "text-[#D92D20]",
    border: "border-[#FDA29B]",
  },
};

const CONDITIONS: EquipmentCondition[] = ["Good", "Fair", "Poor"];

export function ConditionBadge({
  condition,
  onChange,
  interactive = true,
}: ConditionBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const style = CONDITION_STYLES[condition] || CONDITION_STYLES.Good;

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
          style.bg,
          style.text,
          style.border,
          interactive ? "cursor-pointer hover:opacity-90" : "cursor-default"
        )}
      >
        <span>{condition}</span>
        {interactive && <ChevronDown className="w-3.5 h-3.5 opacity-70" />}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1.5 w-36 rounded-lg bg-card-bg border border-border shadow-2xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-100">
          {CONDITIONS.map((c) => {
            const isSelected = c === condition;
            const cStyle = CONDITION_STYLES[c];
            return (
              <button
                key={c}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange?.(c);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-3 py-1.5 text-left text-sm md:text-base flex items-center justify-between transition-colors hover:bg-page-bg cursor-pointer",
                  isSelected ? "font-semibold" : "font-normal"
                )}
              >
                <span className={cn("px-2 py-0.5 rounded border text-xs sm:text-sm font-medium", cStyle.bg, cStyle.text, cStyle.border)}>
                  {c}
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

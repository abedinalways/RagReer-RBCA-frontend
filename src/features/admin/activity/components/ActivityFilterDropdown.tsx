"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityFilterDropdownProps<T extends string> {
  value: T;
  options: readonly T[];
  onChange: (val: T) => void;
  defaultLabel?: string;
  className?: string;
  menuWidthClass?: string;
}

export function ActivityFilterDropdown<T extends string>({
  value,
  options,
  onChange,
  defaultLabel,
  className,
  menuWidthClass = "w-40",
}: ActivityFilterDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const displayLabel = value || defaultLabel || options[0];

  return (
    <div className={cn("relative inline-block", className)} ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={cn(
          "w-full flex items-center justify-between gap-2 px-3.5 py-2 rounded-lg border bg-white text-xs sm:text-sm font-normal text-secondary-subheading transition-all cursor-pointer shadow-2xs select-none",
          isOpen
            ? "border-primary ring-1 ring-primary/30"
            : "border-[#EAECF0] hover:border-primary/50"
        )}
      >
        <span className="truncate">{displayLabel}</span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary-subheading shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Popover Menu Matching Image 2 */}
      {isOpen && (
        <div
          role="listbox"
          className={cn(
            "absolute right-0 mt-1.5 z-40 bg-white rounded-xl shadow-xl border border-gray-100 p-2 flex flex-col gap-1.5 animate-in fade-in zoom-in-95 duration-100",
            menuWidthClass
          )}
        >
          {options.map((opt) => {
            const isSelected = opt === value;
            return (
              <button
                key={opt}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full py-2 px-3 text-xs sm:text-sm font-medium rounded-md transition-all cursor-pointer text-center",
                  isSelected
                    ? "bg-[#5980A6] text-white shadow-xs font-semibold"
                    : "bg-[#F8F9FA] hover:bg-[#EEF2F6] text-[#2F3131] hover:text-primary-heading"
                )}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

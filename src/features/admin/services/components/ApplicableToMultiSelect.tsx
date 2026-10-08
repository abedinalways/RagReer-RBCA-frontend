"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { CustomCheckbox } from "../../roles/components/CustomCheckbox";
import { SERVICE_APPLICABLE_OPTIONS } from "../data/servicesData";

interface ApplicableToMultiSelectProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function ApplicableToMultiSelect({
  selected,
  onChange,
}: ApplicableToMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleToggle = (item: string) => {
    if (selected.includes(item)) {
      onChange(selected.filter((s) => s !== item));
    } else {
      onChange([...selected, item]);
    }
  };

  const handleRemove = (e: React.MouseEvent, item: string) => {
    e.stopPropagation();
    onChange(selected.filter((s) => s !== item));
  };

  const visibleTags = selected.slice(0, 2);
  const remainingCount = selected.length - 2;

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Input box trigger */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full min-h-[42px] px-3 py-1.5 rounded-md border border-border bg-card-bg flex items-center justify-between gap-2 cursor-pointer hover:border-primary/50 transition-colors"
      >
        <div className="flex items-center gap-1.5 flex-wrap flex-1 overflow-hidden">
          {selected.length === 0 ? (
            <span className="text-sm text-secondary-subheading/60">
              Select applicable areas
            </span>
          ) : (
            <>
              {visibleTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#E8F4FD] text-[#1B75BC] text-xs font-medium border border-[#CBE5F9]"
                >
                  <span className="truncate max-w-[130px]">{tag}</span>
                  <button
                    type="button"
                    onClick={(e) => handleRemove(e, tag)}
                    className="p-0.5 hover:bg-[#1B75BC]/10 rounded-full cursor-pointer text-[#1B75BC]"
                  >
                    <X className="w-3 h-3 stroke-[2.5]" />
                  </button>
                </span>
              ))}

              {remainingCount > 0 && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-gray-100 text-secondary-subheading text-xs font-medium">
                  +{remainingCount} more
                </span>
              )}
            </>
          )}
        </div>

        <ChevronDown
          className={`w-4 h-4 text-secondary-subheading shrink-0 transition-transform duration-150 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown with checkboxes */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1.5 max-h-60 overflow-y-auto rounded-lg bg-card-bg border border-border shadow-xl z-50 p-2 space-y-1 animate-in fade-in zoom-in-95 duration-100">
          {SERVICE_APPLICABLE_OPTIONS.map((option) => {
            const isChecked = selected.includes(option);
            return (
              <div
                key={option}
                onClick={() => handleToggle(option)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md cursor-pointer transition-colors ${
                  isChecked
                    ? "bg-[#F0F7FD] text-txt-primary"
                    : "hover:bg-page-bg text-txt-primary"
                }`}
              >
                <CustomCheckbox
                  id={`multi-app-${option}`}
                  checked={isChecked}
                  onChange={() => handleToggle(option)}
                />
                <span className="text-sm font-medium">{option}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

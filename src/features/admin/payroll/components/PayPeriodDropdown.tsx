"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { PayPeriodOption } from "../types";
import { PAY_PERIOD_OPTIONS } from "../data/payrollData";
import { PayrollCalendarModal } from "./PayrollCalendarModal";

interface PayPeriodDropdownProps {
  selectedPeriod: PayPeriodOption;
  onSelectPeriod: (period: PayPeriodOption) => void;
}

export function PayPeriodDropdown({
  selectedPeriod,
  onSelectPeriod,
}: PayPeriodDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option: PayPeriodOption) => {
    if (option.isCustom) {
      setIsOpen(false);
      setIsCalendarOpen(true);
    } else {
      onSelectPeriod(option);
      setIsOpen(false);
    }
  };

  const handleCustomRangeSelect = (rangeText: string) => {
    const customOption: PayPeriodOption = {
      id: `custom-${Date.now()}`,
      label: rangeText,
      isCustom: true,
    };
    onSelectPeriod(customOption);
  };

  return (
    <>
      <div className="relative inline-block w-full sm:w-auto" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full sm:w-auto h-10 px-4 rounded-lg border border-primary/80 bg-card-bg text-primary font-medium text-xs sm:text-sm flex items-center justify-between gap-3 hover:bg-page-bg/40 transition-colors shadow-2xs cursor-pointer"
        >
          <span className="truncate">{selectedPeriod.label}</span>
          <ChevronDown
            className={`w-4 h-4 text-primary shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-1.5 w-56 sm:w-60 bg-card-bg border border-border rounded-xl shadow-lg py-1.5 z-40 animate-in fade-in slide-in-from-top-1 duration-150">
            {PAY_PERIOD_OPTIONS.map((opt) => {
              const isSelected = selectedPeriod.id === opt.id || selectedPeriod.label === opt.label;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleOptionClick(opt)}
                  className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? "text-primary font-medium bg-blue-50/60"
                      : "text-txt-primary hover:bg-page-bg hover:text-primary-heading"
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && (
                    <Check className="w-4 h-4 text-primary shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Custom Date Range Picker Modal */}
      <PayrollCalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onSelectRange={handleCustomRangeSelect}
      />
    </>
  );
}

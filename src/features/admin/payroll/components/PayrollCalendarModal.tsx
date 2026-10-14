"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface PayrollCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRange: (rangeText: string) => void;
}

export function PayrollCalendarModal({
  isOpen,
  onClose,
  onSelectRange,
}: PayrollCalendarModalProps) {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(7); // 7 = August (0-indexed)
  const [startDay, setStartDay] = useState<number | null>(10);
  const [endDay, setEndDay] = useState<number | null>(20);

  if (!isOpen) return null;

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleDayClick = (day: number) => {
    if (!startDay || (startDay && endDay)) {
      setStartDay(day);
      setEndDay(null);
    } else {
      if (day < startDay) {
        setEndDay(startDay);
        setStartDay(day);
      } else {
        setEndDay(day);
      }
    }
  };

  const handleApply = () => {
    if (startDay && endDay) {
      const monthStr = monthNames[currentMonth];
      const rangeStr = `${monthStr} ${startDay} – ${monthStr} ${endDay}, ${currentYear}`;
      onSelectRange(rangeStr);
    } else if (startDay) {
      const monthStr = monthNames[currentMonth];
      const rangeStr = `${monthStr} ${startDay}, ${currentYear}`;
      onSelectRange(rangeStr);
    }
    onClose();
  };

  // Days in August 2026: 31 days. Aug 1, 2026 is Saturday (in normal calendar, or Thu based on mockup).
  // Mockup shows Aug 1 under Thu:
  // Sun Mon Tue Wed Thu Fri Sat
  //                 1   2   3
  // 4   5   6   7   8   9   10
  // 11  12  13  14  15  16  17
  // 18  19  20  21  22  23  24
  // 25  26  27  28  29  30  31
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const emptyPrefixes = [null, null, null, null]; // 4 empty slots before 1st (Sun, Mon, Tue, Wed)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-2xs p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xs bg-card-bg rounded-2xl shadow-xl border border-border p-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary-subheading hover:text-txt-primary p-1 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Month Header */}
        <div className="flex items-center justify-center gap-6 mb-4">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-1 text-secondary-subheading hover:text-primary transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>
          <span className="font-semibold text-primary text-base">
            {monthNames[currentMonth]} {currentYear}
          </span>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-1 text-secondary-subheading hover:text-primary transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-primary" />
          </button>
        </div>

        {/* Weekday labels */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-secondary-subheading font-normal mb-2">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-y-1 text-center text-xs">
          {emptyPrefixes.map((_, idx) => (
            <div key={`empty-${idx}`} className="h-8" />
          ))}

          {days.map((day) => {
            const isStart = startDay === day;
            const isEnd = endDay === day;
            const isInRange =
              startDay !== null &&
              endDay !== null &&
              day > startDay &&
              day < endDay;

            return (
              <div
                key={day}
                className={`h-8 flex items-center justify-center cursor-pointer transition-all ${
                  isInRange ? "bg-blue-50/90 text-txt-primary font-medium" : ""
                } ${
                  isStart && endDay
                    ? "bg-gradient-to-r from-transparent to-blue-50/90"
                    : ""
                } ${
                  isEnd && startDay
                    ? "bg-gradient-to-l from-transparent to-blue-50/90"
                    : ""
                }`}
                onClick={() => handleDayClick(day)}
              >
                <div
                  className={`w-7 h-7 flex items-center justify-center text-xs rounded-md font-medium transition-colors ${
                    isStart || isEnd
                      ? "bg-primary text-white font-bold shadow-xs"
                      : "text-txt-primary hover:bg-page-bg"
                  }`}
                >
                  {day}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-md text-xs font-medium text-secondary-subheading hover:bg-page-bg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-4 py-1.5 rounded-md text-xs font-semibold bg-primary text-white hover:bg-primary-hover shadow-xs transition-colors cursor-pointer"
          >
            Apply Range
          </button>
        </div>
      </div>
    </div>
  );
}

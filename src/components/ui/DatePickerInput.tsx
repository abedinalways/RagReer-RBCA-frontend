"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerInputProps {
  value: string;
  onChange: (dateStr: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  id?: string;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
  value,
  onChange,
  placeholder = "dd/mm/yyyy",
  label,
  required = false,
  className,
  inputClassName,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse initial date from value or fallback to today
  const parseDateString = (str: string) => {
    if (!str) return null;
    const parts = str.split(/[-/.]/);
    if (parts.length === 3) {
      const d = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1;
      const y = parseInt(parts[2], 10);
      if (!isNaN(d) && !isNaN(m) && !isNaN(y) && d >= 1 && d <= 31 && m >= 0 && m <= 11) {
        return { day: d, month: m, year: y < 100 ? 2000 + y : y };
      }
    }
    return null;
  };

  const parsed = parseDateString(value);
  const now = new Date();

  const [currentYear, setCurrentYear] = useState<number>(
    parsed ? parsed.year : now.getFullYear()
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    parsed ? parsed.month : now.getMonth()
  );

  // Sync year/month if value changes externally
  useEffect(() => {
    const p = parseDateString(value);
    if (p) {
      setCurrentYear(p.year);
      setCurrentMonth(p.month);
    }
  }, [value]);

  // Close calendar on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const prevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const dd = String(day).padStart(2, "0");
    const mm = String(currentMonth + 1).padStart(2, "0");
    const formatted = `${dd}/${mm}/${currentYear}`;
    onChange(formatted);
    setIsOpen(false);
  };

  const handleSelectToday = (e: React.MouseEvent) => {
    e.stopPropagation();
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    setCurrentYear(yyyy);
    setCurrentMonth(today.getMonth());
    onChange(`${dd}/${mm}/${yyyy}`);
    setIsOpen(false);
  };

  // Calendar calculations
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  // Selected date match check
  const isSelectedDate = (day: number) => {
    if (!parsed) return false;
    return (
      parsed.day === day &&
      parsed.month === currentMonth &&
      parsed.year === currentYear
    );
  };

  const isTodayDate = (day: number) => {
    const t = new Date();
    return (
      t.getDate() === day &&
      t.getMonth() === currentMonth &&
      t.getFullYear() === currentYear
    );
  };

  return (
    <div className={cn("space-y-1 relative", className)} ref={containerRef}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-medium text-primary-heading"
        >
          {label} {required && <span className="text-decline">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          type="text"
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onClick={() => setIsOpen(true)}
          className={cn(
            "w-full pl-3 pr-10 py-2 text-xs sm:text-sm border border-border-input rounded-md bg-input-bg text-txt-primary placeholder:text-secondary-subheading/60 focus:outline-none focus:border-primary transition-colors cursor-pointer",
            isOpen && "border-primary ring-1 ring-primary/20",
            inputClassName
          )}
        />

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary-subheading hover:text-primary p-1 rounded transition-colors cursor-pointer focus:outline-none"
          title="Open calendar"
          aria-label="Open calendar"
        >
          <CalendarIcon className="w-4 h-4 text-secondary-subheading hover:text-primary transition-colors" />
        </button>

        {/* Dropdown Calendar Popover */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-1.5 z-50 w-72 bg-card-bg rounded-xl border border-border shadow-xl p-3.5 space-y-3 animate-in fade-in zoom-in-95 duration-100 select-none">
            {/* Header: Month & Year with Navigation */}
            <div className="flex items-center justify-between border-b border-border/80 pb-2.5">
              <span className="font-semibold text-xs sm:text-sm text-primary-heading font-barlow-condensed">
                {MONTH_NAMES[currentMonth]} {currentYear}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={prevMonth}
                  className="p-1 rounded hover:bg-page-bg text-secondary-subheading hover:text-primary transition-colors cursor-pointer"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextMonth}
                  className="p-1 rounded hover:bg-page-bg text-secondary-subheading hover:text-primary transition-colors cursor-pointer"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Weekday Labels */}
            <div className="grid grid-cols-7 text-center text-[11px] font-medium text-secondary-subheading">
              {WEEK_DAYS.map((wd) => (
                <span key={wd} className="py-1">
                  {wd}
                </span>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-xs">
              {/* Padding days before 1st of month */}
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="w-8 h-8" />
              ))}

              {/* Days of current month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const selected = isSelectedDate(day);
                const isToday = isTodayDate(day);

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleSelectDay(day)}
                    className={cn(
                      "w-8 h-8 flex items-center justify-center rounded-md font-medium transition-colors cursor-pointer text-xs",
                      selected
                        ? "bg-primary text-white font-semibold shadow-2xs"
                        : isToday
                        ? "border border-primary text-primary font-medium hover:bg-blue-50"
                        : "text-txt-primary hover:bg-page-bg"
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Footer with Today button */}
            <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={handleSelectToday}
                className="text-primary font-medium hover:underline cursor-pointer"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-secondary-subheading hover:text-primary-heading cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePickerInput;

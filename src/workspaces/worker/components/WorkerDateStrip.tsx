"use client";

import { useMemo, useRef, useEffect, useState, memo } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface DatePillItem {
  day: string;
  date: string;
  fullDate: string;
  rawDate: Date;
  hasJobs: boolean;
}

interface WorkerDateStripProps {
  viewDate: Date;
  onViewDateChange: (date: Date) => void;
  selectedDateKey: string | null;
  onSelectDate: (dateKey: string | null) => void;
  jobDateKeys: Set<string>;
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Subcomponent: Individual Date Pill with 3 Figma states
const WorkerDatePill = memo(function WorkerDatePill({
  item,
  isSelected,
  onToggle,
}: {
  item: DatePillItem;
  isSelected: boolean;
  onToggle: (fullDate: string) => void;
}) {
  const hasJobs = item.hasJobs;

  let pillStyle: React.CSSProperties;
  let dayTextClass: string;
  let circleClass: string;

  if (isSelected) {
    pillStyle = {
      borderRadius: "624.9375rem",
      background: "var(--Blue-Brand_500, #5980A6)",
      border: "1px solid var(--Blue-Brand_500, #5980A6)",
      display: "flex",
      flexDirection: "column",
      padding: "0.5rem 0.375rem",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "0.375rem",
      boxSizing: "border-box",
    };
    dayTextClass = "text-white font-medium";
    circleClass = "bg-white text-txt-primary font-bold shadow-xs";
  } else if (hasJobs) {
    pillStyle = {
      borderRadius: "624.9375rem",
      background: "var(--Blue-100, #CADFF4)",
      border: "1px solid var(--Blue-Brand_500, #5980A6)",
      display: "flex",
      flexDirection: "column",
      padding: "0.5rem 0.375rem",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "0.375rem",
      boxSizing: "border-box",
    };
    dayTextClass = "text-[#1D1F20] font-medium";
    circleClass = "bg-white text-[#1D1F20] font-bold shadow-2xs";
  } else {
    pillStyle = {
      borderRadius: "624.9375rem",
      background: "var(--Gray-50, #F4F5F7)",
      border: "1px solid transparent",
      display: "flex",
      flexDirection: "column",
      padding: "0.5rem 0.375rem",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "0.375rem",
      boxSizing: "border-box",
    };
    dayTextClass = "text-[#8C8E90] font-medium";
    circleClass = "bg-[#EAECEF]/80 text-[#8C8E90] font-medium";
  }

  return (
    <button
      type="button"
      data-selected={isSelected}
      onClick={() => onToggle(item.fullDate)}
      className="w-[50px] min-w-[50px] max-w-[50px] h-18 transition-colors duration-150 cursor-pointer select-none shrink-0"
      style={pillStyle}
    >
      <span className={`text-[11px] leading-none pt-0.5 ${dayTextClass}`}>
        {item.day}
      </span>
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${circleClass}`}
      >
        {item.date}
      </div>
    </button>
  );
});

export function WorkerDateStrip({
  viewDate,
  onViewDateChange,
  selectedDateKey,
  onSelectDate,
  jobDateKeys,
}: WorkerDateStripProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pickerYear, setPickerYear] = useState<number>(viewDate.getFullYear());

  // Month title formatter (e.g., "August 2026")
  const monthYearLabel = useMemo(() => {
    return viewDate.toLocaleString("en-US", { month: "long", year: "numeric" });
  }, [viewDate]);

  // Navigate to previous month
  const handlePrevMonth = () => {
    onViewDateChange(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  // Navigate to next month
  const handleNextMonth = () => {
    onViewDateChange(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  // Generate date pills for all days in the currently viewed month
  const datePills: DatePillItem[] = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const pills: DatePillItem[] = [];

    for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
      const d = new Date(year, month, dayNum);
      const dayName = d.toLocaleString("en-US", { weekday: "short" });
      const dateStr = String(dayNum).padStart(2, "0");
      const monthStr = String(month + 1).padStart(2, "0");
      const fullDate = `${year}-${monthStr}-${dateStr}`;
      const hasJobs = jobDateKeys.has(fullDate);

      pills.push({
        day: dayName,
        date: dateStr,
        fullDate,
        rawDate: d,
        hasJobs,
      });
    }

    return pills;
  }, [viewDate, jobDateKeys]);

  // Auto-scroll to selected date on month change or initial mount
  const viewMonthKey = `${viewDate.getFullYear()}-${viewDate.getMonth()}`;
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollContainerRef.current) {
        const activeEl = scrollContainerRef.current.querySelector<HTMLElement>('[data-selected="true"]');
        if (activeEl) {
          activeEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        } else {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [viewMonthKey]);

  // Close month/year picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setIsPickerOpen(false);
      }
    };
    if (isPickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPickerOpen]);

  const handleToggleDate = (fullDate: string) => {
    onSelectDate(selectedDateKey === fullDate ? null : fullDate);
  };

  return (
    <section className="space-y-2.5 pt-1 relative">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-txt-primary">Select Date</span>
        <div className="flex items-center gap-1.5 text-primary font-semibold text-xs relative">
          {/* Clickable Month Year Label with Dropdown Icon */}
          <button
            type="button"
            onClick={() => {
              setPickerYear(viewDate.getFullYear());
              setIsPickerOpen((prev) => !prev);
            }}
            className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-slate-100 transition-colors cursor-pointer"
            title="Select month and year"
          >
            <span>{monthYearLabel}</span>
            <ChevronDown
              className={`h-3 w-3 transition-transform duration-200 ${
                isPickerOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Month navigation chevrons */}
          <div className="flex items-center gap-0.5 text-secondary-subheading">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1 rounded hover:bg-slate-200/60 transition-colors cursor-pointer active:scale-95"
              aria-label="Previous month"
              title="Previous month"
            >
              <ChevronLeft className="h-3.5 w-3.5 text-primary font-bold" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 rounded hover:bg-slate-200/60 transition-colors cursor-pointer active:scale-95"
              aria-label="Next month"
              title="Next month"
            >
              <ChevronRight className="h-3.5 w-3.5 text-primary font-bold" />
            </button>
          </div>

          {/* Quick Month & Year Picker Popover */}
          {isPickerOpen && (
            <div
              ref={pickerRef}
              className="absolute right-0 top-full mt-2 w-64 p-3 bg-white rounded-xl shadow-xl border border-border/80 z-50 text-txt-primary animate-in fade-in zoom-in-95 duration-150"
            >
              {/* Year selector header */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/50">
                <button
                  type="button"
                  onClick={() => setPickerYear((y) => y - 1)}
                  className="p-1 rounded hover:bg-slate-100 text-secondary-subheading hover:text-primary transition-colors cursor-pointer"
                  aria-label="Previous year"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="font-bold text-sm text-primary-heading">
                  {pickerYear}
                </span>
                <button
                  type="button"
                  onClick={() => setPickerYear((y) => y + 1)}
                  className="p-1 rounded hover:bg-slate-100 text-secondary-subheading hover:text-primary transition-colors cursor-pointer"
                  aria-label="Next year"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* 12-month Grid */}
              <div className="grid grid-cols-3 gap-1.5 py-1">
                {MONTH_NAMES.map((name, idx) => {
                  const isCurrentActive =
                    viewDate.getFullYear() === pickerYear &&
                    viewDate.getMonth() === idx;

                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => {
                        onViewDateChange(new Date(pickerYear, idx, 1));
                        setIsPickerOpen(false);
                      }}
                      className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        isCurrentActive
                          ? "bg-primary text-white font-semibold shadow-xs"
                          : "hover:bg-slate-100 text-txt-primary"
                      }`}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>

              {/* Today Quick Jump */}
              <div className="pt-2 mt-1 border-t border-border/50 flex justify-between items-center text-[11px]">
                <button
                  type="button"
                  onClick={() => {
                    const today = new Date();
                    onViewDateChange(today);
                    const todayStr = `${today.getFullYear()}-${String(
                      today.getMonth() + 1
                    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
                    onSelectDate(todayStr);
                    setIsPickerOpen(false);
                  }}
                  className="text-primary font-semibold hover:underline cursor-pointer"
                >
                  Jump to Today
                </button>
                <button
                  type="button"
                  onClick={() => setIsPickerOpen(false)}
                  className="text-secondary-subheading hover:text-txt-primary cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Date Pills Row matching 3 Figma states & smooth horizontal scroll */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none scroll-smooth"
      >
        {datePills.map((item) => (
          <WorkerDatePill
            key={item.fullDate}
            item={item}
            isSelected={selectedDateKey === item.fullDate}
            onToggle={handleToggleDate}
          />
        ))}
      </div>
    </section>
  );
}

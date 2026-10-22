"use client";
import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import {
  AdminAppointmentItem,
  AdminAppointmentStatus,
} from "../types/adminSchedule.types";
import { adminStatusConfigs } from "../data/adminScheduleData";

interface AdminScheduleCalendarProps {
  appointments: AdminAppointmentItem[];
  onSelectAppointment: (appointment: AdminAppointmentItem) => void;
  onCreateSchedule: () => void;
}

export const AdminScheduleCalendar: React.FC<AdminScheduleCalendarProps> = ({
  appointments,
  onSelectAppointment,
  onCreateSchedule,
}) => {
  // Default to August 2026 matching Figma Screenshot
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1));
  const [activeFilters, setActiveFilters] = useState<Record<AdminAppointmentStatus, boolean>>({
    Scheduled: true,
    Assigned: true,
    "In Progress": true,
    Completed: true,
    Rescheduled: true,
    Cancelled: true,
    Holiday: true,
    Weekend: true,
  });

  const [selectedDayEventsModal, setSelectedDayEventsModal] = useState<{
    dateStr: string;
    events: AdminAppointmentItem[];
  } | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const toggleFilter = (status: AdminAppointmentStatus) => {
    setActiveFilters((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  // Filter appointments based on active filters
  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      // If appointment is on Weekend (Saturday or Sunday)
      const aptDate = new Date(apt.date);
      const isWeekendDay = aptDate.getDay() === 0 || aptDate.getDay() === 6;
      if (isWeekendDay && !activeFilters.Weekend) {
        return false;
      }
      return activeFilters[apt.status];
    });
  }, [appointments, activeFilters]);

  // Calendar cells calculation for August 2026
  const calendarCells = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const cells: {
      dateNumber: number;
      dateKey: string;
      isCurrentMonth: boolean;
      isHighlighted: boolean;
      dayOfWeek: number;
    }[] = [];

    // Preceding month filler days (July 26 - 31)
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const prevM = month === 0 ? 12 : month;
      const prevY = month === 0 ? year - 1 : year;
      const dateKey = `${prevY}-${String(prevM).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const dayOfWeek = new Date(prevY, prevM - 1, d).getDay();
      cells.push({
        dateNumber: d,
        dateKey,
        isCurrentMonth: false,
        isHighlighted: false,
        dayOfWeek,
      });
    }

    // Current month days (1 to 31)
    for (let d = 1; d <= daysInCurrentMonth; d++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      // Highlight Day 20 matching Figma Screenshot
      const isHighlighted = d === 20 && month === 7 && year === 2026;
      const dayOfWeek = new Date(year, month, d).getDay();
      cells.push({
        dateNumber: d,
        dateKey,
        isCurrentMonth: true,
        isHighlighted,
        dayOfWeek,
      });
    }

    // Trailing month filler days to complete 35 or 42 slots
    const totalSlots = cells.length > 35 ? 42 : 35;
    const remaining = totalSlots - cells.length;
    for (let d = 1; d <= remaining; d++) {
      const nextM = month === 11 ? 1 : month + 2;
      const nextY = month === 11 ? year + 1 : year;
      const dateKey = `${nextY}-${String(nextM).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const dayOfWeek = new Date(nextY, nextM - 1, d).getDay();
      cells.push({
        dateNumber: d,
        dateKey,
        isCurrentMonth: false,
        isHighlighted: false,
        dayOfWeek,
      });
    }

    return cells;
  }, [year, month]);

  // Map filtered appointments to dateKey
  const appointmentsByDate = useMemo(() => {
    const map: Record<string, AdminAppointmentItem[]> = {};
    filteredAppointments.forEach((apt) => {
      if (!map[apt.date]) {
        map[apt.date] = [];
      }
      map[apt.date].push(apt);
    });
    return map;
  }, [filteredAppointments]);

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const filterOrder: AdminAppointmentStatus[] = [
    "Scheduled",
    "Assigned",
    "In Progress",
    "Completed",
    "Rescheduled",
    "Cancelled",
    "Holiday",
    "Weekend",
  ];

  return (
    <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-6 shadow-2xs space-y-4">
      {/* Top Header Row (Figma Screenshot 2) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-medium text-primary-heading font-barlow-condensed">
          My Appointments
        </h2>

        {/* Right Controls: Month Selector + Create Schedule Button */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Month Navigation Box [ Aug 2026 < > ] */}
          <div className="inline-flex items-center border border-border rounded-md px-3 py-1.5 bg-card-bg shadow-2xs">
            <span className="text-xs sm:text-sm font-medium text-primary-heading min-w-[70px] select-none">
              {monthNames[month]} {year}
            </span>
            <div className="flex items-center ml-2 border-l border-border pl-2 gap-1 text-secondary-subheading">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-0.5 rounded hover:bg-page-bg hover:text-primary transition-colors cursor-pointer"
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-0.5 rounded hover:bg-page-bg hover:text-primary transition-colors cursor-pointer"
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Create Schedule Button */}
          <button
            type="button"
            onClick={onCreateSchedule}
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-medium rounded-md shadow-2xs transition-colors cursor-pointer"
          >
            Create Schedule
          </button>
        </div>
      </div>

      {/* Filter Checkboxes Row (Figma Screenshot 2) */}
      <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 pt-1 border-b border-border pb-3">
        {filterOrder.map((status) => {
          const config = adminStatusConfigs[status];
          const isChecked = activeFilters[status];
          return (
            <button
              type="button"
              key={status}
              onClick={() => toggleFilter(status)}
              className="inline-flex items-center gap-1.5 cursor-pointer group select-none text-xs"
            >
              <span className={`w-2 h-2 rounded-full ${config.dotColor} shrink-0`} />
              <span className="text-secondary-subheading group-hover:text-primary-heading transition-colors">
                {status}
              </span>
              <span
                className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                  isChecked
                    ? "border-primary bg-primary text-white"
                    : "border-border-input bg-card-bg text-transparent"
                }`}
              >
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
            </button>
          );
        })}
      </div>

      {/* Calendar Grid Container */}
      <div className="border border-border rounded-lg overflow-hidden">
        {/* Days of Week Row */}
        <div className="grid grid-cols-7 border-b border-border bg-card-bg text-center">
          {weekdays.map((day) => (
            <div
              key={day}
              className="py-2.5 text-xs sm:text-sm font-medium text-primary-heading border-r border-border last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Cells Grid */}
        <div className="grid grid-cols-7 auto-rows-fr bg-card-bg">
          {calendarCells.map((cell, index) => {
            const dayEvents = appointmentsByDate[cell.dateKey] || [];
            const isWeekend = cell.dayOfWeek === 0 || cell.dayOfWeek === 6;
            const maxVisible = 2;
            const visibleEvents = dayEvents.slice(0, maxVisible);
            const remainingCount = dayEvents.length - maxVisible;

            return (
              <div
                key={`${cell.dateKey}-${index}`}
                className={`min-h-[110px] sm:min-h-[120px] p-1.5 sm:p-2 border-r border-b border-border flex flex-col justify-between ${
                  (index + 1) % 7 === 0 ? "border-r-0" : ""
                } ${
                  cell.isCurrentMonth
                    ? isWeekend && !activeFilters.Weekend
                      ? "bg-slate-50/50 opacity-60"
                      : "bg-card-bg"
                    : "bg-page-bg/40 text-secondary-subheading/60"
                }`}
              >
                {/* Day's Event Chips */}
                <div className="space-y-1 w-full">
                  {visibleEvents.map((apt) => {
                    const config = adminStatusConfigs[apt.status] || adminStatusConfigs.Scheduled;
                    return (
                      <div
                        key={apt.id}
                        onClick={() => onSelectAppointment(apt)}
                        className={`relative rounded p-1 sm:p-1.5 pl-2 overflow-hidden cursor-pointer transition-all hover:shadow-xs hover:opacity-95 ${config.cardBg} border ${config.cardBorder}`}
                      >
                        {/* Vertical Accent Bar on Left */}
                        <div
                          className={`absolute left-0 top-0 bottom-0 w-1 ${config.accentBar} rounded-l`}
                        />
                        <p className="text-[11px] sm:text-xs font-medium text-primary-heading truncate leading-tight">
                          {apt.title}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-secondary-subheading truncate leading-tight mt-0.5">
                          {apt.timeSlot}
                        </p>
                      </div>
                    );
                  })}

                  {/* '+ X more' button */}
                  {remainingCount > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedDayEventsModal({
                          dateStr: cell.dateKey,
                          events: dayEvents,
                        })
                      }
                      className="text-[11px] font-medium text-primary hover:underline pl-1 cursor-pointer block text-left"
                    >
                      + {remainingCount} more
                    </button>
                  )}
                </div>

                {/* Date Number in Bottom-Right */}
                <div className="flex justify-end items-end pt-1">
                  {cell.isHighlighted ? (
                    <span className="w-6 h-6 rounded bg-primary text-white flex items-center justify-center text-xs font-medium shadow-2xs">
                      {cell.dateNumber}
                    </span>
                  ) : (
                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        cell.isCurrentMonth
                          ? "text-primary-heading"
                          : "text-secondary-subheading/60"
                      }`}
                    >
                      {cell.dateNumber}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Overflow Day Events Quick Modal */}
      {selectedDayEventsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4 animate-in fade-in duration-150">
          <div className="bg-card-bg w-full max-w-md rounded-xl shadow-2xl border border-border p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-medium text-primary-heading font-barlow-condensed">
                Appointments ({selectedDayEventsModal.dateStr})
              </h3>
              <button
                type="button"
                onClick={() => setSelectedDayEventsModal(null)}
                className="text-secondary-subheading hover:text-primary-heading p-1 rounded-md text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {selectedDayEventsModal.events.map((apt) => {
                const config = adminStatusConfigs[apt.status] || adminStatusConfigs.Scheduled;
                return (
                  <div
                    key={apt.id}
                    onClick={() => {
                      setSelectedDayEventsModal(null);
                      onSelectAppointment(apt);
                    }}
                    className={`relative rounded-md p-2.5 pl-3 cursor-pointer transition-all hover:shadow-xs ${config.cardBg} border ${config.cardBorder}`}
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1.5 ${config.accentBar} rounded-l-md`}
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-primary-heading">
                        {apt.title}
                      </p>
                      <span className={`text-[10px] px-2 py-0.5 rounded ${config.badgeBg} ${config.badgeText}`}>
                        {apt.status}
                      </span>
                    </div>
                    <p className="text-xs text-secondary-subheading mt-1">
                      {apt.timeSlot} • {apt.propertyName}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminScheduleCalendar;

"use client";
import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AppointmentItem, AppointmentStatus } from "../types/appointmentsTypes";
import { appointmentStatusConfigs } from "../data/appointmentsData";

interface AppointmentsCalendarProps {
  appointments: AppointmentItem[];
  onSelectAppointment: (appointment: AppointmentItem) => void;
}

export const AppointmentsCalendar: React.FC<AppointmentsCalendarProps> = ({
  appointments,
  onSelectAppointment,
}) => {
  // Current view year & month (Defaulting to August 2026 to match Figma Screenshot)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1)); // 7 = August (0-indexed)
  const [selectedDayEventsModal, setSelectedDayEventsModal] = useState<{
    dateStr: string;
    events: AppointmentItem[];
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

  // Days in month calculation matching Figma August 2026 (Starting from Sunday July 26 to Saturday Sept 5)
  const calendarCells = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const cells: {
      dateNumber: number;
      dateKey: string;
      isCurrentMonth: boolean;
      isHighlighted: boolean;
    }[] = [];

    // Preceding month filler days (e.g. July 26 - 31)
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const prevM = month === 0 ? 12 : month;
      const prevY = month === 0 ? year - 1 : year;
      const dateKey = `${prevY}-${String(prevM).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      cells.push({
        dateNumber: d,
        dateKey,
        isCurrentMonth: false,
        isHighlighted: false,
      });
    }

    // Current month days (1 to 31)
    for (let d = 1; d <= daysInCurrentMonth; d++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      // Highlight Day 20 matching Figma Screenshot
      const isHighlighted = d === 20 && month === 7 && year === 2026;
      cells.push({
        dateNumber: d,
        dateKey,
        isCurrentMonth: true,
        isHighlighted,
      });
    }

    // Trailing month filler days to complete grid (up to 35 or 42 slots)
    const totalSlots = cells.length > 35 ? 42 : 35;
    const remaining = totalSlots - cells.length;
    for (let d = 1; d <= remaining; d++) {
      const nextM = month === 11 ? 1 : month + 2;
      const nextY = month === 11 ? year + 1 : year;
      const dateKey = `${nextY}-${String(nextM).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      cells.push({
        dateNumber: d,
        dateKey,
        isCurrentMonth: false,
        isHighlighted: false,
      });
    }

    return cells;
  }, [year, month]);

  // Map appointments to dateKey
  const appointmentsByDate = useMemo(() => {
    const map: Record<string, AppointmentItem[]> = {};
    appointments.forEach((apt) => {
      if (!map[apt.date]) {
        map[apt.date] = [];
      }
      map[apt.date].push(apt);
    });
    return map;
  }, [appointments]);

  const weekdays = [
    { full: "Sunday", short: "Sun" },
    { full: "Monday", short: "Mon" },
    { full: "Tuesday", short: "Tue" },
    { full: "Wednesday", short: "Wed" },
    { full: "Thursday", short: "Thu" },
    { full: "Friday", short: "Fri" },
    { full: "Saturday", short: "Sat" },
  ];

  // Two rows of legend matching exact Figma layout
  const legendRow1: AppointmentStatus[] = [
    "Preference Submitted",
    "Pending Confirmation",
    "Confirmed",
    "Crew Assigned",
    "Upcoming",
    "On Going",
  ];

  const legendRow2: AppointmentStatus[] = [
    "Delayed",
    "Completed",
    "Cancelled",
    "Reschedule Requested",
  ];

  return (
    <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-6 shadow-2xs space-y-4">
      {/* Calendar Header Row (Figma Screenshot 1 & 2) */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        {/* Left: Title */}
        <div>
          <h2 className="text-lg sm:text-xl font-medium text-primary-heading">
            My Appointments
          </h2>
        </div>

        {/* Right: Month Navigation + 2-Row Legend */}
        <div className="flex flex-col lg:items-end gap-2.5">
          {/* Month Navigation Box [ Aug 2026 < > ] */}
          <div className="inline-flex items-center border border-border rounded-md px-3 py-1.5 bg-card-bg shadow-2xs self-start lg:self-end">
            <span className="text-xs sm:text-sm font-semibold text-primary-heading min-w-[70px] select-none">
              {monthNames[month]} {year}
            </span>
            <div className="flex items-center ml-2 border-l border-border pl-2 gap-1 text-secondary-subheading">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-0.5 rounded hover:bg-slate-100 hover:text-primary transition-colors cursor-pointer"
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-0.5 rounded hover:bg-slate-100 hover:text-primary transition-colors cursor-pointer"
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right-aligned 2-row dots legend (Figma Screenshot 2) */}
          <div className="space-y-1 text-right">
            {/* Row 1 */}
            <div className="flex flex-wrap lg:justify-end items-center gap-x-3.5 gap-y-1 text-[11px] sm:text-xs text-secondary-subheading">
              {legendRow1.map((status) => {
                const config = appointmentStatusConfigs[status];
                return (
                  <span key={status} className="inline-flex items-center gap-1.5 whitespace-nowrap">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${config.dotColor}`} />
                    <span>{config.label}</span>
                  </span>
                );
              })}
            </div>

            {/* Row 2 */}
            <div className="flex flex-wrap lg:justify-end items-center gap-x-3.5 gap-y-1 text-[11px] sm:text-xs text-secondary-subheading">
              {legendRow2.map((status) => {
                const config = appointmentStatusConfigs[status];
                return (
                  <span key={status} className="inline-flex items-center gap-1.5 whitespace-nowrap">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${config.dotColor}`} />
                    <span>{config.label}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main 7-Column Calendar Grid (Figma Screenshot 1, 3, 4, 5) */}
      <div className="border border-border rounded-lg overflow-x-auto bg-card-bg">
        <div className="min-w-[720px] lg:min-w-full">
          {/* Weekday Header Row */}
          <div className="grid grid-cols-7 border-b border-border bg-white">
            {weekdays.map((day, idx) => (
              <div
                key={idx}
                className="py-2.5 px-2 text-center text-xs md:text-sm font-semibold text-primary-heading border-r border-border last:border-r-0"
              >
                <span className="hidden sm:inline">{day.full}</span>
                <span className="sm:hidden">{day.short}</span>
              </div>
            ))}
          </div>

          {/* Day Cells 7-Col Grid */}
          <div className="grid grid-cols-7 auto-rows-fr">
            {calendarCells.map((cell, index) => {
              const dayAppointments = appointmentsByDate[cell.dateKey] || [];
              const maxVisible = 2;
              const visibleAppointments = dayAppointments.slice(0, maxVisible);
              const extraCount = dayAppointments.length - maxVisible;

              return (
                <div
                  key={`${cell.dateKey}-${index}`}
                  className={`min-h-[110px] sm:min-h-[125px] p-1.5 sm:p-2 border-b border-r border-border flex flex-col justify-between transition-colors relative ${
                    cell.isCurrentMonth
                      ? "bg-card-bg hover:bg-slate-50/40"
                      : "bg-app-bg/70 text-secondary-subheading/60"
                  } ${index % 7 === 6 ? "border-r-0" : ""}`}
                >
                  {/* Events Container (Top of Cell) */}
                  <div className="space-y-1.5 w-full">
                    {visibleAppointments.map((apt) => {
                      const style = appointmentStatusConfigs[apt.status] || {
                        cardBg: "bg-apt-pref-bg",
                        accentBar: "bg-apt-pref-bar",
                      };

                      return (
                        <div
                          key={apt.id}
                          onClick={() => onSelectAppointment(apt)}
                          className={`rounded-lg ${style.cardBg} p-1.5 sm:p-2 cursor-pointer transition-all hover:opacity-95 shadow-2xs select-none`}
                        >
                          {/* Title with left rounded accent pill (Screenshot 3, 4, 5) */}
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`w-[2.5px] sm:w-[3px] h-3.5 sm:h-4 rounded-full ${style.accentBar} shrink-0`}
                            />
                            <h4 className="text-xs sm:text-[13px] font-semibold text-primary-heading truncate leading-tight">
                              {apt.title}
                            </h4>
                          </div>

                          {/* Time */}
                          <p className="text-[10px] sm:text-[11px] text-secondary-subheading font-normal truncate mt-0.5 pl-0.5">
                            {apt.timeSlot}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Row of Cell: (+ X more on left) and (Date Number on right) */}
                  <div className="flex items-center justify-between w-full pt-1.5">
                    {/* + X more badge on bottom-left (Screenshot 1 Day 20) */}
                    <div>
                      {extraCount > 0 ? (
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedDayEventsModal({
                              dateStr: cell.dateKey,
                              events: dayAppointments,
                            })
                          }
                          className="text-[10px] sm:text-[11px] text-primary hover:text-primary-hover font-semibold hover:underline block cursor-pointer"
                        >
                          + {extraCount} more
                        </button>
                      ) : null}
                    </div>

                    {/* Date Number on bottom-right */}
                    <div className="ml-auto">
                      {cell.isHighlighted ? (
                        <span className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-primary text-white font-bold text-xs flex items-center justify-center shadow-xs">
                          {cell.dateNumber}
                        </span>
                      ) : (
                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            cell.isCurrentMonth
                              ? "text-primary-heading"
                              : "text-secondary-subheading/50"
                          }`}
                        >
                          {cell.dateNumber}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Day Events Modal (Triggered by "+ X more") */}
      {selectedDayEventsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4 animate-in fade-in duration-150">
          <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-5 max-w-md w-full shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h3 className="text-sm sm:text-base font-bold text-primary-heading">
                Appointments on {selectedDayEventsModal.dateStr}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedDayEventsModal(null)}
                className="text-secondary-subheading hover:text-primary-heading text-sm font-semibold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {selectedDayEventsModal.events.map((apt) => {
                const style = appointmentStatusConfigs[apt.status] || {
                  cardBg: "bg-apt-pref-bg",
                  accentBar: "bg-apt-pref-bar",
                };

                return (
                  <div
                    key={apt.id}
                    onClick={() => {
                      setSelectedDayEventsModal(null);
                      onSelectAppointment(apt);
                    }}
                    className={`rounded-lg ${style.cardBg} p-2.5 cursor-pointer hover:opacity-95 shadow-2xs select-none`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className={`w-[3px] h-3.5 rounded-full ${style.accentBar} shrink-0`} />
                      <h4 className="text-xs sm:text-[13px] font-semibold text-primary-heading truncate">
                        {apt.title}
                      </h4>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-secondary-subheading font-normal mt-0.5 pl-0.5">
                      {apt.timeSlot}
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

export default AppointmentsCalendar;

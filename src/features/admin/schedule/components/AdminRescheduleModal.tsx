"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronsUpDown } from "lucide-react";
import { Modal } from "@/components/reusable/Modal";
import { AdminAppointmentItem, CrewMember } from "../types/adminSchedule.types";
import { mockCrewMembers } from "../data/adminScheduleData";

interface AdminRescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: AdminAppointmentItem | null;
  onRescheduleSuccess: (updatedAppointment: AdminAppointmentItem) => void;
}

export const AdminRescheduleModal: React.FC<AdminRescheduleModalProps> = ({
  isOpen,
  onClose,
  appointment,
  onRescheduleSuccess,
}) => {
  // Calendar state: Selected day 11 in Aug 2026 matching Screenshot 4
  const [selectedDay, setSelectedDay] = useState<number>(11);
  const [currentMonth, setCurrentMonth] = useState<number>(7); // August (0-indexed)
  const [currentYear, setCurrentYear] = useState<number>(2026);

  const [startTime, setStartTime] = useState<string>("02:00 PM");
  const [endTime, setEndTime] = useState<string>("03:00 PM");

  // Crew tags in screenshot 4: Marcus Bell, Daniel Green, Tyrell Jones
  const [selectedCrewIds, setSelectedCrewIds] = useState<string[]>([
    "crew-5", // Marcus Bell
    "crew-1", // Daniel Green
    "crew-6", // Tyrell Jones
  ]);
  const [crewLeaderId, setCrewLeaderId] = useState<string>("crew-5"); // Marcus Bell
  const [reason, setReason] = useState<string>(
    "Our Crew member has injured."
  );

  const [isAddCrewOpen, setIsAddCrewOpen] = useState(false);

  if (!appointment) return null;

  // Available selectable slots matching Figma Screenshot 4
  const highlightedAvailableDays = new Set([
    16, 17, 18, 19, 23, 24, 25, 26, 28, 29,
  ]);

  const handleRemoveCrew = (id: string) => {
    setSelectedCrewIds((prev) => prev.filter((item) => item !== id));
  };

  const handleAddCrew = (id: string) => {
    if (!selectedCrewIds.includes(id)) {
      setSelectedCrewIds((prev) => [...prev, id]);
    }
    setIsAddCrewOpen(false);
  };

  const handleSaveAndSend = () => {
    const updatedCrew: CrewMember[] = selectedCrewIds
      .map((id) => mockCrewMembers.find((c) => c.id === id))
      .filter((c): c is CrewMember => Boolean(c))
      .map((c) => ({
        ...c,
        role: c.id === crewLeaderId ? "Lead" : "Member",
      }));

    const formattedDate = `${currentYear}-08-${String(selectedDay).padStart(2, "0")}`;
    const displayDate = `Aug ${selectedDay}, ${currentYear}`;

    const updated: AdminAppointmentItem = {
      ...appointment,
      date: formattedDate,
      dateDisplay: displayDate,
      timeSlot: `${startTime} - ${endTime}`,
      arrivalWindow: `${startTime} - ${endTime}`,
      status: "Rescheduled",
      rescheduleReason: reason,
      assignedCrew: updatedCrew,
    };

    onRescheduleSuccess(updated);
    onClose();
  };

  // Mini calendar cells for August 2026 (Aug 1 is Saturday in 2026)
  const daysInMonth = 31;
  const startDayOfWeek = 5; // Friday/Saturday offset

  const timeOptions = [
    "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "05:00 PM",
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      title={
        <div className="space-y-0.5">
          <h3 className="text-xl font-medium text-primary-heading font-barlow-condensed leading-tight">
            Appointment Details
          </h3>
          <span className="text-xs text-primary font-medium block">
            #{appointment.id}
          </span>
        </div>
      }
      footer={
        <div className="w-full flex items-center justify-end gap-3 text-xs sm:text-sm">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-border rounded-md font-medium text-secondary-subheading hover:bg-page-bg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveAndSend}
            className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-md font-medium transition-colors cursor-pointer shadow-2xs"
          >
            Save & Send
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Mini Calendar (Figma Screenshot 4) */}
        <div className="border border-border rounded-lg p-3 sm:p-4 bg-card-bg space-y-3">
          {/* Month Navigation */}
          <div className="flex items-center justify-center gap-4 text-sm font-medium text-primary">
            <button
              type="button"
              onClick={() => setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))}
              className="p-1 rounded hover:bg-page-bg transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold text-primary select-none">
              Aug 2026
            </span>
            <button
              type="button"
              onClick={() => setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))}
              className="p-1 rounded hover:bg-page-bg transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 text-center text-[11px] font-medium text-secondary-subheading">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {/* Blank leading slots */}
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <div key={`blank-${i}`} className="w-8 h-8" />
            ))}

            {/* Month Days 1 to 31 */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const isSelected = selectedDay === dayNum;
              const isAvailable = highlightedAvailableDays.has(dayNum);

              let buttonStyle = "text-primary-heading hover:bg-page-bg";
              if (isSelected) {
                buttonStyle = "bg-primary text-white font-medium shadow-2xs";
              } else if (isAvailable) {
                buttonStyle = "bg-blue-50/90 text-primary-heading font-medium hover:bg-blue-100";
              }

              return (
                <button
                  type="button"
                  key={`day-${dayNum}`}
                  onClick={() => setSelectedDay(dayNum)}
                  className={`w-8 h-8 mx-auto rounded flex items-center justify-center transition-colors cursor-pointer ${buttonStyle}`}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>
        </div>

        {/* Start Time & End Time (2 columns) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-primary-heading">
              Start Time
            </label>
            <div className="relative">
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full border border-border rounded-md px-3 py-2 text-xs sm:text-sm bg-card-bg text-primary-heading appearance-none focus:outline-none focus:border-primary pr-8 cursor-pointer"
              >
                {timeOptions.map((t) => (
                  <option key={`start-${t}`} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronsUpDown className="w-4 h-4 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-primary-heading">
              End Time
            </label>
            <div className="relative">
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full border border-border rounded-md px-3 py-2 text-xs sm:text-sm bg-card-bg text-primary-heading appearance-none focus:outline-none focus:border-primary pr-8 cursor-pointer"
              >
                {timeOptions.map((t) => (
                  <option key={`end-${t}`} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronsUpDown className="w-4 h-4 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Assign Crew Multiselect Box */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-primary-heading">
            Assign Crew
          </label>
          <div className="border border-border rounded-md p-2 flex flex-wrap items-center gap-1.5 min-h-[42px] bg-card-bg">
            {selectedCrewIds.map((id) => {
              const crew = mockCrewMembers.find((c) => c.id === id);
              if (!crew) return null;
              return (
                <span
                  key={id}
                  className="inline-flex items-center gap-1.5 bg-blue-50 text-primary text-xs font-medium px-2.5 py-1 rounded"
                >
                  <span>{crew.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCrew(id)}
                    className="hover:text-decline cursor-pointer"
                    aria-label={`Remove ${crew.name}`}
                  >
                    ✕
                  </button>
                </span>
              );
            })}

            {/* Add More Crew Dropdown Trigger */}
            <div className="relative inline-block">
              <button
                type="button"
                onClick={() => setIsAddCrewOpen((prev) => !prev)}
                className="inline-flex items-center gap-1 text-xs text-secondary-subheading hover:text-primary px-2 py-1 cursor-pointer transition-colors"
              >
                <span>+ 1 more</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isAddCrewOpen && (
                <div className="absolute left-0 mt-1 w-48 bg-card-bg rounded-md shadow-lg border border-border py-1 z-20 animate-in fade-in">
                  {mockCrewMembers
                    .filter((c) => !selectedCrewIds.includes(c.id))
                    .map((c) => (
                      <button
                        type="button"
                        key={c.id}
                        onClick={() => handleAddCrew(c.id)}
                        className="w-full text-left px-3 py-1.5 text-xs text-primary-heading hover:bg-page-bg transition-colors cursor-pointer flex items-center justify-between"
                      >
                        <span>{c.name}</span>
                        <span className="text-[10px] text-secondary-subheading">
                          {c.role}
                        </span>
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Select Crew Leader Dropdown */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-primary-heading">
            Select Crew Leader
          </label>
          <div className="relative">
            <select
              value={crewLeaderId}
              onChange={(e) => setCrewLeaderId(e.target.value)}
              className="w-full border border-border rounded-md px-3 py-2 text-xs sm:text-sm bg-card-bg text-primary-heading appearance-none focus:outline-none focus:border-primary pr-8 cursor-pointer"
            >
              {mockCrewMembers
                .filter((c) => selectedCrewIds.includes(c.id))
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
            <ChevronDown className="w-4 h-4 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Reason Textarea */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-primary-heading">
            Reason
          </label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for reschedule"
            className="w-full border border-border rounded-md p-3 text-xs sm:text-sm text-primary-heading bg-card-bg focus:outline-none focus:border-primary resize-none placeholder:text-secondary-subheading/60"
          />
        </div>
      </div>
    </Modal>
  );
};

export default AdminRescheduleModal;

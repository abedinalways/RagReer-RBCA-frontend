"use client";

import React, { useState, useEffect, useRef } from "react";
import { Modal } from "@/components/reusable/Modal";
import { Calendar, ChevronDown, ChevronUp, Check } from "lucide-react";
import toast from "react-hot-toast";
import { MOCK_SITE_VISIT_CREW, CrewMember } from "../data/siteVisitCrewData";

// Helper to convert DD/MM/YYYY to YYYY-MM-DD
const toIsoDate = (dmy: string): string => {
  if (!dmy) return "";
  const parts = dmy.split("/");
  if (parts.length === 3 && parts[2]?.length === 4) {
    const [d, m, y] = parts;
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  return "";
};

// Helper to convert YYYY-MM-DD to DD/MM/YYYY
const fromIsoDate = (iso: string): string => {
  if (!iso) return "";
  const parts = iso.split("-");
  if (parts.length === 3) {
    const [y, m, d] = parts;
    return `${d.padStart(2, "0")}/${m.padStart(2, "0")}/${y}`;
  }
  return iso;
};

// Helper to parse preferredDate string (e.g. "21 Sep, 2026") into DD/MM/YYYY
const parsePreferredDateToDmy = (dateStr?: string): string => {
  if (!dateStr) return "21/09/2026";
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      const day = d.getDate().toString().padStart(2, "0");
      const month = (d.getMonth() + 1).toString().padStart(2, "0");
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    }
  } catch {}
  return "21/09/2026";
};

// Helper to parse time string like "02:00 AM", "2:00 PM"
const parseTimeString = (timeStr: string): { hours: number; minutes: number } => {
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i);
  if (!match) {
    return { hours: 9, minutes: 0 };
  }
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3]?.toUpperCase();

  if (period === "PM" && hours < 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }
  return { hours, minutes };
};

// Helper to format hours & minutes as hh:mm A
const formatTimeString = (hours: number, minutes: number): string => {
  const period = hours >= 12 ? "PM" : "AM";
  let displayHours = hours % 12;
  if (displayHours === 0) displayHours = 12;
  const hStr = displayHours.toString().padStart(2, "0");
  const mStr = minutes.toString().padStart(2, "0");
  return `${hStr}:${mStr} ${period}`;
};

// Step time up or down by stepMinutes (default 30 mins)
const stepTime = (
  currentTime: string,
  direction: "up" | "down",
  stepMinutes = 30
): string => {
  const { hours, minutes } = parseTimeString(currentTime);
  let totalMinutes = hours * 60 + minutes;
  if (direction === "up") {
    totalMinutes = (totalMinutes + stepMinutes) % (24 * 60);
  } else {
    totalMinutes = (totalMinutes - stepMinutes + 24 * 60) % (24 * 60);
  }
  const newHours = Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;
  return formatTimeString(newHours, newMinutes);
};

// 48 intervals of 30 minutes
const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const hours = Math.floor(i / 2);
  const minutes = (i % 2) * 30;
  return formatTimeString(hours, minutes);
});

export interface SiteVisitRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  request?: {
    id: string;
    requestId: string;
    customer: {
      name: string;
      email?: string;
    };
    propertyName?: string;
    propertyAddress: string;
    preferredDate?: string;
    alternateDate?: string;
  } | null;
  onSuccess?: (requestId: string) => void;
}

export const SiteVisitRequestModal: React.FC<SiteVisitRequestModalProps> = ({
  isOpen,
  onClose,
  request,
  onSuccess,
}) => {
  const [visitDate, setVisitDate] = useState("21/09/2026");
  const [startTime, setStartTime] = useState("02:00 AM");
  const [endTime, setEndTime] = useState("03:00 PM");
  const [isStartTimeOpen, setIsStartTimeOpen] = useState(false);
  const [isEndTimeOpen, setIsEndTimeOpen] = useState(false);
  const [selectedCrew, setSelectedCrew] = useState<CrewMember>(MOCK_SITE_VISIT_CREW[0]);
  const [isCrewDropdownOpen, setIsCrewDropdownOpen] = useState(false);
  const [note, setNote] = useState(
    "We need to inspect your property before providing a final estimate. Our crew member will visit your site and if there is any new requirements will send to you with the final estimate."
  );
  const [isInternalNoteOpen, setIsInternalNoteOpen] = useState(true);
  const [internalNote, setInternalNote] = useState(
    "Check irrigation heads near east island — flagged by customer. Take photos of entire property for estimate reference."
  );

  const dateInputRef = useRef<HTMLInputElement>(null);
  const crewDropdownRef = useRef<HTMLDivElement>(null);
  const startTimeContainerRef = useRef<HTMLDivElement>(null);
  const endTimeContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        crewDropdownRef.current &&
        !crewDropdownRef.current.contains(target)
      ) {
        setIsCrewDropdownOpen(false);
      }
      if (
        startTimeContainerRef.current &&
        !startTimeContainerRef.current.contains(target)
      ) {
        setIsStartTimeOpen(false);
      }
      if (
        endTimeContainerRef.current &&
        !endTimeContainerRef.current.contains(target)
      ) {
        setIsEndTimeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset or initialize on open
  useEffect(() => {
    if (isOpen) {
      setIsCrewDropdownOpen(false);
      setIsStartTimeOpen(false);
      setIsEndTimeOpen(false);
      if (request?.preferredDate) {
        setVisitDate(parsePreferredDateToDmy(request.preferredDate));
      }
    }
  }, [isOpen, request?.preferredDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const customerName = request?.customer?.name || "Alex Morgan";

    // Custom Toast matching Screenshot 3
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-in fade-in zoom-in-95" : "animate-out fade-out"
          } max-w-sm w-full bg-card-bg shadow-xl rounded-xl border border-border p-3.5 flex items-start gap-3 pointer-events-auto transition-all`}
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-badge-active-bg text-badge-active-text mt-0.5 shrink-0 border border-badge-active-border">
            <Check className="h-3.5 w-3.5 stroke-[2.5]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-primary-heading">
              Site Visit Request Sent
            </p>
            <p className="text-[11px] sm:text-xs text-secondary-subheading mt-0.5 font-normal">
              Site visit request sent to {customerName}
            </p>
          </div>
        </div>
      ),
      { position: "bottom-right", duration: 4000 }
    );

    if (request?.id && onSuccess) {
      onSuccess(request.id);
    }

    onClose();
  };

  const propertyName =
    request?.propertyName || "North Entrance Monument & Islands";
  const propertyAddress =
    request?.propertyAddress || "100 Whispering Pines Blvd at Hwy 43";
  const preferredDate = request?.preferredDate || "21 Sep, 2026";
  const alternateDate = request?.alternateDate || "22 Sep, 2026";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Site Visit Request"
      maxWidth="lg"
      headerClassName="border-b-0 px-5 sm:px-6 pt-5 sm:pt-6 pb-2"
      titleClassName="font-barlow text-2xl font-medium tracking-tight text-primary-heading"
      className="p-0 overflow-hidden rounded-xl border border-border"
      contentClassName="px-5 sm:px-6 pb-6 pt-0 space-y-3.5 max-h-[82vh] overflow-y-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Top Summary Card (Property details + Preferred Dates) */}
        <div className="rounded-lg border border-border bg-card-bg p-3.5 sm:p-4 flex items-center justify-between gap-3">
          <div className="space-y-2 min-w-0 flex-1">
            <div>
              <span className="text-xs text-secondary-subheading font-normal block">
                Property Name
              </span>
              <p className="text-sm font-medium text-primary-heading truncate mt-0.5">
                {propertyName}
              </p>
            </div>
            <div>
              <span className="text-xs text-secondary-subheading font-normal block">
                Property Address
              </span>
              <p className="text-sm text-secondary-subheading font-normal truncate mt-0.5">
                {propertyAddress}
              </p>
            </div>
          </div>

          {/* Date Highlights Box (Solid light blue matching Figma) */}
          <div className="rounded-lg bg-[#EAF2F9] p-3 min-w-[125px] shrink-0 space-y-2">
            <div>
              <span className="text-[11px] text-secondary-subheading font-normal block">
                Preferred Date
              </span>
              <span className="text-sm font-medium text-primary-heading block mt-0.5">
                {preferredDate}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-secondary-subheading font-normal block">
                Alternate Date
              </span>
              <span className="text-sm font-medium text-primary-heading block mt-0.5">
                {alternateDate}
              </span>
            </div>
          </div>
        </div>

        {/* Visit Date */}
        <div className="space-y-1">
          <label className="block font-barlow text-base font-medium text-primary-heading">
            Visit Date
          </label>
          <div className="relative">
            <input
              type="text"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              placeholder="DD/MM/YYYY"
              className="w-full rounded-md border border-border bg-card-bg px-3.5 py-2.5 pr-10 text-sm text-secondary-subheading focus:border-primary focus:outline-hidden transition-colors"
            />
            {/* Hidden native date input to trigger OS/browser calendar picker */}
            <input
              ref={dateInputRef}
              type="date"
              value={toIsoDate(visitDate)}
              onChange={(e) => {
                if (e.target.value) {
                  setVisitDate(fromIsoDate(e.target.value));
                }
              }}
              className="sr-only"
              tabIndex={-1}
            />
            <button
              type="button"
              onClick={() => {
                try {
                  dateInputRef.current?.showPicker?.();
                } catch {
                  dateInputRef.current?.focus();
                }
              }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-secondary-subheading/70 hover:text-primary transition-colors cursor-pointer p-0.5"
              title="Open calendar picker"
            >
              <Calendar className="h-5 w-5 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* Start Time & End Time */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* Start Time */}
          <div className="space-y-1 relative" ref={startTimeContainerRef}>
            <label className="block font-barlow text-base font-medium text-primary-heading">
              Start Time
            </label>
            <div className="relative">
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                onClick={() => setIsStartTimeOpen((p) => !p)}
                placeholder="00:00 AM"
                className="w-full rounded-md border border-border bg-card-bg px-3.5 py-2.5 pr-8 text-sm text-secondary-subheading focus:border-primary focus:outline-hidden transition-colors cursor-pointer"
              />
              <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex flex-col items-center">
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={(e) => {
                    e.stopPropagation();
                    setStartTime((prev) => stepTime(prev, "up"));
                  }}
                  className="p-0.5 text-secondary-subheading/60 hover:text-primary transition-colors cursor-pointer rounded"
                  title="Increase time"
                >
                  <ChevronUp className="h-3 w-3 stroke-[2.2]" />
                </button>
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={(e) => {
                    e.stopPropagation();
                    setStartTime((prev) => stepTime(prev, "down"));
                  }}
                  className="p-0.5 text-secondary-subheading/60 hover:text-primary transition-colors cursor-pointer rounded"
                  title="Decrease time"
                >
                  <ChevronDown className="h-3 w-3 stroke-[2.2]" />
                </button>
              </div>
            </div>

            {/* Start Time Dropdown Menu */}
            {isStartTimeOpen && (
              <div className="absolute left-0 right-0 top-full mt-1 z-50 rounded-xl border border-border bg-card-bg shadow-xl p-1 max-h-48 overflow-y-auto animate-in fade-in zoom-in-95 duration-100">
                <div className="flex flex-col gap-0.5">
                  {TIME_OPTIONS.map((timeOption) => {
                    const isSelected = timeOption === startTime;
                    return (
                      <button
                        key={timeOption}
                        type="button"
                        onClick={() => {
                          setStartTime(timeOption);
                          setIsStartTimeOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-secondary-subheading hover:bg-page-bg hover:text-primary-heading"
                        }`}
                      >
                        {timeOption}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* End Time */}
          <div className="space-y-1 relative" ref={endTimeContainerRef}>
            <label className="block font-barlow text-base font-medium text-primary-heading">
              End Time
            </label>
            <div className="relative">
              <input
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                onClick={() => setIsEndTimeOpen((p) => !p)}
                placeholder="00:00 PM"
                className="w-full rounded-md border border-border bg-card-bg px-3.5 py-2.5 pr-8 text-sm text-secondary-subheading focus:border-primary focus:outline-hidden transition-colors cursor-pointer"
              />
              <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex flex-col items-center">
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={(e) => {
                    e.stopPropagation();
                    setEndTime((prev) => stepTime(prev, "up"));
                  }}
                  className="p-0.5 text-secondary-subheading/60 hover:text-primary transition-colors cursor-pointer rounded"
                  title="Increase time"
                >
                  <ChevronUp className="h-3 w-3 stroke-[2.2]" />
                </button>
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={(e) => {
                    e.stopPropagation();
                    setEndTime((prev) => stepTime(prev, "down"));
                  }}
                  className="p-0.5 text-secondary-subheading/60 hover:text-primary transition-colors cursor-pointer rounded"
                  title="Decrease time"
                >
                  <ChevronDown className="h-3 w-3 stroke-[2.2]" />
                </button>
              </div>
            </div>

            {/* End Time Dropdown Menu */}
            {isEndTimeOpen && (
              <div className="absolute left-0 right-0 top-full mt-1 z-50 rounded-xl border border-border bg-card-bg shadow-xl p-1 max-h-48 overflow-y-auto animate-in fade-in zoom-in-95 duration-100">
                <div className="flex flex-col gap-0.5">
                  {TIME_OPTIONS.map((timeOption) => {
                    const isSelected = timeOption === endTime;
                    return (
                      <button
                        key={timeOption}
                        type="button"
                        onClick={() => {
                          setEndTime(timeOption);
                          setIsEndTimeOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-secondary-subheading hover:bg-page-bg hover:text-primary-heading"
                        }`}
                      >
                        {timeOption}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Assign Crew Dropdown */}
        <div className="space-y-1 relative" ref={crewDropdownRef}>
          <label className="block font-barlow text-base font-medium text-primary-heading">
            Assign Crew
          </label>
          <button
            type="button"
            onClick={() => setIsCrewDropdownOpen((prev) => !prev)}
            className="w-full flex items-center justify-between rounded-md border border-border bg-card-bg px-3.5 py-2.5 text-sm text-secondary-subheading hover:border-primary/50 transition-colors cursor-pointer text-left"
          >
            <span>{selectedCrew.name}</span>
            <ChevronDown
              className={`h-4 w-4 text-secondary-subheading transition-transform ${
                isCrewDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu (matching Screenshot 2) */}
          {isCrewDropdownOpen && (
            <div className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-xl border border-border bg-card-bg shadow-2xl p-1.5 animate-in fade-in zoom-in-95 duration-100 max-h-56 overflow-y-auto">
              <div className="flex flex-col gap-0.5">
                {MOCK_SITE_VISIT_CREW.map((crew) => {
                  const isSelected = crew.id === selectedCrew.id;
                  return (
                    <button
                      key={crew.id}
                      type="button"
                      onClick={() => {
                        setSelectedCrew(crew);
                        setIsCrewDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-page-bg text-primary-heading"
                          : "hover:bg-page-bg/60 text-txt-primary"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={crew.avatar}
                          alt={crew.name}
                          className="h-7 w-7 rounded-full object-cover border border-border shrink-0"
                        />
                        <span className="font-normal truncate">{crew.name}</span>
                      </div>
                      {isSelected && (
                        <Check className="h-4 w-4 text-primary shrink-0 stroke-[2]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Add Note */}
        <div className="space-y-1">
          <label className="block font-barlow text-base font-medium text-primary-heading">
            Add Note
          </label>
          <div className="relative">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value.slice(0, 200))}
              rows={3}
              placeholder="Add any note for the customer..."
              className="w-full rounded-md border border-border bg-card-bg p-3 text-xs sm:text-sm text-secondary-subheading leading-relaxed focus:border-primary focus:outline-hidden resize-none"
            />
            <span className="absolute right-2.5 bottom-2 text-[11px] text-secondary-subheading/60 select-none">
              {note.length}/200
            </span>
          </div>
        </div>

        {/* Collapsible Accordion: Add Internal Note (Crew Only) with outer border card */}
        <div className="rounded-md border border-border bg-card-bg p-3 sm:p-3.5 space-y-2">
          <button
            type="button"
            onClick={() => setIsInternalNoteOpen((p) => !p)}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary-heading hover:text-primary transition-colors cursor-pointer select-none"
          >
            <span className="text-primary text-[10px]">
              {isInternalNoteOpen ? "▼" : "▶"}
            </span>
            <span className="font-barlow text-sm sm:text-base font-medium text-primary-heading">
              Add Internal Note
            </span>
            <span className="text-xs text-secondary-subheading font-normal">
              (Crew Only)
            </span>
          </button>

          {isInternalNoteOpen && (
            <div className="relative animate-in fade-in duration-150">
              <textarea
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value.slice(0, 200))}
                rows={2}
                placeholder="Internal instructions for the crew member..."
                className="w-full rounded-md border border-border bg-card-bg p-2.5 text-xs sm:text-sm text-secondary-subheading leading-relaxed focus:border-primary focus:outline-hidden resize-none"
              />
              <span className="absolute right-2.5 bottom-2 text-[11px] text-secondary-subheading/60 select-none">
                {internalNote.length}/200
              </span>
            </div>
          )}
        </div>

        {/* Footer Actions (No border divider, side-by-side matching Screenshot 1) */}
        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-sm border border-primary text-primary hover:bg-page-bg font-medium text-xs sm:text-sm text-center transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2.5 px-4 rounded-sm bg-primary text-white hover:bg-primary-hover font-medium text-xs sm:text-sm text-center shadow-2xs transition-colors cursor-pointer"
          >
            Send Request
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SiteVisitRequestModal;

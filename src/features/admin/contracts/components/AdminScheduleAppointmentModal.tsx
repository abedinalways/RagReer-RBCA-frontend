"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Calendar,
  ChevronsUpDown,
  ChevronDown,
  ChevronUp,
  Check,
  Plus,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

export interface CrewMemberOption {
  id: string;
  name: string;
  avatar: string;
  strikes: number;
}

const DEFAULT_CREW_OPTIONS: CrewMemberOption[] = [
  {
    id: "crew-5",
    name: "Marcus Bell",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
    strikes: 0,
  },
  {
    id: "crew-1",
    name: "Daniel Green",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    strikes: 2,
  },
  {
    id: "crew-6",
    name: "Tyrell Jones",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    strikes: 0,
  },
  {
    id: "crew-7",
    name: "Ana Reyes",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
    strikes: 1,
  },
  {
    id: "crew-8",
    name: "Cody Vance",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    strikes: 0,
  },
];

const EQUIPMENT_OPTIONS = [
  "Mower",
  "Leaf Blower",
  "Hedge Trimmer",
  "Lawn Aerator",
  "Truck #1",
];

// Preset contracts that can be chosen directly in Contact ID dropdown
interface PresetContractOption {
  id: string;
  label: string;
  customerName: string;
  propertyAddress: string;
  requestType: string;
  frequency: string;
  estimatedVisit: string;
  contractPeriod: string;
  preferredTime: string;
  estimatedDuration: string;
  dates: string[];
}

const PRESET_CONTRACTS: PresetContractOption[] = [
  {
    id: "Contract #CNT-13245",
    label: "Contract #CNT-13245",
    customerName: "Alex Morgan",
    propertyAddress: "100 Whispering Pines Blv...",
    requestType: "One Time",
    frequency: "One Time",
    estimatedVisit: "2",
    contractPeriod: "Jan 01, 2026 - Jan 02, 2026",
    preferredTime: "02:00 PM - 05:00 PM",
    estimatedDuration: "4 hours/day",
    dates: ["27/09/2026", "28/09/2026"],
  },
  {
    id: "#CN-1024",
    label: "Contract #CN-1024",
    customerName: "Alex Morgan",
    propertyAddress: "100 Whispering Pines Blvd at Hwy 43",
    requestType: "Commercial Lawn Care",
    frequency: "Monthly",
    estimatedVisit: "22 visit",
    contractPeriod: "Jan 01, 2026 to Dec 31, 2026",
    preferredTime: "11:00 AM- 02:00 PM",
    estimatedDuration: "3hr/day",
    dates: ["27/09/2026"],
  },
  {
    id: "#CN-1025",
    label: "Contract #CN-1025",
    customerName: "Jordan Lee",
    propertyAddress: "987 Pine Avenue",
    requestType: "Commercial Tree...",
    frequency: "Monthly",
    estimatedVisit: "12 visit",
    contractPeriod: "Feb 15 - Aug 14, 2026",
    preferredTime: "09:00 AM - 12:00 PM",
    estimatedDuration: "2hr/day",
    dates: ["15/02/2026"],
  },
  {
    id: "#CN-1026",
    label: "Contract #CN-1026",
    customerName: "Taylor Smith",
    propertyAddress: "456 Maple Lane",
    requestType: "Residential Lawn...",
    frequency: "Monthly",
    estimatedVisit: "8 visit",
    contractPeriod: "Mar 01 - Sep 30, 2026",
    preferredTime: "01:00 PM - 04:00 PM",
    estimatedDuration: "3hr/day",
    dates: ["01/03/2026"],
  },
];

interface AdminScheduleAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractId?: string;
  customerName?: string;
  propertyAddress?: string;
  requestType?: string;
  frequency?: string;
  estimatedVisit?: string;
  contractPeriod?: string;
  preferredTime?: string;
  estimatedDuration?: string;
  onSuccess?: () => void;
}

export const AdminScheduleAppointmentModal: React.FC<
  AdminScheduleAppointmentModalProps
> = ({
  isOpen,
  onClose,
  contractId = "Contract #CNT-13245",
  customerName = "Alex Morgan",
  propertyAddress = "100 Whispering Pines Blv...",
  requestType = "One Time",
  frequency = "One Time",
  estimatedVisit = "2",
  contractPeriod = "Jan 01, 2026 - Jan 02, 2026",
  preferredTime = "02:00 PM - 05:00 PM",
  estimatedDuration = "4 hours/day",
  onSuccess,
}) => {
  // Determine if initial prop is One Time
  const isInitialOneTime =
    requestType?.toLowerCase().includes("one time") ||
    frequency?.toLowerCase().includes("one time") ||
    contractId?.toLowerCase().includes("13245");

  // Default contract selection
  const defaultContractId = isInitialOneTime
    ? "Contract #CNT-13245"
    : contractId.startsWith("#") || contractId.startsWith("Contract")
    ? contractId
    : `Contract ${contractId}`;

  const [selectedContactId, setSelectedContactId] =
    useState<string>(defaultContractId);
  const [currentCustomerName, setCurrentCustomerName] =
    useState<string>(customerName);
  const [currentPropertyAddress, setCurrentPropertyAddress] =
    useState<string>(propertyAddress);
  const [currentRequestType, setCurrentRequestType] =
    useState<string>(requestType);
  const [currentFrequency, setCurrentFrequency] = useState<string>(frequency);
  const [currentContractPeriod, setCurrentContractPeriod] =
    useState<string>(contractPeriod);
  const [currentPreferredTime, setCurrentPreferredTime] =
    useState<string>(preferredTime);
  const [durationValue, setDurationValue] = useState<string>(estimatedDuration);

  // Multi-date management for One Time requests
  const [dates, setDates] = useState<string[]>(
    isInitialOneTime ? ["27/09/2026", "28/09/2026"] : ["27/09/2026"]
  );
  const [arrivalTime, setArrivalTime] = useState("10:00 AM");

  // Crew state: matching Figma screenshot where it says "Select Crew"
  const [selectedCrewIds, setSelectedCrewIds] = useState<string[]>([]);
  const [isCrewDropdownOpen, setIsCrewDropdownOpen] = useState(false);

  // Crew Leader state: Marcus Bell as default
  const [selectedLeaderId, setSelectedLeaderId] = useState<string>("crew-5");
  const [isLeaderDropdownOpen, setIsLeaderDropdownOpen] = useState(false);

  // Equipment state
  const [selectedEquipment, setSelectedEquipment] = useState("Mower");

  // Notes state with 0/200 counter
  const [notes, setNotes] = useState("");

  const crewDropdownRef = useRef<HTMLDivElement>(null);
  const leaderDropdownRef = useRef<HTMLDivElement>(null);
  const dateInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Update form fields when selectedContactId changes or modal opens
  useEffect(() => {
    const matched = PRESET_CONTRACTS.find(
      (c) =>
        c.id.toLowerCase() === selectedContactId.toLowerCase() ||
        c.label.toLowerCase() === selectedContactId.toLowerCase()
    );

    if (matched) {
      setCurrentCustomerName(matched.customerName);
      setCurrentPropertyAddress(matched.propertyAddress);
      setCurrentRequestType(matched.requestType);
      setCurrentFrequency(matched.frequency);
      setCurrentContractPeriod(matched.contractPeriod);
      setCurrentPreferredTime(matched.preferredTime);
      setDurationValue(matched.estimatedDuration);
      setDates(matched.dates);
    } else {
      setCurrentCustomerName(customerName);
      setCurrentPropertyAddress(propertyAddress);
      setCurrentRequestType(requestType);
      setCurrentFrequency(frequency);
      setCurrentContractPeriod(contractPeriod);
      setCurrentPreferredTime(preferredTime);
      setDurationValue(estimatedDuration);
      if (isInitialOneTime) {
        setDates(["27/09/2026", "28/09/2026"]);
      } else {
        setDates(["27/09/2026"]);
      }
    }
  }, [
    selectedContactId,
    isOpen,
    customerName,
    propertyAddress,
    requestType,
    frequency,
    contractPeriod,
    preferredTime,
    estimatedDuration,
    isInitialOneTime,
  ]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        crewDropdownRef.current &&
        !crewDropdownRef.current.contains(e.target as Node)
      ) {
        setIsCrewDropdownOpen(false);
      }
      if (
        leaderDropdownRef.current &&
        !leaderDropdownRef.current.contains(e.target as Node)
      ) {
        setIsLeaderDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const isOneTime =
    currentRequestType.toLowerCase().includes("one time") ||
    currentFrequency.toLowerCase().includes("one time") ||
    selectedContactId.toLowerCase().includes("13245");

  // Dynamic estimated visits count
  const displayEstimatedVisits = isOneTime
    ? dates.length.toString()
    : estimatedVisit;

  // Add date row (max 15 visits)
  const addDateRow = () => {
    if (dates.length >= 15) {
      toast.error("You can add maximum 15 visits");
      return;
    }
    setDates((prev) => [...prev, ""]);
  };

  // Remove specific date row
  const removeDateRow = (indexToRemove: number) => {
    if (dates.length <= 1) return;
    setDates((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Update date text
  const updateDate = (index: number, val: string) => {
    setDates((prev) => {
      const updated = [...prev];
      updated[index] = val;
      return updated;
    });
  };

  // Handle native date picker selection
  const handleNativeDatePick = (index: number, isoDate: string) => {
    if (!isoDate) return;
    const parts = isoDate.split("-");
    if (parts.length === 3) {
      const formatted = `${parts[2]}/${parts[1]}/${parts[0]}`;
      updateDate(index, formatted);
    }
  };

  // Trigger native date picker
  const triggerDatePicker = (index: number) => {
    const input = dateInputRefs.current[index];
    if (input) {
      if (typeof input.showPicker === "function") {
        input.showPicker();
      } else {
        input.focus();
      }
    }
  };

  // Crew selection
  const toggleCrewMember = (id: string) => {
    setSelectedCrewIds((prev) => {
      const exists = prev.includes(id);
      const updated = exists
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      if (exists && selectedLeaderId === id) {
        if (updated.length > 0) {
          setSelectedLeaderId(updated[0]);
        }
      }
      return updated;
    });
  };

  const removeCrewMember = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCrewIds((prev) => {
      const updated = prev.filter((item) => item !== id);
      if (selectedLeaderId === id && updated.length > 0) {
        setSelectedLeaderId(updated[0]);
      }
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Appointment scheduled successfully!");
    if (onSuccess) onSuccess();
    onClose();
  };

  const leaderCandidates = DEFAULT_CREW_OPTIONS.filter((c) =>
    selectedCrewIds.length > 0 ? selectedCrewIds.includes(c.id) : true
  );

  const selectedLeader =
    DEFAULT_CREW_OPTIONS.find((c) => c.id === selectedLeaderId) ||
    leaderCandidates[0] ||
    DEFAULT_CREW_OPTIONS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-card-bg w-full max-w-[620px] rounded-sm shadow-2xl border border-border p-5 sm:p-6 space-y-4 max-h-[92vh] overflow-y-auto">
        {/* Header matching Figma */}
        <div className="flex items-center justify-between pb-1">
          <h2 className="font-barlow-condensed font-medium text-xl md:text-2xl text-primary-heading tracking-tight">
            Schedule New Appointment
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-xs text-secondary-subheading hover:text-txt-primary hover:bg-page-bg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Row 1: Contact ID | Customer Name | Property Address */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-normal text-txt-primary mb-1">
                Contact ID
              </label>
              <div className="relative">
                <select
                  value={selectedContactId}
                  onChange={(e) => setSelectedContactId(e.target.value)}
                  className="w-full appearance-none rounded-xs border border-border bg-[#F9FAFB] px-3 py-2 text-xs md:text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer pr-8"
                >
                  {PRESET_CONTRACTS.map((contract) => (
                    <option key={contract.id} value={contract.id}>
                      {contract.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-subheading pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-normal text-txt-primary mb-1">
                Customer Name
              </label>
              <input
                type="text"
                readOnly
                value={currentCustomerName}
                placeholder="Alex Morgan"
                className="w-full rounded-xs border border-border bg-[#F9FAFB] px-3 py-2 text-xs md:text-sm text-txt-primary cursor-not-allowed focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-normal text-txt-primary mb-1">
                Property Address
              </label>
              <input
                type="text"
                readOnly
                value={currentPropertyAddress}
                placeholder="100 Whispering Pines Blv..."
                className="w-full rounded-xs border border-border bg-[#F9FAFB] px-3 py-2 text-xs md:text-sm text-txt-primary cursor-not-allowed focus:outline-none truncate"
              />
            </div>
          </div>

          {/* Row 2: Request Type | Frequency | Estimated Visit */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-normal text-txt-primary mb-1">
                Request Type
              </label>
              <input
                type="text"
                readOnly
                value={currentRequestType}
                placeholder="One Time"
                className="w-full rounded-xs border border-border bg-[#F9FAFB] px-3 py-2 text-xs md:text-sm text-txt-primary cursor-not-allowed focus:outline-none truncate"
              />
            </div>

            <div>
              <label className="block text-xs font-normal text-txt-primary mb-1">
                Frequency
              </label>
              <input
                type="text"
                readOnly
                value={currentFrequency}
                placeholder="One Time"
                className="w-full rounded-xs border border-border bg-[#F9FAFB] px-3 py-2 text-xs md:text-sm text-txt-primary cursor-not-allowed focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-normal text-txt-primary mb-1">
                Estimated Visit
              </label>
              <input
                type="text"
                readOnly
                value={displayEstimatedVisits}
                placeholder="2"
                className="w-full rounded-xs border border-border bg-[#F9FAFB] px-3 py-2 text-xs md:text-sm text-txt-primary cursor-not-allowed focus:outline-none"
              />
            </div>
          </div>

          {/* Row 3: Contract Period | Preferred Time | Estimated Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-normal text-txt-primary mb-1">
                Contract Period
              </label>
              <input
                type="text"
                readOnly
                value={currentContractPeriod}
                placeholder="Jan 01, 2026 - Jan 02, 2026"
                className="w-full rounded-xs border border-border bg-[#F9FAFB] px-3 py-2 text-xs md:text-sm text-txt-primary cursor-not-allowed focus:outline-none truncate"
              />
            </div>

            <div>
              <label className="block text-xs font-normal text-txt-primary mb-1">
                Preferred Time
              </label>
              <input
                type="text"
                readOnly
                value={currentPreferredTime}
                placeholder="02:00 PM - 05:00 PM"
                className="w-full rounded-xs border border-border bg-[#F9FAFB] px-3 py-2 text-xs md:text-sm text-txt-primary cursor-not-allowed focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-normal text-txt-primary mb-1">
                Estimated Duration
              </label>
              <input
                type="text"
                value={durationValue}
                onChange={(e) => setDurationValue(e.target.value)}
                placeholder="4 hours/day"
                className="w-full rounded-xs border border-border bg-card-bg px-3 py-2 text-xs md:text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Row 4: Select Date & Arrival Time matching Figma Screenshots 1 & 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
            {/* Left Col: Select Date (Multi-date rows with + and Red Trash icon) */}
            <div>
              <label className="block text-xs font-normal text-txt-primary mb-1">
                Select Date
              </label>
              <div className="space-y-2">
                {dates.map((dateVal, index) => {
                  const isLast = index === dates.length - 1;
                  const showTrash = dates.length > 1;
                  const showPlus = isLast && dates.length < 15;

                  return (
                    <div
                      key={index}
                      className="group relative flex items-center w-full rounded-xs border border-border bg-card-bg px-3 py-2 transition-colors focus-within:ring-1 focus-within:ring-primary focus-within:border-primary"
                    >
                      <input
                        type="text"
                        value={dateVal}
                        onChange={(e) => updateDate(index, e.target.value)}
                        placeholder="dd/mm/yyyy"
                        className="w-full bg-transparent text-xs md:text-sm text-txt-primary focus:outline-none pr-16"
                      />

                      {/* Hidden native date input for calendar popover */}
                      <input
                        type="date"
                        ref={(el) => {
                          dateInputRefs.current[index] = el;
                        }}
                        onChange={(e) =>
                          handleNativeDatePick(index, e.target.value)
                        }
                        className="sr-only"
                        tabIndex={-1}
                      />

                      {/* Action Icons inside input right */}
                      <div className="absolute right-2.5 flex items-center gap-2">
                        {/* Calendar Icon */}
                        <button
                          type="button"
                          onClick={() => triggerDatePicker(index)}
                          className="text-secondary-subheading hover:text-txt-primary cursor-pointer transition-colors"
                          title="Open Calendar"
                        >
                          <Calendar className="h-4 w-4" />
                        </button>

                        {/* Red Trash Icon: visible on previous rows, and on last row on hover/focus */}
                        {showTrash && (
                          <button
                            type="button"
                            onClick={() => removeDateRow(index)}
                            className={`text-[#F04438] hover:text-red-700 cursor-pointer transition-opacity ${
                              isLast
                                ? "opacity-0 group-hover:opacity-100 focus:opacity-100"
                                : "opacity-100"
                            }`}
                            title="Remove visit"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}

                        {/* Plus (+) Icon on the last row */}
                        {showPlus && (
                          <button
                            type="button"
                            onClick={addDateRow}
                            className="text-secondary-subheading hover:text-txt-primary cursor-pointer transition-colors"
                            title="Add visit"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Amber Warning text matching Figma Screenshot 2 */}
                {isOneTime && (
                  <p className="text-[11px] text-[#F79009] font-normal mt-1">
                    you can add maximum 15 visits
                  </p>
                )}
              </div>
            </div>

            {/* Right Col: Arrival Time matching Figma Screenshots */}
            <div>
              <label className="block text-xs font-normal text-txt-primary mb-1">
                Arrival Time
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  placeholder="10:00 AM"
                  className="w-full rounded-xs border border-border bg-card-bg px-3 py-2 text-xs md:text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary pr-9"
                />
                <ChevronsUpDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-subheading pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 5: Assign Crew (Multi-select dropdown matching Figma) */}
          <div ref={crewDropdownRef} className="relative">
            <label className="block text-xs font-normal text-txt-primary mb-1">
              Assign Crew
            </label>
            <div
              onClick={() => setIsCrewDropdownOpen((prev) => !prev)}
              className="min-h-[38px] w-full rounded-xs border border-border bg-card-bg px-2.5 py-1.5 flex flex-wrap items-center gap-1.5 cursor-pointer justify-between"
            >
              <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                {selectedCrewIds.length === 0 ? (
                  <span className="text-xs text-secondary-subheading">
                    Select Crew
                  </span>
                ) : (
                  <>
                    {selectedCrewIds.slice(0, 3).map((id) => {
                      const member = DEFAULT_CREW_OPTIONS.find(
                        (c) => c.id === id
                      );
                      if (!member) return null;
                      return (
                        <span
                          key={member.id}
                          className="inline-flex items-center gap-1 rounded-xs bg-[#EFF8FF] text-[#175CD3] border border-[#B2DDFF] px-2 py-0.5 text-xs font-normal shrink-0"
                        >
                          <span>{member.name}</span>
                          <button
                            type="button"
                            onClick={(e) => removeCrewMember(member.id, e)}
                            className="hover:text-red-500 cursor-pointer ml-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      );
                    })}
                    {selectedCrewIds.length > 3 && (
                      <span className="text-xs text-secondary-subheading font-normal">
                        + {selectedCrewIds.length - 3} more
                      </span>
                    )}
                  </>
                )}
              </div>
              {isCrewDropdownOpen ? (
                <ChevronUp className="h-4 w-4 text-secondary-subheading shrink-0 pointer-events-none" />
              ) : (
                <ChevronDown className="h-4 w-4 text-secondary-subheading shrink-0 pointer-events-none" />
              )}
            </div>

            {/* Crew Member Dropdown List */}
            {isCrewDropdownOpen && (
              <div className="absolute z-20 mt-1 w-full rounded-xs border border-border bg-card-bg shadow-xl max-h-60 overflow-y-auto divide-y divide-border-subtle animate-in fade-in-50 duration-150">
                {DEFAULT_CREW_OPTIONS.map((crew) => {
                  const isSelected = selectedCrewIds.includes(crew.id);
                  const isZeroStrikes = crew.strikes === 0;

                  return (
                    <div
                      key={crew.id}
                      onClick={() => toggleCrewMember(crew.id)}
                      className="flex items-center justify-between px-3 py-2 text-xs md:text-sm hover:bg-page-bg cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer pointer-events-none"
                        />
                        <img
                          src={crew.avatar}
                          alt={crew.name}
                          className="h-7 w-7 rounded-full object-cover shrink-0"
                        />
                        <span className="text-txt-primary font-medium truncate">
                          {crew.name}
                        </span>
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-normal shrink-0 border ${
                          isZeroStrikes
                            ? "bg-[#ECFDF3] text-[#027A48] border-[#ABEFC6]"
                            : "bg-[#FEF0C7] text-[#B54708] border-[#FEDF89]"
                        }`}
                      >
                        Stricks : {crew.strikes}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Row 6: Select Crew Leader */}
          <div ref={leaderDropdownRef} className="relative">
            <label className="block text-xs font-normal text-txt-primary mb-1">
              Select Crew Leader
            </label>
            <div
              onClick={() => setIsLeaderDropdownOpen((prev) => !prev)}
              className="h-[38px] w-full rounded-xs border border-border bg-card-bg px-3 py-2 flex items-center justify-between text-xs md:text-sm text-txt-primary cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span>{selectedLeader.name}</span>
              </div>
              {isLeaderDropdownOpen ? (
                <ChevronUp className="h-4 w-4 text-secondary-subheading shrink-0 pointer-events-none" />
              ) : (
                <ChevronDown className="h-4 w-4 text-secondary-subheading shrink-0 pointer-events-none" />
              )}
            </div>

            {/* Crew Leader Dropdown Menu */}
            {isLeaderDropdownOpen && (
              <div className="absolute z-20 mt-1 w-full rounded-xs border border-border bg-card-bg shadow-xl max-h-48 overflow-y-auto divide-y divide-border-subtle animate-in fade-in-50 duration-150">
                {leaderCandidates.map((crew) => {
                  const isCurrent = selectedLeaderId === crew.id;
                  return (
                    <div
                      key={crew.id}
                      onClick={() => {
                        setSelectedLeaderId(crew.id);
                        setIsLeaderDropdownOpen(false);
                      }}
                      className="flex items-center justify-between px-3 py-2.5 text-xs md:text-sm hover:bg-page-bg cursor-pointer transition-colors"
                    >
                      <span
                        className={
                          isCurrent
                            ? "text-primary font-medium"
                            : "text-txt-primary font-normal"
                        }
                      >
                        {crew.name}
                      </span>
                      {isCurrent && (
                        <Check className="h-4 w-4 text-primary shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Row 7: Assign Equipment */}
          <div>
            <label className="block text-xs font-normal text-txt-primary mb-1">
              Assign Equipment
            </label>
            <div className="relative">
              <select
                value={selectedEquipment}
                onChange={(e) => setSelectedEquipment(e.target.value)}
                className="w-full appearance-none rounded-xs border border-border bg-card-bg px-3 py-2 text-xs md:text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer pr-8"
              >
                {EQUIPMENT_OPTIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-subheading pointer-events-none" />
            </div>
          </div>

          {/* Row 8: Add Note to Crew (optional) */}
          <div>
            <label className="block text-xs font-normal text-txt-primary mb-1">
              Add Note to Crew{" "}
              <span className="text-secondary-subheading">(optional)</span>
            </label>
            <div className="relative">
              <textarea
                value={notes}
                onChange={(e) => {
                  if (e.target.value.length <= 200) {
                    setNotes(e.target.value);
                  }
                }}
                rows={3}
                placeholder="Describe if you have any concern"
                className="w-full rounded-xs border border-border bg-card-bg p-3 text-xs md:text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none placeholder:text-secondary-subheading/60"
              />
              <span className="absolute bottom-2.5 right-3 text-[11px] text-secondary-subheading font-normal">
                {notes.length}/200
              </span>
            </div>
          </div>

          {/* Footer Actions: Cancel & Submit matching Figma */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xs border border-border bg-card-bg text-txt-primary hover:bg-page-bg text-xs md:text-sm font-medium transition-colors cursor-pointer text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xs bg-primary text-white hover:bg-primary-hover text-xs md:text-sm font-medium shadow-2xs transition-colors cursor-pointer text-center"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminScheduleAppointmentModal;
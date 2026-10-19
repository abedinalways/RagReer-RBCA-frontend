"use client";

import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

interface EditCrewEquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCrew?: string[];
  initialLeader?: string;
  initialEquipment?: string[];
  onSave?: (updated: {
    crew: string[];
    leader: string;
    equipment: string[];
  }) => void;
}

const AVAILABLE_CREW = [
  "Marcus Bell",
  "Daniel Green",
  "Tyrell Jones",
  "Liam Chen",
  "Emma Thompson",
  "Oliver Davis",
];

const AVAILABLE_EQUIPMENT = [
  "Mower",
  "Trimmer",
  "Truck1",
  "Leaf Blower",
  "Edger",
  "Trailer",
];

export const EditCrewEquipmentModal: React.FC<EditCrewEquipmentModalProps> = ({
  isOpen,
  onClose,
  initialCrew = ["Marcus Bell", "Daniel Green", "Tyrell Jones", "Liam Chen"],
  initialLeader = "Marcus Bell",
  initialEquipment = ["Mower", "Trimmer", "Truck1"],
  onSave,
}) => {
  const [selectedCrew, setSelectedCrew] = useState<string[]>(initialCrew);
  const [selectedLeader, setSelectedLeader] = useState<string>(initialLeader);
  const [selectedEquipment, setSelectedEquipment] =
    useState<string[]>(initialEquipment);

  const [crewDropdownOpen, setCrewDropdownOpen] = useState(false);
  const [equipmentDropdownOpen, setEquipmentDropdownOpen] = useState(false);

  if (!isOpen) return null;

  const removeCrew = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCrew((prev) => prev.filter((c) => c !== name));
    if (selectedLeader === name) {
      const remaining = selectedCrew.filter((c) => c !== name);
      setSelectedLeader(remaining[0] || "");
    }
  };

  const toggleCrew = (name: string) => {
    if (selectedCrew.includes(name)) {
      removeCrew(name, { stopPropagation: () => {} } as React.MouseEvent);
    } else {
      setSelectedCrew((prev) => [...prev, name]);
    }
  };

  const removeEquipment = (item: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEquipment((prev) => prev.filter((eq) => eq !== item));
  };

  const toggleEquipment = (item: string) => {
    if (selectedEquipment.includes(item)) {
      setSelectedEquipment((prev) => prev.filter((eq) => eq !== item));
    } else {
      setSelectedEquipment((prev) => [...prev, item]);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        crew: selectedCrew,
        leader: selectedLeader,
        equipment: selectedEquipment,
      });
    }
    toast.success("Crew and equipment updated successfully!");
    onClose();
  };

  const visibleCrew = selectedCrew.slice(0, 3);
  const extraCrewCount = selectedCrew.length - 3;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="w-full max-w-lg rounded-xl border border-border bg-card-bg shadow-2xl p-5 sm:p-6 space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-3">
          <h3 className="font-barlow text-lg sm:text-xl font-medium text-primary-heading">
            Edit Crew/Equipment
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-secondary-subheading hover:text-txt-primary hover:bg-page-bg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4">
          {/* 1. Assign Crew Multi-select */}
          <div className="relative space-y-1.5">
            <label className="block text-xs sm:text-sm font-medium text-txt-primary">
              Assign Crew
            </label>
            <div
              onClick={() => setCrewDropdownOpen((prev) => !prev)}
              className="min-h-11 w-full rounded-md border border-border bg-card-bg p-2 flex flex-wrap items-center justify-between gap-1.5 cursor-pointer hover:border-primary/40 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-1.5 flex-1">
                {visibleCrew.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 text-primary border border-blue-200 text-xs font-medium"
                  >
                    {c}
                    <button
                      type="button"
                      onClick={(e) => removeCrew(c, e)}
                      className="hover:text-primary-hover"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {extraCrewCount > 0 && (
                  <span className="text-xs text-secondary-subheading font-medium px-1">
                    + {extraCrewCount} more
                  </span>
                )}
              </div>
              <ChevronDown
                className={`h-4 w-4 text-secondary-subheading shrink-0 transition-transform ${
                  crewDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {crewDropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-1 z-30 rounded-lg border border-border bg-card-bg p-2 shadow-xl space-y-1 max-h-48 overflow-y-auto">
                {AVAILABLE_CREW.map((c) => {
                  const isChecked = selectedCrew.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleCrew(c)}
                      className={`w-full px-3 py-1.5 text-left text-xs font-medium rounded flex items-center justify-between ${
                        isChecked
                          ? "bg-blue-50 text-primary"
                          : "hover:bg-page-bg text-txt-primary"
                      }`}
                    >
                      <span>{c}</span>
                      {isChecked && <span>✓</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. Select Crew Leader */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-medium text-txt-primary">
              Select Crew Leader
            </label>
            <div className="relative">
              <select
                value={selectedLeader}
                onChange={(e) => setSelectedLeader(e.target.value)}
                className="w-full h-10 px-3 pr-8 rounded-md border border-border bg-card-bg text-xs sm:text-sm text-txt-primary appearance-none focus:outline-hidden focus:border-primary font-normal cursor-pointer"
              >
                {selectedCrew.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="h-4 w-4 text-secondary-subheading absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 3. Assign Equipment Multi-select */}
          <div className="relative space-y-1.5">
            <label className="block text-xs sm:text-sm font-medium text-txt-primary">
              Assign Equipment
            </label>
            <div
              onClick={() => setEquipmentDropdownOpen((prev) => !prev)}
              className="min-h-11 w-full rounded-md border border-border bg-card-bg p-2 flex flex-wrap items-center justify-between gap-1.5 cursor-pointer hover:border-primary/40 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-1.5 flex-1">
                {selectedEquipment.map((eq) => (
                  <span
                    key={eq}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 text-primary border border-blue-200 text-xs font-medium"
                  >
                    {eq}
                    <button
                      type="button"
                      onClick={(e) => removeEquipment(eq, e)}
                      className="hover:text-primary-hover"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <ChevronDown
                className={`h-4 w-4 text-secondary-subheading shrink-0 transition-transform ${
                  equipmentDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {equipmentDropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-1 z-30 rounded-lg border border-border bg-card-bg p-2 shadow-xl space-y-1 max-h-48 overflow-y-auto">
                {AVAILABLE_EQUIPMENT.map((eq) => {
                  const isChecked = selectedEquipment.includes(eq);
                  return (
                    <button
                      key={eq}
                      type="button"
                      onClick={() => toggleEquipment(eq)}
                      className={`w-full px-3 py-1.5 text-left text-xs font-medium rounded flex items-center justify-between ${
                        isChecked
                          ? "bg-blue-50 text-primary"
                          : "hover:bg-page-bg text-txt-primary"
                      }`}
                    >
                      <span>{eq}</span>
                      {isChecked && <span>✓</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/80">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-md border border-border bg-card-bg text-txt-primary hover:bg-page-bg text-xs sm:text-sm font-medium transition-colors cursor-pointer text-center"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="w-full py-2.5 px-4 rounded-md bg-primary text-white hover:bg-primary-hover text-xs sm:text-sm font-medium transition-colors cursor-pointer text-center shadow-2xs"
          >
            Save & Update
          </button>
        </div>
      </div>
    </div>
  );
};

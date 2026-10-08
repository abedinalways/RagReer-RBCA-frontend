"use client";

import React, { useState, useEffect, useRef } from "react";
import { Modal } from "@/components/reusable/Modal";
import { Calendar, ChevronDown, Check } from "lucide-react";
import {
  EquipmentItem,
  EquipmentCondition,
  EquipmentStatus,
} from "../types";
import {
  EQUIPMENT_TYPES,
  EQUIPMENT_CONDITIONS,
  EQUIPMENT_STATUSES,
} from "../data/equipmentData";
import { cn } from "@/lib/utils";

interface EquipmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: EquipmentItem | null;
  onSave: (data: Omit<EquipmentItem, "id"> & { id?: string }) => void;
}

export function EquipmentFormModal({
  isOpen,
  onClose,
  initialData,
  onSave,
}: EquipmentFormModalProps) {
  const isEditing = Boolean(initialData);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [condition, setCondition] = useState<EquipmentCondition>("Good");
  const [status, setStatus] = useState<EquipmentStatus>("Available");
  const [lastInspection, setLastInspection] = useState("");

  // Dropdown open states
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isConditionOpen, setIsConditionOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  // Refs for click outside detection
  const typeRef = useRef<HTMLDivElement>(null);
  const conditionRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setType(initialData.type);
      setCondition(initialData.condition);
      setStatus(initialData.status);
      setLastInspection(initialData.lastInspection);
    } else {
      setName("");
      setType("");
      setCondition("Good");
      setStatus("Available");
      setLastInspection("");
    }
    setIsTypeOpen(false);
    setIsConditionOpen(false);
    setIsStatusOpen(false);
  }, [initialData, isOpen]);

  // Click outside listener for all select dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (typeRef.current && !typeRef.current.contains(target)) {
        setIsTypeOpen(false);
      }
      if (conditionRef.current && !conditionRef.current.contains(target)) {
        setIsConditionOpen(false);
      }
      if (statusRef.current && !statusRef.current.contains(target)) {
        setIsStatusOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      id: initialData?.id,
      name: name.trim(),
      type: type || "Mower",
      condition,
      status,
      lastInspection:
        lastInspection ||
        new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      assignedTo: initialData?.assignedTo ?? null,
      assignedJob: initialData?.assignedJob ?? null,
    });
    onClose();
  };

  const conditionConfigs: Record<
    EquipmentCondition,
    { bg: string; text: string; border: string }
  > = {
    Good: { bg: "bg-[#EAF2F9]", text: "text-[#2D6A9F]", border: "border-[#CADFF4]" },
    Fair: { bg: "bg-[#ECFDF3]", text: "text-[#027A48]", border: "border-[#ABEFC6]" },
    Poor: { bg: "bg-[#FEF3F2]", text: "text-[#D92D20]", border: "border-[#FDA29B]" },
  };

  const statusConfigs: Record<
    EquipmentStatus,
    { bg: string; text: string; border: string; dot: string }
  > = {
    "In Use": {
      bg: "bg-[#EAF2F9]",
      text: "text-[#2D6A9F]",
      border: "border-[#CADFF4]",
      dot: "bg-[#0777F6]",
    },
    Available: {
      bg: "bg-[#ECFDF3]",
      text: "text-[#027A48]",
      border: "border-[#ABEFC6]",
      dot: "bg-[#12B76A]",
    },
    Damaged: {
      bg: "bg-[#FEF3F2]",
      text: "text-[#D92D20]",
      border: "border-[#FDA29B]",
      dot: "bg-[#D92D20]",
    },
    "In Repair": {
      bg: "bg-[#FEF6EE]",
      text: "text-[#B54708]",
      border: "border-[#FEDF89]",
      dot: "bg-[#F79009]",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Equipment" : "Add New Equipment"}
      maxWidth="lg"
      className="overflow-visible max-h-[92vh]"
      contentClassName="overflow-visible"
      footer={
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 w-full">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-md border border-border text-txt-primary hover:bg-page-bg font-medium text-sm md:text-base transition-colors cursor-pointer text-center"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-auto px-6 py-2.5 rounded-md bg-[#5980A6] text-white hover:bg-[#4A6E91] font-medium text-sm md:text-base transition-colors cursor-pointer shadow-xs text-center"
          >
            {isEditing ? "Save Changes" : "Add Equipment"}
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5 pt-1 pb-16 sm:pb-24">
        {/* Equipment Name */}
        <div className="space-y-1.5 relative z-10">
          <label className="block text-sm md:text-base font-medium text-primary-heading">
            Equipment Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="w-full rounded-md border border-border bg-input-bg px-3.5 py-2.5 text-sm md:text-base text-txt-primary placeholder:text-secondary-subheading/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
        </div>

        {/* Equipment Type (High Z-Index when open) */}
        <div
          ref={typeRef}
          className={cn(
            "space-y-1.5 relative transition-all",
            isTypeOpen ? "z-40" : "z-20"
          )}
        >
          <label className="block text-sm md:text-base font-medium text-primary-heading">
            Equipment Type
          </label>
          <button
            type="button"
            onClick={() => {
              setIsTypeOpen((prev) => !prev);
              setIsConditionOpen(false);
              setIsStatusOpen(false);
            }}
            className="w-full flex items-center justify-between rounded-md border border-border bg-input-bg px-3.5 py-2.5 text-sm md:text-base text-txt-primary hover:border-primary/50 transition-colors cursor-pointer"
          >
            <span>
              {type || <span className="text-secondary-subheading/70">Select type</span>}
            </span>
            <ChevronDown className="w-4 h-4 text-secondary-subheading shrink-0" />
          </button>

          {isTypeOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded-md border border-border bg-card-bg shadow-2xl z-50 py-1">
              {EQUIPMENT_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setType(t);
                    setIsTypeOpen(false);
                  }}
                  className={cn(
                    "w-full px-3.5 py-2 text-left text-sm md:text-base hover:bg-page-bg transition-colors flex items-center justify-between cursor-pointer",
                    type === t
                      ? "text-primary font-semibold bg-primary-light/30"
                      : "text-txt-primary"
                  )}
                >
                  <span>{t}</span>
                  {type === t && <Check className="w-4 h-4 text-primary stroke-[3]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Condition & Status (2 columns with High Z-Index when open) */}
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 gap-4 relative transition-all",
            isConditionOpen || isStatusOpen ? "z-30" : "z-10"
          )}
        >
          {/* Condition Select */}
          <div
            ref={conditionRef}
            className={cn(
              "space-y-1.5 relative",
              isConditionOpen ? "z-50" : "z-20"
            )}
          >
            <label className="block text-sm md:text-base font-medium text-primary-heading">
              Condition
            </label>
            <button
              type="button"
              onClick={() => {
                setIsConditionOpen((prev) => !prev);
                setIsTypeOpen(false);
                setIsStatusOpen(false);
              }}
              className="w-full flex items-center justify-between rounded-md border border-border bg-input-bg px-3.5 py-2.5 text-sm md:text-base text-txt-primary hover:border-primary/50 transition-colors cursor-pointer min-h-[44px]"
            >
              {condition ? (
                <span
                  className={cn(
                    "px-2.5 py-0.5 rounded border text-xs sm:text-sm font-medium",
                    conditionConfigs[condition]?.bg,
                    conditionConfigs[condition]?.text,
                    conditionConfigs[condition]?.border
                  )}
                >
                  {condition}
                </span>
              ) : (
                <span className="text-secondary-subheading/70">Select</span>
              )}
              <ChevronDown className="w-4 h-4 text-secondary-subheading shrink-0" />
            </button>

            {isConditionOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 rounded-md border border-border bg-card-bg shadow-2xl z-50 p-2 space-y-1">
                {EQUIPMENT_CONDITIONS.map((c) => {
                  const cond = c.value as EquipmentCondition;
                  const cfg = conditionConfigs[cond];
                  const isSelected = condition === cond;

                  return (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => {
                        setCondition(cond);
                        setIsConditionOpen(false);
                      }}
                      className={cn(
                        "w-full px-3 py-2 rounded text-left text-sm flex items-center justify-between transition-colors hover:bg-page-bg cursor-pointer",
                        isSelected ? "bg-page-bg/80" : ""
                      )}
                    >
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded border text-xs sm:text-sm font-medium",
                          cfg.bg,
                          cfg.text,
                          cfg.border
                        )}
                      >
                        {cond}
                      </span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-primary stroke-[3]" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Status Select */}
          <div
            ref={statusRef}
            className={cn(
              "space-y-1.5 relative",
              isStatusOpen ? "z-50" : "z-20"
            )}
          >
            <label className="block text-sm md:text-base font-medium text-primary-heading">
              Status
            </label>
            <button
              type="button"
              onClick={() => {
                setIsStatusOpen((prev) => !prev);
                setIsTypeOpen(false);
                setIsConditionOpen(false);
              }}
              className="w-full flex items-center justify-between rounded-md border border-border bg-input-bg px-3.5 py-2.5 text-sm md:text-base text-txt-primary hover:border-primary/50 transition-colors cursor-pointer min-h-[44px]"
            >
              {status ? (
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border text-xs sm:text-sm font-medium",
                    statusConfigs[status]?.bg,
                    statusConfigs[status]?.text,
                    statusConfigs[status]?.border
                  )}
                >
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      statusConfigs[status]?.dot
                    )}
                  />
                  {status}
                </span>
              ) : (
                <span className="text-secondary-subheading/70">Select</span>
              )}
              <ChevronDown className="w-4 h-4 text-secondary-subheading shrink-0" />
            </button>

            {isStatusOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 rounded-md border border-border bg-card-bg shadow-2xl z-50 p-2 space-y-1">
                {EQUIPMENT_STATUSES.map((st) => {
                  const stat = st.value as EquipmentStatus;
                  const cfg = statusConfigs[stat];
                  const isSelected = status === stat;

                  return (
                    <button
                      key={stat}
                      type="button"
                      onClick={() => {
                        setStatus(stat);
                        setIsStatusOpen(false);
                      }}
                      className={cn(
                        "w-full px-3 py-2 rounded text-left text-sm flex items-center justify-between transition-colors hover:bg-page-bg cursor-pointer",
                        isSelected ? "bg-page-bg/80" : ""
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs sm:text-sm font-medium",
                          cfg.bg,
                          cfg.text,
                          cfg.border
                        )}
                      >
                        <span
                          className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)}
                        />
                        {stat}
                      </span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-primary stroke-[3]" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Last Inspection */}
        <div className="space-y-1.5 relative z-0">
          <label className="block text-sm md:text-base font-medium text-primary-heading">
            Last Inspection
          </label>
          <div className="relative">
            <input
              type="text"
              value={lastInspection}
              onChange={(e) => setLastInspection(e.target.value)}
              placeholder="dd/mm/yyyy"
              className="w-full rounded-md border border-border bg-input-bg px-3.5 py-2.5 pr-10 text-sm md:text-base text-txt-primary placeholder:text-secondary-subheading/70 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />
            <Calendar className="w-4 h-4 text-secondary-subheading absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </form>
    </Modal>
  );
}

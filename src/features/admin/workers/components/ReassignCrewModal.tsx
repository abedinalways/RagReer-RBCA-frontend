"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { CrewAssignedJob } from "../types/crewMembers.types";
import { mockCrewMembersList } from "../data/crewMembersData";

interface ReassignCrewModalProps {
  job: CrewAssignedJob | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmReassign: (
    jobId: string,
    newCrewName: string,
    newRole: "Leader" | "Member"
  ) => void;
}

const ROLE_OPTIONS = [
  { value: "Leader", label: "Leader" },
  { value: "Member", label: "Member" },
];

export const ReassignCrewModal: React.FC<ReassignCrewModalProps> = ({
  job,
  isOpen,
  onClose,
  onConfirmReassign,
}) => {
  const [selectedCrew, setSelectedCrew] = useState<string>("Alex Morgan");
  const [selectedRole, setSelectedRole] = useState<"Leader" | "Member">("Leader");

  useEffect(() => {
    if (job) {
      setSelectedCrew("Alex Morgan");
      setSelectedRole(job.role || "Leader");
    }
  }, [job, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !job) return null;

  const crewOptions = mockCrewMembersList.map((m) => ({
    value: m.name,
    label: m.name,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmReassign(job.id, selectedCrew, selectedRole);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-card-bg rounded-xl border border-border shadow-2xl max-w-md w-full p-6 space-y-5 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium text-primary-heading font-barlow-condensed">
            Reassign Crew
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-secondary-subheading hover:text-primary-heading p-1 rounded-md hover:bg-page-bg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {/* Select Crew */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-medium text-primary-heading">
              Select Crew
            </label>
            <CustomSelect
              value={selectedCrew}
              onChange={(val) => setSelectedCrew(val)}
              options={crewOptions}
              size="sm"
              triggerClassName="h-10 px-3 text-xs sm:text-sm border-border-input"
            />
          </div>

          {/* Select Role */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-medium text-primary-heading">
              Select Role
            </label>
            <CustomSelect
              value={selectedRole}
              onChange={(val) => setSelectedRole(val as "Leader" | "Member")}
              options={ROLE_OPTIONS}
              size="sm"
              triggerClassName="h-10 px-3 text-xs sm:text-sm border-border-input"
            />
          </div>

          {/* Footer Actions */}
          <div className="grid grid-cols-2 gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-4 border border-border rounded-md text-xs sm:text-sm font-medium text-secondary-subheading hover:bg-page-bg transition-colors cursor-pointer text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-primary hover:bg-primary-hover text-white rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs text-center"
            >
              Save & Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReassignCrewModal;

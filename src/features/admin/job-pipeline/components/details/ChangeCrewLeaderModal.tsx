"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

interface CrewLeaderCandidate {
  id: string;
  name: string;
  avatar: string;
  strikeCount: number;
}

interface ChangeCrewLeaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLeaderId?: string;
  onSelectLeader?: (leader: CrewLeaderCandidate) => void;
}

const CANDIDATES: CrewLeaderCandidate[] = [
  {
    id: "lead-1",
    name: "Marcus Bell",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
    strikeCount: 0,
  },
  {
    id: "lead-2",
    name: "Marcus Bell",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    strikeCount: 2,
  },
  {
    id: "lead-3",
    name: "Marcus Bell",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    strikeCount: 0,
  },
  {
    id: "lead-4",
    name: "Marcus Bell",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    strikeCount: 1,
  },
];

export const ChangeCrewLeaderModal: React.FC<ChangeCrewLeaderModalProps> = ({
  isOpen,
  onClose,
  currentLeaderId = "lead-1",
  onSelectLeader,
}) => {
  const [selectedId, setSelectedId] = useState<string>(currentLeaderId);

  if (!isOpen) return null;

  const handleConfirm = () => {
    const selected = CANDIDATES.find((c) => c.id === selectedId) || CANDIDATES[0];
    if (onSelectLeader) {
      onSelectLeader(selected);
    }
    toast.success(`${selected.name} set as Crew Leader!`);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="w-full max-w-md rounded-xl border border-border bg-card-bg shadow-2xl p-5 sm:p-6 space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-3">
          <h3 className="font-barlow text-lg sm:text-xl font-medium text-primary-heading">
            Change Crew Leader
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
        <div className="space-y-2.5">
          <label className="block text-xs sm:text-sm font-medium text-txt-primary">
            Select Crew Leader
          </label>

          <div className="space-y-2">
            {CANDIDATES.map((candidate) => {
              const isSelected = selectedId === candidate.id;
              const hasStrikes = candidate.strikeCount > 0;

              return (
                <div
                  key={candidate.id}
                  onClick={() => setSelectedId(candidate.id)}
                  className={`w-full rounded-lg p-2.5 sm:p-3 flex items-center justify-between gap-3 border cursor-pointer transition-all ${
                    isSelected
                      ? "border-blue-200 bg-blue-50/70"
                      : "border-border/80 bg-card-bg hover:bg-page-bg/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Radio Dot */}
                    <div
                      className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-primary bg-card-bg"
                          : "border-secondary-subheading/40 bg-card-bg"
                      }`}
                    >
                      {isSelected && (
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>

                    {/* Avatar */}
                    <img
                      src={candidate.avatar}
                      alt={candidate.name}
                      className="h-9 w-9 rounded-full object-cover shrink-0 border border-border"
                    />

                    {/* Name */}
                    <span className="font-medium text-xs sm:text-sm text-txt-primary">
                      {candidate.name}
                    </span>
                  </div>

                  {/* Strike Tag matching Screenshot 4 */}
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-sm font-medium border shrink-0 ${
                      hasStrikes
                        ? "border-amber-300 bg-amber-50 text-amber-600"
                        : "border-emerald-300 bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    Stricks : {candidate.strikeCount}
                  </span>
                </div>
              );
            })}
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
            onClick={handleConfirm}
            className="w-full py-2.5 px-4 rounded-md bg-primary text-white hover:bg-primary-hover text-xs sm:text-sm font-medium transition-colors cursor-pointer text-center shadow-2xs"
          >
            Set As Crew Leader
          </button>
        </div>
      </div>
    </div>
  );
};

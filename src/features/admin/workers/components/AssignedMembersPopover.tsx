"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { RouteAssignedMember } from "../types/crewMembers.types";

interface AssignedMembersPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  members: RouteAssignedMember[];
  onSelectMember?: (member: RouteAssignedMember) => void;
}

export const AssignedMembersPopover: React.FC<AssignedMembersPopoverProps> = ({
  isOpen,
  onClose,
  members,
  onSelectMember,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={popoverRef}
      className="absolute right-0 bottom-full mb-2 sm:bottom-auto sm:top-full sm:mt-2 z-40 w-64 sm:w-72 bg-card-bg rounded-xl border border-border shadow-xl p-3.5 space-y-2.5 animate-in fade-in zoom-in-95 duration-150"
    >
      <h4 className="text-sm font-medium text-primary-heading font-barlow-condensed border-b border-border/80 pb-2">
        Assigned Members
      </h4>

      <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
        {members.map((member, index) => {
          const isFirst = index === 0;
          return (
            <div
              key={`${member.id}-${index}`}
              onClick={() => {
                onSelectMember?.(member);
                onClose();
              }}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                isFirst
                  ? "bg-blue-50/80 hover:bg-blue-50 text-txt-primary"
                  : "hover:bg-page-bg text-txt-primary"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-border bg-slate-100 shrink-0">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    sizes="28px"
                    className="object-cover"
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-primary hover:underline truncate">
                  {member.name}
                </span>
              </div>

              {/* Strikes Badge */}
              <span
                className={`text-[11px] px-2 py-0.5 rounded font-medium border shrink-0 ${
                  member.strikes === 0
                    ? "border-badge-active-border bg-badge-active-bg text-badge-active-text"
                    : "border-amber-300 bg-amber-50 text-amber-800"
                }`}
              >
                Stricks : {member.strikes}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssignedMembersPopover;

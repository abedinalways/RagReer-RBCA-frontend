"use client";

import { ArrowLeft, Users, ShieldCheck } from "lucide-react";
import { UserCrewRole } from "./types";

interface TimeEntryTravelHeaderProps {
  title?: string;
  onBack: () => void;
  role: UserCrewRole;
  onToggleRole: () => void;
}

export function TimeEntryTravelHeader({
  title = "Traveling to the Site",
  onBack,
  role,
  onToggleRole,
}: TimeEntryTravelHeaderProps) {
  const isLeader = role === "CREW_LEADER";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-pure-white-bg border-b border-border px-4 py-3 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="p-1 -ml-1 rounded-md text-primary-heading hover:bg-blue-50/60 transition-colors cursor-pointer active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-barlow text-xl sm:text-2xl font-bold tracking-tight text-primary-heading">
          {title}
        </h1>
      </div>

      {/* Role Switcher Pill for Testing/Role-adaptation */}
      <button
        type="button"
        onClick={onToggleRole}
        title="Click to switch role (Crew Leader vs Crew Member)"
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer select-none active:scale-95 ${
          isLeader
            ? "bg-blue-50 text-primary border-blue-100 hover:bg-blue-100/70"
            : "bg-surface text-secondary-subheading border-border-input hover:bg-slate-200"
        }`}
      >
        {isLeader ? (
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
        ) : (
          <Users className="h-3.5 w-3.5 text-secondary-subheading" />
        )}
        <span>{isLeader ? "Crew Leader" : "Crew Member"}</span>
      </button>
    </header>
  );
}

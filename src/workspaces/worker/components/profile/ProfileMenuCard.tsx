"use client";

import { Settings, Phone, ChevronRight } from "lucide-react";

interface ProfileMenuCardProps {
  onSelectPersonalInfo: () => void;
  onSelectJobHistory: () => void;
  onSelectSettings: () => void;
  onSelectContactSupervisor: () => void;
}

export function ProfileMenuCard({
  onSelectPersonalInfo,
  onSelectJobHistory,
  onSelectSettings,
  onSelectContactSupervisor,
}: ProfileMenuCardProps) {
  return (
    <div className="rounded-sm border border-[#D9DADC] bg-white shadow-2xs divide-y divide-[#EAECF0]">
      {/* 1. Personal Information */}
      <button
        type="button"
        onClick={onSelectPersonalInfo}
        className="w-full flex items-center justify-between p-4 hover:bg-slate-50/80 transition-colors cursor-pointer text-left"
      >
        <div className="flex items-center gap-3">
          <div className="text-primary shrink-0">
            {/* Custom ID Card Badge Icon matching Figma */}
            <svg
              className="h-5 w-5 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="14" x="3" y="5" rx="2" />
              <path d="M7 9h4" />
              <path d="M7 13h4" />
              <circle cx="15.5" cy="11.5" r="2" />
            </svg>
          </div>
          <span className="text-sm font-medium text-txt-primary">
            Personal Information
          </span>
        </div>
        <ChevronRight className="h-4 w-4 text-secondary-subheading/70" />
      </button>

      {/* 2. Job History */}
      <button
        type="button"
        onClick={onSelectJobHistory}
        className="w-full flex items-center justify-between p-4 hover:bg-slate-50/80 transition-colors cursor-pointer text-left"
      >
        <div className="flex items-center gap-3">
          <div className="text-primary shrink-0">
            {/* Document Clock Icon matching Figma */}
            <svg
              className="h-5 w-5 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <circle cx="12" cy="14.5" r="2.8" />
              <polyline points="12 13 12 14.5 13.5 14.5" />
            </svg>
          </div>
          <span className="text-sm font-medium text-txt-primary">
            Job History
          </span>
        </div>
        <ChevronRight className="h-4 w-4 text-secondary-subheading/70" />
      </button>

      {/* 3. Settings */}
      <button
        type="button"
        onClick={onSelectSettings}
        className="w-full flex items-center justify-between p-4 hover:bg-slate-50/80 transition-colors cursor-pointer text-left"
      >
        <div className="flex items-center gap-3">
          <Settings className="h-5 w-5 text-primary shrink-0" />
          <span className="text-sm font-medium text-txt-primary">
            Settings
          </span>
        </div>
        <ChevronRight className="h-4 w-4 text-secondary-subheading/70" />
      </button>

      {/* 4. Contact Supervisor */}
      <button
        type="button"
        onClick={onSelectContactSupervisor}
        className="w-full flex items-center justify-between p-4 hover:bg-slate-50/80 transition-colors cursor-pointer text-left"
      >
        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 text-primary shrink-0" />
          <span className="text-sm font-medium text-txt-primary">
            Contat Supervisor
          </span>
        </div>
      </button>
    </div>
  );
}

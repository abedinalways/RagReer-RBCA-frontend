"use client";

import { ChevronRight } from "lucide-react";
import {
  PersonalInfoIcon,
  JobHistoryIcon,
  ProfileSettingsIcon,
  ContactSupervisorIcon,
} from "../icons/profile";

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
    <div className="rounded-sm border border-surface bg-white shadow-2xs divide-y divide-surface">
      {/* 1. Personal Information */}
      <button
        type="button"
        onClick={onSelectPersonalInfo}
        className="w-full flex items-center justify-between p-4 hover:bg-slate-50/80 transition-colors cursor-pointer text-left"
      >
        <div className="flex items-center gap-3">
          <div className="text-primary shrink-0">
            <PersonalInfoIcon className="h-6 w-6 text-primary" />
          </div>
          <span className="text-base font-medium text-secondary-subheading">
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
            <JobHistoryIcon className="h-6 w-6 text-primary" />
          </div>
          <span className="text-base font-medium text-secondary-subheading">
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
          <div className="text-primary shrink-0">
            <ProfileSettingsIcon className="h-6 w-6 text-primary" />
          </div>
          <span className="text-base font-medium text-secondary-subheading">
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
          <div className="text-primary shrink-0">
            <ContactSupervisorIcon className="h-6 w-6 text-primary" />
          </div>
          <span className="text-base font-medium text-secondary-subheading">
            Contact Supervisor
          </span>
        </div>
      </button>
    </div>
  );
}

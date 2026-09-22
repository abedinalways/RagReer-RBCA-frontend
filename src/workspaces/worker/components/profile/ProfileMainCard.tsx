"use client";

import { Pencil, Trash2 } from "lucide-react";
import { WorkerProfileData } from "../../data/mockWorkerProfile";

interface ProfileMainCardProps {
  profile: WorkerProfileData;
  isEditMode?: boolean;
  onEditAvatar?: () => void;
  onDeletePhoto?: () => void;
}

export function ProfileMainCard({
  profile,
  isEditMode = false,
  onEditAvatar,
  onDeletePhoto,
}: ProfileMainCardProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-sm border border-[#D9DADC] bg-[#F8F9FA] shadow-2xs">
      {/* Avatar Container */}
      <div className="relative">
        <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-white shadow-xs bg-slate-200">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.fullName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-primary/20 text-primary font-barlow text-2xl font-bold">
              {profile.firstName[0]}
              {profile.lastName[0]}
            </div>
          )}
        </div>

        {/* Small Edit Pencil Badge on bottom-right of avatar (view mode only) */}
        {!isEditMode && onEditAvatar && (
          <button
            type="button"
            onClick={onEditAvatar}
            className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-[#CADFF4] text-primary border-2 border-white flex items-center justify-center shadow-xs hover:bg-blue-100 transition-colors cursor-pointer active:scale-95"
            aria-label="Change photo"
          >
            <Pencil className="h-3 w-3 text-primary" />
          </button>
        )}
      </div>

      {/* View Mode: Name & Profession */}
      {!isEditMode ? (
        <div className="text-center mt-3">
          <h2 className="font-barlow text-lg font-medium text-primary-heading leading-tight">
            {profile.fullName}
          </h2>
          <p className="text-xs text-secondary-subheading font-normal mt-0.5">
            Plumber • Electrician
          </p>
        </div>
      ) : (
        /* Edit Mode: Delete Photo Action */
        <button
          type="button"
          onClick={onDeletePhoto}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#E11D48] hover:text-red-700 transition-colors cursor-pointer active:scale-95"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Delete photo</span>
        </button>
      )}
    </div>
  );
}

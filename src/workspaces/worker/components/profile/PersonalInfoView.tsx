"use client";

import { ChevronLeft, Pencil } from "lucide-react";
import { WorkerProfileData } from "../../data/mockWorkerProfile";
import { ProfileMainCard } from "./ProfileMainCard";

interface PersonalInfoViewProps {
  profile: WorkerProfileData;
  onBack: () => void;
  onEdit: () => void;
}

export function PersonalInfoView({ profile, onBack, onEdit }: PersonalInfoViewProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <header className="flex items-center gap-2 border-b border-[#D9DADC]/60 pb-3">
        <button
          type="button"
          onClick={onBack}
          className="p-1 -ml-1 text-primary-heading hover:bg-slate-100 rounded-md transition-colors cursor-pointer active:scale-95"
          aria-label="Back"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="font-barlow text-xl font-medium tracking-tight text-primary-heading">
          Personal information
        </h1>
      </header>

      {/* Top Profile Card */}
      <ProfileMainCard profile={profile} onEditAvatar={onEdit} />

      {/* Section Header: Personal Info + Edit Pencil */}
      <div className="flex items-center justify-between pt-1">
        <h2 className="font-barlow text-lg font-semibold text-primary-heading">
          Personal Info
        </h2>
        <button
          type="button"
          onClick={onEdit}
          className="p-1 text-primary hover:text-primary-hover hover:bg-blue-50/50 rounded transition-all cursor-pointer active:scale-95"
          aria-label="Edit personal info"
          title="Edit personal info"
        >
          <Pencil className="h-4 w-4" />
        </button>
      </div>

      {/* Personal Info Cards List */}
      <div className="flex flex-col gap-2.5">
        {/* Name */}
        <div className="flex items-center justify-between p-3.5 rounded-sm  bg-white shadow-2xs">
          <span className="text-sm text-secondary-subheading font-normal">
            Name
          </span>
          <span className="text-sm font-semibold text-primary">
            {profile.fullName}
          </span>
        </div>

        {/* Profession */}
        <div className="flex items-center justify-between p-3.5 rounded-sm  bg-white shadow-2xs">
          <span className="text-sm text-secondary-subheading font-normal">
            Profession
          </span>
          <div className="flex items-center gap-2">
            {profile.professionsList.map((tag) => (
              <span key={tag} className="text-sm font-semibold text-primary">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Work Experience */}
        <div className="flex items-center justify-between p-3.5 rounded-sm  bg-white shadow-2xs">
          <span className="text-sm text-secondary-subheading font-normal">
            Work Experience
          </span>
          <span className="text-sm font-semibold text-primary">
            {profile.workExperience}
          </span>
        </div>

        {/* Date of birth */}
        <div className="flex items-center justify-between p-3.5 rounded-sm  bg-white shadow-2xs">
          <span className="text-sm text-secondary-subheading font-normal">
            Date of birth
          </span>
          <span className="text-sm font-semibold text-primary">
            {profile.dateOfBirth}
          </span>
        </div>

        {/* Phone number */}
        <div className="flex items-center justify-between p-3.5 rounded-sm  bg-white shadow-2xs">
          <span className="text-sm text-secondary-subheading font-normal">
            Phone number
          </span>
          <span className="text-sm font-semibold text-primary">
            {profile.phoneNumber}
          </span>
        </div>

        {/* Address */}
        <div className="flex items-center justify-between p-3.5 rounded-sm  bg-white shadow-2xs gap-4">
          <span className="text-sm text-secondary-subheading font-normal shrink-0">
            Address
          </span>
          <span className="text-sm font-semibold text-primary text-right truncate">
            {profile.address}
          </span>
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-1.5 p-3.5 rounded-sm  bg-white shadow-2xs">
          <span className="text-sm font-semibold text-primary-heading">
            Bio
          </span>
          <p className="text-sm text-secondary-subheading leading-relaxed font-normal">
            {profile.bio}
          </p>
        </div>

        {/* Emergency Contact Person */}
        <div className="flex items-center justify-between p-3.5 rounded-sm  bg-white shadow-2xs">
          <span className="text-sm text-secondary-subheading font-normal">
            Emergency Contact Person
          </span>
          <span className="text-sm font-semibold text-primary">
            {profile.emergencyContact.person}
          </span>
        </div>

        {/* Emergency Contact Phone */}
        <div className="flex items-center justify-between p-3.5 rounded-sm  bg-white shadow-2xs">
          <span className="text-sm text-secondary-subheading font-normal">
            Phone number
          </span>
          <span className="text-sm font-semibold text-primary">
            {profile.emergencyContact.phoneNumber}
          </span>
        </div>

        {/* Emergency Contact Relation */}
        <div className="flex items-center justify-between p-3.5 rounded-sm  bg-white shadow-2xs">
          <span className="text-sm text-secondary-subheading font-normal">
            Relation
          </span>
          <span className="text-sm font-semibold text-primary">
            {profile.emergencyContact.relation}
          </span>
        </div>
      </div>
    </div>
  );
}

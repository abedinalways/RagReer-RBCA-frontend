"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { WorkerProfileData } from "../../data/mockWorkerProfile";
import { ProfileMainCard } from "./ProfileMainCard";
import { DiscardChangesModal } from "./DiscardChangesModal";

interface EditPersonalInfoViewProps {
  profile: WorkerProfileData;
  onSave: (updated: WorkerProfileData) => void;
  onCancel: () => void;
}

export function EditPersonalInfoView({
  profile,
  onSave,
  onCancel,
}: EditPersonalInfoViewProps) {
  // Form State initialized with current profile
  const [formData, setFormData] = useState<WorkerProfileData>({ ...profile });
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);

  // Check if modified compared to initial
  const isDirty = JSON.stringify(formData) !== JSON.stringify(profile);

  const handleChange = (field: keyof WorkerProfileData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEmergencyChange = (
    field: keyof WorkerProfileData["emergencyContact"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value,
      },
    }));
  };

  const handleDeletePhoto = () => {
    setFormData((prev) => ({ ...prev, avatarUrl: "" }));
    toast.success("Photo removed");
  };

  const handleAttemptCancel = () => {
    if (isDirty) {
      setIsDiscardModalOpen(true);
    } else {
      onCancel();
    }
  };

  const handleSave = () => {
    // Reconstruct fullName and professionsList from edited fields
    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();
    const professionsList = formData.profession
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const updatedProfile: WorkerProfileData = {
      ...formData,
      fullName: fullName || formData.fullName,
      professionsList: professionsList.length > 0 ? professionsList : formData.professionsList,
    };

    onSave(updatedProfile);
    toast.success("Profile saved successfully");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Action Header: Cancel | Personal information | Save */}
      <header className="flex items-center justify-between border-b border-[#D9DADC]/60 pb-3">
        <button
          type="button"
          onClick={handleAttemptCancel}
          className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer py-1 px-1 -ml-1 active:scale-95"
        >
          Cancel
        </button>

        <h1 className="font-barlow text-base font-semibold text-primary-heading text-center">
          Personal information
        </h1>

        <button
          type="button"
          onClick={handleSave}
          className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer py-1 px-1 -mr-1 active:scale-95"
        >
          Save
        </button>
      </header>

      {/* Profile Card in Edit Mode (with Delete photo) */}
      <ProfileMainCard
        profile={formData}
        isEditMode={true}
        onDeletePhoto={handleDeletePhoto}
      />

      {/* Section Header */}
      <div className="pt-1">
        <h2 className="font-barlow text-base font-semibold text-primary-heading">
          Personal Info
        </h2>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-3">
        {/* First Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-primary-heading">
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className="w-full rounded-sm border border-[#D9DADC] bg-white px-3 py-2 text-xs text-txt-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-primary-heading">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className="w-full rounded-sm border border-[#D9DADC] bg-white px-3 py-2 text-xs text-txt-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
          />
        </div>

        {/* Profession */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-primary-heading">
            Profession
          </label>
          <input
            type="text"
            value={formData.profession}
            onChange={(e) => handleChange("profession", e.target.value)}
            placeholder="#Plumber, #Electrician"
            className="w-full rounded-sm border border-[#D9DADC] bg-white px-3 py-2 text-xs text-txt-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
          />
        </div>

        {/* Work Experience */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-primary-heading">
            Work Experience
          </label>
          <input
            type="text"
            value={formData.workExperience}
            onChange={(e) => handleChange("workExperience", e.target.value)}
            placeholder="e.g. 4 Years"
            className="w-full rounded-sm border border-[#D9DADC] bg-white px-3 py-2 text-xs text-txt-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
          />
        </div>

        {/* Date of birth */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-primary-heading">
            Date of birth
          </label>
          <input
            type="text"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            placeholder="MM/DD/YYYY"
            className="w-full rounded-sm border border-[#D9DADC] bg-white px-3 py-2 text-xs text-txt-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
          />
        </div>

        {/* Phone number */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-primary-heading">
            Phone number
          </label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            className="w-full rounded-sm border border-[#D9DADC] bg-white px-3 py-2 text-xs text-txt-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-primary-heading">
            Address
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="w-full rounded-sm border border-[#D9DADC] bg-white px-3 py-2 text-xs text-txt-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
          />
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-primary-heading">
            Bio
          </label>
          <textarea
            rows={4}
            value={formData.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            className="w-full rounded-sm border border-[#D9DADC] bg-white p-3 text-xs text-txt-primary leading-relaxed focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs resize-none"
          />
        </div>

        {/* Emergency Contact Person */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-primary-heading">
            Emergency Contact Person
          </label>
          <input
            type="text"
            value={formData.emergencyContact.person}
            onChange={(e) => handleEmergencyChange("person", e.target.value)}
            className="w-full rounded-sm border border-[#D9DADC] bg-white px-3 py-2 text-xs text-txt-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
          />
        </div>

        {/* Emergency Contact Phone number */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-primary-heading">
            Phone number
          </label>
          <input
            type="tel"
            value={formData.emergencyContact.phoneNumber}
            onChange={(e) => handleEmergencyChange("phoneNumber", e.target.value)}
            className="w-full rounded-sm border border-[#D9DADC] bg-white px-3 py-2 text-xs text-txt-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
          />
        </div>

        {/* Emergency Contact Relation */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-primary-heading">
            Relation
          </label>
          <input
            type="text"
            value={formData.emergencyContact.relation}
            onChange={(e) => handleEmergencyChange("relation", e.target.value)}
            className="w-full rounded-sm border border-[#D9DADC] bg-white px-3 py-2 text-xs text-txt-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
          />
        </div>
      </div>

      {/* Discard Confirmation Modal */}
      <DiscardChangesModal
        isOpen={isDiscardModalOpen}
        onConfirmDiscard={() => {
          setIsDiscardModalOpen(false);
          onCancel();
        }}
        onCancel={() => setIsDiscardModalOpen(false)}
      />
    </div>
  );
}

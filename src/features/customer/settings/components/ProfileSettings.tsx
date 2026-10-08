"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { SettingsTab, CustomerProfileData } from "../types/settingsTypes";
import { INITIAL_PROFILE_DATA } from "../data/settingsData";
import VerifyEmailModal from "./VerifyEmailModal";
import EmailSuccessModal from "./EmailSuccessModal";
import VerifyPhoneModal from "./VerifyPhoneModal";
import SecuritySettings from "./SecuritySettings";
import NotificationSettings from "./NotificationSettings";
import PaymentSettings from "./PaymentSettings";
import DataPrivacySettings from "./DataPrivacySettings";

const TABS: SettingsTab[] = [
  "Profile",
  "Security",
  "Notifications",
  "Payment",
  "Data & Privacy",
];

export const ProfileSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>("Profile");
  const [profileData, setProfileData] =
    useState<CustomerProfileData>(INITIAL_PROFILE_DATA);

  // Hidden File Input for Avatar Upload
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modals State
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isEmailSuccessOpen, setIsEmailSuccessOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isPhoneSuccessNotice, setIsPhoneSuccessNotice] = useState(false);

  // Profile Picture Handlers
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileData((prev) => ({ ...prev, avatarUrl: url }));
    }
  };

  const handleAvatarRemove = () => {
    setProfileData((prev) => ({
      ...prev,
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250",
    }));
  };

  const handleInputChange = (
    field: keyof CustomerProfileData,
    value: string
  ) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    console.log("Saving profile changes:", profileData);
    alert("Profile settings saved successfully!");
  };

  const handleCancel = () => {
    setProfileData(INITIAL_PROFILE_DATA);
  };

  // Verification Handlers
  const handleEmailVerified = () => {
    setIsEmailModalOpen(false);
    setIsEmailSuccessOpen(true);
  };

  const handlePhoneVerified = () => {
    setIsPhoneModalOpen(false);
    setIsPhoneSuccessNotice(true);
    setTimeout(() => {
      setIsPhoneSuccessNotice(false);
    }, 3000);
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Top Segmented Tab Switcher matching Figma Screenshot 2 */}
      <div className="flex items-center gap-1 bg-[#F2F4F7] p-1 rounded-sm w-fit border border-border/40 overflow-x-auto max-w-full">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-xs transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab
                ? "bg-primary text-white shadow-2xs"
                : "text-secondary-subheading hover:text-txt-primary hover:bg-white/40"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content based on Active Tab */}
      {activeTab === "Profile" ? (
        <div className="bg-card-bg rounded-sm border border-border p-5 sm:p-7 md:p-8 shadow-2xs space-y-8">
          {/* 1. Profile Picture Section matching Figma Screenshot 2 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
              {/* Avatar circle */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-border/80 shadow-xs shrink-0 bg-blue-50">
                <img
                  src={profileData.avatarUrl}
                  alt={profileData.fullName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Action buttons and guidelines */}
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-medium text-primary">
                  Profile Picture
                </h3>
                <div className="flex items-center gap-2.5">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-xs shadow-2xs transition-colors cursor-pointer"
                  >
                    Upload Image
                  </button>
                  <button
                    type="button"
                    onClick={handleAvatarRemove}
                    className="border border-rose-300 hover:bg-rose-50 text-rose-500 text-xs sm:text-sm font-medium px-4 py-2 rounded-xs transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
                <p className="text-[11px] sm:text-xs text-secondary-subheading font-normal">
                  *.png, *.jpeg files up to 10MB at least 400px by 400px
                </p>
              </div>
            </div>

            {/* 2. Account Information Section matching Figma Screenshot 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 border-t border-border-subtle">
              {/* Left Column: Heading & Description */}
              <div className="lg:col-span-4 space-y-1">
                <h4 className="text-base md:text-lg font-medium text-txt-primary">
                  Account Information
                </h4>
                <p className="text-sm md:text-base text-secondary-subheading font-normal">
                  Modify your information
                </p>
              </div>

              {/* Right Column: Form Inputs */}
              <div className="lg:col-span-8 space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-base md:text-lg font-medium text-txt-primary mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    placeholder="Enter full name"
                    className="w-full h-10 px-3.5 border border-border bg-input-bg rounded-md text-xs sm:text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/50"
                  />
                </div>

                {/* Organization & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-base md:text-lg font-medium text-txt-primary mb-1.5">
                      Organization
                    </label>
                    <input
                      type="text"
                      value={profileData.organization}
                      onChange={(e) =>
                        handleInputChange("organization", e.target.value)
                      }
                      placeholder="Coastline Group"
                      className="w-full h-10 px-3.5 border border-border bg-input-bg rounded-md text-xs sm:text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-base md:text-lg font-medium text-txt-primary mb-1.5">
                      Role
                    </label>
                    <input
                      type="text"
                      value={profileData.role}
                      onChange={(e) =>
                        handleInputChange("role", e.target.value)
                      }
                      placeholder="Property Manager"
                      className="w-full h-10 px-3.5 border border-border bg-input-bg rounded-md text-xs sm:text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/50"
                    />
                  </div>
                </div>

                {/* Email with Change/Edit Action */}
                <div>
                  <label className="block text-base md:text-lg font-medium text-txt-primary mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      handleInputChange("email", e.target.value)
                    }
                    placeholder="sarahsidd@gmail.com"
                    className="w-full h-10 px-3.5 border border-border bg-input-bg rounded-md text-xs sm:text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/50"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      onClick={() => setIsEmailModalOpen(true)}
                      className="bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-medium px-4 py-1.5 rounded-xs shadow-2xs transition-colors cursor-pointer"
                    >
                      Change
                    </button>
                  </div>
                </div>

                {/* Phone with Change/Edit Action */}
                <div>
                  <label className="block text-base md:text-lg font-medium text-txt-primary mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) =>
                      handleInputChange("phone", e.target.value)
                    }
                    placeholder="999-(1324)-555"
                    className="w-full h-10 px-3.5 border border-border bg-input-bg rounded-md text-xs sm:text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/50"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      onClick={() => setIsPhoneModalOpen(true)}
                      className="bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-medium px-4 py-1.5 rounded-xs shadow-2xs transition-colors cursor-pointer"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Home Address Section matching Figma Screenshot 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 border-t border-border-subtle">
              {/* Left Column: Heading & Description */}
              <div className="lg:col-span-4 space-y-1">
                <h4 className="text-base md:text-lg font-medium text-primary-heading">
                  Home Address
                </h4>
                <p className="text-sm md:text-base text-secondary-subheading font-normal">
                  Update or add your home address
                </p>
              </div>

              {/* Right Column: Address Inputs */}
              <div className="lg:col-span-8 space-y-4">
                {/* Street 1 */}
                <div>
                  <label className="block text-base md:text-lg font-medium text-txt-primary mb-1.5">
                    Street 1
                  </label>
                  <input
                    type="text"
                    value={profileData.street1}
                    onChange={(e) =>
                      handleInputChange("street1", e.target.value)
                    }
                    placeholder="Enter your address"
                    className="w-full h-10 px-3.5 border border-border bg-input-bg rounded-md text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/60 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/50"
                  />
                </div>

                {/* Street 2 */}
                <div>
                  <label className="block text-base md:text-lg font-medium text-txt-primary mb-1.5">
                    Street 2
                  </label>
                  <input
                    type="text"
                    value={profileData.street2}
                    onChange={(e) =>
                      handleInputChange("street2", e.target.value)
                    }
                    placeholder="Enter your address"
                    className="w-full h-10 px-3.5 border border-border bg-input-bg rounded-md text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/60 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/50"
                  />
                </div>

                {/* City & State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-base md:text-lg font-medium text-txt-primary mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      value={profileData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      placeholder="City"
                      className="w-full h-10 px-3.5 border border-border bg-input-bg rounded-md text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/60 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-base md:text-lg font-medium text-txt-primary mb-1.5">
                      State
                    </label>
                    <input
                      type="text"
                      value={profileData.state}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                      placeholder="State"
                      className="w-full h-10 px-3.5 border border-border bg-input-bg rounded-md text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/60 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/50"
                    />
                  </div>
                </div>

                {/* Postal Code */}
                <div>
                  <label className="block text-base md:text-lg font-medium text-txt-primary mb-1.5">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={profileData.postalCode}
                    onChange={(e) =>
                      handleInputChange("postalCode", e.target.value)
                    }
                    placeholder="Postal code"
                    className="w-full h-10 px-3.5 border border-border bg-input-bg rounded-md text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/60 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/50"
                  />
                </div>
              </div>
            </div>

            {/* 4. Footer Action Buttons matching Figma Screenshot 2 */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-border-subtle">
              <button
                type="button"
                onClick={handleCancel}
                className="py-2.5 px-6 rounded-xs border border-border bg-card-bg hover:bg-page-bg text-secondary-subheading font-medium text-xs sm:text-sm transition-colors cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveChanges}
                className="py-2.5 px-6 rounded-xs bg-primary hover:bg-primary-hover text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer text-center shadow-2xs"
              >
                Save Changes
              </button>
            </div>
        </div>
      ) : activeTab === "Security" ? (
        <SecuritySettings />
      ) : activeTab === "Notifications" ? (
        <NotificationSettings />
      ) : activeTab === "Payment" ? (
        <PaymentSettings />
      ) : (
        <DataPrivacySettings />
      )}

      {/* Modals */}
      <VerifyEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        email={profileData.email}
        onSuccess={handleEmailVerified}
      />

      <EmailSuccessModal
        isOpen={isEmailSuccessOpen}
        onClose={() => setIsEmailSuccessOpen(false)}
      />

      <VerifyPhoneModal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
        phone={profileData.phone}
        onSuccess={handlePhoneVerified}
      />

      {isPhoneSuccessNotice && (
        <div className="fixed bottom-5 right-5 z-50 bg-primary text-white text-xs sm:text-sm px-4 py-3 rounded-md shadow-lg animate-in slide-in-from-bottom duration-200">
          Phone number verified and updated successfully!
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;

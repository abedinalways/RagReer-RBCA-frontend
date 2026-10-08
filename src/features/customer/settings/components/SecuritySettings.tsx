"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Laptop } from "lucide-react";
import PasswordSuccessModal from "./PasswordSuccessModal";

interface ActiveSession {
  id: string;
  deviceName: string;
  locationAndIp: string;
}

const INITIAL_SESSIONS: ActiveSession[] = [
  {
    id: "sess-1",
    deviceName: "MacBook Pro - Chrome",
    locationAndIp: "Jakarta, ID • IP: 114.120.0.0",
  },
  {
    id: "sess-2",
    deviceName: "MacBook Pro - Chrome",
    locationAndIp: "Jakarta, ID • IP: 114.120.0.0",
  },
];

export const SecuritySettings: React.FC = () => {
  // Password change state
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("password123");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Track which field was last edited or focused
  const [activeField, setActiveField] = useState<"new" | "confirm">("new");

  // Success Modal
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Sessions State
  const [sessions, setSessions] = useState<ActiveSession[]>(INITIAL_SESSIONS);

  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    if (!password) {
      return {
        score: 1,
        label: "Weak",
        colorClass: "bg-password-weak",
        textColorClass: "text-[#EB3D4D]",
      };
    }

    const length = password.length;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    const varietyCount = [hasLower, hasUpper, hasNumber, hasSpecial].filter(
      Boolean
    ).length;

    let score = 1;

    // Advanced strength evaluation
    if (length >= 14 && varietyCount >= 3) {
      score = 4;
    } else if (length >= 10 && varietyCount >= 3 && (hasNumber || hasSpecial)) {
      score = 4;
    } else if (length >= 8 && varietyCount >= 4) {
      score = 4;
    } else if (length >= 8 && varietyCount >= 2) {
      score = 3;
    } else if (length >= 6 && varietyCount >= 2) {
      score = 2;
    } else if (length >= 10) {
      score = 2;
    } else {
      score = 1;
    }

    switch (score) {
      case 1:
        return {
          score: 1,
          label: "Weak",
          colorClass: "bg-password-weak",
          textColorClass: "text-[#EB3D4D]",
        };
      case 2:
        return {
          score: 2,
          label: "Medium",
          colorClass: "bg-password-medium",
          textColorClass: "text-amber-500",
        };
      case 3:
        return {
          score: 3,
          label: "Good",
          colorClass: "bg-password-good",
          textColorClass: "text-info",
        };
      case 4:
      default:
        return {
          score: 4,
          label: "Strong",
          colorClass: "bg-password-strong",
          textColorClass: "text-trend-up",
        };
    }
  };

  // Evaluate whichever field is active or filled
  const targetPassword =
    activeField === "confirm" && confirmPassword
      ? confirmPassword
      : newPassword || confirmPassword || "";

  const strength = calculatePasswordStrength(targetPassword);

  const handleUpdatePassword = () => {
    setIsSuccessModalOpen(true);
    setIsEditingPassword(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleEndSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* 1. Change Password Card matching Figma Screenshot 1 & 2 */}
      <div className="bg-card-bg rounded-sm border border-border p-5 sm:p-7 md:p-8 shadow-2xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Heading & Last updated */}
          <div className="lg:col-span-4 space-y-1">
            <h4 className="text-base md:text-lg font-medium text-txt-primary">
              Change Password
            </h4>
            <p className="text-sm md:text-base text-secondary-subheading font-normal">
              Last updated July 27,2026
            </p>
          </div>

          {/* Right Column: Password Form */}
          <div className="lg:col-span-8">
            {!isEditingPassword ? (
              /* Initial State (Figma Screenshot 1) */
              <div className="space-y-4">
                <div>
                  <label className="block text-base md:text-lg font-medium text-txt-primary mb-1.5">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full h-11 px-3.5 pr-10 border border-border bg-input-bg rounded-md text-xs sm:text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/50"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword((prev) => !prev)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-subheading/70 hover:text-txt-primary cursor-pointer p-1"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingPassword(true)}
                    className="bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-xs shadow-2xs transition-colors cursor-pointer"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            ) : (
              /* Editing State (Figma Screenshot 2) */
              <div className="space-y-4">
                {/* Old Password */}
                <div>
                  <label className="block text-base md:text-lg font-medium text-txt-primary mb-1.5">
                    Old Password
                  </label>
                  <div className="relative">
                    <input
                      type={showOldPassword ? "text" : "password"}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="•••••••••"
                      className="w-full h-11 px-3.5 pr-10 border border-border bg-input-bg rounded-md text-xs sm:text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-subheading/70 hover:text-txt-primary cursor-pointer p-1"
                    >
                      {showOldPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-base md:text-lg font-medium text-txt-primary mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onFocus={() => setActiveField("new")}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setActiveField("new");
                      }}
                      placeholder="•••••••••"
                      className="w-full h-11 px-3.5 pr-10 border border-border bg-input-bg rounded-md text-xs sm:text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-subheading/70 hover:text-txt-primary cursor-pointer p-1"
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-base md:text-lg font-medium text-txt-primary mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onFocus={() => setActiveField("confirm")}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setActiveField("confirm");
                      }}
                      placeholder="•••••••••"
                      className="w-full h-11 px-3.5 pr-10 border border-border bg-input-bg rounded-md text-xs sm:text-sm text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/50"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-subheading/70 hover:text-txt-primary cursor-pointer p-1"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password Strength Indicator (Figma Screenshot 4 & exact token) */}
                <div className="pt-1">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4].map((barIndex) => (
                      <div
                        key={barIndex}
                        className={`h-1.5 w-14 sm:w-16 rounded-full transition-all duration-200 ${
                          strength.score >= barIndex
                            ? strength.colorClass
                            : "bg-[#EAEAEA]"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-secondary-subheading mt-1 transition-colors">
                    {strength.label}
                  </p>
                </div>

                {/* Cancel & Update Buttons */}
                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingPassword(false);
                      setOldPassword("");
                      setNewPassword("");
                      setConfirmPassword("");
                    }}
                    className="py-2 px-6 rounded-xs border border-border bg-card-bg hover:bg-page-bg text-secondary-subheading font-medium text-xs sm:text-sm transition-colors cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdatePassword}
                    className="py-2 px-6 rounded-xs bg-primary hover:bg-primary-hover text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer text-center shadow-2xs"
                  >
                    Update
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Active Sessions Card matching Figma Screenshot 1 & 2 */}
      <div className="bg-card-bg rounded-sm border border-border p-5 sm:p-7 md:p-8 shadow-2xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Heading & Subtitle */}
          <div className="lg:col-span-4 space-y-1">
            <h4 className="text-base md:text-lg font-medium text-txt-primary">
              Active Sessions
            </h4>
            <p className="text-sm md:text-base text-secondary-subheading font-normal">
              Devices that have logged into your account.
            </p>
          </div>

          {/* Right Column: Sessions List */}
          <div className="lg:col-span-8 space-y-3.5">
            {sessions.length === 0 ? (
              <p className="text-xs sm:text-sm text-secondary-subheading py-3">
                No other active sessions found.
              </p>
            ) : (
              sessions.map((session) => (
                <div
                  key={session.id}
                  className="border border-border rounded-md p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-card-bg hover:border-border-input transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-md bg-blue-50/80 text-primary flex items-center justify-center shrink-0 border border-blue-100/50">
                      <Laptop className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h5 className="text-xs sm:text-sm font-semibold text-primary-heading">
                        {session.deviceName}
                      </h5>
                      <p className="text-[11px] sm:text-xs text-secondary-subheading mt-0.5">
                        {session.locationAndIp}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleEndSession(session.id)}
                    className="bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-xs shadow-2xs transition-colors cursor-pointer whitespace-nowrap self-end sm:self-auto"
                  >
                    End Session
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Password Changed Successfully Modal (Figma Screenshot 3) */}
      <PasswordSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
};

export default SecuritySettings;

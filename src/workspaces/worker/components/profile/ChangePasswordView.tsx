"use client";

import { useState } from "react";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

interface ChangePasswordViewProps {
  onBack: () => void;
  onSuccess?: () => void;
}

export function ChangePasswordView({ onBack, onSuccess }: ChangePasswordViewProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      toast.error("Please enter your current password");
      return;
    }
    if (!newPassword) {
      toast.error("Please enter a new password");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Password changed successfully");
      if (onSuccess) {
        onSuccess();
      } else {
        onBack();
      }
    }, 600);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header matching Figma screenshot */}
      <header className="flex items-center gap-2 border-b border-[#D9DADC]/60 pb-3">
        <button
          type="button"
          onClick={onBack}
          className="p-1 -ml-1 text-primary-heading hover:bg-slate-100 rounded-md transition-colors cursor-pointer active:scale-95"
          aria-label="Back to settings"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="font-barlow text-xl font-medium tracking-tight text-primary-heading">
          Change Password
        </h1>
      </header>

      {/* Password Change Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-1">
        {/* Current Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-primary-heading">
            Current Password
          </label>
          <div className="relative flex items-center">
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="enter current password"
              className="w-full rounded-sm border border-[#E9EAEB] bg-white px-3.5 py-3 pr-11 text-xs text-txt-primary placeholder:text-secondary-subheading/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 p-1 text-secondary-subheading hover:text-primary transition-colors cursor-pointer"
              aria-label={showCurrent ? "Hide password" : "Show password"}
            >
              {showCurrent ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-primary-heading">
            New Password
          </label>
          <div className="relative flex items-center">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="enter new password"
              className="w-full rounded-sm border border-[#E9EAEB] bg-white px-3.5 py-3 pr-11 text-xs text-txt-primary placeholder:text-secondary-subheading/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 p-1 text-secondary-subheading hover:text-primary transition-colors cursor-pointer"
              aria-label={showNew ? "Hide password" : "Show password"}
            >
              {showNew ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-primary-heading">
            Confirm Password
          </label>
          <div className="relative flex items-center">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="enter confirm password"
              className="w-full rounded-sm border border-[#E9EAEB] bg-white px-3.5 py-3 pr-11 text-xs text-txt-primary placeholder:text-secondary-subheading/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 p-1 text-secondary-subheading hover:text-primary transition-colors cursor-pointer"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-sm bg-primary text-white text-xs font-semibold hover:bg-primary-hover active:scale-[0.99] transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Calendar, X } from "lucide-react";
import {
  CrewMemberItem,
  NewCrewMemberFormData,
  CrewMemberRole,
} from "../types/crewMembers.types";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { DatePickerInput } from "@/components/ui/DatePickerInput";

interface AddCrewMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCrewMemberCreated: (newMember: CrewMemberItem) => void;
}

const FREQUENCY_OPTIONS = [
  "Hourly",
  "Weekly",
  "Bi-weekly",
  "Monthly",
];

export const AddCrewMemberModal: React.FC<AddCrewMemberModalProps> = ({
  isOpen,
  onClose,
  onCrewMemberCreated,
}) => {
  const [formData, setFormData] = useState<NewCrewMemberFormData>({
    fullName: "",
    email: "",
    phone: "",
    hourlyRate: "",
    frequency: "Monthly",
    dateJoined: "",
    defaultPassword: "",
    sendInvitation: true,
    role: "Member",
  });

  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `CRW-${randomNum}`;

    const newCrewMember: CrewMemberItem = {
      id: newId,
      crewId: `#${newId}`,
      name: formData.fullName,
      email: formData.email || "crew@example.com",
      phone: formData.phone || "(555) 000-0000",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
      role: formData.role || "Member",
      jobsThisMonth: "0 Jobs",
      payableThisMonth: formData.hourlyRate ? `$${formData.hourlyRate}` : "$0.00",
      strikes: 0,
      status: "Active",
      hourlyRate: formData.hourlyRate ? `$${formData.hourlyRate}` : "$0.00",
      frequency: formData.frequency,
      dateJoined:
        formData.dateJoined ||
        new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      sendInvitation: formData.sendInvitation,
    };

    onCrewMemberCreated(newCrewMember);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-card-bg rounded-xl border border-border shadow-2xl max-w-lg w-full p-6 space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-xl font-medium text-primary-heading font-barlow-condensed">
            Add Crew Member
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-secondary-subheading hover:text-primary-heading p-1 rounded-md hover:bg-page-bg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-primary-heading">
              Full Name <span className="text-decline">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Enter Crew Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full px-3 py-2 text-xs sm:text-sm border border-border-input rounded-md bg-input-bg text-txt-primary placeholder:text-secondary-subheading/60 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Email Address */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-primary-heading">
              Email Address <span className="text-decline">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="Enter Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-2 text-xs sm:text-sm border border-border-input rounded-md bg-input-bg text-txt-primary placeholder:text-secondary-subheading/60 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-primary-heading">
              Phone Number <span className="text-decline">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-3 py-2 text-xs sm:text-sm border border-border-input rounded-md bg-input-bg text-txt-primary placeholder:text-secondary-subheading/60 focus:outline-none focus:border-primary"
            />
          </div>

          {/* 2-Column: Hourly Rate & Frequency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-primary-heading">
                Hourly Rate
              </label>
              <input
                type="text"
                placeholder="$0.00"
                value={formData.hourlyRate}
                onChange={(e) =>
                  setFormData({ ...formData, hourlyRate: e.target.value })
                }
                className="w-full px-3 py-2 text-xs sm:text-sm border border-border-input rounded-md bg-input-bg text-txt-primary placeholder:text-secondary-subheading/60 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-primary-heading">
                Frequency
              </label>
              <CustomSelect
                value={formData.frequency}
                onChange={(val) =>
                  setFormData({ ...formData, frequency: val })
                }
                options={FREQUENCY_OPTIONS}
                size="sm"
                triggerClassName="h-[38px] px-3 text-xs sm:text-sm border-border-input"
              />
            </div>
          </div>

          {/* Date Joined with interactive Calendar */}
          <DatePickerInput
            label="Date Joined"
            value={formData.dateJoined}
            onChange={(val) =>
              setFormData({ ...formData, dateJoined: val })
            }
            placeholder="dd/mm/yyyy"
          />

          {/* Set Default Password */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-primary-heading">
              Set Default Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter a password"
                value={formData.defaultPassword}
                onChange={(e) =>
                  setFormData({ ...formData, defaultPassword: e.target.value })
                }
                className="w-full pl-3 pr-10 py-2 text-xs sm:text-sm border border-border-input rounded-md bg-input-bg text-txt-primary placeholder:text-secondary-subheading/60 focus:outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-subheading hover:text-primary cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Send Invitation Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-medium text-primary-heading">
                Send Invitation
              </p>
              <p className="text-[11px] text-secondary-subheading">
                Crew will receive an email with a link to access the portal.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
              <input
                type="checkbox"
                checked={formData.sendInvitation}
                onChange={(e) =>
                  setFormData({ ...formData, sendInvitation: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-border rounded-md text-xs sm:text-sm font-medium text-secondary-subheading hover:bg-page-bg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs"
            >
              Create Crew Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCrewMemberModal;

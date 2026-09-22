"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Switch } from "@/components/shared/Switch";
import toast from "react-hot-toast";

interface WorkerSettingsViewProps {
  onBack: () => void;
  onSelectChangePassword: () => void;
}

export function WorkerSettingsView({
  onBack,
  onSelectChangePassword,
}: WorkerSettingsViewProps) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  const handleToggleEmail = (checked: boolean) => {
    setEmailNotifications(checked);
    toast.success(`Email notifications ${checked ? "enabled" : "disabled"}`);
  };

  const handleTogglePush = (checked: boolean) => {
    setPushNotifications(checked);
    toast.success(`Push notifications ${checked ? "enabled" : "disabled"}`);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header matching Figma screenshot: < Settings */}
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
          Settings
        </h1>
      </header>

      {/* Settings Cards List */}
      <div className="flex flex-col gap-3 pt-1">
        {/* Card 1: Email Notifications */}
        <div className="p-4 rounded-md border border-[#EAECF0] bg-white shadow-2xs flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1 min-w-0 pr-2">
            <h3 className="text-sm font-semibold text-primary-heading">
              Email Notifications
            </h3>
            <p className="text-xs text-secondary-subheading leading-relaxed font-normal">
              Receive updates about your account activity via email.
            </p>
          </div>
          <Switch
            checked={emailNotifications}
            onCheckedChange={handleToggleEmail}
            aria-label="Toggle email notifications"
          />
        </div>

        {/* Card 2: Push Notifications */}
        <div className="p-4 rounded-md border border-[#EAECF0] bg-white shadow-2xs flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1 min-w-0 pr-2">
            <h3 className="text-sm font-semibold text-primary-heading">
              Push Notifications
            </h3>
            <p className="text-xs text-secondary-subheading leading-relaxed font-normal">
              Real-time alerts sent to your mobile device.
            </p>
          </div>
          <Switch
            checked={pushNotifications}
            onCheckedChange={handleTogglePush}
            aria-label="Toggle push notifications"
          />
        </div>

        {/* Card 3: Change password */}
        <button
          type="button"
          onClick={onSelectChangePassword}
          className="w-full p-4 rounded-md border border-[#EAECF0] bg-white shadow-2xs flex items-center justify-between gap-3 text-left hover:bg-slate-50/80 transition-colors cursor-pointer active:scale-[0.99]"
        >
          <span className="text-sm font-medium text-txt-primary">
            Change password
          </span>
          <ChevronRight className="h-4 w-4 text-secondary-subheading/80" />
        </button>
      </div>
    </div>
  );
}

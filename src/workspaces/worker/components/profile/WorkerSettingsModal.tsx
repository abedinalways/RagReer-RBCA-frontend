"use client";

import { useState, useEffect } from "react";
import { WorkerSettingsView } from "./WorkerSettingsView";
import { ChangePasswordView } from "./ChangePasswordView";

interface WorkerSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: "settings" | "change-password";
  onViewChange?: (view: "settings" | "change-password") => void;
}

export function WorkerSettingsModal({
  isOpen,
  onClose,
  initialView = "settings",
  onViewChange,
}: WorkerSettingsModalProps) {
  const [subView, setSubView] = useState<"settings" | "change-password">(initialView);

  // Sync subView when initialView or modal open state changes
  useEffect(() => {
    if (isOpen) {
      setSubView(initialView);
    }
  }, [isOpen, initialView]);

  const handleSubViewChange = (view: "settings" | "change-password") => {
    setSubView(view);
    onViewChange?.(view);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#F5F6F8] max-w-md mx-auto p-4 overflow-y-auto animate-in fade-in duration-150">
      {subView === "settings" ? (
        <WorkerSettingsView
          onBack={onClose}
          onSelectChangePassword={() => handleSubViewChange("change-password")}
        />
      ) : (
        <ChangePasswordView
          onBack={() => handleSubViewChange("settings")}
          onSuccess={() => handleSubViewChange("settings")}
        />
      )}
    </div>
  );
}

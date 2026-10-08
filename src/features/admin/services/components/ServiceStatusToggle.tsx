"use client";

import React from "react";

interface ServiceStatusToggleProps {
  isActive: boolean;
  onChange: (active: boolean) => void;
  disabled?: boolean;
}

export function ServiceStatusToggle({
  isActive,
  onChange,
  disabled = false,
}: ServiceStatusToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isActive}
      disabled={disabled}
      onClick={() => onChange(!isActive)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${isActive ? "bg-[#5980A6]" : "bg-gray-300"}`}
      title={isActive ? "Active (Click to deactivate)" : "Inactive (Click to activate)"}
    >
      <span className="sr-only">Toggle status</span>
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out mt-0.5 ${
          isActive ? "translate-x-4.5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

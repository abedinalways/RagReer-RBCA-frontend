"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  id?: string;
  disabled?: boolean;
  className?: string;
}

export function CustomCheckbox({
  checked,
  onChange,
  label,
  id,
  disabled = false,
  className,
}: CustomCheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex items-center gap-2 select-none",
        disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer group",
        className
      )}
    >
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div
          className={cn(
            "w-3.5 h-3.5 md:w-4 md:h-4 rounded-xs border transition-all flex items-center justify-center",
            checked
              ? "bg-primary border-primary text-white"
              : "bg-white border-secondary-border group-hover:border-primary"
          )}
        >
          {checked && <Check className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 stroke-3" />}
        </div>
      </div>
      {label && (
        <span className="text-sm md:text-base text-txt-primary group-hover:text-primary-heading transition-colors">
          {label}
        </span>
      )}
    </label>
  );
}

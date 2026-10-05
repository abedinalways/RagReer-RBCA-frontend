import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CustomSelectOption {
  value: string;
  label: string;
}

export interface CustomSelectProps {
  options: (string | CustomSelectOption)[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  dropdownClassName?: string;
  size?: "sm" | "md" | "lg";
  align?: "left" | "right";
  id?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  required = false,
  error,
  disabled = false,
  className,
  triggerClassName,
  dropdownClassName,
  size = "md",
  align = "left",
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options to { value, label } format
  const normalizedOptions: CustomSelectOption[] = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt,
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const sizeClasses = {
    sm: "h-9 px-3 text-sm rounded-md",
    md: "h-11 px-3.5 text-sm rounded-md",
    lg: "h-12 px-4 text-base rounded-md",
  };

  return (
    <div className={cn("w-full relative", className)} ref={containerRef}>
      {label && (
        <label
          htmlFor={id}
          className="block text-lg font-medium text-txt-primary mb-1"
        >
          {label} {required && <span className="text-trend-down">*</span>}
        </label>
      )}

      <div className="relative w-full">
        <button
          type="button"
          id={id}
          disabled={disabled}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          className={cn(
            "w-full text-left bg-card-bg border transition-colors flex items-center justify-between select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20",
            sizeClasses[size],
            error ? "border-trend-down" : "border-border hover:border-slate-300",
            isOpen && "ring-2 ring-primary/20 border-primary",
            disabled && "opacity-60 cursor-not-allowed bg-slate-50",
            triggerClassName,
          )}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span
            className={cn(
              "truncate",
              selectedOption ? "text-txt-primary" : "text-secondary-subheading",
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-secondary-subheading transition-transform duration-200 shrink-0 ml-2",
              isOpen && "rotate-180",
            )}
          />
        </button>

        {isOpen && (
          <div
            className={cn(
              "absolute z-50 mt-1.5 bg-card-bg border border-border rounded-lg shadow-lg shadow-black/10 p-1 max-h-64 overflow-y-auto animate-in fade-in-50 zoom-in-95 duration-100",
              align === "right"
                ? "right-0 min-w-full md:min-w-[220px]"
                : "left-0 right-0 min-w-full",
              dropdownClassName,
            )}
            role="listbox"
          >
            {normalizedOptions.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <div
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt.value)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-md text-sm cursor-pointer transition-colors select-none",
                    isSelected
                      ? "bg-blue-50/80 text-txt-primary font-medium"
                      : "text-txt-primary hover:bg-slate-50",
                  )}
                >
                  <span className="truncate pr-2">{opt.label}</span>
                  {isSelected && (
                    <Check
                      className="w-4 h-4 text-info shrink-0 stroke-[2.5]"
                      aria-hidden="true"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {error && <p className="text-xs text-trend-down mt-1">{error}</p>}
    </div>
  );
};

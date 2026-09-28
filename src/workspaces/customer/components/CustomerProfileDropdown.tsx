"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, User, LogOut, FileText } from "lucide-react";
import { useAuth, selectCurrentUser, selectCurrentRole } from "@/features/auth";
import { useAppSelector } from "@/redux/store";
import { ROLE_LABELS } from "@/access-control/roles/roles";
import { cn } from "@/lib/utils";

interface CustomerProfileDropdownProps {
  className?: string;
}

/**
 * Functional profile dropdown for Customer Workspace.
 * Adheres to SRP (profile & auth session interaction) and uses Global CSS tokens exclusively.
 */
export function CustomerProfileDropdown({ className }: CustomerProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const user = useAppSelector(selectCurrentUser);
  const role = useAppSelector(selectCurrentRole);
  const { logOut, isLogoutLoading } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    setIsOpen(false);
    await logOut();
    router.replace("/login");
  };

  const displayName = user?.name || "Sarah Sidd";
  const displayRole = role ? ROLE_LABELS[role] : "Customer";
  const avatarUrl =
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150";

  return (
    <div ref={dropdownRef} className={cn("relative inline-block text-left", className)}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center gap-2.5 rounded-lg py-1 px-1.5 transition-colors hover:bg-page-bg  cursor-pointer select-none"
      >
        <div className="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-border shrink-0">
          <img
            src={avatarUrl}
            alt={displayName}
            className="h-full w-full object-cover"
          />
        </div>
        <span className="hidden sm:inline-block text-xs sm:text-sm font-medium text-primary-heading max-w-[120px] truncate">
          {displayName}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-secondary-subheading transition-transform duration-200",
            isOpen && "rotate-180 text-primary"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 top-full mt-2 w-56 origin-top-right rounded-lg border border-border bg-layout-bg p-1.5 shadow-lg shadow-txt-primary/5 z-50 animate-in fade-in zoom-in-95 duration-100"
        >
          {/* Header Info */}
          <div className="px-3 py-2 border-b border-border-subtle">
            <p className="text-sm font-semibold text-primary-heading truncate">
              {displayName}
            </p>
            <p className="text-xs text-secondary-subheading truncate">
              {user?.email || "customer@raggreer.com"}
            </p>
            <div className="mt-1.5 inline-flex items-center rounded-sm bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-primary">
              {displayRole}
            </div>
          </div>

          {/* Navigation Items */}
          <div className="py-1">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                router.push("/customer/property");
              }}
              className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-txt-primary transition-colors hover:bg-page-bg hover:text-primary cursor-pointer"
            >
              <User className="h-4 w-4 text-secondary-subheading" />
              <span>My Properties</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                router.push("/customer/requests");
              }}
              className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-txt-primary transition-colors hover:bg-page-bg hover:text-primary cursor-pointer"
            >
              <FileText className="h-4 w-4 text-secondary-subheading" />
              <span>Service Requests</span>
            </button>
          </div>

          <div className="border-t border-border-subtle pt-1">
            <button
              type="button"
              disabled={isLogoutLoading}
              onClick={() => void handleLogout()}
              className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-trend-down transition-colors hover:bg-page-bg cursor-pointer disabled:opacity-50"
            >
              <LogOut className="h-4 w-4 text-trend-down" />
              <span>{isLogoutLoading ? "Logging out..." : "Log out"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

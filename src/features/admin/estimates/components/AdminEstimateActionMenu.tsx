"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { MoreHorizontal } from "lucide-react";
import { AdminEstimateItem } from "../types/adminEstimates.types";

interface AdminEstimateActionMenuProps {
  estimate: AdminEstimateItem;
  onActionClick: (actionKey: string, estimate: AdminEstimateItem) => void;
}

interface ActionOption {
  key: string;
  label: string;
  isDestructive?: boolean;
}

const ACTION_OPTIONS: ActionOption[] = [
  { key: "view_details", label: "View Details" },
  { key: "edit", label: "Edit" },
  { key: "view_customer", label: "View Customer" },
  { key: "send_to_customer", label: "Send to Customer" },
];

export const AdminEstimateActionMenu: React.FC<AdminEstimateActionMenuProps> = ({
  estimate,
  onActionClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredKey, setHoveredKey] = useState<string | null>("view_details");
  const [menuPosition, setMenuPosition] = useState<{
    top?: number;
    bottom?: number;
    right: number;
    openUpwards: boolean;
  }>({ right: 0, openUpwards: false });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const menuEstimatedHeight = 220;
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUpwards =
      spaceBelow < menuEstimatedHeight && rect.top > menuEstimatedHeight;

    setMenuPosition({
      top: openUpwards ? undefined : rect.bottom + 6,
      bottom: openUpwards ? window.innerHeight - rect.top + 6 : undefined,
      right: Math.max(12, window.innerWidth - rect.right),
      openUpwards,
    });
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOpen) {
      updatePosition();
      setHoveredKey("view_details");
    }
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    updatePosition();

    const handleScrollOrResize = () => {
      updatePosition();
    };

    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isOpen, updatePosition]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleAction = (actionKey: string) => {
    setIsOpen(false);
    onActionClick(actionKey, estimate);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Estimate row actions"
        className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card-bg text-secondary-subheading hover:text-txt-primary hover:bg-page-bg hover:border-primary/40 focus:outline-hidden transition-colors cursor-pointer"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {isOpen &&
        isMounted &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              top:
                menuPosition.top !== undefined
                  ? `${menuPosition.top}px`
                  : "auto",
              bottom:
                menuPosition.bottom !== undefined
                  ? `${menuPosition.bottom}px`
                  : "auto",
              right: `${menuPosition.right}px`,
              zIndex: 9999,
            }}
            className="w-44 sm:w-48 rounded-xl border border-border bg-card-bg p-2 shadow-xl animate-in fade-in zoom-in-95 duration-100"
          >
            <div
              className="flex flex-col gap-1.5"
              onMouseLeave={() => setHoveredKey("view_details")}
            >
              {ACTION_OPTIONS.map((act) => {
                const isActive = hoveredKey === act.key;
                return (
                  <button
                    key={act.key}
                    type="button"
                    onMouseEnter={() => setHoveredKey(act.key)}
                    onClick={() => handleAction(act.key)}
                    className={`w-full py-2.5 px-3 rounded-md text-xs sm:text-sm font-medium text-center transition-colors duration-150 cursor-pointer focus:outline-hidden ${
                      isActive
                        ? "bg-primary text-white shadow-2xs"
                        : "bg-page-bg text-txt-primary hover:bg-primary hover:text-white"
                    }`}
                  >
                    {act.label}
                  </button>
                );
              })}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default AdminEstimateActionMenu;

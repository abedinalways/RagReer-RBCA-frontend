"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { MoreHorizontal } from "lucide-react";
import { AdminServiceRequest } from "../types/serviceRequestsTypes";
import { getRequestActionOptions } from "../data/serviceRequestsData";

interface ServiceRequestsActionMenuProps {
  request: AdminServiceRequest;
  onActionClick: (actionKey: string, request: AdminServiceRequest) => void;
}

export const ServiceRequestsActionMenu: React.FC<ServiceRequestsActionMenuProps> = ({
  request,
  onActionClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{
    top?: number;
    bottom?: number;
    right: number;
    openUpwards: boolean;
  }>({ right: 0, openUpwards: false });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const actions = getRequestActionOptions(request.status);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const menuEstimatedHeight = 230; // Max height of dropdown
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUpwards = spaceBelow < menuEstimatedHeight && rect.top > menuEstimatedHeight;

    setMenuPosition({
      top: openUpwards ? undefined : rect.bottom + 6,
      bottom: openUpwards ? window.innerHeight - rect.top + 6 : undefined,
      right: Math.max(12, window.innerWidth - rect.right),
      openUpwards,
    });
  }, []);

  const handleToggle = () => {
    if (!isOpen) {
      updatePosition();
    }
    setIsOpen((prev) => !prev);
  };

  // Close when clicking outside
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

  // Recalculate position on scroll or resize while open
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

  // Close on Escape
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

  const handleSelect = (actionKey: string) => {
    setIsOpen(false);
    onActionClick(actionKey, request);
  };

  return (
    <div className="relative inline-block text-left">
      {/* 3-Dots Action Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        className="flex h-7 w-7 items-center justify-center rounded-sm border border-border bg-card-bg text-secondary-subheading hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
        aria-label="Actions"
        aria-expanded={isOpen}
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {/* Render via Portal so it never gets clipped by table overflow or container */}
      {isOpen &&
        isMounted &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              top: menuPosition.top !== undefined ? `${menuPosition.top}px` : undefined,
              bottom: menuPosition.bottom !== undefined ? `${menuPosition.bottom}px` : undefined,
              right: `${menuPosition.right}px`,
              zIndex: 9999,
            }}
            className="w-48 sm:w-52 rounded-xl border border-border bg-card-bg p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex flex-col gap-1">
              {actions.map((act) => (
                <button
                  key={act.actionKey}
                  type="button"
                  onClick={() => handleSelect(act.actionKey)}
                  className={`w-full py-2 px-3 rounded-md text-xs sm:text-sm text-center transition-all cursor-pointer ${
                    act.isPrimary
                      ? "bg-primary text-white font-medium hover:bg-primary-hover shadow-2xs"
                      : "text-txt-primary hover:bg-page-bg font-normal"
                  }`}
                >
                  {act.label}
                </button>
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default ServiceRequestsActionMenu;

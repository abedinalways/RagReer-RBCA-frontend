"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import { ServiceItem } from "../types";
import { cn } from "@/lib/utils";

interface ServiceActionMenuProps {
  item: ServiceItem;
  onEdit: (item: ServiceItem) => void;
  onView?: (item: ServiceItem) => void;
  onDelete: (item: ServiceItem) => void;
}

export function ServiceActionMenu({
  item,
  onEdit,
  onView,
  onDelete,
}: ServiceActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className={cn("relative inline-block text-left", isOpen ? "z-50" : "z-10")} ref={containerRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        aria-label="Actions"
        className="inline-flex items-center justify-center p-1.5 rounded-lg border border-border/80 bg-layout-bg text-secondary-subheading hover:text-txt-primary hover:border-primary/50 transition-all cursor-pointer shadow-2xs"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-32 rounded-xl bg-card-bg border border-border/80 shadow-2xl z-50 p-2 space-y-1 animate-in fade-in zoom-in-95 duration-100">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              onEdit(item);
            }}
            className="w-full text-center px-4 py-2 rounded-md bg-[#5980A6] text-white hover:bg-[#4A6E91] font-medium text-sm transition-colors cursor-pointer"
          >
            Edit
          </button>
          {onView && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
                onView(item);
              }}
              className="w-full text-center px-4 py-2 rounded-md bg-page-bg/60 text-txt-primary hover:bg-page-bg font-medium text-sm transition-colors cursor-pointer"
            >
              View
            </button>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              onDelete(item);
            }}
            className="w-full text-center px-4 py-2 rounded-md bg-page-bg/60 text-txt-primary hover:bg-red-50 hover:text-red-600 font-medium text-sm transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

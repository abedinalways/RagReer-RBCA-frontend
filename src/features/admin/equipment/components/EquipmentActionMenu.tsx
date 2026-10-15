"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import { EquipmentItem } from "../types";
import { cn } from "@/lib/utils";

interface EquipmentActionMenuProps {
  item: EquipmentItem;
  onEdit: (item: EquipmentItem) => void;
  onAssign: (item: EquipmentItem) => void;
  onDelete: (item: EquipmentItem) => void;
}

export function EquipmentActionMenu({
  item,
  onEdit,
  onAssign,
  onDelete,
}: EquipmentActionMenuProps) {
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
            className="w-full text-center px-4 py-2 rounded-md font-medium text-sm transition-colors cursor-pointer text-txt-primary hover:bg-primary hover:text-white"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              onAssign(item);
            }}
            className="w-full text-center px-4 py-2 rounded-md font-medium text-sm transition-colors cursor-pointer text-txt-primary hover:bg-primary hover:text-white"
          >
            Assign
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              onDelete(item);
            }}
            className="w-full text-center px-4 py-2 rounded-md font-medium text-sm transition-colors cursor-pointer text-txt-primary hover:bg-red-50 hover:text-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

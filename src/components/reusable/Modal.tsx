"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  titleClassName?: string;
  headerClassName?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  footerClassName?: string;
  hideHeaderBorder?: boolean;
  hideFooterBorder?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full";
  className?: string;
  contentClassName?: string;
  overlayClassName?: string;
  showCloseButton?: boolean;
}

const MAX_WIDTH_CLASSES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  titleClassName,
  headerClassName,
  children,
  footer,
  footerClassName,
  hideHeaderBorder = false,
  hideFooterBorder = false,
  maxWidth = "lg",
  className,
  contentClassName,
  overlayClassName,
  showCloseButton = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200",
        overlayClassName
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className={cn(
          "bg-card-bg w-full rounded-xl shadow-2xl border border-border flex flex-col my-auto max-h-[92vh] animate-in zoom-in-95 duration-150",
          !className?.includes("overflow-") && "overflow-hidden",
          MAX_WIDTH_CLASSES[maxWidth],
          className
        )}
      >
        {title && (
          <div
            className={cn(
              "flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4.5 shrink-0",
              !hideHeaderBorder && "border-b border-border",
              headerClassName
            )}
          >
            <div
              className={cn(
                "text-lg sm:text-xl font-medium text-primary-heading",
                titleClassName
              )}
            >
              {title}
            </div>
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 rounded-md text-secondary-subheading hover:text-txt-primary hover:bg-page-bg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        <div
          className={cn(
            "p-4 sm:p-6 flex-1",
            !contentClassName?.includes("overflow-") && "overflow-y-auto",
            contentClassName
          )}
        >
          {children}
        </div>

        {footer && (
          <div
            className={cn(
              "flex items-center justify-end gap-3 px-4 sm:px-6 py-3.5 sm:py-4 bg-card-bg shrink-0",
              !hideFooterBorder && "border-t border-border",
              footerClassName
            )}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

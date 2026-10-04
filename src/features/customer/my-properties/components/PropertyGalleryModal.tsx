"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface PropertyGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  title?: string;
  initialIndex?: number;
}

export const PropertyGalleryModal: React.FC<PropertyGalleryModalProps> = ({
  isOpen,
  onClose,
  images,
  title = "Property Photos",
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(
        initialIndex >= 0 && initialIndex < images.length ? initialIndex : 0
      );
    }
  }, [isOpen, initialIndex, images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !images || images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/85 backdrop-blur-md select-none animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 z-20 shrink-0">
        <div>
          <h3 className="text-lg font-semibold text-white tracking-tight drop-shadow-sm">
            {title}
          </h3>
          <p className="text-xs text-white/70 mt-0.5 font-medium drop-shadow-sm">
            Photo {currentIndex + 1} of {images.length}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-md border border-white/20 bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors cursor-pointer"
          >
            Cancel
          </button> */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Center Image Viewport */}
      <div
        className="flex-1 relative flex items-center justify-center p-4 sm:p-8 overflow-hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div className="relative w-full h-full max-h-[75vh] flex items-center justify-center">
          <Image
            src={images[currentIndex]}
            alt={`${title} - Photo ${currentIndex + 1}`}
            fill
            className="object-contain drop-shadow-2xl"
            priority
            unoptimized
          />
        </div>

        {/* Left Arrow Button (Floating on left edge) */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous photo"
            className="fixed left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/35 text-white/90 hover:text-white hover:border-white bg-black/30 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer z-30"
          >
            <ChevronLeft className="w-6 h-6 stroke-[1.75]" />
          </button>
        )}

        {/* Right Arrow Button (Floating on right edge) */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next photo"
            className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/35 text-white/90 hover:text-white hover:border-white bg-black/30 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer z-30"
          >
            <ChevronRight className="w-6 h-6 stroke-[1.75]" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip & Cancel Section */}
      <div className="flex flex-col items-center gap-3 pb-5 px-4 z-20 shrink-0">
        {images.length > 1 && (
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-black/45 backdrop-blur-md border border-white/15 max-w-[92vw] overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-14 h-11 sm:w-18 sm:h-13 rounded-lg overflow-hidden shrink-0 transition-all cursor-pointer ${
                  idx === currentIndex
                    ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-105 opacity-100"
                    : "opacity-45 hover:opacity-85 hover:scale-100 border border-white/20"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="sm:hidden px-6 py-2 rounded-md border border-white/20 bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PropertyGalleryModal;

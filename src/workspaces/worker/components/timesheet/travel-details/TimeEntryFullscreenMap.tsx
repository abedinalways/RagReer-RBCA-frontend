"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { ArrowLeft } from "lucide-react";

const RealRouteMap = dynamic(
  () =>
    import("../../visit/RealRouteMap").then((m) => m.RealRouteMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-white/80 text-xs gap-2 min-h-screen">
        <div className="h-7 w-7 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span>Loading full satellite route...</span>
      </div>
    ),
  }
);

interface TimeEntryFullscreenMapProps {
  isOpen: boolean;
  onClose: () => void;
  destinationTitle?: string;
  destinationAddress?: string;
}

export function TimeEntryFullscreenMap({
  isOpen,
  onClose,
  destinationTitle = "North Entrance Monument & Islands",
  destinationAddress = "100 Whispering Pines Blvd at Hwy 43",
}: TimeEntryFullscreenMapProps) {
  // Handle ESC key to close fullscreen
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-pure-white-bg flex flex-col animate-in fade-in duration-200">
      {/* Header matching Image 2 exactly: Back arrow + "Traveling to the Site" */}
      <header className="flex items-center gap-3 bg-pure-white-bg px-4 py-3.5 border-b border-border shadow-2xs shrink-0 z-10">
        <button
          type="button"
          onClick={onClose}
          className="p-1 -ml-1 rounded-md text-primary-heading hover:bg-blue-50/60 transition-colors cursor-pointer active:scale-95"
          aria-label="Back to travel details"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-barlow text-xl sm:text-2xl font-bold tracking-tight text-primary-heading">
          Traveling to the Site
        </h1>
      </header>

      {/* Satellite Route Map filling the entire remainder of screen */}
      <div className="flex-1 w-full relative bg-slate-900">
        <RealRouteMap
          startPoint={{
            lat: 33.5358,
            lng: -117.7075,
            label: "Crew Vehicle (Alicia & Golden Lantern)",
          }}
          destinationPoint={{
            lat: 33.531,
            lng: -117.7038,
            label: destinationAddress,
          }}
          destinationTitle={destinationTitle}
          destinationAddress={destinationAddress}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

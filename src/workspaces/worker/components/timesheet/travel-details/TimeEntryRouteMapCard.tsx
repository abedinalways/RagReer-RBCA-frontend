"use client";

import dynamic from "next/dynamic";
import { Maximize2 } from "lucide-react";

// Dynamically import Leaflet RealRouteMap on client side only to avoid SSR issues
const RealRouteMap = dynamic(
  () =>
    import("../../visit/RealRouteMap").then((m) => m.RealRouteMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-white/80 text-xs gap-2 min-h-[220px]">
        <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span>Loading satellite GPS route...</span>
      </div>
    ),
  }
);

interface TimeEntryRouteMapCardProps {
  onOpenFullscreen: () => void;
  destinationTitle?: string;
  destinationAddress?: string;
}

export function TimeEntryRouteMapCard({
  onOpenFullscreen,
  destinationTitle = "North Entrance Monument & Islands",
  destinationAddress = "100 Whispering Pines Blvd at Hwy 43",
}: TimeEntryRouteMapCardProps) {
  return (
    <div className="relative w-full rounded-lg overflow-hidden border border-border-input shadow-xs bg-slate-900 group">
      {/* Map Content (220px height matching Image 1) */}
      <div className="w-full h-[230px]">
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
          className="w-full h-full pointer-events-auto"
        />
      </div>

      {/* Floating Fullscreen Trigger Button overlay */}
      <button
        type="button"
        onClick={onOpenFullscreen}
        aria-label="Expand route map to fullscreen"
        className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded bg-pure-white-bg/95 hover:bg-pure-white-bg text-primary-heading text-xs font-semibold shadow-xs backdrop-blur-xs transition-all cursor-pointer active:scale-95 border border-border-input"
      >
        <Maximize2 className="h-3.5 w-3.5 text-primary" />
        <span>Full Map</span>
      </button>
    </div>
  );
}

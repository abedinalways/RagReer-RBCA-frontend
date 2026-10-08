"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ArrowLeft, ChevronRight, Check, Clock, MapPin, Maximize2 } from "lucide-react";
import { TravelCompletedModal } from "./TravelCompletedModal";
import { MOCK_WORKER_JOBS } from "../../data/mockWorkerJobs";

// Dynamically import Leaflet RealRouteMap on client side only (avoiding SSR issues)
const RealRouteMap = dynamic(
  () => import("./RealRouteMap").then((m) => m.RealRouteMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-white/80 text-xs gap-2 min-h-[280px]">
        <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span>Loading live satellite GPS map...</span>
      </div>
    ),
  }
);

const DEFAULT_CREW_START_POINT = {
  lat: 33.5358,
  lng: -117.7075,
  label: "Crew Vehicle (Alicia & Golden Lantern)",
};

interface TravelTrackingViewProps {
  jobId: string;
}

export function TravelTrackingView({ jobId }: TravelTrackingViewProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [travelMinutes, setTravelMinutes] = useState(15); // Start at 0.25h for realistic Figma mock

  const job = MOCK_WORKER_JOBS.find((j) => j.id === jobId) || MOCK_WORKER_JOBS[1];

  const destinationPoint = useMemo(
    () => ({
      lat: 33.531,
      lng: -117.7038,
      label: job.address,
    }),
    [job.address]
  );

  // Live timer incrementing every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTravelMinutes((prev) => prev + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const travelHoursFormatted = (travelMinutes / 60).toFixed(2);

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F6F8] pb-12">
      {/* Sticky Header: ← Travel */}
      <header className="sticky top-0 z-30 flex items-center gap-3 bg-white/95 backdrop-blur-sm border-b border-[#EAECF0] px-4 py-3 shadow-xs">
        <button
          type="button"
          onClick={() => router.back()}
          className="p-1 -ml-1 rounded-md text-primary-heading hover:bg-slate-100 transition-colors cursor-pointer active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-barlow text-xl font-medium tracking-tight text-primary-heading">
          Travel
        </h1>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-col gap-4 p-4 max-w-md mx-auto w-full">
        {/* Map Header with Fullscreen action */}
        <div className="flex items-center justify-between px-0.5">
          <span className="text-xs font-semibold text-primary-heading">
            Live Route & GPS
          </span>
          <button
            type="button"
            onClick={() => setIsMapFullscreen(true)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer active:scale-95"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            <span>Full Screen</span>
          </button>
        </div>

        {/* Real Interactive GPS Satellite Route Map Card */}
        <div className="w-full h-72 rounded-sm overflow-hidden border border-[#D9DADC] shadow-sm bg-slate-900">
          <RealRouteMap
            startPoint={DEFAULT_CREW_START_POINT}
            destinationPoint={destinationPoint}
            destinationTitle={job.title}
            destinationAddress={job.address}
            initialFullscreen={isMapFullscreen}
            onToggleFullscreen={(fs) => setIsMapFullscreen(fs)}
          />
        </div>

        {/* Destination Location Info Box */}
        <div className="flex items-center gap-2 p-2.5 rounded-sm bg-white border border-[#D9DADC] shadow-2xs">
          <MapPin className="h-4 w-4 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-base font-semibold text-primary-heading truncate">
              {job.title}
            </p>
            <p className="text-sm text-secondary-subheading truncate">
              {job.address}
            </p>
          </div>
          <span className="text-sm font-semibold text-primary px-2 py-0.5 rounded-sm bg-[#EAF2FA] shrink-0">
            ETA ~ 8 mins
          </span>
        </div>

        {/* Status Stage Pills: Traveling / Visiting */}
        <div className="flex items-center gap-2">
          {/* Active: Traveling */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-primary text-white text-xs font-semibold shadow-xs">
            <Check className="h-3.5 w-3.5" />
            <span>Traveling</span>
          </div>

          {/* Inactive: Visiting */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-[#D9DADC] text-secondary-subheading text-xs font-medium">
            <span>Visiting</span>
          </div>
        </div>

        {/* Progress Message */}
        <p className="text-xs text-secondary-subheading font-normal leading-relaxed">
          The journey was started at <span className="font-semibold text-txt-primary">08:30 AM</span> and is still in progress.
        </p>

        {/* Recent entries section */}
        <section className="space-y-2 pt-2">
          <h2 className="font-barlow text-base font-medium text-primary-heading">
            Recent entries
          </h2>

          <div className="flex items-start justify-between p-3.5 rounded-sm border border-[#D9DADC] bg-white shadow-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                <h3 className="font-barlow text-sm font-medium text-primary-heading">
                  Traveling Time
                </h3>
              </div>
              <p className="text-xs text-secondary-subheading pl-5">
                {job.address}
              </p>
              <p className="text-[11px] text-secondary-subheading/80 pl-5">
                Aug 11, 8:30 AM - Running
              </p>
            </div>

            <div className="flex flex-col items-end gap-1.5">
              <span className="font-barlow text-sm font-bold text-primary-heading">
                {travelHoursFormatted}h
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-sm bg-[#EAF2FA] text-primary">
                Running
              </span>
            </div>
          </div>
        </section>

        {/* Bottom Button: Travel Completed */}
        <div className="pt-4">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-sm bg-primary text-white font-medium text-sm transition-all hover:bg-primary-hover active:scale-[0.99] shadow-sm cursor-pointer"
          >
            <span>Travel Completed</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Travel Completed Modal */}
      <TravelCompletedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStartVisit={() => {
          setIsModalOpen(false);
          router.push(`/worker/jobs/${jobId}/visit`);
        }}
      />
    </div>
  );
}

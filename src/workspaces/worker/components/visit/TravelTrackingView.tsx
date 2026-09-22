"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight, Check, Navigation, Clock, MapPin } from "lucide-react";
import { TravelCompletedModal } from "./TravelCompletedModal";
import { MOCK_WORKER_JOBS } from "../../data/mockWorkerJobs";

interface TravelTrackingViewProps {
  jobId: string;
}

export function TravelTrackingView({ jobId }: TravelTrackingViewProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [travelMinutes, setTravelMinutes] = useState(15); // Start at 0.25h for realistic Figma mock

  const job = MOCK_WORKER_JOBS.find((j) => j.id === jobId) || MOCK_WORKER_JOBS[1];

  // Optional live timer incrementing every minute
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
        {/* GPS Satellite Route Map Card */}
        <div className="relative w-full h-64 rounded-sm overflow-hidden border border-[#D9DADC] bg-slate-900 shadow-xs">
          {/* Aerial Map Background Simulation */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-85"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')",
            }}
          />
          {/* Dark Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

          {/* SVG Route Path matching Figma red route line */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 360 256">
            <path
              d="M 60 210 Q 120 180 160 140 T 240 90 T 290 60"
              fill="none"
              stroke="#EF4444"
              strokeWidth="4"
              strokeDasharray="4 2"
              className="drop-shadow-md"
            />
            {/* Start location dot */}
            <circle cx="60" cy="210" r="7" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2" />
            {/* End location pin */}
            <circle cx="290" cy="60" r="8" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2.5" />
          </svg>

          {/* Destination Badge on Map */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-[#D9DADC] px-2.5 py-1.5 rounded-sm shadow-sm max-w-[85%]">
            <div className="flex items-center gap-1.5 text-xs font-medium text-primary-heading truncate">
              <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="truncate">{job.address}</span>
            </div>
          </div>

          {/* ETA / Distance Badge */}
          <div className="absolute bottom-3 right-3 bg-primary text-white text-[11px] font-semibold px-2.5 py-1 rounded-sm shadow-md flex items-center gap-1">
            <Navigation className="h-3 w-3" />
            <span>ETA ~ 8 mins</span>
          </div>
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

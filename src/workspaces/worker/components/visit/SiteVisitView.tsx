"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight, Check, Clock, Plus, Briefcase, CheckCircle2 } from "lucide-react";
import { AddExtraWorkModal, type ExtraWorkItem } from "./AddExtraWorkModal";
import { MOCK_WORKER_JOBS } from "../../data/mockWorkerJobs";

interface SiteVisitViewProps {
  jobId: string;
}

export function SiteVisitView({ jobId }: SiteVisitViewProps) {
  const router = useRouter();

  // On-site visit live seconds state (defaulting to 1 hour 32 mins 34 secs as shown in Figma)
  const [secondsElapsed, setSecondsElapsed] = useState<number>(5554); // 01:32:34
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isAddWorkOpen, setIsAddWorkOpen] = useState<boolean>(false);
  const [addedWorks, setAddedWorks] = useState<ExtraWorkItem[]>([]);

  const job = MOCK_WORKER_JOBS.find((j) => j.id === jobId) || MOCK_WORKER_JOBS[1];

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && !isComplete) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isComplete]);

  // Format seconds into HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")} h`;
  };

  const handleMarkComplete = () => {
    setIsRunning(false);
    setIsComplete(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F6F8] pb-12">
      {/* Sticky Top Header: ← Visit */}
      <header className="sticky top-0 z-30 flex items-center gap-3 bg-white/95 backdrop-blur-sm border-b border-[#EAECF0] px-4 py-3 shadow-xs">
        <button
          type="button"
          onClick={() => router.push(`/worker/jobs/${jobId}`)}
          className="p-1 -ml-1 rounded-md text-primary-heading hover:bg-slate-100 transition-colors cursor-pointer active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-barlow text-xl font-medium tracking-tight text-primary-heading">
          Visit
        </h1>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-col gap-4 p-4 max-w-md mx-auto w-full">
        {/* Big Digital Clock Card matching Figma screens 6 & 7 */}
        <div className="flex flex-col items-center justify-center p-6 rounded-sm border border-[#D9DADC] bg-white shadow-xs text-center space-y-1">
          <div className="font-barlow text-4xl font-semibold tracking-tight text-primary-heading">
            {formatTime(secondsElapsed)}
          </div>
          <span className="text-xs text-secondary-subheading font-normal">
            Status: {isComplete ? "Completed" : "Visiting"}
          </span>
        </div>

        {/* Status Stage Pills: Traveling & Visiting */}
        <div className="flex items-center gap-2">
          {/* Completed: Traveling */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-primary/15 text-primary text-xs font-semibold">
            <Check className="h-3.5 w-3.5" />
            <span>Traveling</span>
          </div>

          {/* Active: Visiting */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-primary text-white text-xs font-semibold shadow-xs">
            <Check className="h-3.5 w-3.5" />
            <span>Visiting</span>
          </div>
        </div>

        {/* Message */}
        <p className="text-xs text-secondary-subheading font-normal leading-relaxed">
          {isComplete
            ? "Site visit has been marked as complete."
            : "You are currently visiting the property."}
        </p>

        {/* Action Button: Mark Complete */}
        <div>
          {!isComplete ? (
            <button
              type="button"
              onClick={handleMarkComplete}
              className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-sm bg-primary text-white font-medium text-sm transition-all hover:bg-primary-hover active:scale-[0.99] shadow-sm cursor-pointer"
            >
              <span>Mark Complete</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <div className="p-3 rounded-sm bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center justify-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Visit session finalized successfully!</span>
            </div>
          )}
        </div>

        {/* Recent entries section */}
        <section className="space-y-2 pt-1">
          <h2 className="font-barlow text-base font-medium text-primary-heading">
            Recent entries
          </h2>

          <div className="space-y-2.5">
            {/* On-site Visit entry */}
            <div className="flex items-start justify-between p-3.5 rounded-sm border border-[#D9DADC] bg-white shadow-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                  <h3 className="font-barlow text-sm font-medium text-primary-heading">
                    On-site Visit
                  </h3>
                </div>
                <p className="text-xs text-secondary-subheading pl-5">
                  {job.address}
                </p>
                <p className="text-[11px] text-secondary-subheading/80 pl-5">
                  Aug 11, 8:45 AM - {isComplete ? "Completed" : "Running"}
                </p>
              </div>

              <div className="flex flex-col items-end gap-1.5">
                <span className="font-barlow text-sm font-bold text-primary-heading">
                  {formatTime(secondsElapsed).split(" ")[0]}
                </span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-sm ${
                    isComplete
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-[#EAF2FA] text-primary"
                  }`}
                >
                  {isComplete ? "Completed" : "Running"}
                </span>
              </div>
            </div>

            {/* Traveling Time entry */}
            <div className="flex items-start justify-between p-3.5 rounded-sm border border-[#D9DADC] bg-white shadow-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-secondary-subheading shrink-0" />
                  <h3 className="font-barlow text-sm font-medium text-primary-heading">
                    Traveling Time
                  </h3>
                </div>
                <p className="text-xs text-secondary-subheading pl-5">
                  {job.address}
                </p>
                <p className="text-[11px] text-secondary-subheading/80 pl-5">
                  Aug 11, 8:30 AM - 8:45 AM
                </p>
              </div>

              <div className="flex flex-col items-end gap-1.5">
                <span className="font-barlow text-sm font-bold text-primary-heading">
                  0.25h
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-sm bg-slate-100 text-secondary-subheading">
                  Completed
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Work Added Section matching Figma Screen 8 */}
        <section className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="font-barlow text-base font-medium text-primary-heading">
              Work Added
            </h2>
            <button
              type="button"
              onClick={() => setIsAddWorkOpen(true)}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Work</span>
            </button>
          </div>

          {addedWorks.length === 0 ? (
            <div className="p-4 rounded-sm border border-[#D9DADC] bg-white text-center space-y-2">
              <p className="text-xs text-secondary-subheading">
                No extra work added for this visit session yet.
              </p>
              <button
                type="button"
                onClick={() => setIsAddWorkOpen(true)}
                className="py-1.5 px-3 rounded-sm border border-primary text-primary text-xs font-medium hover:bg-blue-50 transition-colors cursor-pointer"
              >
                + Add Work
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {addedWorks.map((work) => (
                <div
                  key={work.id}
                  className="p-3.5 rounded-sm border border-[#D9DADC] bg-white space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-barlow text-sm font-semibold text-primary">
                      {work.service}
                    </span>
                    <span className="text-xs font-bold text-primary-heading">
                      {work.cost}
                    </span>
                  </div>

                  <p className="text-xs text-txt-primary font-medium">
                    {work.reason}
                  </p>
                  <p className="text-xs text-secondary-subheading">
                    {work.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-secondary-subheading pt-1 border-t border-[#EAECF0]">
                    <span>Duration: {work.duration}</span>
                    <span>{work.images.length} photos attached</span>
                  </div>

                  {work.images.length > 0 && (
                    <div className="flex items-center gap-1.5 pt-1">
                      {work.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="h-10 w-10 rounded-sm overflow-hidden border border-[#D9DADC]"
                        >
                          <img
                            src={img}
                            alt="Attachment"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Add Extra Work Modal */}
      <AddExtraWorkModal
        isOpen={isAddWorkOpen}
        onClose={() => setIsAddWorkOpen(false)}
        onSubmitWork={(newWork) => {
          setAddedWorks((prev) => [...prev, newWork]);
        }}
      />
    </div>
  );
}

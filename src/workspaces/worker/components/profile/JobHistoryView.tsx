"use client";

import { ChevronLeft } from "lucide-react";
import { JobData, MOCK_JOB_HISTORY } from "../../data/mockWorkerJobs";
import { JobHistoryCard } from "./JobHistoryCard";

interface JobHistoryViewProps {
  onBack: () => void;
  onSelectJob: (job: JobData) => void;
}

export function JobHistoryView({ onBack, onSelectJob }: JobHistoryViewProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Header matching Figma screenshot */}
      <header className="flex items-center gap-2 border-b border-[#D9DADC]/60 pb-3">
        <button
          type="button"
          onClick={onBack}
          className="p-1 -ml-1 text-primary-heading hover:bg-slate-100 rounded-md transition-colors cursor-pointer active:scale-95"
          aria-label="Back"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h1 className="font-barlow text-2xl font-semibold tracking-tight text-primary-heading">
          Job History
        </h1>
      </header>

      {/* List of Completed Job Cards */}
      <div className="flex flex-col gap-3.5">
        {MOCK_JOB_HISTORY.map((job) => (
          <JobHistoryCard
            key={job.id}
            job={job}
            onClick={() => onSelectJob(job)}
          />
        ))}
      </div>
    </div>
  );
}

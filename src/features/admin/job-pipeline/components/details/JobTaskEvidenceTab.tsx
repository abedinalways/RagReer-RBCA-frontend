"use client";

import React, { useState } from "react";
import { JobTaskCompletionItem } from "../../types/jobDetailsTypes";

interface JobTaskEvidenceTabProps {
  tasks: JobTaskCompletionItem[];
}

export const JobTaskEvidenceTab: React.FC<JobTaskEvidenceTabProps> = ({ tasks }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    taskTracking: true,
    evidence: true,
    checklist: true,
    workNote: true,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="w-full space-y-4 sm:space-y-5 animate-in fade-in duration-150">
      {/* 1. Task Completion Tracking */}
      <div className="rounded-xl border border-border bg-card-bg shadow-2xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection("taskTracking")}
          className="w-full p-4 sm:p-5 flex items-start gap-3 text-left hover:bg-page-bg/40 transition-colors cursor-pointer"
        >
          <span className="text-primary text-xs sm:text-sm mt-0.5 select-none">
            {openSections.taskTracking ? "▼" : "▶"}
          </span>
          <div className="flex flex-col">
            <h3 className="font-barlow text-base sm:text-lg font-medium text-primary-heading leading-tight">
              Task Completion Tracking
            </h3>
            {openSections.taskTracking && (
              <span className="text-xs text-secondary-subheading mt-1 font-normal">
                Task 0/0 completed
              </span>
            )}
          </div>
        </button>

        {openSections.taskTracking && (
          <div className="border-t border-border overflow-x-auto p-4 sm:p-5 pt-0 sm:pt-0">
            <table className="w-full text-left border-collapse text-xs md:text-sm mt-3">
              <thead>
                <tr className="bg-page-bg/70 border-b border-border text-secondary-subheading font-medium whitespace-nowrap">
                  <th className="py-2.5 px-4 font-medium">Task</th>
                  <th className="py-2.5 px-4 text-center font-medium">Assigned Crew</th>
                  <th className="py-2.5 px-4 text-center font-medium">Status</th>
                  <th className="py-2.5 px-4 text-center font-medium">Evidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle bg-card-bg">
                {tasks.map((t) => (
                  <tr key={t.id} className="hover:bg-page-bg/40 transition-colors">
                    <td className="py-3 px-4 font-normal text-txt-primary whitespace-nowrap">
                      {t.task}
                    </td>
                    <td className="py-3 px-4 text-center text-secondary-subheading whitespace-nowrap">
                      {t.assignedCrew}
                    </td>
                    <td className="py-3 px-4 text-center text-secondary-subheading whitespace-nowrap">
                      {t.status}
                    </td>
                    <td className="py-3 px-4 text-center text-secondary-subheading whitespace-nowrap">
                      {t.evidence}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 2. Evidence */}
      <div className="rounded-xl border border-border bg-card-bg shadow-2xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection("evidence")}
          className="w-full p-4 sm:p-5 flex items-center gap-3 text-left hover:bg-page-bg/40 transition-colors cursor-pointer"
        >
          <span className="text-primary text-xs sm:text-sm select-none">
            {openSections.evidence ? "▼" : "▶"}
          </span>
          <h3 className="font-barlow text-base sm:text-lg font-medium text-primary-heading leading-tight">
            Evidence
          </h3>
        </button>

        {openSections.evidence && (
          <div className="border-t border-border p-6 sm:p-10">
            <div className="max-w-lg mx-auto rounded-xl border border-border/80 bg-page-bg/30 p-6 sm:p-8 text-center flex flex-col items-center justify-center">
              <h4 className="font-barlow text-base sm:text-lg font-medium text-primary-heading mb-1.5">
                No Evidence Submitted
              </h4>
              <p className="text-xs sm:text-sm text-secondary-subheading leading-relaxed max-w-sm font-normal">
                Before and after photos will appear here after the crew completes the assigned work.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 3. Service Checklist */}
      <div className="rounded-xl border border-border bg-card-bg shadow-2xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection("checklist")}
          className="w-full p-4 sm:p-5 flex items-center gap-3 text-left hover:bg-page-bg/40 transition-colors cursor-pointer"
        >
          <span className="text-primary text-xs sm:text-sm select-none">
            {openSections.checklist ? "▼" : "▶"}
          </span>
          <h3 className="font-barlow text-base sm:text-lg font-medium text-primary-heading leading-tight">
            Service Checklist
          </h3>
        </button>

        {openSections.checklist && (
          <div className="border-t border-border p-6 sm:p-10">
            <div className="max-w-lg mx-auto rounded-xl border border-border/80 bg-page-bg/30 p-6 sm:p-8 text-center flex flex-col items-center justify-center">
              <h4 className="font-barlow text-base sm:text-lg font-medium text-primary-heading mb-1.5">
                No Activity Yet
              </h4>
              <p className="text-xs sm:text-sm text-secondary-subheading leading-relaxed max-w-sm font-normal">
                Completed service checklist will appear here once the leader submit the job for review.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 4. Work Note */}
      <div className="rounded-xl border border-border bg-card-bg shadow-2xs overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection("workNote")}
          className="w-full p-4 sm:p-5 flex items-center gap-3 text-left hover:bg-page-bg/40 transition-colors cursor-pointer"
        >
          <span className="text-primary text-xs sm:text-sm select-none">
            {openSections.workNote ? "▼" : "▶"}
          </span>
          <h3 className="font-barlow text-base sm:text-lg font-medium text-primary-heading leading-tight">
            Work Note
          </h3>
        </button>

        {openSections.workNote && (
          <div className="border-t border-border p-6 sm:p-10">
            <div className="max-w-lg mx-auto rounded-xl border border-border/80 bg-page-bg/30 p-6 sm:p-8 text-center flex flex-col items-center justify-center">
              <h4 className="font-barlow text-base sm:text-lg font-medium text-primary-heading mb-1.5">
                No Works Not Yet
              </h4>
              <p className="text-xs sm:text-sm text-secondary-subheading leading-relaxed max-w-sm font-normal">
                Notes from Crew leader will appear here once the job has been submitted for review.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

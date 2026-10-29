"use client";

import React, { useState } from "react";
import { Check, X } from "lucide-react";
import {
  JobTaskCompletionItem,
  JobEvidencePhotos,
  JobChecklistItem,
  JobWorkNote,
} from "../../types/jobDetailsTypes";

interface JobTaskEvidenceTabProps {
  tasks: JobTaskCompletionItem[];
  evidencePhotos?: JobEvidencePhotos;
  checklist?: JobChecklistItem[];
  workNote?: JobWorkNote;
  taskCompletionSubtitle?: string;
}

export const JobTaskEvidenceTab: React.FC<JobTaskEvidenceTabProps> = ({
  tasks,
  evidencePhotos,
  checklist,
  workNote,
  taskCompletionSubtitle,
}) => {
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

  const activeTasksCount = tasks.filter((t) => t.status !== "-").length;
  const completedCount = tasks.filter((t) => t.status === "Completed").length;
  const displayTotal = activeTasksCount > 0 ? tasks.length : 0;

  const subtitle =
    taskCompletionSubtitle ||
    (openSections.taskTracking && displayTotal > 0
      ? `Task ${completedCount}/${displayTotal} completed`
      : undefined);
  const renderTaskStatus = (status: string) => {
    if (status === "Completed") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-xs font-medium bg-badge-active-bg text-badge-active-text border border-badge-active-border whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-badge-active-dot" />
          Completed
        </span>
      );
    }
    if (status === "In Progress") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-xs font-medium bg-blue-50 text-info border border-blue-100 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-info" />
          In Progress
        </span>
      );
    }
    if (status === "Break") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-xs font-medium bg-terms-bg text-badge-pending-text border border-terms-border whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-badge-pending-dot" />
          Break
        </span>
      );
    }
    return <span className="text-secondary-subheading font-normal">{status}</span>;
  };

  // Divide checklist into 2 columns
  const midPoint = checklist ? Math.ceil(checklist.length / 2) : 0;
  const leftChecklist = checklist ? checklist.slice(0, midPoint) : [];
  const rightChecklist = checklist ? checklist.slice(midPoint) : [];
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
            {openSections.taskTracking && subtitle && (
              <span className="text-xs text-secondary-subheading mt-1 font-normal">
                {subtitle}
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
                  <th className="py-2.5 px-4 font-medium">Assigned Crew</th>
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
                    <td className="py-3 px-4 whitespace-nowrap">
                      {typeof t.assignedCrew === "object" ? (
                        <div className="flex items-center gap-2.5 min-w-[150px]">
                          <img
                            src={t.assignedCrew.avatar}
                            alt={t.assignedCrew.name}
                            className="h-7 w-7 rounded-full object-cover border border-border shrink-0"
                          />
                          <div className="flex flex-col min-w-0">
                            <span className="font-medium text-txt-primary text-xs truncate">
                              {t.assignedCrew.name}
                            </span>
                            <span className="text-[11px] text-secondary-subheading font-normal">
                              {t.assignedCrew.role}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-secondary-subheading font-normal">
                          {t.assignedCrew}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {renderTaskStatus(t.status)}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {t.status === "Completed" || t.evidence === "completed" ? (
                        <Check className="w-4 h-4 text-info mx-auto stroke-[2.5]" />
                      ) : (
                        <span className="text-secondary-subheading font-normal">-</span>
                      )}
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
          <div className="border-t border-border p-4 sm:p-5">
            {evidencePhotos && (evidencePhotos.before.length > 0 || evidencePhotos.after.length > 0) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {/* Before Photos */}
                <div className="rounded-lg border border-border bg-card-bg p-3.5 sm:p-4">
                  <h4 className="font-barlow text-sm sm:text-base font-medium text-txt-primary mb-3">
                    Before Photos
                  </h4>
                  <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-1">
                    {evidencePhotos.before.map((img, idx) => (
                      <div
                        key={idx}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-border/40 shrink-0 shadow-2xs"
                      >
                        <img
                          src={img}
                          alt={`Before ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* After Photos */}
                <div className="rounded-lg border border-border bg-card-bg p-3.5 sm:p-4">
                  <h4 className="font-barlow text-sm sm:text-base font-medium text-txt-primary mb-3">
                    After Photos
                  </h4>
                  <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-1">
                    {evidencePhotos.after.map((img, idx) => (
                      <div
                        key={idx}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-border/40 shrink-0 shadow-2xs"
                      >
                        <img
                          src={img}
                          alt={`After ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 sm:p-10">
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
          <div className="border-t border-border p-4 sm:p-5">
            {checklist && checklist.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column Box */}
                <div className="rounded-lg border border-border divide-y divide-border bg-card-bg overflow-hidden">
                  {leftChecklist.map((item) => (
                    <div
                      key={item.id}
                      className="px-4 py-3 flex items-center gap-2.5 text-xs sm:text-sm text-secondary-subheading"
                    >
                      {item.completed ? (
                        <div className="w-4 h-4 rounded border border-info bg-blue-50/80 flex items-center justify-center text-info shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded flex items-center justify-center text-decline shrink-0 font-medium text-xs">
                          <X className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      )}
                      <span className="font-normal text-txt-primary">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Right Column Box */}
                <div className="rounded-lg border border-border divide-y divide-border bg-card-bg overflow-hidden">
                  {rightChecklist.map((item) => (
                    <div
                      key={item.id}
                      className="px-4 py-3 flex items-center gap-2.5 text-xs sm:text-sm text-secondary-subheading"
                    >
                      {item.completed ? (
                        <div className="w-4 h-4 rounded border border-info bg-blue-50/80 flex items-center justify-center text-info shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded flex items-center justify-center text-decline shrink-0 font-medium text-xs">
                          <X className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      )}
                      <span className="font-normal text-txt-primary">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-6 sm:p-10">
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
          <div className="border-t border-border p-4 sm:p-5 space-y-3">
            {workNote ? (
              <>
                <div className="rounded-lg border border-border bg-card-bg p-3.5 sm:p-4">
                  <p className="text-xs sm:text-sm text-secondary-subheading font-normal leading-relaxed">
                    {workNote.text}
                  </p>
                </div>
                <div className="text-xs text-secondary-subheading font-normal">
                  Submitted by{" "}
                  <span className="text-txt-primary underline hover:text-primary transition-colors cursor-pointer">
                    {workNote.submittedBy} ({workNote.submitterRole})
                  </span>
                </div>
              </>
            ) : (
              <div className="p-6 sm:p-10">
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
        )}
      </div>
    </div>
  );
};

export default JobTaskEvidenceTab;

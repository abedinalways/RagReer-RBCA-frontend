"use client";

import { MapPin } from "lucide-react";
import { EvidenceJobSummary } from "./types";
import { DEFAULT_JOB_SUMMARY } from "./mockEvidenceData";

interface EvidenceJobInfoCardProps {
  job?: EvidenceJobSummary;
}

export function EvidenceJobInfoCard({
  job = DEFAULT_JOB_SUMMARY,
}: EvidenceJobInfoCardProps) {
  return (
    <div className="rounded-lg border border-border-card bg-blue-50/70 p-3.5 space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-normal text-primary">
          {job.badgeTitle}
        </span>
        <span className="text-[11px] font-normal px-2 py-0.5 rounded-sm bg-blue-100/60 text-secondary-subheading">
          {job.tag}
        </span>
      </div>

      <h2 className="font-barlow text-base font-bold text-primary-heading leading-tight pt-0.5">
        {job.title}
      </h2>

      <div className="flex items-center gap-1.5 text-xs text-secondary-subheading">
        <MapPin className="h-3.5 w-3.5 shrink-0 text-secondary-subheading" />
        <span className="truncate">{job.address}</span>
      </div>

      <p className="text-xs font-normal text-primary pt-0.5">
        Size: {job.size}
      </p>
    </div>
  );
}

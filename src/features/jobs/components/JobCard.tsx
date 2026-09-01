"use client";

import type { Job, JobStatus } from "../types/job.types";

export interface JobCardProps {
  job: Job;
  onStartTimer?: (job: Job) => void;
}

const STATUS_META: Record<JobStatus, { label: string; badgeClass: string }> = {
  CURRENT: { label: "Current", badgeClass: "bg-emerald-100 text-emerald-700" },
  UPCOMING: { label: "Upcoming", badgeClass: "bg-sky-100 text-sky-700" },
  COMPLETED: { label: "Completed", badgeClass: "bg-slate-200 text-slate-600" },
  CANCELLED: { label: "Cancelled", badgeClass: "bg-rose-100 text-rose-700" },
};

/**
 * Reusable Job card from the jobs domain. Both the Worker PWA (JobCard inside
 * the mobile shell) and the Admin jobs list can render it — Feature ≠ Role.
 */
export function JobCard({ job, onStartTimer }: JobCardProps) {
  const status = STATUS_META[job.status];

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {job.title}
        </span>
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.badgeClass}`}>
          {status.label}
        </span>
      </div>

      <dl className="mt-3 space-y-2 text-sm">
        <div className="flex items-start gap-2">
          <span aria-hidden>🏠</span>
          <dd className="text-slate-700">{job.property.address}</dd>
        </div>
        <div className="flex items-start gap-2">
          <span aria-hidden>👤</span>
          <dd className="text-slate-700">
            {job.customer.name}
            <span className="block text-xs text-slate-500">{job.customer.phone}</span>
          </dd>
        </div>
        <div className="flex items-start gap-2">
          <span aria-hidden>🗓️</span>
          <dd className="text-slate-700">
            {new Date(job.scheduledAt).toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </dd>
        </div>
      </dl>

      {onStartTimer && job.status === "CURRENT" ? (
        <button
          type="button"
          onClick={() => onStartTimer(job)}
          className="mt-4 w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          ▶ Start / Stop Timer
        </button>
      ) : null}
    </article>
  );
}
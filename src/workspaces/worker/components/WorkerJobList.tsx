"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { WorkerJobCard } from "./WorkerJobCard";
import type { Job, JobStatus } from "@/features/jobs/types/job.types";

type JobFilter = "ALL" | JobStatus;

const MOCK_JOBS: Job[] = [
  {
    id: "job-1",
    title: "Bathroom Renovation",
    status: "CURRENT",
    scheduledAt: "2026-09-01T09:00:00Z",
    startedAt: "2026-09-01T09:05:00Z",
    property: { id: "prop-1", address: "House 12, Road 7, Gulshan 1, Dhaka" },
    customer: { id: "cus-1", name: "Rahim Uddin", phone: "+880 1711 234 567" },
    description: "Full bathroom waterproofing and tiling.",
  },
  {
    id: "job-2",
    title: "Drainage Line Repair",
    status: "UPCOMING",
    scheduledAt: "2026-09-02T11:00:00Z",
    property: { id: "prop-2", address: "Flat 3B, Lake View, Banani, Dhaka" },
    customer: { id: "cus-2", name: "Salma Begum", phone: "+880 1811 876 543" },
  },
  {
    id: "job-3",
    title: "Office Interior Fit-out",
    status: "UPCOMING",
    scheduledAt: "2026-09-03T10:00:00Z",
    property: { id: "prop-3", address: "Level 8, Sena Kalyan Bhaban, Motijheel, Dhaka" },
    customer: { id: "cus-3", name: "Farhana Islam", phone: "+880 1611 111 222" },
  },
];

const FILTERS: Array<{ key: JobFilter; label: string }> = [
  { key: "ALL", label: "All" },
  { key: "CURRENT", label: "Current" },
  { key: "UPCOMING", label: "Upcoming" },
];

/**
 * Worker jobs tab — mirrors the screenshot (All / Current / Upcoming) using
 * features/jobs business UI inside the mobile PWA shell.
 */
export function WorkerJobList() {
  const [filter, setFilter] = useState<JobFilter>("ALL");

  const jobs = filter === "ALL" ? MOCK_JOBS : MOCK_JOBS.filter((job) => job.status === filter);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setFilter(item.key)}
            className={cn(
              "flex-1 rounded-full px-3 py-2 text-sm font-medium transition-colors",
              filter === item.key ? "bg-indigo-600 text-white" : "bg-white text-slate-600",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {jobs.map((job) => (
        <WorkerJobCard
          key={job.id}
          job={job}
          onStartTimer={() => {
            // Wire to features/time-tracking hooks later.
            console.log("time-tracking start", job.id);
          }}
        />
      ))}
    </div>
  );
}
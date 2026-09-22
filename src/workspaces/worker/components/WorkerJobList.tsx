"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SegmentedTabs, type TabOption } from "@/components/shared/SegmentedTabs";
import { TodayWorkJobCard } from "./TodayWorkJobCard";
import { WorkerDateStrip } from "./WorkerDateStrip";
import { WorkerJobEmptyState } from "./WorkerJobEmptyState";
import { MOCK_WORKER_JOBS, type JobData } from "../data/mockWorkerJobs";
import { useIsTeamLeader } from "../hooks/useIsTeamLeader";

// Re-export JobData for backward compatibility
export type { JobData };

export function WorkerJobList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTabParam = (searchParams.get("tab") || "all").toLowerCase();

  // Check if current user has Team Leader access
  const isTeamLeader = useIsTeamLeader();

  const TABS: TabOption[] = useMemo(() => {
    const baseTabs: TabOption[] = [
      { key: "all", label: "All" },
      { key: "current", label: "Current" },
      { key: "upcoming", label: "Upcoming" },
    ];
    if (isTeamLeader) {
      baseTabs.push({ key: "visit", label: "Visit" });
    }
    return baseTabs;
  }, [isTeamLeader]);

  // Active view date for calendar (month and year) - defaults to August 2026
  const [viewDate, setViewDate] = useState<Date>(new Date(2026, 7, 11));
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>("2026-08-11");

  // Map of dates that have assigned jobs
  const jobDateKeys = useMemo(() => {
    return new Set(MOCK_WORKER_JOBS.map((job) => job.dateKey));
  }, []);

  // Filter jobs based on active tab & selected date
  const filteredJobs = useMemo(() => {
    return MOCK_WORKER_JOBS.filter((job) => {
      if (currentTabParam === "current") {
        return job.status === "CURRENT";
      }
      if (currentTabParam === "upcoming") {
        if (selectedDateKey) {
          return job.status === "UPCOMING" && job.dateKey === selectedDateKey;
        }
        return job.status === "UPCOMING";
      }
      if (currentTabParam === "visit") {
        if (selectedDateKey) {
          return job.isVisit && job.dateKey === selectedDateKey;
        }
        return Boolean(job.isVisit);
      }
      // "all" tab
      if (selectedDateKey && currentTabParam === "all") {
        return job.dateKey === selectedDateKey || job.status === "CURRENT";
      }
      return true;
    });
  }, [currentTabParam, selectedDateKey]);

  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      {/* Page Heading */}
      <div className="flex items-center justify-between pt-1 pb-1 border-b border-border/40">
        <h1 className="font-barlow text-2xl font-semibold leading-tight text-primary-heading">
          Job's
        </h1>
      </div>

      {/* Top Tab Bar with URL Query persistence (Dynamic Visit tab for Team Leader) */}
      <SegmentedTabs tabs={TABS} defaultValue="all" paramName="tab" />

      {/* Date Selector Strip (shown on UPCOMING and VISIT tab or when browsing dates) */}
      {(currentTabParam === "upcoming" || currentTabParam === "visit") && (
        <WorkerDateStrip
          viewDate={viewDate}
          onViewDateChange={setViewDate}
          selectedDateKey={selectedDateKey}
          onSelectDate={setSelectedDateKey}
          jobDateKeys={jobDateKeys}
        />
      )}

      {/* Job Cards List */}
      <div className="space-y-3.5 pt-1">
        {filteredJobs.length === 0 ? (
          <WorkerJobEmptyState
            selectedDateKey={selectedDateKey}
            onClearDateFilter={() => setSelectedDateKey(null)}
          />
        ) : (
          filteredJobs.map((job) => (
            <TodayWorkJobCard
              key={job.id}
              status={job.status}
              title={job.title}
              address={job.address}
              service={job.service}
              customerName={job.customerName}
              customerAvatar={job.customerAvatar}
              imageSrc={job.imageSrc}
              progressText={job.progressText}
              onCardClick={() => {
                router.push(`/worker/jobs/${job.id}`);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
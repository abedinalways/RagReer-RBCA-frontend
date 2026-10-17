"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { TopTab, type TopTabItem } from "@/components/reusable/TopTab";
import { DEFAULT_JOB_DETAIL_DATA } from "../../data/jobDetailsData";
import { JOB_STATUS_STYLES } from "../../data/jobPipelineData";
import { JobDetailData } from "../../types/jobDetailsTypes";
import { JobOverviewTab } from "./JobOverviewTab";
import { JobTimeTrackingTab } from "./JobTimeTrackingTab";
import { JobTaskEvidenceTab } from "./JobTaskEvidenceTab";
import { JobBillingTab } from "./JobBillingTab";
import { JobActivityTab } from "./JobActivityTab";
import { EditCrewEquipmentModal } from "./EditCrewEquipmentModal";
import { ChangeCrewLeaderModal } from "./ChangeCrewLeaderModal";

export type DetailTabKey =
  | "overview"
  | "time-tracking"
  | "task-evidence"
  | "billing"
  | "activity";

export function normalizeTabKey(tab?: string): DetailTabKey {
  if (!tab) return "overview";
  const lower = tab.toLowerCase().trim();
  if (lower === "timetracking" || lower === "time-tracking") return "time-tracking";
  if (lower === "taskevidence" || lower === "task-evidence") return "task-evidence";
  if (lower === "billing") return "billing";
  if (lower === "activity") return "activity";
  return "overview";
}

interface AdminJobDetailProps {
  jobId?: string;
  initialTab?: string;
}

export const AdminJobDetail: React.FC<AdminJobDetailProps> = ({
  jobId,
  initialTab,
}) => {
  const [data, setData] = useState<JobDetailData>(() => ({
    ...DEFAULT_JOB_DETAIL_DATA,
    jobId: jobId
      ? jobId.startsWith("#")
        ? jobId
        : `#${jobId}`
      : DEFAULT_JOB_DETAIL_DATA.jobId,
  }));

  const [activeTab, setActiveTab] = useState<DetailTabKey>(() =>
    normalizeTabKey(initialTab)
  );

  useEffect(() => {
    if (initialTab) {
      setActiveTab(normalizeTabKey(initialTab));
    }
  }, [initialTab]);

  const [isEditCrewModalOpen, setIsEditCrewModalOpen] = useState(false);
  const [isChangeLeaderModalOpen, setIsChangeLeaderModalOpen] = useState(false);

  const statusStyle = JOB_STATUS_STYLES[data.status] || {
    badgeBg: "bg-blue-50",
    badgeText: "text-info",
    badgeBorder: "border-blue-100",
    dotBg: "bg-info",
    label: data.status,
  };

  const cleanJobId = (jobId || "job-1").replace("#", "");

  const tabs: TopTabItem<DetailTabKey>[] = [
    { key: "overview", label: "Overview" },
    { key: "time-tracking", label: "Time Tracking" },
    { key: "task-evidence", label: "Task & Evidence" },
    { key: "billing", label: "Billing" },
    { key: "activity", label: "Activity" },
  ];

  return (
    <div className="w-full space-y-4 sm:space-y-5 max-w-[1600px] mx-auto animate-in fade-in duration-200">
      {/* 1. Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs sm:text-sm text-secondary-subheading font-normal"
      >
        <Link
          href="/admin/job-pipeline"
          className="hover:text-primary transition-colors cursor-pointer"
        >
          Job Pipeline
        </Link>
        <span className="text-secondary-subheading/60">&gt;</span>
        <span className="text-txt-primary font-medium">Job Details</span>
      </nav>

      {/* 2. Header Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-1">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <h1 className="font-barlow text-xl sm:text-2xl font-medium tracking-tight text-primary-heading">
              {data.title}
            </h1>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-xs font-medium ${statusStyle.badgeBg} ${statusStyle.badgeText} border ${statusStyle.badgeBorder} whitespace-nowrap`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dotBg}`} />
              {data.status}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-secondary-subheading font-normal">
            JOB ID {data.jobId} • Created On {data.createdOn}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsEditCrewModalOpen(true)}
            className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-hover text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs"
          >
            Edit Crew/Equipment
          </button>
          <button
            type="button"
            onClick={() => {
              setData((prev) => ({ ...prev, status: "Completed" }));
              toast.success("Job marked as completed!");
            }}
            className="px-4 py-2 rounded-md bg-blue-100 text-primary-dark hover:bg-blue-200/80 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            Mark as Completed
          </button>
        </div>
      </div>

      {/* 3. Main Container with Reusable TopTab */}
      <div className="rounded-xl border border-border bg-card-bg shadow-2xs overflow-hidden">
        {/* Reusable TopTab with dynamic basePath matching /admin/job-pipeline/[id]/[tab] */}
        <TopTab<DetailTabKey>
          tabs={tabs}
          activeTab={activeTab}
          basePath={`/admin/job-pipeline/${cleanJobId}`}
          onChange={(key) => setActiveTab(key)}
        />

        {/* Tab Content Area */}
        <div className="p-4 sm:p-6 bg-page-bg/30">
          {activeTab === "overview" && (
            <JobOverviewTab
              data={data}
              onViewRequest={() => toast("Opening service request...", { icon: "📋" })}
              onViewContract={() => toast("Opening contract agreement...", { icon: "📝" })}
              onChangeCrewLeader={() => setIsChangeLeaderModalOpen(true)}
            />
          )}

          {activeTab === "time-tracking" && (
            <JobTimeTrackingTab data={data.timeTracking} />
          )}

          {activeTab === "task-evidence" && (
            <JobTaskEvidenceTab tasks={data.tasks} />
          )}

          {activeTab === "billing" && <JobBillingTab />}

          {activeTab === "activity" && <JobActivityTab />}
        </div>
      </div>

      {/* 4. Edit Crew/Equipment Modal */}
      <EditCrewEquipmentModal
        isOpen={isEditCrewModalOpen}
        onClose={() => setIsEditCrewModalOpen(false)}
        initialLeader={data.crew.find((c) => c.isLeader)?.name || "Marcus Bell"}
        onSave={({ leader }) => {
          setData((prev) => ({
            ...prev,
            crew: prev.crew.map((c) => ({
              ...c,
              isLeader: c.name === leader,
            })),
          }));
        }}
      />

      {/* 5. Change Crew Leader Modal */}
      <ChangeCrewLeaderModal
        isOpen={isChangeLeaderModalOpen}
        onClose={() => setIsChangeLeaderModalOpen(false)}
        onSelectLeader={(candidate) => {
          setData((prev) => ({
            ...prev,
            crew: [
              {
                id: candidate.id,
                name: candidate.name,
                role: "Crew Leader",
                avatar: candidate.avatar,
                strikeCount: candidate.strikeCount,
                isLeader: true,
              },
              ...prev.crew.filter((c) => !c.isLeader),
            ],
          }));
        }}
      />
    </div>
  );
};

export default AdminJobDetail;


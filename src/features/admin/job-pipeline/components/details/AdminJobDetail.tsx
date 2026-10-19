"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { TopTab, type TopTabItem } from "@/components/reusable/TopTab";
import { getJobDetailById, COMPLETED_JOB_DETAIL_DATA } from "../../data/jobDetailsData";
import { JOB_STATUS_STYLES } from "../../data/jobPipelineData";
import { JobDetailData } from "../../types/jobDetailsTypes";
import { JobOverviewTab } from "./JobOverviewTab";
import { JobTimeTrackingTab } from "./JobTimeTrackingTab";
import { JobTaskEvidenceTab } from "./JobTaskEvidenceTab";
import { JobBillingTab } from "./JobBillingTab";
import { JobActivityTab } from "./JobActivityTab";
import { EditCrewEquipmentModal } from "./EditCrewEquipmentModal";
import { ChangeCrewLeaderModal } from "./ChangeCrewLeaderModal";
import { ReviewFlaggedWorkModal } from "./ReviewFlaggedWorkModal";
import { QualityIssueDecisionModal } from "./QualityIssueDecisionModal";

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
  const [data, setData] = useState<JobDetailData>(() =>
    getJobDetailById(jobId)
  );

  const [activeTab, setActiveTab] = useState<DetailTabKey>(() =>
    normalizeTabKey(initialTab)
  );

  useEffect(() => {
    setData(getJobDetailById(jobId));
  }, [jobId]);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(normalizeTabKey(initialTab));
    }
  }, [initialTab]);

  const [isEditCrewModalOpen, setIsEditCrewModalOpen] = useState(false);
  const [isChangeLeaderModalOpen, setIsChangeLeaderModalOpen] = useState(false);
  const [isReviewFlaggedModalOpen, setIsReviewFlaggedModalOpen] = useState(false);
  const [isQualityIssueModalOpen, setIsQualityIssueModalOpen] = useState(false);

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
        {data.status === "Completed" ? (
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                toast.success(`Invoice generated successfully for ${data.jobId}!`);
              }}
              className="px-5 py-2.5 rounded-md bg-primary text-white hover:bg-primary-hover text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs"
            >
              Generate Invoice
            </button>
          </div>
        ) : data.status === "Awaiting Review" ? (
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setData((prev) => ({
                  ...COMPLETED_JOB_DETAIL_DATA,
                  id: prev.id,
                  jobId: prev.jobId,
                  title: prev.title,
                }));
                toast.success("Job marked as completed!");
              }}
              className="px-5 py-2.5 rounded-md bg-primary text-white hover:bg-primary-hover text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs"
            >
              Mark as Completed
            </button>
            <button
              type="button"
              onClick={() => setIsQualityIssueModalOpen(true)}
              className="px-5 py-2.5 rounded-md bg-primary text-white hover:bg-primary-hover text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs"
            >
              Raise Quality Issue
            </button>
          </div>
        ) : (
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
                setData((prev) => ({
                  ...COMPLETED_JOB_DETAIL_DATA,
                  id: prev.id,
                  jobId: prev.jobId,
                  title: prev.title,
                }));
                toast.success("Job marked as completed!");
              }}
              className={`px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                data.status === "On Hold"
                  ? "bg-page-bg text-secondary-subheading border border-border"
                  : "bg-blue-100 text-primary-dark hover:bg-blue-200/80"
              }`}
            >
              Mark as Completed
            </button>
          </div>
        )}
      </div>

      {/* 3. Main Container with Reusable TopTab */}
      <div className="rounded-xl border border-border bg-card-bg shadow-2xs overflow-hidden">
        {/* Flagged Additional Work Banner (e.g. On Hold status) */}
        {data.alertBanner && activeTab === "overview" && (
          <div className="p-4 sm:p-5 pb-3">
            <div className="rounded-sm border border-flagged-amber/50 bg-terms-bg p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-2xs animate-in fade-in duration-150">
              <div className="flex items-start gap-3 min-w-0">
                <div className="mt-0.5 text-flagged-amber shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="font-barlow text-base sm:text-lg font-medium text-flagged-amber leading-tight">
                    {data.alertBanner.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-secondary-subheading font-normal mt-0.5">
                    {data.alertBanner.description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsReviewFlaggedModalOpen(true)}
                className="px-5 py-2 rounded-md bg-primary text-white hover:bg-primary-hover text-xs sm:text-sm font-medium transition-colors cursor-pointer shrink-0 self-start sm:self-auto shadow-2xs"
              >
                {data.alertBanner.actionText}
              </button>
            </div>
          </div>
        )}

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
            <JobTaskEvidenceTab
              tasks={data.tasks}
              evidencePhotos={data.evidencePhotos}
              checklist={data.checklist}
              workNote={data.workNote}
              taskCompletionSubtitle={data.taskCompletionSubtitle}
            />
          )}

          {activeTab === "billing" && <JobBillingTab />}

          {activeTab === "activity" && (
            <JobActivityTab activities={data.activities} />
          )}
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

      {/* 6. Review Flagged Work Modal */}
      <ReviewFlaggedWorkModal
        isOpen={isReviewFlaggedModalOpen}
        onClose={() => setIsReviewFlaggedModalOpen(false)}
        jobId={data.jobId}
        propertyName={data.property.name}
        propertyAddress={data.property.address}
        onSendToCustomer={() => {
          setData((prev) => ({
            ...prev,
            alertBanner: undefined,
          }));
        }}
        onReject={() => {
          setData((prev) => ({
            ...prev,
            alertBanner: undefined,
          }));
        }}
      />

      {/* 7. Quality Issue Decision Modal */}
      <QualityIssueDecisionModal
        isOpen={isQualityIssueModalOpen}
        onClose={() => setIsQualityIssueModalOpen(false)}
        onConfirmIssue={() => {
          setData((prev) => ({
            ...prev,
            status: "Quality Issue",
          }));
        }}
      />
    </div>
  );
};

export default AdminJobDetail;


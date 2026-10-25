"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  DollarSign,
  Clock,
  Flag,
  ChevronRight,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  CrewMemberItem,
  CrewTabKey,
  SetHourlyRateFormData,
} from "../types/crewMembers.types";
import { CrewDetailsOverviewTab } from "./CrewDetailsOverviewTab";
import { CrewJobsTab } from "./CrewJobsTab";
import { SetHourlyRateModal } from "./SetHourlyRateModal";
import { SuspendMemberModal } from "./SuspendMemberModal";
import JobsIcon from "../../../../components/icons/admin/JobsIcon";
import RateIcon from "../../../../components/icons/admin/RateIcon";
import ActiveJobIcon from "../../../../components/icons/admin/ActiveJobIcon";
import FlagIcon from "../../../../components/icons/admin/FlagIcon";
import WorkedIcon from "../../../../components/icons/admin/WorkedIcon";

interface CrewMemberDetailsViewProps {
  member: CrewMemberItem;
  initialTab?: CrewTabKey;
  onBack: () => void;
  onUpdateMember?: (updated: CrewMemberItem) => void;
}

export const CrewMemberDetailsView: React.FC<CrewMemberDetailsViewProps> = ({
  member: initialMember,
  initialTab = "overview",
  onBack,
  onUpdateMember,
}) => {
  const [member, setMember] = useState<CrewMemberItem>(initialMember);
  const [activeTab, setActiveTab] = useState<CrewTabKey>(initialTab);
  const [isHourlyRateModalOpen, setIsHourlyRateModalOpen] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);

  const router = useRouter();

  const handleTabChange = (key: CrewTabKey) => {
    setActiveTab(key);
    router.replace(`/admin/workers/${member.id}/${key}`, { scroll: false });
  };

  const tabs: { key: CrewTabKey; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "jobs", label: "Jobs" },
    { key: "time", label: "Time" },
    { key: "performance", label: "Performance" },
    { key: "activity", label: "Activity" },
  ];

  const handleSaveHourlyRate = (data: SetHourlyRateFormData) => {
    const formattedRate = data.hourlyRate.startsWith("$")
      ? data.hourlyRate
      : `$${data.hourlyRate}`;

    const updated: CrewMemberItem = {
      ...member,
      hourlyRate: formattedRate,
      frequency: data.payFrequency,
      effectiveFrom: data.effectiveFrom,
    };

    setMember(updated);
    onUpdateMember?.(updated);
    toast.success(`Hourly rate updated to ${formattedRate} (${data.payFrequency})`);
  };

  const handleConfirmSuspend = () => {
    const updated: CrewMemberItem = {
      ...member,
      status: "Inactive",
    };
    setMember(updated);
    onUpdateMember?.(updated);
    setIsSuspendModalOpen(false);
    toast.error(`Account for ${member.name} has been suspended.`);
  };

  return (
    <div className="space-y-5 pb-12">
      {/* 1. Breadcrumb Row (Screenshots 1 & 2) */}
      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-secondary-subheading">
        <button
          type="button"
          onClick={onBack}
          className="hover:text-primary transition-colors cursor-pointer font-medium"
        >
          Crew
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-secondary-subheading/60" />
        <span className="text-primary-heading font-medium">Crew Details</span>
      </div>

      {/* 2. Top Header Row: Avatar, Name, Badges & Action Buttons (Screenshots 1 & 2) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Avatar, Name, Status, Role, Crew ID */}
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-border bg-slate-100 shrink-0 shadow-2xs">
            <Image
              src={member.avatar}
              alt={member.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-medium text-primary-heading font-barlow-condensed leading-tight">
                {member.name}
              </h1>

              {/* Status Badge */}
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-medium border ${
                  member.status === "Active"
                    ? "bg-nav-bg text-info border-blue-100"
                    : "bg-apt-cancelled-bg text-decline border-decline-border"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    member.status === "Active" ? "bg-info" : "bg-decline"
                  }`}
                />
                {member.status}
              </span>

              {/* Role Badge */}
              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded text-xs font-medium border border-badge-active-border bg-badge-active-bg text-badge-active-text">
                {member.role}
              </span>
            </div>

            <p className="text-xs text-secondary-subheading font-medium">
              Crew ID:{member.crewId}
            </p>
          </div>
        </div>

        {/* Right: Set Hourly Rate & Suspend Account Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsHourlyRateModalOpen(true)}
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-medium rounded-md shadow-2xs transition-colors cursor-pointer"
          >
            Set Hourly Rate
          </button>
          <button
            type="button"
            onClick={() => setIsSuspendModalOpen(true)}
            className="px-4 py-2 border border-decline text-decline hover:bg-decline-secondary text-xs sm:text-sm font-medium rounded-md transition-colors cursor-pointer"
          >
            Suspend Account
          </button>
        </div>
      </div>

   
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Active Jobs */}
        <div className="bg-card-bg rounded-sm border border-border p-4 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm md:text-base  font-medium text-secondary-subheading">
              Active Jobs
            </span>
            <p className="text-xl sm:text-2xl font-semibold text-primary font-barlow-condensed leading-none">
              {member.activeJobs !== undefined
                ? member.activeJobs < 10
                  ? `0${member.activeJobs}`
                  : member.activeJobs
                : "02"}
            </p>
          </div>
          <div className="w-10 h-10 rounded-sm bg-blue-50 text-primary flex items-center justify-center shrink-0">
            <ActiveJobIcon/>
          </div>
        </div>

        {/* Hourly Rate */}
        <div className="bg-card-bg rounded-xl border border-border p-4 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm md:text-base font-medium text-secondary-subheading">
              Hourly Rate
            </span>
            <p className="text-xl sm:text-2xl font-semibold text-primary font-barlow-condensed leading-none">
              {member.hourlyRate || "$65.00"}
            </p>
          </div>
          <div className="w-10 h-10 rounded-sm bg-blue-50 text-primary flex items-center justify-center shrink-0">
            <RateIcon/>
          </div>
        </div>

        {/* Worked This Month */}
        <div className="bg-card-bg rounded-sm border border-border p-4 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm md:text-base font-medium text-secondary-subheading">
              Worked This Month
            </span>
            <p className="text-xl sm:text-2xl font-semibold text-primary font-barlow-condensed leading-none">
              {member.workedThisMonth || "12h 40m"}
            </p>
          </div>
          <div className="w-10 h-10 rounded-sm bg-blue-50 text-primary flex items-center justify-center shrink-0">
            <WorkedIcon/>
          </div>
        </div>

        {/* Net Payable */}
        <div className="bg-card-bg rounded-sm border border-border p-4 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm md:text-base font-medium text-secondary-subheading">
              Net Payable
            </span>
            <p className="text-xl sm:text-2xl font-semibold text-primary font-barlow-condensed leading-none">
              {member.netPayable || member.payableThisMonth || "$2,090"}
            </p>
          </div>
          <div className="w-10 h-10 rounded-sm bg-blue-50 text-primary flex items-center justify-center shrink-0">
            <RateIcon/>
          </div>
        </div>

        {/* Quality Flags */}
        <div className="bg-card-bg rounded-sm border border-border p-4 shadow-2xs flex items-center justify-between col-span-2 sm:col-span-1">
          <div className="space-y-1">
            <span className="text-sm md:text-base font-medium text-secondary-subheading">
              Quality Flags
            </span>
            <p className="text-xl sm:text-2xl font-semibold text-primary font-barlow-condensed leading-none">
              {member.qualityFlags ?? 0}
            </p>
          </div>
          <div className="w-10 h-10 rounded-sm bg-blue-50 text-primary flex items-center justify-center shrink-0">
            <FlagIcon/>
          </div>
        </div>
      </div>

      {/* 4. Tabs Row (Underlined Tabs) */}
      <div className="border-b border-border flex items-center gap-6 overflow-x-auto text-xs sm:text-sm">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleTabChange(tab.key)}
              className={`pb-3 font-medium transition-colors cursor-pointer whitespace-nowrap relative select-none ${
                isActive
                  ? "text-primary border-b-2 border-primary -mb-px"
                  : "text-secondary-subheading hover:text-primary-heading"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 5. Tab Content */}
      {activeTab === "overview" && (
        <CrewDetailsOverviewTab
          member={member}
          onViewAllActivity={() => setActiveTab("activity")}
        />
      )}

      {activeTab === "jobs" && <CrewJobsTab member={member} />}

      {activeTab === "time" && (
        <div className="bg-card-bg rounded-xl border border-border p-6 shadow-2xs space-y-4">
          <h2 className="text-base sm:text-lg font-medium text-primary-heading font-barlow-condensed border-b border-border pb-3">
            Timesheet & Worked Hours
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-border bg-page-bg/40 space-y-1">
              <span className="text-xs text-secondary-subheading">Total Hours</span>
              <p className="text-xl font-semibold text-primary">{member.workedThisMonth || "12h 40m"}</p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-page-bg/40 space-y-1">
              <span className="text-xs text-secondary-subheading">Pay Frequency</span>
              <p className="text-xl font-semibold text-primary">{member.frequency || "Monthly"}</p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-page-bg/40 space-y-1">
              <span className="text-xs text-secondary-subheading">Estimated Earnings</span>
              <p className="text-xl font-semibold text-primary">{member.netPayable || "$2,090"}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "performance" && (
        <div className="bg-card-bg rounded-xl border border-border p-6 shadow-2xs space-y-4">
          <h2 className="text-base sm:text-lg font-medium text-primary-heading font-barlow-condensed border-b border-border pb-3">
            Performance Metrics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-border bg-page-bg/40 space-y-1">
              <span className="text-xs text-secondary-subheading">Completion Rate</span>
              <p className="text-xl font-semibold text-trend-up">98.5%</p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-page-bg/40 space-y-1">
              <span className="text-xs text-secondary-subheading">Customer Rating</span>
              <p className="text-xl font-semibold text-primary">4.9 / 5.0</p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-page-bg/40 space-y-1">
              <span className="text-xs text-secondary-subheading">Total Strikes</span>
              <p className="text-xl font-semibold text-decline">{member.strikes}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "activity" && (
        <div className="bg-card-bg rounded-xl border border-border p-6 shadow-2xs space-y-4">
          <h2 className="text-base sm:text-lg font-medium text-primary-heading font-barlow-condensed border-b border-border pb-3">
            All Activity Log
          </h2>
          <div className="space-y-3">
            {[
              { title: "Started Travel", desc: `${member.name} started travel for #JOB12458`, time: "4 minutes ago", color: "bg-info" },
              { title: "Last Logged In", desc: `${member.crewId} logged in from mobile portal`, time: "1 hour ago", color: "bg-flagged-amber" },
              { title: "Job Assigned", desc: `Assigned to ${member.name} by Operations Team`, time: "1 hour ago", color: "bg-trend-up" },
              { title: "Profile Verified", desc: "Orientation completed and profile verified", time: "Oct 24, 2026", color: "bg-info" },
            ].map((act, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-page-bg/30 transition-colors">
                <span className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${act.color}`} />
                <div className="flex-1 space-y-0.5">
                  <p className="text-xs sm:text-sm font-medium text-primary-heading">{act.title}</p>
                  <p className="text-[11px] sm:text-xs text-secondary-subheading">{act.desc}</p>
                </div>
                <span className="text-[11px] text-secondary-subheading shrink-0">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Set Hourly Rate Modal (Screenshot 4) */}
      <SetHourlyRateModal
        isOpen={isHourlyRateModalOpen}
        onClose={() => setIsHourlyRateModalOpen(false)}
        currentRate={member.hourlyRate}
        currentFrequency={member.frequency}
        onSave={handleSaveHourlyRate}
      />

      {/* Suspend Member Modal (Screenshot 5) */}
      <SuspendMemberModal
        member={member}
        isOpen={isSuspendModalOpen}
        onClose={() => setIsSuspendModalOpen(false)}
        onConfirm={handleConfirmSuspend}
      />
    </div>
  );
};

export default CrewMemberDetailsView;

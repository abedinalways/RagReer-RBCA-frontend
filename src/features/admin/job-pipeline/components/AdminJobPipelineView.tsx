"use client";

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import { ReusableTable } from "@/components/reusable/ReusableTable";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { JobPipelineItem } from "../types/jobPipelineTypes";
import {
  INITIAL_JOB_PIPELINE_DATA,
  INITIAL_JOB_PIPELINE_KPIS,
  FILTER_SERVICES,
  FILTER_SERVICE_TYPES,
  FILTER_STATUSES,
  FILTER_DATE_RANGES,
} from "../data/jobPipelineData";
import { JobPipelineStats } from "./JobPipelineStats";
import { createJobPipelineColumns } from "./JobPipelineColumns";
import { JobPipelineEmptyState } from "./JobPipelineEmptyState";

export const AdminJobPipelineView: React.FC = () => {
  const [jobs, setJobs] = useState<JobPipelineItem[]>(INITIAL_JOB_PIPELINE_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState("All Service");
  const [selectedServiceType, setSelectedServiceType] = useState("All Service types");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedDateRange, setSelectedDateRange] = useState("Today");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const handleActionClick = (actionKey: string, job: JobPipelineItem) => {
    switch (actionKey) {
      case "view_details":
        toast(`Viewing details for ${job.jobId}`, { icon: "📋" });
        break;
      case "edit_crew_equipment":
        toast(`Opening Crew & Equipment for ${job.jobId}`, { icon: "🛠️" });
        break;
      case "mark_as_complete":
        setJobs((prev) =>
          prev.map((j) =>
            j.id === job.id ? { ...j, status: "Completed", taskCompleted: "5/5" } : j
          )
        );
        toast.success(`Job ${job.jobId} marked as completed!`);
        break;
      case "review_tasks":
        toast(`Reviewing tasks for ${job.jobId}`, { icon: "📝" });
        break;
      case "approve_complete":
        setJobs((prev) =>
          prev.map((j) =>
            j.id === job.id ? { ...j, status: "Completed", taskCompleted: "5/5" } : j
          )
        );
        toast.success(`Job ${job.jobId} approved & completed!`);
        break;
      case "inspect_issue":
        toast(`Inspecting quality issue for ${job.jobId}`, { icon: "🔍" });
        break;
      case "reassign_crew":
        toast(`Reassigning crew for ${job.jobId}`, { icon: "👥" });
        break;
      case "view_invoice":
        toast(`Viewing invoice for ${job.jobId}`, { icon: "💳" });
        break;
      case "archive_job":
        toast(`Archived ${job.jobId}`, { icon: "📦" });
        break;
      case "send_reminder":
        toast.success(`Reminder sent to ${job.customer.email}`);
        break;
      case "download_receipt":
        toast(`Downloading receipt for ${job.jobId}`, { icon: "📄" });
        break;
      case "resume_job":
        setJobs((prev) =>
          prev.map((j) => (j.id === job.id ? { ...j, status: "In Progress" } : j))
        );
        toast.success(`Job ${job.jobId} resumed to In Progress!`);
        break;
      case "cancel_job":
        toast(`Job ${job.jobId} cancelled`, { icon: "❌" });
        break;
      default:
        toast(`Action: ${actionKey}`);
        break;
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        job.jobId.toLowerCase().includes(q) ||
        job.customer.name.toLowerCase().includes(q) ||
        job.customer.email.toLowerCase().includes(q) ||
        job.propertyAddress.toLowerCase().includes(q) ||
        job.service.toLowerCase().includes(q);

      const matchesService =
        selectedService === "All Service" || job.service.includes(selectedService);

      const matchesServiceType =
        selectedServiceType === "All Service types" ||
        job.serviceType.toLowerCase().includes(selectedServiceType.toLowerCase());

      const matchesStatus =
        selectedStatus === "All Status" || job.status === selectedStatus;

      const matchesDate =
        selectedDateRange === "All Time" ||
        selectedDateRange === "Today" ||
        job.dateCategory === selectedDateRange;

      return (
        matchesSearch &&
        matchesService &&
        matchesServiceType &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [
    jobs,
    searchQuery,
    selectedService,
    selectedServiceType,
    selectedStatus,
    selectedDateRange,
  ]);

  const columns = useMemo(
    () => createJobPipelineColumns(handleActionClick),
    []
  );

  return (
    <div className="w-full space-y-5 md:space-y-6 max-w-[1600px] mx-auto animate-in fade-in duration-200">
      {/* KPI Summary Cards */}
      {jobs.length > 0 && <JobPipelineStats kpis={INITIAL_JOB_PIPELINE_KPIS} />}

      {/* Main Container */}
      {jobs.length === 0 ? (
        <div className="space-y-4">
          <JobPipelineEmptyState />
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setJobs(INITIAL_JOB_PIPELINE_DATA)}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-primary hover:bg-blue-50 border border-primary/30 rounded-md transition-colors cursor-pointer"
            >
              Reset Sample Jobs
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card-bg shadow-2xs overflow-hidden">
          {/* Filter Bar matching Figma */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 p-4 sm:p-5 border-b border-border-subtle">
            <div className="flex items-center gap-3">
              <h2 className="font-barlow text-lg md:text-xl font-medium text-primary-heading leading-none">
                All Jobs
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {/* Search Box */}
              <div className="relative flex-1 sm:flex-initial min-w-[160px] sm:min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-secondary-subheading" />
                <input
                  type="text"
                  placeholder="Type to search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full h-9 rounded-md border border-border bg-page-bg/50 pl-8.5 pr-3 text-xs sm:text-sm text-txt-primary placeholder:text-secondary-subheading/60 focus:border-primary focus:bg-card-bg focus:outline-hidden transition-all font-normal"
                />
              </div>

              {/* Service Dropdown */}
              <div className="w-full sm:w-40 md:w-44">
                <CustomSelect
                  value={selectedService}
                  onChange={(val) => {
                    setSelectedService(val);
                    setCurrentPage(1);
                  }}
                  options={FILTER_SERVICES}
                  size="sm"
                  align="right"
                />
              </div>

              {/* Service Type Dropdown */}
              <div className="w-full sm:w-40 md:w-44">
                <CustomSelect
                  value={selectedServiceType}
                  onChange={(val) => {
                    setSelectedServiceType(val);
                    setCurrentPage(1);
                  }}
                  options={FILTER_SERVICE_TYPES}
                  size="sm"
                  align="right"
                />
              </div>

              {/* Status Dropdown */}
              <div className="w-full sm:w-36">
                <CustomSelect
                  value={selectedStatus}
                  onChange={(val) => {
                    setSelectedStatus(val);
                    setCurrentPage(1);
                  }}
                  options={FILTER_STATUSES as string[]}
                  size="sm"
                  align="right"
                />
              </div>

              {/* Date Filter Dropdown */}
              <div className="w-full sm:w-32">
                <CustomSelect
                  value={selectedDateRange}
                  onChange={(val) => {
                    setSelectedDateRange(val);
                    setCurrentPage(1);
                  }}
                  options={FILTER_DATE_RANGES}
                  size="sm"
                  align="right"
                />
              </div>
            </div>
          </div>

          {/* Table Integration via ReusableTable */}
          <ReusableTable
            data={filteredJobs}
            columns={columns}
            keyExtractor={(item) => item.id}
            emptyMessage="No jobs found matching your filters."
            pagination={{
              currentPage,
              itemsPerPage,
              onPageChange: setCurrentPage,
              onItemsPerPageChange: (newSize) => {
                setItemsPerPage(newSize);
                setCurrentPage(1);
              },
              pageSizeOptions: [10, 25, 50],
            }}
          />
        </div>
      )}
    </div>
  );
};

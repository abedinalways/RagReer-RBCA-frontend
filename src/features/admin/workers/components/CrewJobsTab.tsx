"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Search, Briefcase } from "lucide-react";
import toast from "react-hot-toast";
import { ReusableTable } from "@/components/reusable/ReusableTable";
import { ColumnDef } from "@/features/customer/invoices/types/invoicesTypes";
import { CustomSelect } from "@/components/ui/CustomSelect";
import {
  CrewMemberItem,
  CrewAssignedJob,
  CrewJobStatus,
} from "../types/crewMembers.types";
import { mockCrewAssignedJobs } from "../data/crewMembersData";
import { CrewJobActionMenu } from "./CrewJobActionMenu";
import { CrewJobDetailsModal } from "./CrewJobDetailsModal";
import { ReassignCrewModal } from "./ReassignCrewModal";

interface CrewJobsTabProps {
  member: CrewMemberItem;
}

export const CrewJobsTab: React.FC<CrewJobsTabProps> = ({ member }) => {
  // If member activeJobs is explicitly 0 and member is not Mason Carter, show empty state (Screenshot 4)
  const isInitiallyEmpty = member.activeJobs === 0 && member.id !== "CRW-123";

  const [jobs, setJobs] = useState<CrewAssignedJob[]>(
    isInitiallyEmpty ? [] : mockCrewAssignedJobs
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedRole, setSelectedRole] = useState<string>("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const [selectedJobForDetails, setSelectedJobForDetails] = useState<CrewAssignedJob | null>(null);
  const [selectedJobForReassign, setSelectedJobForReassign] = useState<CrewAssignedJob | null>(null);

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.jobCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.service.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "All" || job.status === selectedStatus;

      const matchesRole =
        selectedRole === "All" || job.role === selectedRole;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [jobs, searchQuery, selectedStatus, selectedRole]);

  const handleConfirmReassign = (
    jobId: string,
    newCrewName: string,
    newRole: "Leader" | "Member"
  ) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, role: newRole } : j))
    );
    toast.success(`Job #${jobId} reassigned to ${newCrewName} as ${newRole}!`);
  };

  const getStatusBadge = (status: CrewJobStatus) => {
    switch (status) {
      case "In Progress":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-nav-bg text-info border border-blue-100">
            <span className="w-1.5 h-1.5 rounded-full bg-info" />
            In Progress
          </span>
        );
      case "Scheduled":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-nav-bg text-info border border-blue-100">
            <span className="w-1.5 h-1.5 rounded-full bg-info" />
            Scheduled
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-badge-active-bg text-badge-active-text border border-badge-active-border">
            <span className="w-1.5 h-1.5 rounded-full bg-badge-active-dot" />
            Completed
          </span>
        );
      case "Pending Review":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-flagged-amber" />
            Pending Review
          </span>
        );
      case "Revision Requested":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-apt-cancelled-bg text-decline border border-decline-border">
            <span className="w-1.5 h-1.5 rounded-full bg-decline" />
            Revision Requested
          </span>
        );
      default:
        return null;
    }
  };

  const columns: ColumnDef<CrewAssignedJob>[] = [
    {
      header: "Job ID",
      cell: (row) => (
        <button
          type="button"
          onClick={() => setSelectedJobForDetails(row)}
          className="text-primary hover:underline font-medium text-xs sm:text-sm cursor-pointer whitespace-nowrap"
        >
          {row.jobCode}
        </button>
      ),
    },
    {
      header: "Date & Time",
      cell: (row) => (
        <div className="leading-tight">
          <p className="text-xs sm:text-sm text-primary-heading font-medium">
            {row.date}
          </p>
          <p className="text-[11px] text-secondary-subheading">
            {row.time}
          </p>
        </div>
      ),
    },
    {
      header: "Customer Name",
      cell: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-border">
            <Image
              src={row.customerAvatar}
              alt={row.customerName}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 leading-tight">
            <p className="text-xs sm:text-sm font-medium text-primary-heading truncate">
              {row.customerName}
            </p>
            <p className="text-[11px] text-secondary-subheading truncate">
              {row.customerEmail}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Property Address",
      cell: (row) => (
        <span className="text-xs sm:text-sm text-secondary-subheading font-medium">
          {row.propertyAddress}
        </span>
      ),
    },
    {
      header: "Service",
      cell: (row) => (
        <span className="text-xs sm:text-sm text-secondary-subheading font-medium">
          {row.service}
        </span>
      ),
    },
    {
      header: "Role",
      cell: (row) => (
        <span className="inline-flex items-center justify-center px-3 py-1 rounded text-xs font-medium border border-badge-active-border bg-badge-active-bg text-badge-active-text min-w-16">
          {row.role}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (row) => getStatusBadge(row.status),
    },
    {
      header: "Action",
      className: "text-center w-14",
      cell: (row) => (
        <CrewJobActionMenu
          job={row}
          onViewDetails={(job) => setSelectedJobForDetails(job)}
          onReassignCrew={(job) => setSelectedJobForReassign(job)}
        />
      ),
    },
  ];

  // 1. Empty State (Screenshot 4)
  if (jobs.length === 0) {
    return (
      <div className="bg-card-bg rounded-xl border border-border p-6 shadow-2xs space-y-6">
        <h2 className="text-base sm:text-lg font-medium text-primary-heading font-barlow-condensed border-b border-border pb-3">
          Jobs
        </h2>

        <div className="w-full flex items-center justify-center min-h-[380px] p-4">
          <div className="text-center space-y-3.5 max-w-sm">
            {/* Soft Circular Icon Container */}
            <div className="mx-auto w-14 h-14 rounded-full bg-nav-bg flex items-center justify-center text-primary shadow-2xs">
              <Briefcase className="w-7 h-7 text-primary" strokeWidth={1.75} />
            </div>

            {/* Heading & Subtitle */}
            <div className="space-y-1">
              <h3 className="text-xl font-medium text-primary-heading font-barlow-condensed">
                No Job Found
              </h3>
              <p className="text-xs sm:text-sm text-secondary-subheading leading-relaxed">
                The member is not assigned in any job yet
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. All Assigned Jobs Table View (Screenshot 1)
  return (
    <div className="bg-card-bg rounded-xl border border-border shadow-2xs overflow-hidden">
      {/* Top Header Filter Bar */}
      <div className="p-4 sm:p-5 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-base sm:text-lg font-medium text-primary-heading font-barlow-condensed">
          All Assigned Jobs
        </h2>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-secondary-subheading absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search customers"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs sm:text-sm border border-border rounded-md bg-card-bg text-primary-heading placeholder:text-secondary-subheading/60 focus:outline-none focus:border-primary w-44 sm:w-52"
            />
          </div>

          {/* Status Dropdown Filter */}
          <div className="w-28 sm:w-32">
            <CustomSelect
              value={selectedStatus}
              onChange={(val) => {
                setSelectedStatus(val);
                setCurrentPage(1);
              }}
              options={[
                { value: "All", label: "Status" },
                { value: "In Progress", label: "In Progress" },
                { value: "Scheduled", label: "Scheduled" },
                { value: "Completed", label: "Completed" },
                { value: "Pending Review", label: "Pending Review" },
                { value: "Revision Requested", label: "Revision Requested" },
              ]}
              size="sm"
              align="left"
              dropdownClassName="min-w-full w-44"
              triggerClassName="h-9 px-3 text-xs sm:text-sm font-medium text-secondary-subheading"
            />
          </div>

          {/* Role Dropdown Filter */}
          <div className="w-28 sm:w-32">
            <CustomSelect
              value={selectedRole}
              onChange={(val) => {
                setSelectedRole(val);
                setCurrentPage(1);
              }}
              options={[
                { value: "All", label: "All Role" },
                { value: "Leader", label: "Leader" },
                { value: "Member", label: "Member" },
              ]}
              size="sm"
              align="left"
              dropdownClassName="min-w-full w-36"
              triggerClassName="h-9 px-3 text-xs sm:text-sm font-medium text-secondary-subheading"
            />
          </div>
        </div>
      </div>

      {/* Reusable Table with Pagination */}
      <ReusableTable
        data={filteredJobs}
        columns={columns}
        keyExtractor={(item) => item.id}
        emptyMessage="No assigned jobs found matching your filter."
        pagination={{
          currentPage,
          itemsPerPage,
          onPageChange: setCurrentPage,
          onItemsPerPageChange: (items) => {
            setItemsPerPage(items);
            setCurrentPage(1);
          },
          pageSizeOptions: [10, 25, 50],
        }}
      />

      {/* View Job Details Modal */}
      <CrewJobDetailsModal
        job={selectedJobForDetails}
        isOpen={Boolean(selectedJobForDetails)}
        onClose={() => setSelectedJobForDetails(null)}
      />

      {/* Reassign Crew Modal */}
      <ReassignCrewModal
        job={selectedJobForReassign}
        isOpen={Boolean(selectedJobForReassign)}
        onClose={() => setSelectedJobForReassign(null)}
        onConfirmReassign={handleConfirmReassign}
      />
    </div>
  );
};

export default CrewJobsTab;

import React from "react";
import { ColumnDef } from "@/features/customer/invoices/types/invoicesTypes";
import { JobPipelineItem } from "../types/jobPipelineTypes";
import { JOB_STATUS_STYLES } from "../data/jobPipelineData";
import { JobPipelineActionMenu } from "./JobPipelineActionMenu";

export const createJobPipelineColumns = (
  onActionClick: (actionKey: string, job: JobPipelineItem) => void
): ColumnDef<JobPipelineItem>[] => [
  {
    header: "Job ID",
    accessorKey: "jobId",
    cell: (row) => (
      <button
        type="button"
        onClick={() => onActionClick("view_details", row)}
        className="text-primary hover:underline font-medium text-xs md:text-sm cursor-pointer whitespace-nowrap"
      >
        {row.jobId}
      </button>
    ),
  },
  {
    header: "Customer",
    cell: (row) => (
      <div className="flex items-center gap-2.5 min-w-[170px]">
        <img
          src={row.customer.avatar}
          alt={row.customer.name}
          className="h-8 w-8 rounded-full object-cover border border-border shrink-0"
        />
        <div className="flex flex-col min-w-0">
          <span className="font-medium text-txt-primary text-xs md:text-sm truncate">
            {row.customer.name}
          </span>
          <span className="text-secondary-subheading text-xs truncate">
            {row.customer.email}
          </span>
        </div>
      </div>
    ),
  },
  {
    header: "Property Address",
    accessorKey: "propertyAddress",
    cell: (row) => (
      <span className="text-txt-primary text-xs sm:text-sm whitespace-nowrap">
        {row.propertyAddress}
      </span>
    ),
  },
  {
    header: "Service",
    cell: (row) => (
      <div className="flex flex-col min-w-[180px]">
        <span className="font-medium text-txt-primary text-xs sm:text-sm truncate">
          {row.service}
        </span>
        <span className="text-secondary-subheading text-xs">
          {row.serviceType}
        </span>
      </div>
    ),
  },
  {
    header: "Assigned Crew",
    cell: (row) => (
      <div className="flex items-center -space-x-1.5 min-w-[70px]">
        {row.assignedCrew.map((member, i) => (
          <img
            key={member.id || i}
            src={member.avatar}
            alt={member.name}
            title={member.name}
            className="h-6 w-6 rounded-full object-cover ring-1.5 ring-card-bg border border-border/40 shrink-0"
          />
        ))}
      </div>
    ),
  },
  {
    header: "Task Completed",
    accessorKey: "taskCompleted",
    cell: (row) => (
      <span className="text-secondary-subheading  text-xs md:text-sm whitespace-nowrap">
        {row.taskCompleted}
      </span>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (row) => {
      const style = JOB_STATUS_STYLES[row.status] || {
        badgeBg: "bg-page-bg",
        badgeText: "text-secondary-subheading",
        badgeBorder: "border-border",
        dotBg: "bg-secondary-subheading",
        label: row.status,
      };
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-xs font-medium ${style.badgeBg} ${style.badgeText} border ${style.badgeBorder} whitespace-nowrap`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${style.dotBg}`} />
          {style.label}
        </span>
      );
    },
  },
  {
    header: "Action",
    className: "text-right",
    headerClassName: "text-right",
    cell: (row) => (
      <div className="flex justify-end">
        <JobPipelineActionMenu job={row} onActionClick={onActionClick} />
      </div>
    ),
  },
];

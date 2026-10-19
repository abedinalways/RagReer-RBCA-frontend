"use client";

import React from "react";
import { JobTimeTrackingRow } from "../../types/jobDetailsTypes";

interface JobTimeTrackingTabProps {
  data: JobTimeTrackingRow[];
}

export const JobTimeTrackingTab: React.FC<JobTimeTrackingTabProps> = ({ data }) => {
  const renderStatus = (status: string) => {
    if (status === "In Progress") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-xs font-medium bg-blue-50 text-info border border-blue-100 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-info" />
          In Progress
        </span>
      );
    }
    if (status === "Break") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-xs font-medium bg-terms-bg text-badge-pending-text border border-terms-border whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-badge-pending-dot" />
          Break
        </span>
      );
    }
    if (status === "Hold" || status === "On Hold") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-xs font-medium bg-terms-bg text-flagged-amber border border-flagged-amber/50 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-flagged-amber" />
          Hold
        </span>
      );
    }
    if (status === "Completed") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-xs font-medium bg-badge-active-bg text-badge-active-text border border-badge-active-border whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-badge-active-dot" />
          Completed
        </span>
      );
    }
    return <span className="text-secondary-subheading font-normal">{status}</span>;
  };

  return (
    <div className="w-full rounded-xl border border-border bg-card-bg shadow-2xs overflow-hidden animate-in fade-in duration-150">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs md:text-sm">
          <thead>
            <tr className="bg-page-bg/70 border-b border-border text-secondary-subheading font-medium whitespace-nowrap">
              <th className="py-3 px-4">Team Member</th>
              <th className="py-3 px-4 text-center">Travel Start</th>
              <th className="py-3 px-4 text-center">Arrived</th>
              <th className="py-3 px-4 text-center">Work Start</th>
              <th className="py-3 px-4 text-center">Break Time</th>
              <th className="py-3 px-4 text-center">Work Stop</th>
              <th className="py-3 px-4 text-center">Current Status</th>
              <th className="py-3 px-4 text-center">Total Time</th>
              <th className="py-3 px-4 text-right">Billable Hours</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle bg-card-bg">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-page-bg/40 transition-colors">
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-2.5 min-w-[150px]">
                    <img
                      src={row.avatar}
                      alt={row.name}
                      className="h-8 w-8 rounded-full object-cover border border-border shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium text-txt-primary truncate">
                        {row.name}
                      </span>
                      <span className="text-[11px] md:text-xs text-secondary-subheading font-normal">
                        {row.role}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-center text-secondary-subheading whitespace-nowrap font-normal">
                  {row.travelStart}
                </td>
                <td className="py-3 px-4 text-center text-secondary-subheading whitespace-nowrap font-normal">
                  {row.arrived}
                </td>
                <td className="py-3 px-4 text-center text-secondary-subheading whitespace-nowrap font-normal">
                  {row.workStart}
                </td>
                <td className="py-3 px-4 text-center text-secondary-subheading whitespace-nowrap font-normal">
                  {row.breakTime}
                </td>
                <td className="py-3 px-4 text-center text-secondary-subheading whitespace-nowrap font-normal">
                  {row.workStop}
                </td>
                <td className="py-3 px-4 text-center whitespace-nowrap">
                  {renderStatus(row.currentStatus)}
                </td>
                <td className="py-3 px-4 text-center text-secondary-subheading whitespace-nowrap font-normal">
                  {row.totalTime}
                </td>
                <td
                  className={`py-3 px-4 text-right whitespace-nowrap ${
                    row.billableHours === "-"
                      ? "text-secondary-subheading font-normal"
                      : "font-medium text-txt-primary"
                  }`}
                >
                  {row.billableHours}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

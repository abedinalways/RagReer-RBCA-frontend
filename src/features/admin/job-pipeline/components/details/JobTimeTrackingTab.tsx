"use client";

import React from "react";
import { JobTimeTrackingRow } from "../../types/jobDetailsTypes";

interface JobTimeTrackingTabProps {
  data: JobTimeTrackingRow[];
}

export const JobTimeTrackingTab: React.FC<JobTimeTrackingTabProps> = ({ data }) => {
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
                      <span className="text-[11px] md:text-xs text-secondary-subheading">
                        {row.role}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-center text-secondary-subheading whitespace-nowrap">
                  {row.travelStart}
                </td>
                <td className="py-3 px-4 text-center text-secondary-subheading whitespace-nowrap">
                  {row.arrived}
                </td>
                <td className="py-3 px-4 text-center text-secondary-subheading whitespace-nowrap">
                  {row.workStart}
                </td>
                <td className="py-3 px-4 text-center text-secondary-subheading whitespace-nowrap">
                  {row.breakTime}
                </td>
                <td className="py-3 px-4 text-center text-secondary-subheading whitespace-nowrap">
                  {row.workStop}
                </td>
                <td className="py-3 px-4 text-center text-secondary-subheading whitespace-nowrap">
                  {row.currentStatus}
                </td>
                <td className="py-3 px-4 text-center text-secondary-subheading whitespace-nowrap">
                  {row.totalTime}
                </td>
                <td className="py-3 px-4 text-right font-medium text-txt-primary whitespace-nowrap">
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

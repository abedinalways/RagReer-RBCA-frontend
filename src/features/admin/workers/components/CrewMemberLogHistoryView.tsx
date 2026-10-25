"use client";

import React, { useState } from "react";
import { ChevronRight, Trash2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { CrewMemberItem, CrewMemberLogItem } from "../types/crewMembers.types";
import { mockCrewLogs } from "../data/crewMembersData";

interface CrewMemberLogHistoryViewProps {
  member: CrewMemberItem;
  onBack: () => void;
}

export const CrewMemberLogHistoryView: React.FC<CrewMemberLogHistoryViewProps> = ({
  member,
  onBack,
}) => {
  const [logs, setLogs] = useState<CrewMemberLogItem[]>(
    mockCrewLogs[member.id] || [
      {
        id: "LOG-INIT",
        action: "Profile Created",
        performedBy: "System Administrator",
        timestamp: member.dateJoined || "Oct 20, 2026 09:00 AM",
        details: `Crew member ${member.name} registered as ${member.role}.`,
        category: "general",
      },
      {
        id: "LOG-STATUS",
        action: `Status set to ${member.status}`,
        performedBy: "Operations Team",
        timestamp: "Oct 22, 2026 11:30 AM",
        details: `Active assignments: ${member.jobsThisMonth}. Strikes recorded: ${member.strikes}.`,
        category: "status_change",
      },
    ]
  );

  const handleDeleteLog = (logId: string) => {
    setLogs((prev) => prev.filter((l) => l.id !== logId));
    toast.success("Log record removed");
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-secondary-subheading">
        <button
          type="button"
          onClick={onBack}
          className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Crew Members</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-secondary-subheading/60" />
        <span className="text-primary-heading font-medium">{member.name} Log History</span>
      </div>

      {/* Main Container Card */}
      <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-6 shadow-2xs space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border gap-2">
          <div>
            <h2 className="text-xl font-medium text-primary-heading font-barlow-condensed">
              Log History: {member.name} ({member.crewId})
            </h2>
            <p className="text-xs text-secondary-subheading">
              Chronological log of activities, status updates, and task completions.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-badge-active-bg text-badge-active-text border border-badge-active-border w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-badge-active-dot" />
            {member.status}
          </span>
        </div>

        {/* Logs Table / List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-page-bg border-b border-border text-secondary-subheading">
                <th className="py-2.5 px-4 font-medium">Action</th>
                <th className="py-2.5 px-4 font-medium">Performed By</th>
                <th className="py-2.5 px-4 font-medium">Timestamp</th>
                <th className="py-2.5 px-4 font-medium">Details</th>
                <th className="py-2.5 px-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-page-bg/60 transition-colors">
                  <td className="py-3 px-4 font-medium text-primary-heading">
                    {log.action}
                  </td>
                  <td className="py-3 px-4 text-secondary-subheading">
                    {log.performedBy}
                  </td>
                  <td className="py-3 px-4 text-secondary-subheading">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-4 text-txt-primary">
                    {log.details}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleDeleteLog(log.id)}
                      className="p-1.5 text-secondary-subheading hover:text-decline rounded hover:bg-page-bg transition-colors cursor-pointer"
                      title="Delete log"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-secondary-subheading">
                    No logs found for this crew member.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CrewMemberLogHistoryView;

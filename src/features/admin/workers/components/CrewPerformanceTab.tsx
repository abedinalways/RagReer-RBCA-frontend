"use client";

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { CustomSelect } from "@/components/ui/CustomSelect";
import {
  CrewMemberItem,
  CrewQualityHistoryItem,
  CrewAssignedJob,
} from "../types/crewMembers.types";
import {
  mockCrewQualityHistoryList,
  mockCrewAssignedJobs,
} from "../data/crewMembersData";
import { CrewJobDetailsModal } from "./CrewJobDetailsModal";

interface CrewPerformanceTabProps {
  member: CrewMemberItem;
}

const RESOLUTION_OPTIONS = [
  { value: "All", label: "All Resolution" },
  { value: "10% Discount Applied", label: "10% Discount Applied" },
  { value: "Active", label: "Active" },
  { value: "Resolved", label: "Resolved" },
];

export const CrewPerformanceTab: React.FC<CrewPerformanceTabProps> = ({
  member,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResolution, setSelectedResolution] = useState("All");
  const [selectedJobForDetails, setSelectedJobForDetails] = useState<CrewAssignedJob | null>(null);

  const filteredHistory = useMemo(() => {
    return mockCrewQualityHistoryList.filter((item) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.jobId.toLowerCase().includes(q) ||
        item.propertyAddress.toLowerCase().includes(q) ||
        item.issue.toLowerCase().includes(q) ||
        item.resolution.toLowerCase().includes(q) ||
        item.date.toLowerCase().includes(q);

      const matchesResolution =
        selectedResolution === "All" ||
        item.resolution === selectedResolution ||
        item.status === selectedResolution;

      return matchesSearch && matchesResolution;
    });
  }, [searchQuery, selectedResolution]);

  const handleOpenJobDetails = (jobCode: string) => {
    const cleanCode = jobCode.replace("#", "");
    const existing = mockCrewAssignedJobs.find(
      (j) => j.jobCode.replace("#", "") === cleanCode
    );

    if (existing) {
      setSelectedJobForDetails(existing);
    } else {
      setSelectedJobForDetails({
        id: cleanCode,
        jobCode: jobCode,
        date: "05 Aug, 2026",
        time: "08:40 AM - 04:00 PM",
        customerName: "Alex Morgan",
        customerEmail: "alexmorgan@gmail.com",
        customerAvatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
        propertyAddress: "987 Willow Street",
        service: "Residential Lawn Care",
        role: "Leader",
        status: "Completed",
      });
    }
  };

  const strikeCount = member.strikes > 0 ? member.strikes : 2;

  return (
    <div className="bg-card-bg rounded-xl border border-border shadow-2xs overflow-hidden">
      {/* Top Filter Bar */}
      <div className="p-4 sm:p-5 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-base sm:text-lg font-medium text-primary-heading font-barlow-condensed">
          Quality History - Strike Counting {strikeCount}
        </h2>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Job */}
          <div className="relative">
            <Search className="w-4 h-4 text-secondary-subheading absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search job"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs sm:text-sm border border-border rounded-md bg-card-bg text-primary-heading placeholder:text-secondary-subheading/60 focus:outline-none focus:border-primary w-44 sm:w-52"
            />
          </div>

          {/* Resolution Dropdown */}
          <div className="w-40 sm:w-44">
            <CustomSelect
              value={selectedResolution}
              onChange={(val) => setSelectedResolution(val)}
              options={RESOLUTION_OPTIONS}
              size="sm"
              triggerClassName="h-[34px] px-3 text-xs sm:text-sm border-border-input"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-page-bg/40">
              <th className="py-3 px-4 sm:px-6 text-xs sm:text-sm font-medium text-secondary-subheading">
                Date
              </th>
              <th className="py-3 px-4 sm:px-6 text-xs sm:text-sm font-medium text-secondary-subheading">
                Job ID
              </th>
              <th className="py-3 px-4 sm:px-6 text-xs sm:text-sm font-medium text-secondary-subheading">
                Property Address
              </th>
              <th className="py-3 px-4 sm:px-6 text-xs sm:text-sm font-medium text-secondary-subheading">
                Issue
              </th>
              <th className="py-3 px-4 sm:px-6 text-xs sm:text-sm font-medium text-secondary-subheading">
                Resolution
              </th>
              <th className="py-3 px-4 sm:px-6 text-xs sm:text-sm font-medium text-secondary-subheading">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70">
            {filteredHistory.length > 0 ? (
              filteredHistory.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-page-bg/30 transition-colors"
                >
                  <td className="py-3.5 px-4 sm:px-6 text-xs sm:text-sm text-secondary-subheading font-medium">
                    {row.date}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-xs sm:text-sm font-medium">
                    <button
                      type="button"
                      onClick={() => handleOpenJobDetails(row.jobId)}
                      className="text-primary hover:underline cursor-pointer focus:outline-hidden"
                    >
                      {row.jobId}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-xs sm:text-sm text-secondary-subheading font-medium">
                    {row.propertyAddress}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-xs sm:text-sm text-secondary-subheading font-medium">
                    {row.issue}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-xs sm:text-sm text-secondary-subheading font-medium">
                    {row.resolution}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-xs sm:text-sm font-medium">
                    {row.status === "Active" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-nav-bg text-info border border-blue-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-info" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-badge-active-bg text-badge-active-text border border-badge-active-border">
                        <span className="w-1.5 h-1.5 rounded-full bg-badge-active-dot" />
                        Resolved
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-xs sm:text-sm text-secondary-subheading"
                >
                  No quality history records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Job Details Modal */}
      <CrewJobDetailsModal
        job={selectedJobForDetails}
        isOpen={Boolean(selectedJobForDetails)}
        onClose={() => setSelectedJobForDetails(null)}
      />
    </div>
  );
};

export default CrewPerformanceTab;

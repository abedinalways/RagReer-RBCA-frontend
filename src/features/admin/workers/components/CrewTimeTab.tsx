"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Search, ChevronDown, ChevronUp, Download } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import {
  CrewMemberItem,
  CrewTimeBreakdownItem,
  CrewAssignedJob,
} from "../types/crewMembers.types";
import {
  mockCrewTimeBreakdownList,
  mockCrewAssignedJobs,
} from "../data/crewMembersData";
import TotalHourIcon from "@/components/icons/admin/TotalHourIcon";
import WorkedIcon from "@/components/icons/admin/WorkedIcon";
import TokenIcon from "@/components/icons/admin/TokenIcon";
import RateIcon from "@/components/icons/admin/RateIcon";
import { CrewJobDetailsModal } from "./CrewJobDetailsModal";

interface CrewTimeTabProps {
  member: CrewMemberItem;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTH_ABBRS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const CrewTimeTab: React.FC<CrewTimeTabProps> = ({ member }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(7); // 7 = August (0-indexed)
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
  const [selectedJobForDetails, setSelectedJobForDetails] = useState<CrewAssignedJob | null>(null);

  const monthPickerRef = useRef<HTMLDivElement>(null);

  // Close month picker popover on outside click or escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        monthPickerRef.current &&
        !monthPickerRef.current.contains(e.target as Node)
      ) {
        setIsMonthPickerOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMonthPickerOpen(false);
      }
    };

    if (isMonthPickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMonthPickerOpen]);

  // Check if member has 0 worked hours (Empty State - Screenshot 3)
  const hasNoWorkHistory =
    member.workedThisMonth === "00h 00m" ||
    member.workedThisMonth === "0h" ||
    (member.activeJobs === 0 && member.workedThisMonth === "00h 00m");

  // Filter records
  const filteredRecords = useMemo(() => {
    return mockCrewTimeBreakdownList.filter((item) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        item.jobId.toLowerCase().includes(q) ||
        item.date.toLowerCase().includes(q) ||
        item.workStart.toLowerCase().includes(q) ||
        item.workStop.toLowerCase().includes(q) ||
        item.breakTime.toLowerCase().includes(q) ||
        item.totalTime.toLowerCase().includes(q) ||
        item.billableHours.toLowerCase().includes(q);

      // Check month match: Aug 2026
      const monthAbbr = MONTH_ABBRS[selectedMonthIndex];
      const matchesMonth =
        item.date.includes(monthAbbr) &&
        item.date.includes(selectedYear.toString());

      return matchesSearch && matchesMonth;
    });
  }, [searchQuery, selectedMonthIndex, selectedYear]);

  const handleExportPDF = () => {
    toast.success(
      `Timesheet exported as PDF for ${MONTH_NAMES[selectedMonthIndex]} ${selectedYear}!`
    );
  };

  const handleOpenJobDetails = (jobCode: string) => {
    // Find matching job or create mockup
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
        propertyAddress: "789 Pine Avenue",
        service: "Residential Lawn Care",
        role: "Leader",
        status: "Completed",
      });
    }
  };

  // 1. Empty State (Screenshot 3)
  if (hasNoWorkHistory) {
    return (
      <div className="bg-card-bg rounded-xl border border-border p-6 shadow-2xs space-y-6">
        <h2 className="text-base sm:text-lg font-medium text-primary-heading font-barlow-condensed border-b border-border pb-3">
          Time
        </h2>

        <div className="w-full flex items-center justify-center min-h-[380px] p-4">
          <div className="text-center space-y-3.5 max-w-sm">
            {/* Soft Circular Icon Container */}
            <div className="mx-auto w-14 h-14 rounded-full bg-nav-bg flex items-center justify-center text-primary shadow-2xs">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-primary"
              >
                <path
                  d="M18 11.5V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h6"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                />
                <path
                  d="M18 15.5v2.5l1.5 1"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 8h5M9 12h3"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Heading & Subtitle */}
            <div className="space-y-1">
              <h3 className="text-xl font-medium text-primary-heading font-barlow-condensed">
                No Work Time Found
              </h3>
              <p className="text-xs sm:text-sm text-secondary-subheading leading-relaxed">
                Once the member assigned in any job his work time will appear here
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Active Timesheet View (Screenshots 1 & 2)
  return (
    <div className="bg-card-bg rounded-xl border border-border shadow-2xs overflow-hidden">
      {/* Top Filter Bar */}
      <div className="p-4 sm:p-5 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-base sm:text-lg font-medium text-primary-heading font-barlow-condensed">
          Time Breakdown
        </h2>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Job Input */}
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

          {/* Month & Year Picker Dropdown (Screenshot 2) */}
          <div className="relative" ref={monthPickerRef}>
            <button
              type="button"
              onClick={() => setIsMonthPickerOpen((prev) => !prev)}
              className={cn(
                "flex items-center justify-between h-[34px] px-3 border rounded-md bg-card-bg text-xs sm:text-sm font-medium text-primary-heading hover:border-slate-300 focus:outline-hidden select-none cursor-pointer gap-2 transition-colors",
                isMonthPickerOpen ? "border-primary ring-1 ring-primary/20" : "border-border"
              )}
            >
              <span>
                {MONTH_NAMES[selectedMonthIndex]} {selectedYear}
              </span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-secondary-subheading transition-transform duration-200 shrink-0",
                  isMonthPickerOpen && "rotate-180"
                )}
              />
            </button>

            {/* Custom Month/Year Picker Popover */}
            {isMonthPickerOpen && (
              <div className="absolute right-0 mt-1.5 z-50 w-52 sm:w-56 bg-card-bg border border-border rounded-lg shadow-xl p-3 animate-in fade-in zoom-in-95 duration-100">
                {/* Header with Year and Chevron Nav */}
                <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-border">
                  <span className="text-sm font-semibold text-primary font-barlow-condensed">
                    {selectedYear}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setSelectedYear((y) => y + 1)}
                      className="p-1 hover:bg-page-bg rounded text-secondary-subheading hover:text-primary transition-colors cursor-pointer"
                      title="Next year"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedYear((y) => y - 1)}
                      className="p-1 hover:bg-page-bg rounded text-secondary-subheading hover:text-primary transition-colors cursor-pointer"
                      title="Previous year"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 12 Months Grid */}
                <div className="grid grid-cols-4 gap-1.5">
                  {MONTH_ABBRS.map((m, idx) => {
                    const isSelected = selectedMonthIndex === idx;
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => {
                          setSelectedMonthIndex(idx);
                          setIsMonthPickerOpen(false);
                        }}
                        className={cn(
                          "py-1.5 px-1 rounded-md text-xs font-medium text-center transition-colors cursor-pointer",
                          isSelected
                            ? "bg-primary text-white shadow-2xs font-semibold"
                            : "text-secondary-subheading hover:bg-page-bg hover:text-primary-heading"
                        )}
                      >
                        {m}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Export PDF Button */}
          <button
            type="button"
            onClick={handleExportPDF}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs"
          >
            <span>Export PDF</span>
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Metric KPI Cards Row */}
      <div className="p-4 sm:p-5 border-b border-border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Total Hours */}
        <div className="bg-card-bg rounded-sm border border-border p-4 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm md:text-base font-medium text-secondary-subheading">
              Total Hours
            </span>
            <p className="text-xl sm:text-2xl font-semibold text-primary font-barlow-condensed leading-none">
              32h 10m
            </p>
          </div>
          <div className="w-10 h-10 rounded-sm bg-blue-50 text-primary flex items-center justify-center shrink-0">
            <TotalHourIcon />
          </div>
        </div>

        {/* Total Worked */}
        <div className="bg-card-bg rounded-sm border border-border p-4 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm md:text-base font-medium text-secondary-subheading">
              Total Worked
            </span>
            <p className="text-xl sm:text-2xl font-semibold text-primary font-barlow-condensed leading-none">
              30h 40m
            </p>
          </div>
          <div className="w-10 h-10 rounded-sm bg-blue-50 text-primary flex items-center justify-center shrink-0">
            <WorkedIcon />
          </div>
        </div>

        {/* Break Taken */}
        <div className="bg-card-bg rounded-sm border border-border p-4 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm md:text-base font-medium text-secondary-subheading">
              Break Taken
            </span>
            <p className="text-xl sm:text-2xl font-semibold text-primary font-barlow-condensed leading-none">
              1h 30m
            </p>
          </div>
          <div className="w-10 h-10 rounded-sm bg-blue-50 text-primary flex items-center justify-center shrink-0">
            <TokenIcon />
          </div>
        </div>

        {/* Monthly Payable */}
        <div className="bg-card-bg rounded-sm border border-border p-4 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-sm md:text-base font-medium text-secondary-subheading">
              Monthly Payable
            </span>
            <p className="text-xl sm:text-2xl font-semibold text-primary font-barlow-condensed leading-none">
              $2,500.00
            </p>
          </div>
          <div className="w-10 h-10 rounded-sm bg-blue-50 text-primary flex items-center justify-center shrink-0">
            <RateIcon />
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
                Work Start
              </th>
              <th className="py-3 px-4 sm:px-6 text-xs sm:text-sm font-medium text-secondary-subheading">
                Work Stop
              </th>
              <th className="py-3 px-4 sm:px-6 text-xs sm:text-sm font-medium text-secondary-subheading">
                Break Time
              </th>
              <th className="py-3 px-4 sm:px-6 text-xs sm:text-sm font-medium text-secondary-subheading">
                Total Time
              </th>
              <th className="py-3 px-4 sm:px-6 text-xs sm:text-sm font-medium text-secondary-subheading">
                Billable Hours
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((row) => (
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
                    {row.workStart}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-xs sm:text-sm text-secondary-subheading font-medium">
                    {row.workStop}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-xs sm:text-sm text-secondary-subheading font-medium">
                    {row.breakTime}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-xs sm:text-sm text-secondary-subheading font-medium">
                    {row.totalTime}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-xs sm:text-sm text-secondary-subheading font-medium">
                    {row.billableHours}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center text-xs sm:text-sm text-secondary-subheading"
                >
                  No timesheet records found for {MONTH_NAMES[selectedMonthIndex]} {selectedYear}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Job Details Modal */}
      <CrewJobDetailsModal
        job={selectedJobForDetails}
        isOpen={Boolean(selectedJobForDetails)}
        onClose={() => setSelectedJobForDetails(null)}
      />
    </div>
  );
};

export default CrewTimeTab;

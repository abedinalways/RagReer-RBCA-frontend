"use client";

import { useState } from "react";
import {
  Users,
  Briefcase,
  CheckCircle2,
  Clock,
  MapPin,
  RefreshCw,
  Search,
  Filter,
} from "lucide-react";
import {
  useCrewTaskTracking,
  CrewWorkStatus,
} from "@/workspaces/shared/crewTrackingStore";

export function AdminDashboardView() {
  const { crewList } = useCrewTaskTracking();
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCrews = crewList.filter((crew) => {
    const matchesFilter =
      filterStatus === "ALL" || crew.status === filterStatus;
    const matchesSearch =
      crew.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crew.assignedTask.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crew.jobAddress.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const activeOnFieldCount = crewList.filter(
    (c) => c.status !== "Work Completed"
  ).length;
  const completedCount = crewList.filter(
    (c) => c.status === "Work Completed"
  ).length;

  const getStatusBadge = (status: CrewWorkStatus) => {
    switch (status) {
      case "Traveling":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            Traveling
          </span>
        );
      case "On-site Working":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            On-site Working
          </span>
        );
      case "On Break":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            On Break
          </span>
        );
      case "Work Completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary-heading font-barlow">
            Admin Dashboard & Field Operations
          </h1>
          <p className="text-sm text-secondary-subheading mt-1">
            Real-time field task tracking, crew activity, and work status monitoring.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            Live Sync Active
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-lg border border-border bg-white p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-secondary-subheading">
            <span className="text-xs font-medium">Active on Field</span>
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl font-bold font-barlow text-primary-heading">
            {activeOnFieldCount} Crews
          </div>
          <p className="text-[11px] text-emerald-600 font-medium">Live tracking</p>
        </div>

        <div className="rounded-lg border border-border bg-white p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-secondary-subheading">
            <span className="text-xs font-medium">Tasks in Progress</span>
            <Briefcase className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl font-bold font-barlow text-primary-heading">
            {crewList.filter((c) => c.status === "On-site Working").length} Tasks
          </div>
          <p className="text-[11px] text-primary font-medium">Active field work</p>
        </div>

        <div className="rounded-lg border border-border bg-white p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-secondary-subheading">
            <span className="text-xs font-medium">Completed Today</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-barlow text-primary-heading">
            {completedCount} Tasks
          </div>
          <p className="text-[11px] text-emerald-600 font-medium">Verified submissions</p>
        </div>

        <div className="rounded-lg border border-border bg-white p-4 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-secondary-subheading">
            <span className="text-xs font-medium">Avg Working Time</span>
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl font-bold font-barlow text-primary-heading">
            01h 32m
          </div>
          <p className="text-[11px] text-secondary-subheading font-medium">On-site tracking</p>
        </div>
      </div>

      {/* Main Section: Crew Task Completion Tracking */}
      <section className="rounded-lg border border-border bg-white shadow-xs overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold font-barlow text-primary-heading">
              Crew Task Completion Tracking
            </h2>
            <p className="text-xs text-secondary-subheading">
              Updated live as crew members navigate and record their work sessions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative flex-1 sm:w-60">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search crew or task..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-[#D9DADC] bg-white pl-8 pr-3 py-1.5 text-xs text-txt-primary focus:border-primary focus:outline-hidden"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-md border border-[#D9DADC] bg-white px-2.5 py-1.5 text-xs font-medium text-secondary-subheading focus:border-primary focus:outline-hidden"
              >
                <option value="ALL">All Statuses</option>
                <option value="Traveling">Traveling</option>
                <option value="On-site Working">On-site Working</option>
                <option value="On Break">On Break</option>
                <option value="Work Completed">Work Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Crew Table List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-slate-50 text-[11px] font-semibold text-secondary-subheading uppercase tracking-wider">
                <th className="py-3 px-4">Crew Member</th>
                <th className="py-3 px-4">Assigned Task</th>
                <th className="py-3 px-4">Job Location</th>
                <th className="py-3 px-4">Current Work Status</th>
                <th className="py-3 px-4">Time Elapsed</th>
                <th className="py-3 px-4">Task Completion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-xs">
              {filteredCrews.map((crew) => (
                <tr
                  key={crew.id}
                  className="hover:bg-blue-50/30 transition-colors"
                >
                  {/* Crew Name & Avatar */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        src={crew.avatarUrl}
                        alt={crew.name}
                        className="h-9 w-9 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="font-semibold text-primary-heading">
                          {crew.name}
                        </div>
                        <span className="text-[11px] text-secondary-subheading">
                          {crew.role}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Assigned Task */}
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-txt-primary">
                      {crew.assignedTask}
                    </div>
                  </td>

                  {/* Location */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 text-secondary-subheading max-w-xs truncate">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                      <span className="truncate">{crew.jobAddress}</span>
                    </div>
                  </td>

                  {/* Current Work Status Badge */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {getStatusBadge(crew.status)}
                  </td>

                  {/* Time Elapsed */}
                  <td className="py-3.5 px-4 whitespace-nowrap font-barlow text-sm font-semibold text-primary-heading">
                    {crew.timeElapsed}
                  </td>

                  {/* Task Completion Progress */}
                  <td className="py-3.5 px-4 whitespace-nowrap min-w-[140px]">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-secondary-subheading font-medium">
                          Progress
                        </span>
                        <span className="font-bold text-primary">
                          {crew.progressPercent}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200/60">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            crew.progressPercent === 100
                              ? "bg-emerald-500"
                              : "bg-[#52799F]"
                          }`}
                          style={{ width: `${crew.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

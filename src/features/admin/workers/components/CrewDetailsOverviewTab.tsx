"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Clock,
  MapPin,
  ChevronDown,
  ChevronRight,
  PenTool,
} from "lucide-react";
import {
  CrewMemberItem,
  TodayRouteItem,
  CrewActivityItem,
  RouteAssignedMember,
} from "../types/crewMembers.types";
import {
  mockTodayRoutesList,
  mockRecentActivitiesList,
} from "../data/crewMembersData";
import { AssignedMembersPopover } from "./AssignedMembersPopover";

interface CrewDetailsOverviewTabProps {
  member: CrewMemberItem;
  onViewAllActivity?: () => void;
}

export const CrewDetailsOverviewTab: React.FC<CrewDetailsOverviewTabProps> = ({
  member,
  onViewAllActivity,
}) => {
  const [isBioOpen, setIsBioOpen] = useState(true);
  const [activePopoverRouteId, setActivePopoverRouteId] = useState<string | null>(null);

  // If activeJobs is 0 and workedThisMonth is 0, show empty activity state like Screenshot 1
  const hasActivity =
    (member.activeJobs ?? 2) > 0 ||
    member.workedThisMonth !== "00h 00m";

  const routes: TodayRouteItem[] = hasActivity ? mockTodayRoutesList : [];
  const activities: CrewActivityItem[] = hasActivity ? mockRecentActivitiesList : [];

  const getStatusBadge = (status: TodayRouteItem["status"]) => {
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
      default:
        return null;
    }
  };

  const getActivityDotClass = (color: CrewActivityItem["dotColor"]) => {
    switch (color) {
      case "blue":
        return "bg-info";
      case "amber":
        return "bg-flagged-amber";
      case "green":
        return "bg-trend-up";
      case "red":
        return "bg-decline";
      default:
        return "bg-info";
    }
  };

  return (
    <div className="space-y-6">
      {/* 2-Column Row: Left (Crew Information), Right (Today's Route OR Empty State) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Crew Information Card */}
        <div className="bg-card-bg rounded-xl border border-border p-5 sm:p-6 shadow-2xs space-y-4">
          <h2 className="text-base sm:text-lg font-medium text-primary-heading font-barlow-condensed border-b border-border pb-3">
            Crew Information
          </h2>

          <div className="space-y-3.5 text-xs sm:text-sm">
            <h3 className="text-sm font-medium text-primary-heading font-barlow-condensed">
              Personal Information
            </h3>

            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">First Name</span>
              <span className="text-primary-heading font-medium">
                {member.firstName || member.name.split(" ")[0]}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">Last Name</span>
              <span className="text-primary-heading font-medium">
                {member.lastName || member.name.split(" ").slice(1).join(" ") || "Carter"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">Profession</span>
              <span className="text-primary-heading font-medium">
                {member.profession || "#Plumber, #Electrician"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">Email Address</span>
              <span className="text-primary-heading font-medium">
                {member.email}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">Phone Number</span>
              <span className="text-primary-heading font-medium">
                {member.phone}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">Date of Birth</span>
              <span className="text-primary-heading font-medium">
                {member.dateOfBirth || "05/07/1999"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">Address</span>
              <span className="text-primary-heading font-medium text-right max-w-xs truncate">
                {member.address || "Boylston St, Building 45, Apartment 3A"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">Date Joined</span>
              <span className="text-primary-heading font-medium">
                {member.dateJoined || "27-09-2026"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">Strike Status</span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded font-medium border ${
                  member.strikes === 0
                    ? "border-badge-active-border bg-badge-active-bg text-badge-active-text"
                    : "border-amber-300 bg-amber-50 text-amber-800"
                }`}
              >
                Stricks : {member.strikes}
              </span>
            </div>

            {/* Collapsible Bio */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsBioOpen((prev) => !prev)}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary-heading hover:text-primary transition-colors cursor-pointer select-none"
              >
                <span
                  className={`text-primary transition-transform duration-200 text-[10px] ${
                    isBioOpen ? "rotate-90" : ""
                  }`}
                >
                  ▶
                </span>
                <span>Bio</span>
              </button>

              {isBioOpen && (
                <div className="mt-2.5 p-3.5 rounded-lg border border-border/80 bg-page-bg/40 text-xs sm:text-sm text-secondary-subheading leading-relaxed animate-in fade-in duration-150">
                  {member.bio ||
                    "Skilled Plumber & Electrician with hands-on experience in plumbing repairs, electrical installations, maintenance, and troubleshooting. Committed to delivering reliable, safe, and high-quality workmanship on every job."}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Today's Route OR Empty Recent Activity */}
        {hasActivity ? (
          <div className="bg-card-bg rounded-xl border border-border p-5 sm:p-6 shadow-2xs space-y-4">
            <h2 className="text-base sm:text-lg font-medium text-primary-heading font-barlow-condensed border-b border-border pb-3">
              Today&apos;s Route
            </h2>

            <div className="space-y-3.5">
              {routes.map((route) => (
                <div
                  key={route.id}
                  className="p-4 rounded-xl border border-border bg-card-bg hover:border-slate-300 transition-colors space-y-2.5 relative"
                >
                  {/* Top Row: Title & Status */}
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-medium text-primary-heading font-barlow-condensed">
                      {route.title}
                    </h3>
                    {getStatusBadge(route.status)}
                  </div>

                  {/* Time & Location */}
                  <div className="space-y-1 text-xs text-secondary-subheading">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-secondary-subheading shrink-0" />
                      <span>{route.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-secondary-subheading shrink-0" />
                      <span>{route.address}</span>
                    </div>
                  </div>

                  {/* Bottom Row: Team name & Avatar Stack */}
                  <div className="pt-2 border-t border-border/60 flex items-center justify-between gap-2">
                    <span className="text-xs text-secondary-subheading font-medium">
                      {route.crewTeamName}
                    </span>

                    {/* Avatar Stack with Clickable Popover */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setActivePopoverRouteId((prev) =>
                            prev === route.id ? null : route.id
                          )
                        }
                        className="flex items-center -space-x-1.5 hover:opacity-90 transition-opacity cursor-pointer focus:outline-hidden"
                        title="View assigned members"
                      >
                        {route.assignedMembers.slice(0, 3).map((m, idx) => (
                          <div
                            key={idx}
                            className="relative w-6 h-6 rounded-full overflow-hidden border-2 border-white shadow-2xs shrink-0"
                          >
                            <Image
                              src={m.avatar}
                              alt={m.name}
                              fill
                              sizes="24px"
                              className="object-cover"
                            />
                          </div>
                        ))}
                        {route.assignedMembers.length > 3 && (
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-[10px] font-semibold border-2 border-white shadow-2xs">
                            {route.assignedMembers.length - 3}+
                          </span>
                        )}
                      </button>

                      {/* Assigned Members Popover */}
                      <AssignedMembersPopover
                        isOpen={activePopoverRouteId === route.id}
                        onClose={() => setActivePopoverRouteId(null)}
                        members={route.assignedMembers}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Empty Recent Activity Card (Screenshot 1) */
          <div className="bg-card-bg rounded-xl border border-border p-8 sm:p-12 shadow-2xs min-h-[460px] flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-nav-bg text-secondary-subheading flex items-center justify-center shadow-2xs">
              <PenTool className="w-7 h-7 text-primary/70" strokeWidth={1.75} />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-medium text-primary-heading font-barlow-condensed">
                No Activity Yet
              </h2>
              <p className="text-xs sm:text-sm text-secondary-subheading max-w-xs mx-auto">
                There is no activity for this member
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Full-Width Card: Recent Activity (Screenshot 2) */}
      {hasActivity && activities.length > 0 && (
        <div className="bg-card-bg rounded-xl border border-border p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="text-base sm:text-lg font-medium text-primary-heading font-barlow-condensed">
              Recent Activity
            </h2>
            <button
              type="button"
              onClick={onViewAllActivity}
              className="text-xs sm:text-sm font-medium text-secondary-subheading hover:text-primary transition-colors cursor-pointer inline-flex items-center gap-1 border border-border px-3 py-1.5 rounded-md hover:bg-page-bg"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-border/60">
            {activities.map((act) => (
              <div
                key={act.id}
                className="py-3.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-page-bg/30 px-2 rounded-md transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${getActivityDotClass(
                      act.dotColor
                    )}`}
                  />
                  <div className="space-y-0.5">
                    <p className="text-xs sm:text-sm font-medium text-primary-heading">
                      {act.title}
                    </p>
                    <p className="text-[11px] sm:text-xs text-secondary-subheading">
                      {act.description}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] sm:text-xs text-secondary-subheading shrink-0 pl-5 sm:pl-0">
                  {act.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CrewDetailsOverviewTab;

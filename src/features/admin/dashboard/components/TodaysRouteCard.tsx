"use client";

import React from "react";
import Link from "next/link";
import { Clock, MapPin, ChevronRight } from "lucide-react";
import { TODAYS_ROUTE_DATA } from "../data/dashboardData";

export const TodaysRouteCard: React.FC = () => {
  return (
    <div className="rounded-xl border border-border bg-card-bg p-4 sm:p-5 shadow-2xs">
      <div className="flex items-center justify-between pb-3.5 border-b border-border-subtle">
        <h3 className="font-barlow text-lg font-bold text-primary-heading leading-none">
          Today&apos;s Route
        </h3>
        <Link
          href="/admin/jobs"
          className="inline-flex items-center gap-0.5 text-xs font-medium text-primary hover:text-primary-hover transition-colors"
        >
          <span>View All</span>
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="mt-3.5 space-y-3">
        {TODAYS_ROUTE_DATA.map((route) => (
          <div
            key={route.id}
            className="rounded-lg border border-border bg-card-bg p-3.5 space-y-2.5 hover:border-primary/40 transition-colors shadow-3xs"
          >
            {/* Header: Title + Status Badge */}
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-barlow text-base font-bold text-primary-heading">
                {route.title}
              </h4>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-info border border-blue-100">
                <span className="h-1.5 w-1.5 rounded-full bg-info" />
                {route.status}
              </span>
            </div>

            {/* Time & Location */}
            <div className="space-y-1 text-xs text-secondary-subheading">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-secondary-subheading/70 shrink-0" />
                <span>{route.time}</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="h-3.5 w-3.5 text-secondary-subheading/70 shrink-0" />
                <span className="truncate">{route.location}</span>
              </div>
            </div>

            {/* Crew + Avatars */}
            <div className="flex items-center justify-between pt-1 border-t border-border-subtle">
              <span className="text-xs font-medium text-txt-primary">
                Crew : {route.crewName}
              </span>
              <div className="flex items-center -space-x-2 overflow-hidden">
                {route.crewAvatars.map((avatar, idx) => (
                  <img
                    key={idx}
                    src={avatar}
                    alt="Crew member"
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-card-bg object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

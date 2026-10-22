"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Search,
  Eye,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { CustomerItem } from "../types/adminCustomers.types";
import {
  CUSTOMER_UPCOMING_VISITS,
  CUSTOMER_OVERVIEW_ACTIVE_JOBS,
  CUSTOMER_RECENT_ACTIVITIES,
} from "../data/adminCustomersDetailData";

interface CustomerOverviewTabProps {
  customer: CustomerItem;
  onViewAllJobs?: () => void;
  onViewCalendar?: () => void;
  onViewAllActivity?: () => void;
}

export const CustomerOverviewTab: React.FC<CustomerOverviewTabProps> = ({
  customer,
  onViewAllJobs,
  onViewCalendar,
  onViewAllActivity,
}) => {
  const [jobSearch, setJobSearch] = useState("");

  const filteredJobs = CUSTOMER_OVERVIEW_ACTIVE_JOBS.filter((job) => {
    if (!jobSearch) return true;
    const term = jobSearch.toLowerCase();
    return (
      job.id.toLowerCase().includes(term) ||
      job.propertyAddress.toLowerCase().includes(term) ||
      job.service.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* 1. Top Section: Customer Information & Upcoming Visits (Figma Screenshot 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Card: Customer Information */}
        <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-6 shadow-2xs space-y-4">
          <h2 className="text-base sm:text-lg font-medium text-primary-heading font-barlow-condensed border-b border-border pb-3">
            Customer Information
          </h2>

          <div className="space-y-3.5 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">Full Name</span>
              <span className="text-primary-heading font-medium">
                {customer.name || "Alex Morgan"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">Organization Name</span>
              <span className="text-primary-heading font-medium">
                {customer.organizationName || "Weatherly Property Group"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">Customer Type</span>
              <span className="text-primary-heading font-medium">
                {customer.customerType || "Commercial"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">Role</span>
              <span className="text-primary-heading font-medium">
                {customer.role || "Tenant"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">Email Address</span>
              <span className="text-primary-heading font-medium">
                {customer.email || "alexmorgan@gmail.com"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">Phone Number</span>
              <span className="text-primary-heading font-medium">
                {customer.phone || "999-(12345)-555"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">Billing Type</span>
              <span className="text-primary-heading font-medium">
                {customer.billingType || "Consolidated Monthly"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">Portal Access</span>
              <span className="text-badge-active-text font-medium">
                {customer.portalAccessEnabled !== false ? "Enabled" : "Disabled"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">Member Since</span>
              <span className="text-primary-heading font-medium">
                {customer.memberSince || "Sep 01, 2026"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Card: Upcoming Visits */}
        <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-6 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="text-base sm:text-lg font-medium text-primary-heading font-barlow-condensed">
              Upcoming Visits
            </h2>
            <button
              type="button"
              onClick={() => {
                if (onViewCalendar) onViewCalendar();
                else toast("Opening calendar...", { icon: "📅" });
              }}
              className="text-xs text-primary hover:text-primary-hover font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View Calendar</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3.5">
            {CUSTOMER_UPCOMING_VISITS.map((visit) => (
              <div
                key={visit.id}
                className="rounded-lg border border-border p-3.5 bg-page-bg/40 hover:bg-page-bg transition-colors space-y-3"
              >
                <div className="flex items-start gap-3.5">
                  {/* Date badge */}
                  <div className="w-14 h-14 rounded-md bg-blue-50 border border-blue-100 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] font-medium text-secondary-subheading tracking-wider">
                      {visit.month}
                    </span>
                    <span className="text-xl font-semibold text-primary-heading font-barlow-condensed leading-none">
                      {visit.day}
                    </span>
                  </div>

                  {/* Visit Details */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-info">
                        {visit.duration}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-info border border-blue-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-info" />
                        Scheduled
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-primary-heading truncate">
                      {visit.title}
                    </h3>
                    <p className="text-xs text-secondary-subheading truncate">
                      {visit.subtitle}
                    </p>

                    <div className="flex items-center gap-1 text-[11px] text-secondary-subheading pt-0.5">
                      <MapPin className="w-3 h-3 shrink-0 text-secondary-subheading/70" />
                      <span className="truncate">{visit.location}</span>
                    </div>
                  </div>
                </div>

                {/* Footer: Crew info + avatars */}
                <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-secondary-subheading">
                  <span className="font-medium">{visit.crewName}</span>
                  <div className="flex items-center -space-x-1.5">
                    {visit.crewAvatars.map((av, idx) => (
                      <div
                        key={idx}
                        className="relative w-6 h-6 rounded-full border-2 border-white overflow-hidden shrink-0 shadow-2xs"
                      >
                        <Image
                          src={av}
                          alt="crew"
                          fill
                          sizes="24px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Middle Section: Active Jobs (Figma Screenshot 1) */}
      <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
          <h2 className="text-base sm:text-lg font-medium text-primary-heading font-barlow-condensed">
            Active Jobs
          </h2>

          <div className="flex items-center gap-2.5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-subheading" />
              <input
                type="text"
                value={jobSearch}
                onChange={(e) => setJobSearch(e.target.value)}
                placeholder="Type to search"
                className="pl-9 pr-3 py-1.5 bg-page-bg border border-border rounded-md text-xs sm:text-sm text-primary-heading placeholder:text-secondary-subheading focus:outline-hidden focus:border-primary w-48 sm:w-56"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                if (onViewAllJobs) onViewAllJobs();
                else toast("Navigating to all active jobs...", { icon: "💼" });
              }}
              className="text-xs text-primary hover:text-primary-hover font-medium inline-flex items-center gap-1 transition-colors cursor-pointer shrink-0"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Active Jobs Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-page-bg border-b border-border text-secondary-subheading font-medium">
                <th className="py-2.5 px-3">Job ID</th>
                <th className="py-2.5 px-3">Property Address</th>
                <th className="py-2.5 px-3">Service</th>
                <th className="py-2.5 px-3">Service Type</th>
                <th className="py-2.5 px-3">Assigned Crew</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Next Visit</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredJobs.map((job) => (
                <tr
                  key={job.id}
                  className="hover:bg-page-bg/50 transition-colors"
                >
                  <td className="py-3 px-3 font-medium text-info">
                    <Link
                      href={`/admin/requests/${job.requestId || "req-1"}`}
                      className="hover:underline cursor-pointer"
                    >
                      {job.id}
                    </Link>
                  </td>
                  <td className="py-3 px-3 text-primary-heading font-medium">
                    {job.propertyAddress}
                  </td>
                  <td className="py-3 px-3 text-secondary-subheading">
                    {job.service}
                  </td>
                  <td className="py-3 px-3 text-secondary-subheading">
                    {job.serviceType}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center -space-x-1.5">
                      {job.assignedCrew.map((c, i) => (
                        <div
                          key={i}
                          className="relative w-6 h-6 rounded-full border-2 border-white overflow-hidden shadow-2xs"
                        >
                          <Image
                            src={c.avatar}
                            alt={c.name}
                            fill
                            sizes="24px"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-info border border-blue-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-info" />
                      {job.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-secondary-subheading text-xs">
                    {job.nextVisit}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <Link
                      href={`/admin/requests/${job.requestId || "req-1"}`}
                      className="p-1.5 rounded border border-border hover:bg-page-bg text-secondary-subheading hover:text-primary transition-colors cursor-pointer inline-flex items-center justify-center"
                      title={`View Service Request Details (${job.requestId || "req-1"})`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Bottom Section: Recent Activity (Figma Screenshot 1) */}
      <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-base sm:text-lg font-medium text-primary-heading font-barlow-condensed">
            Recent Activity
          </h2>
          <button
            type="button"
            onClick={() => {
              if (onViewAllActivity) onViewAllActivity();
              else toast("Showing all activity history...", { icon: "📜" });
            }}
            className="text-xs text-primary hover:text-primary-hover font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-4">
          {CUSTOMER_RECENT_ACTIVITIES.map((act) => {
            let dotColor = "bg-amber-500";
            if (act.type === "blue") dotColor = "bg-info";
            if (act.type === "green") dotColor = "bg-badge-active-dot";
            if (act.type === "orange") dotColor = "bg-orange-500";

            return (
              <div
                key={act.id}
                className="flex items-start justify-between gap-3 text-xs sm:text-sm py-1 border-b border-border/50 last:border-b-0"
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className={`w-2 h-2 rounded-full ${dotColor} mt-1.5 shrink-0`}
                  />
                  <div className="space-y-0.5">
                    <p className="font-medium text-primary-heading">
                      {act.title}
                    </p>
                    <p className="text-xs text-secondary-subheading">
                      {act.description}
                    </p>
                  </div>
                </div>

                <span className="text-xs text-secondary-subheading shrink-0">
                  {act.timestamp}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomerOverviewTab;

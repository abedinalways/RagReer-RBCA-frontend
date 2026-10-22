"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown } from "lucide-react";
import { CustomerItem } from "../types/adminCustomers.types";
import {
  CustomerAppointmentDetailsModal,
  CalendarAppointmentDetail,
} from "./CustomerAppointmentDetailsModal";

interface CustomerAppointmentsCalendarViewProps {
  customer: CustomerItem;
  onBackToDetails: () => void;
  onBackToList?: () => void;
}

interface CalendarEventItem {
  id: string;
  title: string;
  timeStr: string;
  category: "site_assessment" | "ongoing" | "upcoming" | "recurring" | "completed";
  detail: CalendarAppointmentDetail;
}

const DEFAULT_PROPERTY = {
  title: "North Entrance Monument & Islands",
  category: "Residential",
  address: "100 Whispering Pines Blvd at Hwy 43",
  imageUrl:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
};

const CREW_SITE_ASSESSMENT = [
  {
    id: "cr-1",
    name: "Daniel Green",
    role: "Lead",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: "cr-2",
    name: "Alex Garden",
    role: "Member",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
  },
];

const CREW_RECURRING = [
  {
    id: "cr-1",
    name: "Daniel Green",
    role: "Lead",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: "cr-2",
    name: "Alex Garden",
    role: "Member",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: "cr-3",
    name: "Alex Garden",
    role: "Member",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: "cr-4",
    name: "Daniel Green",
    role: "Lead",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  },
];

const CALENDAR_EVENTS: Record<string, CalendarEventItem[]> = {
  // Aug 28
  "2026-08-28": [
    {
      id: "ev-1",
      title: "Site Assessment",
      timeStr: "09:30 AM - 11:30 AM",
      category: "site_assessment",
      detail: {
        id: "ev-1",
        type: "site_assessment",
        title: "Site Assessment",
        timeDisplay: "09:30 AM - 11:30 AM",
        badgeLabel: "Scheduled",
        badgeType: "scheduled",
        date: "Sep 04, 2026",
        time: "11:00AM-12:00 PM",
        duration: "4-5 hours",
        serviceTypeLabel: "Requested Service",
        serviceTypeValue: "Landscape & Property Maintenance",
        accessRequirements:
          "Get code required, No pets outside, Street parking only",
        property: DEFAULT_PROPERTY,
        assignedCrew: CREW_SITE_ASSESSMENT,
        showDocuments: false,
      },
    },
  ],
  // Aug 29
  "2026-08-29": [
    {
      id: "ev-2",
      title: "Commercial Services",
      timeStr: "09:30 AM - 11:30 AM",
      category: "completed",
      detail: {
        id: "ev-2",
        type: "completed",
        title: "Commercial Services",
        timeDisplay: "09:30 AM - 11:30 AM",
        badgeLabel: "Completed",
        badgeType: "completed",
        date: "Aug 29, 2026",
        time: "09:30 AM - 11:30 AM",
        duration: "2 hours",
        serviceTypeLabel: "Service Type",
        serviceTypeValue: "Commercial Services, Monthly",
        accessRequirements:
          "Gate open from 8am, security pass at front desk",
        property: DEFAULT_PROPERTY,
        assignedCrew: CREW_SITE_ASSESSMENT,
        showDocuments: true,
      },
    },
    {
      id: "ev-3",
      title: "Residential Lawn Care",
      timeStr: "12:00 PM - 05:00 PM",
      category: "upcoming",
      detail: {
        id: "ev-3",
        type: "upcoming",
        title: "Residential Lawn Care",
        timeDisplay: "12:00 PM - 05:00 PM",
        badgeLabel: "Scheduled",
        badgeType: "scheduled",
        date: "Aug 29, 2026",
        time: "12:00 PM - 05:00 PM",
        duration: "5 hours",
        serviceTypeLabel: "Service Type",
        serviceTypeValue: "Bi-weekly Lawn Care",
        accessRequirements: "Side gate unlocked, pets inside",
        property: DEFAULT_PROPERTY,
        assignedCrew: CREW_SITE_ASSESSMENT,
        showDocuments: true,
      },
    },
  ],
  // Aug 31
  "2026-08-31": [
    {
      id: "ev-4",
      title: "Site Assessment",
      timeStr: "09:30 AM - 11:30 AM",
      category: "site_assessment",
      detail: {
        id: "ev-4",
        type: "site_assessment",
        title: "Site Assessment",
        timeDisplay: "09:30 AM - 11:30 AM",
        badgeLabel: "Scheduled",
        badgeType: "scheduled",
        date: "Aug 31, 2026",
        time: "09:30 AM - 11:30 AM",
        duration: "2 hours",
        serviceTypeLabel: "Requested Service",
        serviceTypeValue: "Tree & Shrub Assessment",
        accessRequirements: "Street parking available",
        property: DEFAULT_PROPERTY,
        assignedCrew: CREW_SITE_ASSESSMENT,
        showDocuments: false,
      },
    },
  ],
  // Sep 2
  "2026-09-02": [
    {
      id: "ev-5",
      title: "Residential Lawn Care",
      timeStr: "12:00 PM - 05:00 PM",
      category: "upcoming",
      detail: {
        id: "ev-5",
        type: "upcoming",
        title: "Residential Lawn Care",
        timeDisplay: "12:00 PM - 05:00 PM",
        badgeLabel: "Scheduled",
        badgeType: "scheduled",
        date: "Sep 02, 2026",
        time: "12:00 PM - 05:00 PM",
        duration: "5 hours",
        serviceTypeLabel: "Service Type",
        serviceTypeValue: "Weekly Maintenance",
        accessRequirements: "No pets outside, Street parking only",
        property: DEFAULT_PROPERTY,
        assignedCrew: CREW_SITE_ASSESSMENT,
        showDocuments: true,
      },
    },
  ],
  // Sep 6
  "2026-09-06": [
    {
      id: "ev-6",
      title: "Landscape & Proper...",
      timeStr: "12:00 PM - 05:00 PM",
      category: "recurring",
      detail: {
        id: "ev-6",
        type: "recurring",
        title: "Landscape & Property Maintenance",
        timeDisplay: "12:00 PM - 05:00 PM",
        badgeLabel: "Recurring",
        badgeType: "recurring",
        date: "Sep 06, 2026",
        time: "12:00 PM- 05:00 PM",
        duration: "4-5 hours",
        serviceTypeLabel: "Service Type",
        serviceTypeValue: "Recurring, Weekly",
        accessRequirements:
          "Get code required, No pets outside, Street parking only",
        property: DEFAULT_PROPERTY,
        assignedCrew: CREW_RECURRING,
        showDocuments: true,
      },
    },
  ],
  // Sep 14
  "2026-09-14": [
    {
      id: "ev-7",
      title: "Landscape & Proper...",
      timeStr: "12:00 PM - 05:00 PM",
      category: "recurring",
      detail: {
        id: "ev-7",
        type: "recurring",
        title: "Landscape & Property Maintenance",
        timeDisplay: "12:00 PM - 05:00 PM",
        badgeLabel: "Recurring",
        badgeType: "recurring",
        date: "Sep 14, 2026",
        time: "12:00 PM- 05:00 PM",
        duration: "4-5 hours",
        serviceTypeLabel: "Service Type",
        serviceTypeValue: "Recurring, Weekly",
        accessRequirements:
          "Get code required, No pets outside, Street parking only",
        property: DEFAULT_PROPERTY,
        assignedCrew: CREW_RECURRING,
        showDocuments: true,
      },
    },
  ],
  // Sep 21
  "2026-09-21": [
    {
      id: "ev-8",
      title: "Landscape & Proper...",
      timeStr: "12:00 PM - 05:00 PM",
      category: "recurring",
      detail: {
        id: "ev-8",
        type: "recurring",
        title: "Landscape & Property Maintenance",
        timeDisplay: "12:00 PM - 05:00 PM",
        badgeLabel: "Recurring",
        badgeType: "recurring",
        date: "Sep 21, 2026",
        time: "12:00 PM- 05:00 PM",
        duration: "4-5 hours",
        serviceTypeLabel: "Service Type",
        serviceTypeValue: "Recurring, Weekly",
        accessRequirements:
          "Get code required, No pets outside, Street parking only",
        property: DEFAULT_PROPERTY,
        assignedCrew: CREW_RECURRING,
        showDocuments: true,
      },
    },
  ],
};

export const CustomerAppointmentsCalendarView: React.FC<
  CustomerAppointmentsCalendarViewProps
> = ({ customer, onBackToDetails, onBackToList }) => {
  const [selectedMonth, setSelectedMonth] = useState("Sep");
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedAppointment, setSelectedAppointment] =
    useState<CalendarAppointmentDetail | null>(null);

  // Days configuration for September 2026 matching Screenshot 1
  // Row 1: Aug 26 to Sep 1
  // Row 2: Sep 2 to Sep 8
  // Row 3: Sep 9 to Sep 15
  // Row 4: Sep 16 to Sep 22
  // Row 5: Sep 23 to Sep 29
  // Row 6: Sep 30 to Oct 6 (or 31)
  const calendarDays = [
    // Week 1
    { day: 26, isCurrentMonth: false, dateKey: "2026-08-26" },
    { day: 27, isCurrentMonth: false, dateKey: "2026-08-27" },
    { day: 28, isCurrentMonth: false, dateKey: "2026-08-28" },
    { day: 29, isCurrentMonth: false, dateKey: "2026-08-29" },
    { day: 30, isCurrentMonth: false, dateKey: "2026-08-30" },
    { day: 31, isCurrentMonth: false, dateKey: "2026-08-31" },
    { day: 1, isCurrentMonth: true, dateKey: "2026-09-01" },

    // Week 2
    { day: 2, isCurrentMonth: true, dateKey: "2026-09-02" },
    { day: 3, isCurrentMonth: true, dateKey: "2026-09-03" },
    { day: 4, isCurrentMonth: true, dateKey: "2026-09-04" },
    { day: 5, isCurrentMonth: true, dateKey: "2026-09-05" },
    { day: 6, isCurrentMonth: true, dateKey: "2026-09-06" },
    { day: 7, isCurrentMonth: true, dateKey: "2026-09-07" },
    { day: 8, isCurrentMonth: true, dateKey: "2026-09-08" },

    // Week 3
    { day: 9, isCurrentMonth: true, dateKey: "2026-09-09" },
    { day: 10, isCurrentMonth: true, dateKey: "2026-09-10" },
    { day: 11, isCurrentMonth: true, dateKey: "2026-09-11" },
    { day: 12, isCurrentMonth: true, dateKey: "2026-09-12" },
    { day: 20, isCurrentMonth: true, dateKey: "2026-09-13" },
    { day: 14, isCurrentMonth: true, dateKey: "2026-09-14" },
    { day: 15, isCurrentMonth: true, dateKey: "2026-09-15" },

    // Week 4
    { day: 16, isCurrentMonth: true, dateKey: "2026-09-16" },
    { day: 17, isCurrentMonth: true, dateKey: "2026-09-17" },
    { day: 18, isCurrentMonth: true, dateKey: "2026-09-18" },
    { day: 19, isCurrentMonth: true, dateKey: "2026-09-19" },
    { day: 20, isCurrentMonth: true, dateKey: "2026-09-20" },
    { day: 21, isCurrentMonth: true, dateKey: "2026-09-21" },
    { day: 22, isCurrentMonth: true, dateKey: "2026-09-22" },

    // Week 5
    { day: 23, isCurrentMonth: true, dateKey: "2026-09-23" },
    { day: 24, isCurrentMonth: true, dateKey: "2026-09-24" },
    { day: 25, isCurrentMonth: true, dateKey: "2026-09-25" },
    { day: 26, isCurrentMonth: true, dateKey: "2026-09-26" },
    { day: 27, isCurrentMonth: true, dateKey: "2026-09-27" },
    { day: 28, isCurrentMonth: true, dateKey: "2026-09-28" },
    { day: 29, isCurrentMonth: true, dateKey: "2026-09-29" },

    // Week 6
    { day: 30, isCurrentMonth: true, dateKey: "2026-09-30" },
    { day: 31, isCurrentMonth: false, dateKey: "2026-10-01" },
    { day: 1, isCurrentMonth: false, dateKey: "2026-10-02" },
    { day: 2, isCurrentMonth: false, dateKey: "2026-10-03" },
    { day: 3, isCurrentMonth: false, dateKey: "2026-10-04" },
    { day: 4, isCurrentMonth: false, dateKey: "2026-10-05" },
    { day: 5, isCurrentMonth: false, dateKey: "2026-10-06" },
  ];

  const getEventStyle = (category: CalendarEventItem["category"]) => {
    switch (category) {
      case "site_assessment":
        return {
          bg: "bg-slate-100 hover:bg-slate-200/80 border-slate-400",
          title: "text-slate-800",
          time: "text-slate-500",
          accent: "bg-slate-500",
        };
      case "completed":
        return {
          bg: "bg-emerald-50 hover:bg-emerald-100/80 border-emerald-500",
          title: "text-emerald-900",
          time: "text-emerald-700",
          accent: "bg-emerald-500",
        };
      case "upcoming":
        return {
          bg: "bg-amber-50 hover:bg-amber-100/80 border-amber-400",
          title: "text-amber-900",
          time: "text-amber-700",
          accent: "bg-amber-500",
        };
      case "recurring":
        return {
          bg: "bg-[#fedfd4] hover:bg-[#fed3c4] border-[#ea580c]",
          title: "text-amber-950 font-semibold",
          time: "text-[#c2410c]",
          accent: "bg-[#ea580c]",
        };
      case "ongoing":
      default:
        return {
          bg: "bg-blue-50 hover:bg-blue-100/80 border-info",
          title: "text-info",
          time: "text-secondary-subheading",
          accent: "bg-info",
        };
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {/* 1. Breadcrumbs (Figma Screenshot 1) */}
      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-secondary-subheading">
        {onBackToList ? (
          <button
            type="button"
            onClick={onBackToList}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Customers
          </button>
        ) : (
          <Link
            href="/admin/customers"
            className="hover:text-primary transition-colors"
          >
            Customers
          </Link>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-secondary-subheading/60" />
        <button
          type="button"
          onClick={onBackToDetails}
          className="hover:text-primary transition-colors cursor-pointer"
        >
          Customer Details
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-secondary-subheading/60" />
        <span className="text-primary-heading font-medium">View Calendar</span>
      </div>

      {/* 2. Main Calendar Container */}
      <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-6 shadow-2xs space-y-4">
        {/* Header Row: Title on Left, Month/Year Controls on Right */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h1 className="text-xl sm:text-2xl font-medium text-primary-heading font-barlow-condensed">
            {customer.organizationName || customer.name}&apos;s Appointments
          </h1>

          <div className="flex items-center gap-2">
            {/* Month Select */}
            <div className="relative">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="appearance-none bg-card-bg border border-border text-xs sm:text-sm text-primary-heading pl-3 pr-7 py-1.5 rounded-md focus:outline-hidden focus:border-primary cursor-pointer font-medium"
              >
                <option value="Jan">Jan</option>
                <option value="Feb">Feb</option>
                <option value="Mar">Mar</option>
                <option value="Apr">Apr</option>
                <option value="May">May</option>
                <option value="Jun">Jun</option>
                <option value="Jul">Jul</option>
                <option value="Aug">Aug</option>
                <option value="Sep">Sep</option>
                <option value="Oct">Oct</option>
                <option value="Nov">Nov</option>
                <option value="Dec">Dec</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-secondary-subheading absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Year Select */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="appearance-none bg-card-bg border border-border text-xs sm:text-sm text-primary-heading pl-3 pr-7 py-1.5 rounded-md focus:outline-hidden focus:border-primary cursor-pointer font-medium"
              >
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-secondary-subheading absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Legend Row (Figma Screenshot 1) */}
        <div className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-xs sm:text-xs text-secondary-subheading pt-1 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            <span>Site Assessment</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-info" />
            <span>On Going</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Upcoming</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ea580c]" />
            <span>Recurring Visits</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Completed</span>
          </div>
        </div>

        {/* 3. Calendar Grid (Figma Screenshot 1) */}
        <div className="border border-border rounded-lg overflow-hidden bg-card-bg">
          {/* Day Names Header */}
          <div className="grid grid-cols-7 border-b border-border bg-card-bg text-center text-xs sm:text-sm font-medium text-primary-heading">
            {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
              (dayName) => (
                <div key={dayName} className="py-2.5 px-1 border-r border-border last:border-r-0">
                  {dayName}
                </div>
              )
            )}
          </div>

          {/* Month Days Grid (6 Rows of 7 Days) */}
          <div className="grid grid-cols-7 divide-x divide-y divide-border">
            {calendarDays.map((cell, idx) => {
              const dayEvents = CALENDAR_EVENTS[cell.dateKey] || [];

              return (
                <div
                  key={`${cell.dateKey}-${idx}`}
                  className={`min-h-[105px] sm:min-h-[120px] p-1.5 sm:p-2 flex flex-col justify-between transition-colors ${
                    cell.isCurrentMonth
                      ? "bg-card-bg hover:bg-page-bg/30"
                      : "bg-slate-50/50 text-slate-400 hover:bg-slate-50"
                  }`}
                >
                  {/* Events Container */}
                  <div className="space-y-1.5">
                    {dayEvents.map((evt) => {
                      const st = getEventStyle(evt.category);
                      return (
                        <button
                          key={evt.id}
                          type="button"
                          onClick={() => setSelectedAppointment(evt.detail)}
                          className={`w-full text-left p-1.5 rounded-sm border-l-[3px] ${st.bg} shadow-2xs transition-all cursor-pointer block`}
                          title={`${evt.title} (${evt.timeStr})`}
                        >
                          <p
                            className={`text-[11px] font-medium leading-tight truncate ${st.title}`}
                          >
                            {evt.title}
                          </p>
                          <p
                            className={`text-[9.5px] leading-tight truncate font-mono ${st.time}`}
                          >
                            {evt.timeStr}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Day Number (Bottom-Right matching Figma) */}
                  <div className="text-right pt-1">
                    <span
                      className={`text-xs sm:text-sm font-medium select-none ${
                        cell.isCurrentMonth
                          ? "text-primary-heading"
                          : "text-slate-400"
                      }`}
                    >
                      {cell.day}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Appointment Details Modal (Figma Screenshot 2 & 3) */}
      <CustomerAppointmentDetailsModal
        isOpen={Boolean(selectedAppointment)}
        onClose={() => setSelectedAppointment(null)}
        appointment={selectedAppointment}
      />
    </div>
  );
};

export default CustomerAppointmentsCalendarView;

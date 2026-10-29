"use client";

import React from "react";
import Image from "next/image";
import { X, MapPin, Users, FileText } from "lucide-react";
import toast from "react-hot-toast";

export interface CalendarAppointmentDetail {
  id: string;
  type: "site_assessment" | "recurring" | "completed" | "upcoming" | "ongoing";
  title: string;
  timeDisplay: string;
  badgeLabel: string;
  badgeType: "scheduled" | "recurring" | "completed" | "ongoing" | "upcoming";
  date: string;
  time: string;
  duration: string;
  serviceTypeLabel: string;
  serviceTypeValue: string;
  accessRequirements: string;
  property: {
    title: string;
    category: string;
    address: string;
    imageUrl: string;
  };
  assignedCrew: {
    id: string;
    name: string;
    role: string;
    avatar: string;
  }[];
  showDocuments?: boolean;
}

interface CustomerAppointmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: CalendarAppointmentDetail | null;
}

export const CustomerAppointmentDetailsModal: React.FC<
  CustomerAppointmentDetailsModalProps
> = ({ isOpen, onClose, appointment }) => {
  if (!isOpen || !appointment) return null;

  const isRecurring = appointment.badgeType === "recurring";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-2xs p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-card-bg w-full max-w-[540px] rounded-xl shadow-2xl border border-border p-5 sm:p-6 space-y-4 max-h-[92vh] overflow-y-auto">
        {/* Header (Figma Screenshot 2 & 3) */}
        <div className="flex items-center justify-between pb-1">
          <h2 className="text-xl sm:text-2xl font-medium text-primary-heading font-barlow-condensed">
            Appointment Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-secondary-subheading hover:text-primary-heading hover:bg-page-bg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Property Card Header */}
        <div className="border border-border rounded-lg p-3 sm:p-3.5 flex items-center justify-between gap-3 bg-page-bg/30">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-14 h-14 rounded-md overflow-hidden bg-slate-100 shrink-0 border border-border">
              <Image
                src={appointment.property.imageUrl}
                alt={appointment.property.title}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0 space-y-0.5">
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-info border border-blue-100">
                {appointment.property.category}
              </span>
              <h3 className="text-sm font-semibold text-primary-heading truncate font-barlow-condensed">
                {appointment.property.title}
              </h3>
              <div className="flex items-center gap-1 text-xs text-secondary-subheading truncate">
                <MapPin className="w-3.5 h-3.5 text-secondary-subheading/70 shrink-0" />
                <span className="truncate">{appointment.property.address}</span>
              </div>
            </div>
          </div>

          {/* Outlined View Button */}
          <button
            type="button"
            onClick={() =>
              toast.success(`Viewing property: ${appointment.property.title}`)
            }
            className="px-3.5 py-1.5 border border-primary text-primary hover:bg-primary hover:text-white rounded-md text-xs sm:text-sm font-medium transition-colors shrink-0 text-center cursor-pointer"
          >
            View
          </button>
        </div>

        {/* Service Subheading & Status Badge */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <h3 className="text-base sm:text-lg font-medium text-primary-heading font-barlow-condensed">
            {appointment.title}
          </h3>

          {isRecurring ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              {appointment.badgeLabel}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-blue-50 text-info border border-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-info" />
              {appointment.badgeLabel}
            </span>
          )}
        </div>

        {/* Details & Assigned Crew Container Card */}
        <div className="border border-border rounded-lg p-4 sm:p-5 space-y-4 bg-page-bg/20">
          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">Date</span>
              <span className="text-primary font-medium">{appointment.date}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">Time</span>
              <span className="text-primary font-medium">{appointment.time}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">Duration</span>
              <span className="text-primary font-medium">
                {appointment.duration}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">
                {appointment.serviceTypeLabel}
              </span>
              <span className="text-primary font-medium">
                {appointment.serviceTypeValue}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <span className="text-secondary-subheading shrink-0">
                Access Requirements
              </span>
              <span className="text-primary font-medium text-right max-w-xs leading-snug">
                {appointment.accessRequirements}
              </span>
            </div>
          </div>

          {/* Assigned Crew Section */}
          {appointment.assignedCrew.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-border/70">
              <div className="flex items-center gap-1.5 text-primary text-xs sm:text-sm font-medium">
                <Users className="w-4 h-4" />
                <span>Assigned Crew</span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {appointment.assignedCrew.map((crew, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-border">
                      <Image
                        src={crew.avatar}
                        alt={crew.name}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 leading-tight">
                      <p className="text-xs sm:text-sm font-medium text-primary-heading truncate">
                        {crew.name}
                      </p>
                      <p className="text-[11px] text-secondary-subheading">
                        {crew.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Cancellation Policy */}
        <div className="space-y-0.5 pt-1">
          <h4 className="text-xs font-semibold text-primary-heading">
            Cancellation Policy:
          </h4>
          <p className="text-[11px] text-secondary-subheading leading-relaxed">
            Cancel or reschedule at least 24 hours before your appointment to
            avoid a cancellation fee.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm border-t border-border">
          {appointment.showDocuments ? (
            <div className="flex items-center gap-3 text-primary font-medium">
              <button
                type="button"
                onClick={() => toast.success("Opening Estimate document...")}
                className="flex items-center gap-1 underline hover:text-primary-hover cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Estimate</span>
              </button>

              <button
                type="button"
                onClick={() => toast.success("Opening Contract agreement...")}
                className="flex items-center gap-1 underline hover:text-primary-hover cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Contract</span>
              </button>
            </div>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={() => {
              toast("Reschedule request initiated", { icon: "📅" });
            }}
            className="text-primary-heading hover:text-primary font-medium underline cursor-pointer text-left sm:text-right"
          >
            Need to request a reschedule?
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerAppointmentDetailsModal;

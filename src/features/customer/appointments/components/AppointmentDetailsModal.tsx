"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, MapPin, Users, FileText } from "lucide-react";
import AgreementIcon from "@/components/icons/customer/AgreementIcon";
import { AppointmentItem } from "../types/appointmentsTypes";
import { appointmentStatusConfigs } from "../data/appointmentsData";
import SignatureIcon from "@/components/icons/customer/SignatureIcon";

interface AppointmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: AppointmentItem | null;
  onRequestReschedule?: (appointment: AppointmentItem) => void;
}

export const AppointmentDetailsModal: React.FC<
  AppointmentDetailsModalProps
> = ({ isOpen, onClose, appointment, onRequestReschedule }) => {
  if (!isOpen || !appointment) return null;

  const statusConfig = appointmentStatusConfigs[appointment.status] || {
    label: appointment.status,
    dotColor: "bg-primary",
    badgeBg: "bg-blue-50",
    badgeText: "text-primary",
    badgeBorder: "border-blue-100",
    cardBg: "bg-card-bg",
    cardBorder: "border-border",
    accentBar: "bg-primary",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-card-bg w-full max-w-[560px] rounded-xl shadow-2xl border border-border p-5 sm:p-6 space-y-4 max-h-[92vh] overflow-y-auto">
        {/* Header (Figma Image 2) */}
        <div className="flex items-center justify-between pb-1">
          <h2 className="text-xl sm:text-2xl font-medium text-primary-heading">
            Appointment Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-secondary-subheading hover:text-primary-heading hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Property Card (Figma Image 2) */}
        <div className="border border-border rounded-lg p-3 sm:p-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-md overflow-hidden bg-slate-100 shrink-0">
              <Image
                src={appointment.propertyImage}
                alt={appointment.propertyName}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0 space-y-1">
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-primary">
                {appointment.propertyType}
              </span>
              <h3 className="text-sm sm:text-base font-medium text-primary-heading truncate">
                {appointment.propertyName}
              </h3>
              <div className="flex items-center gap-1 text-xs text-secondary-subheading truncate">
                <MapPin className="w-3.5 h-3.5 text-secondary-subheading shrink-0" />
                <span className="truncate">{appointment.propertyAddress}</span>
              </div>
            </div>
          </div>

          {/* Outline View Button with primary blue border */}
          <Link
            href="/customer/property"
            className="px-4 py-1.5 border border-primary text-primary hover:bg-blue-50/60 rounded-md text-xs sm:text-sm font-medium transition-colors shrink-0 text-center cursor-pointer"
          >
            View
          </Link>
        </div>

        {/* Service Subheading & Status Badge (Figma Image 3) */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <h3 className="text-base sm:text-lg font-medium text-primary-heading">
            {appointment.title}
          </h3>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium ${statusConfig.badgeBg} ${statusConfig.badgeText} border ${statusConfig.badgeBorder}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dotColor}`} />
            {appointment.status}
          </span>
        </div>

        {/* Details & Assigned Crew Container Card (Figma Image 3) */}
        <div className="border border-border rounded-lg p-4 sm:p-5 space-y-4">
          {/* Key-Value Details */}
          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">Date</span>
              <span className="text-primary font-medium">{appointment.dateDisplay}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">Arrival Window</span>
              <span className="text-primary font-medium">{appointment.arrivalWindow}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">Duration</span>
              <span className="text-primary font-medium">{appointment.duration}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary-subheading">Service Type</span>
              <span className="text-primary font-medium">{appointment.serviceType}</span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <span className="text-secondary-subheading shrink-0">Access Requirements</span>
              <span className="text-primary font-medium text-right max-w-xs leading-snug">
                {appointment.accessRequirements}
              </span>
            </div>
          </div>

          {/* Assigned Crew Section (3-Column Grid matching Figma Image 3) */}
          {appointment.assignedCrew && appointment.assignedCrew.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-1.5 text-primary text-xs sm:text-sm font-medium">
                <Users className="w-4 h-4" />
                <span>Assigned Crew</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {appointment.assignedCrew.map((crew, idx) => (
                  <div
                    key={`${crew.id}-${idx}`}
                    className="flex items-center gap-2.5"
                  >
                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-100 shrink-0">
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

        {/* Rescheduling Policy (Figma Image 4 - plain text without container) */}
        <div className="space-y-1 pt-1">
          <h4 className="text-sm font-medium text-primary-heading">
            Rescheduling Policy
          </h4>
          <p className="text-xs text-secondary-subheading leading-relaxed">
            {appointment.reschedulingPolicy ||
              "Reschedule at least 24 hours before your appointment to avoid a cancellation fee."}
          </p>
        </div>

        {/* Footer Links & Actions (Figma Image 4) */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
          {/* Left: Underlined links with exact icons */}
          <div className="flex items-center gap-4 text-primary font-medium">
            <Link
              href={`/customer/estimations/${appointment.estimateId || "est-1024"}`}
              className="flex items-center gap-1.5 underline hover:text-primary-hover"
            >
              <FileText className="w-4 h-4" />
              <span>View Estimate</span>
            </Link>

            <Link
              href={`/customer/contracts/${appointment.contractId || "cn-1"}`}
              className="flex items-center gap-1.5 underline hover:text-primary-hover"
            >
              <SignatureIcon className="w-4 h-4" />
              <span>View Contract</span>
            </Link>
          </div>

          {/* Right: Reschedule Request Trigger */}
          <button
            type="button"
            onClick={() => onRequestReschedule?.(appointment)}
            className="text-primary-heading hover:text-primary font-medium underline cursor-pointer text-left sm:text-right"
          >
            Need to request a reschedule?
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;

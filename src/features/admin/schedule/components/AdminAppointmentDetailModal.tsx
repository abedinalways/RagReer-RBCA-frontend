"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, Wrench, Pencil, ChevronRight } from "lucide-react";
import { Modal } from "@/components/reusable/Modal";
import { AdminAppointmentItem, CrewMember } from "../types/adminSchedule.types";
import { adminStatusConfigs } from "../data/adminScheduleData";

interface AdminAppointmentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: AdminAppointmentItem | null;
  onOpenReschedule: (appointment: AdminAppointmentItem) => void;
  onOpenCancel: (appointment: AdminAppointmentItem) => void;
}

export const AdminAppointmentDetailModal: React.FC<
  AdminAppointmentDetailModalProps
> = ({ isOpen, onClose, appointment, onOpenReschedule, onOpenCancel }) => {
  const [crewList, setCrewList] = useState<CrewMember[]>(
    appointment?.assignedCrew || []
  );

  // Sync crew list whenever appointment changes
  React.useEffect(() => {
    if (appointment) {
      setCrewList(appointment.assignedCrew);
    }
  }, [appointment]);

  if (!appointment) return null;

  const statusConfig =
    adminStatusConfigs[appointment.status] || adminStatusConfigs.Scheduled;

  const handleRemoveCrew = (crewId: string) => {
    setCrewList((prev) => prev.filter((c) => c.id !== crewId));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      title={
        <div className="space-y-0.5">
          <h3 className="text-xl font-medium text-primary-heading font-barlow-condensed leading-tight">
            Appointment Details
          </h3>
          <Link
            href={`/admin/job-pipeline/${appointment.jobId || "job-1"}/overview`}
            className="text-xs text-primary hover:underline font-medium inline-block"
          >
            #{appointment.id}
          </Link>
        </div>
      }
      footer={
        <div className="w-full flex items-center justify-between text-xs sm:text-sm">
          {/* Left: Cancel and Reschedule Links */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onOpenCancel(appointment)}
              className="text-secondary-subheading hover:text-decline font-medium underline cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onOpenReschedule(appointment)}
              className="text-primary hover:text-primary-hover font-medium underline cursor-pointer transition-colors"
            >
              Need to Reschedule?
            </button>
          </div>

          {/* Right: View Full Job */}
          <Link
            href={`/admin/job-pipeline/${appointment.jobId || "job-1"}/overview`}
            className="text-primary hover:text-primary-hover font-medium flex items-center gap-1 transition-colors"
          >
            <span>View Full Job</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Property Card (Figma Screenshot 3) */}
        <div className="border border-border rounded-lg p-3 sm:p-3.5 flex items-center justify-between gap-3 bg-card-bg">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-md overflow-hidden bg-slate-100 shrink-0 border border-border">
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
              <h4 className="text-sm sm:text-base font-medium text-primary-heading truncate">
                {appointment.propertyName}
              </h4>
              <div className="flex items-center gap-1 text-xs text-secondary-subheading truncate">
                <MapPin className="w-3.5 h-3.5 text-secondary-subheading shrink-0" />
                <span className="truncate">{appointment.propertyAddress}</span>
              </div>
            </div>
          </div>

          {/* View Button */}
          <Link
            href="/admin/properties"
            className="px-4 py-1.5 border border-primary text-primary hover:bg-blue-50/60 rounded-md text-xs sm:text-sm font-medium transition-colors shrink-0 text-center"
          >
            View
          </Link>
        </div>

        {/* Service Subheading & Status Badge */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <h4 className="text-base sm:text-lg font-medium text-primary-heading">
            {appointment.title}
          </h4>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium ${statusConfig.badgeBg} ${statusConfig.badgeText} border ${statusConfig.badgeBorder}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dotColor}`} />
            {appointment.status}
          </span>
        </div>

        {/* Key-Value Details */}
        <div className="border-t border-b border-border py-3 space-y-2.5 text-xs sm:text-sm">
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
            <span className="text-secondary-subheading shrink-0">
              Access Requirements
            </span>
            <span className="text-primary font-medium text-right max-w-xs leading-snug">
              {appointment.accessRequirements}
            </span>
          </div>
        </div>

        {/* Assigned Crew Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-1.5 text-primary">
              <Users className="w-4 h-4" />
              <span>Assigned Crew</span>
            </div>
            <button
              type="button"
              onClick={() => onOpenReschedule(appointment)}
              className="p-1 text-secondary-subheading hover:text-primary transition-colors cursor-pointer"
              title="Edit Crew"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-0.5">
            {crewList.map((crew) => (
              <div
                key={crew.id}
                className="inline-flex items-center gap-2 bg-blue-50/70 border border-blue-100/70 rounded-md px-2.5 py-1.5 text-xs shadow-2xs"
              >
                <div className="relative w-6 h-6 rounded-full overflow-hidden bg-slate-100 shrink-0">
                  <Image
                    src={crew.avatar}
                    alt={crew.name}
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </div>
                <div className="text-left leading-tight">
                  <p className="font-medium text-primary-heading">{crew.name}</p>
                  <p className="text-[10px] text-secondary-subheading">{crew.role}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveCrew(crew.id)}
                  className="text-secondary-subheading hover:text-decline p-0.5 cursor-pointer ml-1 transition-colors"
                  aria-label={`Remove ${crew.name}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Equipment Section */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-1.5 text-primary">
              <Wrench className="w-4 h-4" />
              <span>Assigned Equipment</span>
            </div>
            <button
              type="button"
              className="p-1 text-secondary-subheading hover:text-primary transition-colors cursor-pointer"
              title="Edit Equipment"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs sm:text-sm text-primary-heading font-medium pl-0.5">
            {appointment.assignedEquipment.join(", ") || "Trimmer"}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AdminAppointmentDetailModal;

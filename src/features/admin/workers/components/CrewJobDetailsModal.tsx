"use client";

import React from "react";
import Image from "next/image";
import { X, Calendar, Clock, MapPin, Briefcase, User, CheckCircle2 } from "lucide-react";
import { CrewAssignedJob } from "../types/crewMembers.types";

interface CrewJobDetailsModalProps {
  job: CrewAssignedJob | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CrewJobDetailsModal: React.FC<CrewJobDetailsModalProps> = ({
  job,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !job) return null;

  const getStatusBadge = (status: CrewAssignedJob["status"]) => {
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
      case "Pending Review":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-flagged-amber" />
            Pending Review
          </span>
        );
      case "Revision Requested":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-apt-cancelled-bg text-decline border border-decline-border">
            <span className="w-1.5 h-1.5 rounded-full bg-decline" />
            Revision Requested
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-card-bg rounded-xl border border-border shadow-2xl max-w-lg w-full p-6 space-y-5 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-medium text-primary-heading font-barlow-condensed">
                Job Details
              </h2>
              <span className="text-sm font-semibold text-primary">{job.jobCode}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-secondary-subheading hover:text-primary-heading p-1 rounded-md hover:bg-page-bg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs sm:text-sm">
          {/* Status & Role row */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-page-bg/40">
            <div>
              <span className="text-xs text-secondary-subheading block">Current Status</span>
              <div className="mt-1">{getStatusBadge(job.status)}</div>
            </div>
            <div>
              <span className="text-xs text-secondary-subheading block">Assigned Role</span>
              <span className="inline-flex items-center justify-center px-3 py-0.5 rounded text-xs font-medium border border-badge-active-border bg-badge-active-bg text-badge-active-text mt-1">
                {job.role}
              </span>
            </div>
          </div>

          {/* Customer info card */}
          <div className="p-3.5 rounded-lg border border-border space-y-2">
            <span className="text-xs font-semibold text-secondary-subheading uppercase tracking-wider block">
              Customer Details
            </span>
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border bg-slate-100 shrink-0">
                <Image
                  src={job.customerAvatar}
                  alt={job.customerName}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-primary-heading">{job.customerName}</p>
                <p className="text-xs text-secondary-subheading">{job.customerEmail}</p>
              </div>
            </div>
          </div>

          {/* Service & Property info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-border bg-page-bg/30 space-y-1">
              <span className="text-xs text-secondary-subheading flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-primary" />
                Service Type
              </span>
              <p className="font-medium text-primary-heading">{job.service}</p>
            </div>

            <div className="p-3 rounded-lg border border-border bg-page-bg/30 space-y-1">
              <span className="text-xs text-secondary-subheading flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                Property Address
              </span>
              <p className="font-medium text-primary-heading truncate">{job.propertyAddress}</p>
            </div>
          </div>

          {/* Schedule */}
          <div className="p-3 rounded-lg border border-border bg-page-bg/30 space-y-1">
            <span className="text-xs text-secondary-subheading flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              Scheduled Window
            </span>
            <p className="font-medium text-primary-heading">
              {job.date} • {job.time}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end pt-3 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrewJobDetailsModal;

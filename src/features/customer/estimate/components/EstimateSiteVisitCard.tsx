"use client";
import React from "react";
import { MapPin, Calendar, User } from "lucide-react";
import { EstimateSiteVisitInfo } from "../types/estimateTypes";

interface EstimateSiteVisitCardProps {
  siteVisit: EstimateSiteVisitInfo;
}

export const EstimateSiteVisitCard: React.FC<EstimateSiteVisitCardProps> = ({
  siteVisit,
}) => {
  return (
    <div className="bg-card-bg rounded-lg border border-border p-5 space-y-4 shadow-2xs">
      <div className="flex items-center justify-between">
        <h3 className="text-base md:text-lg font-semibold text-primary-heading">
          Site Visit Details
        </h3>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs text-[0.75rem] font-medium bg-[#ECFDF3] text-[#027A48] border border-[#ABEFC6]">
          <span className="w-1.5 h-1.5  bg-note-green-bg" />
          {siteVisit.status}
        </span>
      </div>

      <div className="space-y-3 pt-1 text-[0.8125rem]">
        {/* Property */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-primary">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="font-medium text-sm md:text-base">Property</span>
          </div>
          <p className="text-secondary-subheading text-xs md:text-sm">
            {siteVisit.propertyAddress}
          </p>
        </div>

        {/* Date & Time */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-primary">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span className="font-medium text-sm md:text-base">Date & Time</span>
          </div>
          <p className="text-secondary-subheading text-xs md:text-sm">
            {siteVisit.dateTime}
          </p>
        </div>

        {/* Visited By */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-primary">
            <User className="w-3.5 h-3.5 shrink-0" />
            <span className="font-medium text-sm md:text-base">Visited By</span>
          </div>
          <p className="text-secondary-subheading text-xs md:text-sm">
            {siteVisit.visitedBy}
          </p>
        </div>
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { ChevronRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TodayWorkJobCardProps {
  imageSrc: string;
  imageAlt?: string;
  status?: "CURRENT" | "UPCOMING" | string;
  statusLabel?: string;
  title: string;
  address: string;
  service: string;
  customerName: string;
  customerAvatar?: string;
  progressText?: string;
  onCardClick?: () => void;
  className?: string;
}

export function TodayWorkJobCard({
  imageSrc,
  imageAlt = "Job property photo",
  status = "CURRENT",
  statusLabel,
  title,
  address,
  service,
  customerName,
  customerAvatar,
  progressText,
  onCardClick,
  className,
}: TodayWorkJobCardProps) {
  const isCurrent = status === "CURRENT";
  const badgeText = statusLabel || (isCurrent ? "Current" : "Upcoming");

  return (
    <article
      onClick={onCardClick}
      className={cn(
        "flex w-full flex-col items-start gap-3 p-3 rounded-lg border border-[#E7F1FB] bg-white shadow-[0_2px_12px_0_rgba(39,53,81,0.06)] transition-all duration-200 hover:shadow-[0_4px_16px_0_rgba(39,53,81,0.10)]",
        onCardClick && "cursor-pointer",
        className
      )}
    >
      {/* Property Image with Rounded Corners inside Card Padding */}
      <div className="relative h-44 w-full overflow-hidden rounded-md bg-slate-100 shrink-0">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover"
        />
        <span
          className={cn(
            "absolute top-2.5 right-2.5 rounded-md px-2.5 py-1 text-xs font-medium leading-none shadow-2xs",
            isCurrent
              ? "bg-primary text-white"
              : "bg-blue-50 text-status-running-text border border-[#D5E3F0]"
          )}
        >
          {badgeText}
        </span>
      </div>

      {/* Card Information */}
      <div className="flex w-full flex-col gap-2">
        {/* Title & Address */}
        <div>
          <h3 className="font-barlow text-xl font-medium leading-snug text-primary-heading">
            {title}
          </h3>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm font-normal text-secondary-subheading">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-secondary-subheading" />
            <span>{address}</span>
          </p>
        </div>

        {/* Service */}
        <p className="text-sm font-medium text-txt-primary">{service}</p>

        {/* Customer Profile */}
        <div className="flex items-center gap-2 pt-0.5">
          {customerAvatar ? (
            <img
              src={customerAvatar}
              alt={customerName}
              className="h-7 w-7 rounded-full object-cover border border-border"
            />
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {customerName.charAt(0)}
            </div>
          )}
          <span className="text-sm font-semibold text-primary-heading">
            {customerName}
          </span>
        </div>

        {/* Bottom Status / Progress Divider */}
        {progressText && (
          <div className="mt-1 border-t border-border/60 pt-2.5 flex items-center justify-between text-sm font-medium text-secondary-subheading w-full">
            <span>{progressText}</span>
            <ChevronRight className="h-4 w-4 shrink-0 text-secondary-subheading" />
          </div>
        )}
      </div>
    </article>
  );
}

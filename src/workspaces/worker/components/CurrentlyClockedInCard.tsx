"use client";

import { ChevronRight } from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { cn } from "@/lib/utils";

export interface CurrentlyClockedInCardProps {
  title?: string;
  statusLabel?: string;
  locationDetails?: string;
  onManageClick?: () => void;
  className?: string;
}


export function CurrentlyClockedInCard({
  title = "Currently clocked in",
  statusLabel = "Running",
  locationDetails = "On-site work · Weekly grounds — Cedar Ridge",
  onManageClick,
  className,
}: CurrentlyClockedInCardProps) {
  return (
    <section
      className={cn(
        "flex w-full flex-col items-start gap-4 p-3 rounded-md border border-border-card bg-[#E7F1FB] shadow-2xs",
        className
      )}
    >
      <div className="flex w-full items-center justify-between">
        <h3 className="font-barlow text-xl font-medium leading-[160%] text-txt-primary">
          {title}
        </h3>
        <span className="rounded-md border border-info/20 bg-white px-2.5 py-0.5 text-xs font-medium leading-[116%] text-info">
          {statusLabel}
        </span>
      </div>

      <p className="text-sm font-medium text-secondary-subheading -mt-2">
        {locationDetails}
      </p>

      <PrimaryButton
        onClick={onManageClick}
        icon={<ChevronRight className="h-4 w-4" />}
      >
        Manage time Clock
      </PrimaryButton>
    </section>
  );
}

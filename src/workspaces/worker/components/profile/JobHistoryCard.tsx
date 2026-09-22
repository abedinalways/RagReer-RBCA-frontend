"use client";

import { MapPin } from "lucide-react";
import { JobData } from "../../data/mockWorkerJobs";

interface JobHistoryCardProps {
  job: JobData;
  onClick: () => void;
}

export function JobHistoryCard({ job, onClick }: JobHistoryCardProps) {
  return (
    <article
      onClick={onClick}
      className="flex w-full flex-col items-start gap-3 p-3 rounded-lg border border-[#E7F1FB] bg-white shadow-[0_2px_12px_0_rgba(39,53,81,0.06)] transition-all duration-200 hover:shadow-[0_4px_16px_0_rgba(39,53,81,0.10)] cursor-pointer active:scale-[0.99]"
    >
      {/* Property Image with Rounded Corners */}
      <div className="relative h-44 w-full overflow-hidden rounded-md bg-slate-100 shrink-0">
        <img
          src={job.imageSrc}
          alt={job.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="flex w-full flex-col gap-1.5">
        {/* Title & Status: Complete */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-barlow text-lg font-medium leading-tight text-primary-heading truncate">
            {job.title}
          </h3>
          <span className="px-2.5 py-0.5 rounded-sm border border-[#22C55E]/60 bg-[#F0FDF4] text-[#16A34A] text-xs font-semibold shrink-0">
            Complete
          </span>
        </div>

        {/* Address with MapPin */}
        <p className="flex items-center gap-1.5 text-xs text-secondary-subheading font-normal">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
          <span className="truncate">{job.address}</span>
        </p>

        {/* Service */}
        <p className="text-xs text-secondary-subheading font-normal">
          {job.service}
        </p>

        {/* Customer Profile */}
        <div className="flex items-center gap-2 pt-1">
          {job.customerAvatar ? (
            <img
              src={job.customerAvatar}
              alt={job.customerName}
              className="h-6 w-6 rounded-full object-cover border border-[#D9DADC]"
            />
          ) : (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
              {job.customerName.charAt(0)}
            </div>
          )}
          <span className="text-xs font-semibold text-txt-primary">
            {job.customerName}
          </span>
        </div>
      </div>
    </article>
  );
}

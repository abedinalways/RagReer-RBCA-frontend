import React from "react";
import { NoJobsIllustrationIcon } from "./icons/WorkerStatIcons";

export function TodayWorkEmptyStateCard() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 rounded-2xl bg-[#E7F1FB] pt-6 px-4 pb-4 text-center">
      <NoJobsIllustrationIcon className="h-[122px] w-[200px]" />
      <div className="space-y-1.5">
        <h3 className="text-lg font-bold tracking-tight text-primary-heading">
          No job requests yet
        </h3>
        <p className="mx-auto max-w-[260px] text-xs font-normal leading-relaxed text-secondary-subheading">
          When clients send you job requests, they'll appear here.
        </p>
      </div>
    </div>
  );
}

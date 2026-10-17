"use client";

import React from "react";
import JobsIcon from "@/components/icons/admin/JobsIcon";

interface JobPipelineEmptyStateProps {
  onScheduleJob?: () => void;
}

export const JobPipelineEmptyState: React.FC<JobPipelineEmptyStateProps> = () => {
  return (
    <div className="w-full flex items-center justify-center py-12 px-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-xl border border-border bg-card-bg p-8 sm:p-12 shadow-2xs text-center flex flex-col items-center justify-center">
        {/* Circular Icon Container matching Image 1 */}
        <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center mb-5 ring-4 ring-blue-50/50">
          <JobsIcon className="h-6 w-6 text-primary" />
        </div>

        {/* Title */}
        <h3 className="font-barlow text-2xl font-medium text-primary-heading tracking-tight mb-2">
          No Job Started Yet
        </h3>

        {/* Description matching Image 1 text */}
        <p className="text-sm font-normal text-secondary-subheading max-w-md leading-relaxed">
          You don&apos;t have any job in the pipeline. After scheduling your all job status will appear here.
        </p>
      </div>
    </div>
  );
};

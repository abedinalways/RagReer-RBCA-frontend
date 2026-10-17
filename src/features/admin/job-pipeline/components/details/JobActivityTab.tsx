"use client";

import React from "react";

export const JobActivityTab: React.FC = () => {
  return (
    <div className="w-full rounded-xl border border-border bg-card-bg shadow-2xs overflow-hidden animate-in fade-in duration-150">
      <div className="p-4 sm:p-5 border-b border-border">
        <h3 className="font-barlow text-base sm:text-lg font-medium text-primary-heading leading-tight">
          Activity
        </h3>
      </div>

      <div className="p-8 sm:p-16 flex flex-col items-center justify-center text-center">
        {/* Circular Activity/Pen Icon Container matching Screenshot 2 */}
        <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center mb-4 ring-4 ring-blue-50/50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="none"
            viewBox="0 0 24 24"
            className="text-primary"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
            />
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m15 5 4 4M2 2l20 20"
            />
          </svg>
        </div>

        <h4 className="font-barlow text-xl sm:text-2xl font-medium text-primary-heading mb-1.5">
          No Activity Yet
        </h4>

        <p className="text-xs sm:text-sm text-secondary-subheading font-normal max-w-sm">
          There is no activity for this job
        </p>
      </div>
    </div>
  );
};

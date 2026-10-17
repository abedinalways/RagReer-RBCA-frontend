"use client";

import React from "react";

export const JobBillingTab: React.FC = () => {
  return (
    <div className="w-full rounded-xl border border-border bg-card-bg shadow-2xs overflow-hidden animate-in fade-in duration-150">
      <div className="p-4 sm:p-5 border-b border-border">
        <h3 className="font-barlow text-base sm:text-lg font-medium text-primary-heading leading-tight">
          Billing
        </h3>
      </div>

      <div className="p-8 sm:p-16 flex flex-col items-center justify-center text-center">
        {/* Circular Receipt Icon Container matching Screenshot 1 */}
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
              d="M9 14h6m-6-3h6M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1 2-1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z"
            />
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 7.5v.01"
            />
          </svg>
        </div>

        <h4 className="font-barlow text-xl sm:text-2xl font-medium text-primary-heading mb-1.5">
          No Billing Found
        </h4>

        <p className="text-xs sm:text-sm text-secondary-subheading font-normal max-w-sm">
          There is no billing against this job
        </p>
      </div>
    </div>
  );
};

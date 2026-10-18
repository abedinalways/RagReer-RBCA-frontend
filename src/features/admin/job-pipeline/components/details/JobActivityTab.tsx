"use client";

import React from "react";
import ActivityIcon from "../../../../../components/icons/admin/ActivityIcon";

export const JobActivityTab: React.FC = () => {
  return (
    <div className="w-full rounded-xl border border-border bg-card-bg shadow-2xs overflow-hidden animate-in fade-in duration-150">
      <div className="p-4 sm:p-5 border-b border-border">
        <h3 className="font-barlow text-base sm:text-lg font-medium text-primary-heading leading-tight">
          Activity
        </h3>
      </div>

      <div className="p-8 sm:p-16 flex flex-col items-center justify-center text-center">
        <div className="p-4 rounded-full bg-table-total-bg/40">
           
       <ActivityIcon/>
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

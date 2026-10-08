"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JOB_PIPELINE_DATA } from "../data/dashboardData";

export const JobPipelineCard: React.FC = () => {
  return (
    <div className="rounded-xl border border-border bg-card-bg p-4 flex flex-col justify-between shadow-2xs">
      <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
        <h3 className="font-barlow text-lg font-bold text-primary-heading leading-none">
          Job Pipeline
        </h3>
        <Link
          href="/admin/jobs"
          className="inline-flex items-center gap-0.5 text-xs font-medium text-primary hover:text-primary-hover transition-colors"
        >
          <span>View All</span>
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="mt-3.5 space-y-2.5">
        {JOB_PIPELINE_DATA.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between text-xs sm:text-sm"
          >
            <span className="text-txt-primary font-normal">{item.status}</span>
            <span className="font-bold font-barlow text-primary-heading">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

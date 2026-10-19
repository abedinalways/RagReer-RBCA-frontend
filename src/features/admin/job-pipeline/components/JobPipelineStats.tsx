"use client";

import React from "react";
import { JobPipelineKPI } from "../types/jobPipelineTypes";

interface JobPipelineStatsProps {
  kpis: JobPipelineKPI;
}

export const JobPipelineStats: React.FC<JobPipelineStatsProps> = ({ kpis }) => {
  const cards = [
    {
      id: "today",
      label: "Today's Jobs",
      value: kpis.todaysJobs.toString().padStart(2, "0"),
      borderClass: "border-l-pipeline-today",
    },
    {
      id: "progress",
      label: "In Progress",
      value: kpis.inProgress.toString().padStart(2, "0"),
      borderClass: "border-l-pipeline-progress",
    },
    {
      id: "review",
      label: "Awaiting Review",
      value: kpis.awaitingReview.toString().padStart(2, "0"),
      borderClass: "border-l-pipeline-review",
    },
    {
      id: "issue",
      label: "Quality Issue",
      value: kpis.qualityIssue.toString().padStart(2, "0"),
      borderClass: "border-l-pipeline-issue",
    },
    {
      id: "hours",
      label: "Field Hours Logged",
      value: kpis.fieldHoursLogged,
      borderClass: "border-l-pipeline-hours",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`bg-card-bg rounded-lg border border-border border-l-4 ${card.borderClass} shadow-2xs py-4 px-3 sm:py-5 sm:px-4 flex flex-col items-center justify-center gap-1.5 transition-all`}
        >
          <span className="text-sm md:text-base font-normal text-primary-heading text-center leading-tight">
            {card.label}
          </span>
          <span className="font-barlow text-xl md:text-2xl font-semibold text-primary text-center leading-none mt-0.5">
            {card.value}
          </span>
        </div>
      ))}
    </div>
  );
};

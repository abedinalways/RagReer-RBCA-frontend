"use client";

import React from "react";
import { FINANCIAL_OVERVIEW_METRICS } from "../data/dashboardData";

export const FinancialOverviewCard: React.FC = () => {
  return (
    <div className="rounded-xl border border-border bg-card-bg p-4 sm:p-5 shadow-2xs">
      <div className="pb-3.5 border-b border-border-subtle">
        <h3 className="font-barlow text-lg md:text-xl font-medium text-primary-heading leading-none">
          Financial Overview
        </h3>
      </div>

      <div className="mt-4 space-y-4">
        {FINANCIAL_OVERVIEW_METRICS.map((metric) => (
          <div key={metric.id} className="space-y-1">
            <div className="text-sm md:text-base text-primary-heading font-normal">
              {metric.label}
            </div>
            <div className="font-barlow text-xl md:text-2xl font-normal text-primary leading-tight">
              {metric.amount}
            </div>

            {/* Progress Track matching Figma exact style */}
            <div className="h-3.5 sm:h-4 w-full rounded-[2px] bg-[#F2F4F7] overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${metric.percentage}%`,
                  backgroundColor: metric.barColor,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialOverviewCard;

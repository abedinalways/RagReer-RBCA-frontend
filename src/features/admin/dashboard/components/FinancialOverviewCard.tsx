"use client";

import React from "react";
import { FINANCIAL_OVERVIEW_METRICS } from "../data/dashboardData";

export const FinancialOverviewCard: React.FC = () => {
  return (
    <div className="rounded-xl border border-border bg-card-bg p-4 sm:p-5 shadow-2xs">
      <div className="pb-3.5 border-b border-border-subtle">
        <h3 className="font-barlow text-lg font-bold text-primary-heading leading-none">
          Financial Overview
        </h3>
      </div>

      <div className="mt-4 space-y-4">
        {FINANCIAL_OVERVIEW_METRICS.map((metric) => (
          <div key={metric.id} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-secondary-subheading font-medium">
                {metric.label}
              </span>
            </div>
            <div
              className="font-bold font-barlow text-base sm:text-lg"
              style={{ color: metric.barColor }}
            >
              {metric.amount}
            </div>

            {/* Progress Track */}
            <div className="h-3 w-full rounded-full bg-page-bg overflow-hidden border border-border/40">
              <div
                className="h-full rounded-full transition-all duration-500"
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

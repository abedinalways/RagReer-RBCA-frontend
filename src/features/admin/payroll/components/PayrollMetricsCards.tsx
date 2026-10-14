"use client";

import React from "react";
import { Users, Clock, Hourglass, Coins } from "lucide-react";
import { PayrollMetrics } from "../types";

interface PayrollMetricsCardsProps {
  metrics: PayrollMetrics;
}

export function PayrollMetricsCards({ metrics }: PayrollMetricsCardsProps) {
  const cards = [
    {
      label: "Total Crew",
      value: metrics.totalCrew.toString(),
      icon: Users,
    },
    {
      label: "Total Hours",
      value: metrics.totalHours,
      icon: Clock,
    },
    {
      label: "Avg. Hourly Rate",
      value: metrics.avgHourlyRate,
      icon: Hourglass,
    },
    {
      label: "Total Payable",
      value: metrics.totalPayable,
      icon: Coins,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div
            key={idx}
            className="p-3.5 sm:p-4 rounded-xl border border-border bg-card-bg shadow-2xs flex items-center justify-between transition-all hover:shadow-xs"
          >
            <div className="min-w-0 pr-2">
              <span className="block text-[11px] sm:text-xs text-secondary-subheading font-medium truncate">
                {card.label}
              </span>
              <span className="block text-lg sm:text-xl md:text-2xl font-bold text-primary mt-0.5 sm:mt-1 tracking-tight truncate">
                {card.value}
              </span>
            </div>

            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-blue-50/80 text-primary flex items-center justify-center shrink-0">
              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

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
            className="flex items-start justify-between gap-4 p-3 rounded border border-surface bg-pure-white-bg shadow-[2px_2px_22px_0px_rgba(55,36,31,0.01)] transition-all hover:shadow-xs"
          >
            <div className="min-w-0 flex-1">
              <span className="block  text-sm md:text-base font-normal text-primary-heading">
                {card.label}
              </span>
              <span className="block text-xl md:text-2xl font-bold text-primary mt-0.5 sm:mt-1 tracking-tight truncate">
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

"use client";

import React from "react";
import { Clock, Wallet, BadgePercent, CircleDollarSign, TrendingUp } from "lucide-react";
import { FinancialSummaryMetrics } from "../types";

interface FinancialSummaryMetricsCardsProps {
  metrics: FinancialSummaryMetrics;
}

export function FinancialSummaryMetricsCards({
  metrics,
}: FinancialSummaryMetricsCardsProps) {
  const cards = [
    {
      label: "Total Revenue",
      value: metrics.totalRevenue,
      icon: Clock,
      subtext: metrics.revenueTrend,
      subtextColor: "text-[#12B76A]",
      hasTrend: true,
    },
    {
      label: "Total Collected",
      value: metrics.totalCollected,
      icon: Wallet,
      subtext: `Across ${metrics.collectedProfilesCount} Profile`,
      subtextColor: "text-[#12B76A]",
      hasTrend: false,
    },
    {
      label: "Discount Applied",
      value: metrics.discountApplied,
      icon: BadgePercent,
      subtext: `Across ${metrics.discountJobsCount} Jobs`,
      subtextColor: "text-[#EAAA08]",
      hasTrend: false,
    },
    {
      label: "Avg. Profit Margin",
      value: metrics.avgProfitMargin,
      icon: CircleDollarSign,
      subtext: metrics.marginNote,
      subtextColor: "text-[#0777F6]",
      hasTrend: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div
            key={idx}
            className="flex flex-col justify-between p-3 rounded border border-surface bg-pure-white-bg shadow-[2px_2px_22px_0px_rgba(55,36,31,0.01)] transition-all hover:shadow-xs min-h-[105px]"
          >
            {/* Top Row */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <span className="block text-sm md:text-base font-normal text-primary-heading">
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

            {/* Bottom Subtext */}
            <div
              className={`mt-2 text-xs md:text-sm font-medium flex items-center gap-1 ${card.subtextColor}`}
            >
              {card.hasTrend && <TrendingUp className="w-3.5 h-3.5 stroke-[2.2]" />}
              <span>{card.subtext}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

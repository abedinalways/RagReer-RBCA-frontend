"use client";

import React from "react";
import { Coins, CalendarClock, CircleDollarSign, PieChart, TrendingUp } from "lucide-react";
import { ReceivableMetrics } from "../types";

interface AccountsReceivableMetricsCardsProps {
  metrics: ReceivableMetrics;
}

export function AccountsReceivableMetricsCards({
  metrics,
}: AccountsReceivableMetricsCardsProps) {
  const cards = [
    {
      label: "Total Outstanding",
      value: metrics.totalOutstanding,
      icon: Coins,
      subtext: `Across ${metrics.outstandingInvoicesCount} invoices`,
      subtextColor: "text-[#12B76A]",
      hasTrend: false,
    },
    {
      label: "Due Soon",
      value: metrics.dueSoon,
      icon: CalendarClock,
      subtext: metrics.dueSoonNote,
      subtextColor: "text-[#F79009]",
      hasTrend: false,
    },
    {
      label: "Overdue",
      value: metrics.overdue,
      icon: CircleDollarSign,
      subtext: `${metrics.overdueInvoicesCount} Invoices Overdue`,
      subtextColor: "text-[#D92D20]",
      hasTrend: false,
    },
    {
      label: "This Month Revenue",
      value: metrics.thisMonthRevenue,
      icon: PieChart,
      subtext: metrics.revenueTrend,
      subtextColor: "text-[#12B76A]",
      hasTrend: true,
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

            {/* Bottom Subtext / Status */}
            <div className={`mt-2 text-xs md:text-sm font-medium flex items-center gap-1 ${card.subtextColor}`}>
              {card.hasTrend && <TrendingUp className="w-3.5 h-3.5 stroke-[2.2]" />}
              <span>{card.subtext}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

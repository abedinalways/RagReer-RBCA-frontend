"use client";

import React from "react";
import { Briefcase, Wrench, UserCheck, Settings2, AlertTriangle } from "lucide-react";
import { EquipmentStats } from "../types";

interface EquipmentStatCardsProps {
  stats: EquipmentStats;
}

export function EquipmentStatCards({ stats }: EquipmentStatCardsProps) {
  const cards = [
    {
      title: "Total",
      value: String(stats.total).padStart(2, "0"),
      icon: Briefcase,
    },
    {
      title: "Available",
      value: String(stats.available).padStart(2, "0"),
      icon: Wrench,
    },
    {
      title: "In Use",
      value: String(stats.inUse).padStart(2, "0"),
      icon: UserCheck,
    },
    {
      title: "In Repair",
      value: String(stats.inRepair).padStart(2, "0"),
      icon: Settings2,
    },
    {
      title: "Damaged",
      value: String(stats.damaged).padStart(2, "0"),
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.title}
            className="bg-card-bg border border-border rounded-xl p-4 sm:p-5 flex items-center justify-between shadow-2xs transition-all hover:shadow-xs"
          >
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-medium text-secondary-subheading">
                {card.title}
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-[#2D6A9F] tracking-tight">
                {card.value}
              </p>
            </div>
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#EAF2F9] text-[#2D6A9F] flex items-center justify-center shrink-0">
              <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import {
  CalendarClock,
  FileEdit,
  Wrench,
  Coins,
  PieChart,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { DASHBOARD_STAT_CARDS } from "../data/dashboardData";
import { DashboardStatCard } from "../types/dashboardTypes";

export const AdminStatCards: React.FC = () => {
  const renderIcon = (type: DashboardStatCard["iconType"]) => {
    switch (type) {
      case "calendar":
        return <CalendarClock className="h-5 w-5 text-primary stroke-[1.8]" />;
      case "service":
        return <FileEdit className="h-5 w-5 text-primary stroke-[1.8]" />;
      case "equipment":
        return <Wrench className="h-5 w-5 text-primary stroke-[1.8]" />;
      case "outstanding":
        return <Coins className="h-5 w-5 text-primary stroke-[1.8]" />;
      case "revenue":
        return <PieChart className="h-5 w-5 text-primary stroke-[1.8]" />;
      default:
        return null;
    }
  };

  const renderBadge = (card: DashboardStatCard) => {
    switch (card.badgeType) {
      case "progress":
      case "recurring":
        return (
          <span className="text-xs font-medium text-trend-up">
            {card.badgeText}
          </span>
        );
      case "inUse":
        return (
          <span className="text-xs font-medium text-password-medium">
            {card.badgeText}
          </span>
        );
      case "overdue":
        return (
          <span className="text-xs font-medium text-decline">
            {card.badgeText}
          </span>
        );
      case "trend":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-trend-up">
            <TrendingUp className="h-3.5 w-3.5" />
            {card.badgeText}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3.5 sm:gap-4">
      {DASHBOARD_STAT_CARDS.map((card) => (
        <div
          key={card.id}
          className="rounded-xl border border-border bg-card-bg p-4 flex flex-col justify-between shadow-2xs hover:border-primary/40 transition-colors"
        >
          {/* Top Row: Title + Number on Left, Icon container on Right */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs sm:text-sm font-medium text-secondary-subheading leading-none">
                {card.title}
              </p>
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold font-barlow text-primary leading-tight">
                {card.value}
              </h3>
            </div>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50/70 border border-border-card">
              {renderIcon(card.iconType)}
            </div>
          </div>

          {/* Bottom Row: Badge on Left, Action Link on Right */}
          <div className="mt-4 pt-2 flex items-center justify-between border-t border-border-subtle text-xs sm:text-sm">
            <div>{renderBadge(card)}</div>
            <Link
              href={card.linkHref}
              className="inline-flex items-center gap-1 font-medium text-primary hover:text-primary-hover transition-colors"
            >
              <span>{card.linkText}</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

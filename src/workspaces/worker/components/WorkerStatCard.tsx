"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WorkerStatCardProps {
  title: string;
  value: string;
  unit: string;
  trend: string;
  trendType: "up" | "down";
  icon: React.ReactNode;
  className?: string;
}

export function WorkerStatCard({
  title,
  value,
  unit,
  trend,
  trendType,
  icon,
  className,
}: WorkerStatCardProps) {
  const isUp = trendType === "up";

  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-start gap-4 p-3 rounded-md border border-border-card bg-card-bg shadow-2xs transition-shadow hover:shadow-xs",
        className
      )}
    >
      {/* Header: Icon Box + Title */}
      <div className="flex items-center gap-2.5 w-full">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-white shadow-2xs">
          {icon}
        </div>
        <span className="text-sm font-medium leading-[116%] text-primary-heading">
          {title}
        </span>
      </div>

      {/* Footer: Value + Trend */}
      <div className="flex items-baseline justify-between w-full mt-auto pt-1">
        <div className="flex items-baseline">
          <span className="text-xl font-medium tracking-tight text-primary-heading">
            {value}
          </span>
          <span className="ml-1 text-sm font-normal text-secondary-subheading">
            {unit}
          </span>
        </div>

        <div
          className={cn(
            "flex items-center gap-0.5 text-sm font-semibold",
            isUp ? "text-trend-up" : "text-trend-down"
          )}
        >
          {isUp ? (
            <TrendingUp className="h-3.5 w-3.5" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5" />
          )}
          <span>{trend}</span>
        </div>
      </div>
    </div>
  );
}

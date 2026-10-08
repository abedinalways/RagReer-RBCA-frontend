"use client";

import React, { useState } from "react";
import { ChevronDown, RotateCcw } from "lucide-react";
import { MONTHLY_INCOME_DATA } from "../data/dashboardData";
import { MonthlyIncomeDataPoint } from "../types/dashboardTypes";

export const MonthlyIncomeChart: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("Last 12 months");
  const [activeTooltipIndex, setActiveTooltipIndex] = useState<number | null>(6); // July default matching Figma

  const yAxisTicks = ["$5K", "$4K", "$3K", "$2K", "$1K"];
  const maxScale = 5.0; // $5K is 100%

  return (
    <div className="rounded-xl border border-border bg-card-bg p-4 sm:p-5 shadow-2xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-border-subtle">
        <h3 className="font-barlow text-lg font-bold text-primary-heading leading-none">
          Monthly Income
        </h3>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Time range selector */}
          <div className="relative inline-block">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card-bg px-2.5 py-1.5 text-xs font-medium text-secondary-subheading hover:text-txt-primary hover:border-primary/50 transition-colors"
            >
              <span>{selectedTimeRange}</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Refresh icon */}
          <button
            type="button"
            onClick={() => setActiveTooltipIndex(6)}
            title="Refresh chart"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-card-bg text-secondary-subheading hover:text-primary hover:border-primary/50 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="mt-6 relative">
        <div className="relative flex h-56 sm:h-64">
          {/* Y Axis Labels */}
          <div className="flex flex-col justify-between pr-2 sm:pr-3 text-[11px] font-medium text-secondary-subheading text-right w-9 sm:w-10 select-none pb-6">
            {yAxisTicks.map((tick) => (
              <span key={tick}>{tick}</span>
            ))}
          </div>

          {/* Chart Grid & Bars Container */}
          <div className="relative flex-1 flex flex-col justify-between">
            {/* Background Horizontal Dashed Gridlines */}
            <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-between pointer-events-none pb-6">
              {yAxisTicks.map((tick, index) => (
                <div
                  key={`line-${index}`}
                  className="w-full border-b border-dashed border-border/80"
                />
              ))}
            </div>

            {/* Bars Container */}
            <div className="relative h-full flex items-end justify-between gap-1 sm:gap-2 px-1 sm:px-3 pb-6">
              {MONTHLY_INCOME_DATA.map((item, index) => {
                const revHeightPercent = Math.min(100, Math.max(0, (item.revenue / maxScale) * 100));
                const expHeightPercent = Math.min(100, Math.max(0, (item.expense / maxScale) * 100));
                const isTooltipActive = activeTooltipIndex === index;

                return (
                  <div
                    key={item.month}
                    className="relative flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                    onMouseEnter={() => setActiveTooltipIndex(index)}
                    onClick={() => setActiveTooltipIndex(index)}
                  >
                    {/* Tooltip Popup matching Figma July 17, 2026 */}
                    {isTooltipActive && (
                      <div className="absolute -top-12 z-20 whitespace-nowrap rounded-lg border border-border bg-card-bg p-2 shadow-md animate-in fade-in zoom-in-95 duration-150">
                        <p className="text-[10px] font-semibold tracking-wider text-secondary-subheading uppercase">
                          {item.fullDate || `${item.month.toUpperCase()} 2026`}
                        </p>
                        <div className="mt-1 space-y-0.5 text-xs">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-secondary-subheading text-[11px]">Total Revenue</span>
                            <span className="font-semibold text-primary">{item.formattedRevenue}</span>
                          </div>
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-secondary-subheading text-[11px]">Total Expense</span>
                            <span className="font-semibold text-[#8EB8E0]">{item.formattedExpense}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Dual Bars */}
                    <div className="flex items-end justify-center gap-1 sm:gap-1.5 w-full">
                      {/* Revenue Bar (Dark Blue) */}
                      <div
                        style={{ height: `${revHeightPercent}%` }}
                        className="w-2 sm:w-2.5 lg:w-3 bg-primary rounded-t-[3px] transition-all duration-300 group-hover:brightness-110"
                      />
                      {/* Expense Bar (Light Blue) */}
                      {item.expense > 0 ? (
                        <div
                          style={{ height: `${expHeightPercent}%` }}
                          className="w-2 sm:w-2.5 lg:w-3 bg-blue-100 rounded-t-[3px] transition-all duration-300 group-hover:brightness-95"
                        />
                      ) : (
                        <div className="w-2 sm:w-2.5 lg:w-3" />
                      )}
                    </div>

                    {/* X Axis Month Label */}
                    <span className="absolute -bottom-5 text-[11px] sm:text-xs font-medium text-secondary-subheading group-hover:text-primary transition-colors">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 pt-2 flex items-center justify-center gap-6 text-xs text-secondary-subheading">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-xs bg-primary" />
            <span className="font-medium">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-xs bg-blue-100" />
            <span className="font-medium">Expense</span>
          </div>
        </div>
      </div>
    </div>
  );
};

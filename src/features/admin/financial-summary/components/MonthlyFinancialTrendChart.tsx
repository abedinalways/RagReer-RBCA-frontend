"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import RefreshIcon from "@/components/icons/admin/RefreshIcon";
import { MonthlyFinancialTrendPoint } from "../types";

interface MonthlyFinancialTrendChartProps {
  data: MonthlyFinancialTrendPoint[];
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
  isRefreshing: boolean;
  onRefresh: () => void;
}

const TIME_RANGES = ["Last 6 months", "Last 12 months", "This Year"];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    payload: MonthlyFinancialTrendPoint;
  }>;
}

const CustomFinancialTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    const invText = item.formattedInvoiced || `$${item.invoiced.toLocaleString()}`;
    const colText = item.formattedCollected || `$${item.collected.toLocaleString()}`;
    const dateText = item.fullDate || `${item.month.toUpperCase()} 2026`;

    return (
      <div className="rounded-xl border border-border bg-card-bg p-3 shadow-lg min-w-[170px] pointer-events-none">
        <p className="text-[11px] font-semibold text-secondary-subheading uppercase tracking-wider mb-2">
          {dateText}
        </p>
        <div className="flex items-center justify-between gap-4 text-xs mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#EC7032]" />
            <span className="text-secondary-subheading">Invoiced</span>
          </div>
          <span className="font-semibold text-primary-heading">{invText}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#0777F6]" />
            <span className="text-secondary-subheading">Collected</span>
          </div>
          <span className="font-semibold text-primary-heading">{colText}</span>
        </div>
      </div>
    );
  }
  return null;
};

export function MonthlyFinancialTrendChart({
  data,
  timeRange,
  onTimeRangeChange,
  isRefreshing,
  onRefresh,
}: MonthlyFinancialTrendChartProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-4 sm:p-5 rounded border border-surface bg-pure-white-bg shadow-[2px_2px_22px_0px_rgba(55,36,31,0.01)] flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <h2 className="text-lg md:text-xl font-normal text-primary-heading">
          Monthly Financial Trend
        </h2>

        {/* Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Time Range Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="h-9 px-3 rounded-lg border border-border bg-card-bg text-secondary-subheading hover:text-txt-primary text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>{timeRange}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-secondary-subheading transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-40 bg-card-bg border border-border rounded-xl shadow-lg py-1.5 z-30 animate-in fade-in slide-in-from-top-1 duration-150">
                {TIME_RANGES.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => {
                      onTimeRangeChange(range);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs transition-colors cursor-pointer ${
                      timeRange === range
                        ? "text-primary font-medium bg-blue-50/60"
                        : "text-txt-primary hover:bg-page-bg"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={onRefresh}
            aria-label="Refresh chart"
            className="w-9 h-9 rounded-lg border border-border bg-card-bg flex items-center justify-center text-secondary-subheading hover:text-txt-primary hover:border-primary transition-colors cursor-pointer"
          >
            <div className={isRefreshing ? "animate-spin" : ""}>
              <RefreshIcon />
            </div>
          </button>
        </div>
      </div>

      {/* Recharts Area Container */}
      <div className="w-full h-[280px] sm:h-[320px]">
        {isMounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 15, right: 15, left: -15, bottom: 5 }}
            >
              <defs>
                <linearGradient id="invoicedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EC7032" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#EC7032" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="collectedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0777F6" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#0777F6" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#EAECF0"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#5C5F60" }}
                dy={8}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#5C5F60" }}
                tickFormatter={(val) => `$${val / 1000}k`}
                domain={[0, 5000]}
                ticks={[1000, 2000, 3000, 4000, 5000]}
              />

              <Tooltip content={<CustomFinancialTooltip />} />

              <Area
                type="monotone"
                dataKey="invoiced"
                stroke="#EC7032"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#invoicedGradient)"
                dot={{ r: 3, fill: "#EC7032", strokeWidth: 1 }}
                activeDot={{
                  r: 6,
                  fill: "#EC7032",
                  stroke: "#FFFFFF",
                  strokeWidth: 3,
                }}
              />

              <Area
                type="monotone"
                dataKey="collected"
                stroke="#0777F6"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#collectedGradient)"
                dot={{ r: 3, fill: "#0777F6", strokeWidth: 1 }}
                activeDot={{
                  r: 6,
                  fill: "#0777F6",
                  stroke: "#FFFFFF",
                  strokeWidth: 3,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-page-bg/30 rounded-lg">
            <span className="text-xs text-secondary-subheading">Loading chart...</span>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-border-subtle">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#EC7032]" />
          <span className="text-xs font-medium text-secondary-subheading">Invoiced</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#0777F6]" />
          <span className="text-xs font-medium text-secondary-subheading">Collected</span>
        </div>
      </div>
    </div>
  );
}

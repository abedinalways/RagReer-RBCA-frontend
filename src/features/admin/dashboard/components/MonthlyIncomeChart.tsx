"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import RefreshIcon from "@/components/icons/admin/RefreshIcon";

export interface MonthlyIncomeItem {
  month: string;
  revenue: number;
  expense: number;
  fullDate?: string;
  formattedRevenue?: string;
  formattedExpense?: string;
}

const FULL_YEAR_DATA: MonthlyIncomeItem[] = [
  { month: "Jan", revenue: 2900, expense: 1600 },
  { month: "Feb", revenue: 3900, expense: 2050 },
  { month: "Mar", revenue: 2900, expense: 2600 },
  { month: "Apr", revenue: 4500, expense: 2950 },
  { month: "May", revenue: 2100, expense: 1600 },
  { month: "Jun", revenue: 2900, expense: 1600 },
  {
    month: "Jul",
    revenue: 3800,
    expense: 2050,
    fullDate: "JULY 17, 2026",
    formattedRevenue: "$124.5K",
    formattedExpense: "$18.4k",
  },
  { month: "Aug", revenue: 2900, expense: 2600 },
  { month: "Sep", revenue: 3500, expense: 2950 },
  { month: "Oct", revenue: 2100, expense: 1600 },
  { month: "Nov", revenue: 2100, expense: 1600 },
  { month: "Dec", revenue: 4600, expense: 0 },
];

const SIX_MONTHS_DATA: MonthlyIncomeItem[] = FULL_YEAR_DATA.slice(6);
const THREE_MONTHS_DATA: MonthlyIncomeItem[] = FULL_YEAR_DATA.slice(9);

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    payload: MonthlyIncomeItem;
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    const revText = item.formattedRevenue || `$${item.revenue.toLocaleString()}`;
    const expText = item.formattedExpense || `$${item.expense.toLocaleString()}`;
    const dateText = item.fullDate || `${item.month.toUpperCase()} 2026`;

    return (
      <div className="rounded-xl border border-border bg-card-bg p-3 shadow-lg min-w-[170px] pointer-events-none">
        <p className="text-[11px] font-semibold text-secondary-subheading uppercase tracking-wider mb-2">
          {dateText}
        </p>
        <div className="flex items-center justify-between gap-4 text-xs mb-1.5">
          <span className="text-secondary-subheading">Total Revenue</span>
          <span className="font-semibold text-primary">{revText}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-xs">
          <span className="text-secondary-subheading">Total Expense</span>
          <span className="font-semibold text-[#8EB8E0]">{expText}</span>
        </div>
      </div>
    );
  }
  return null;
};

export const MonthlyIncomeChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>("Last 12 months");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDataForRange = () => {
    if (timeRange === "Last 6 months") return SIX_MONTHS_DATA;
    if (timeRange === "Last 3 months") return THREE_MONTHS_DATA;
    return FULL_YEAR_DATA;
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const chartData = getDataForRange();

  return (
    <div className="rounded-xl border border-border bg-card-bg p-4 sm:p-5 shadow-2xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-border-subtle">
        <h3 className="font-barlow text-lg md:text-xl font-medium text-primary-heading leading-none">
          Monthly Income
        </h3>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Time range dropdown */}
          <div className="relative inline-block" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-sm border border-border bg-card-bg px-3 py-1.5 text-xs font-medium text-secondary-subheading hover:text-txt-primary hover:border-primary/50 transition-colors cursor-pointer"
            >
              <span>{timeRange}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-secondary-subheading transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-36 rounded-lg border border-border bg-card-bg py-1 shadow-lg z-30 animate-in fade-in zoom-in-95 duration-150">
                {["Last 12 months", "Last 6 months", "Last 3 months"].map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => {
                      setTimeRange(range);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                      timeRange === range
                        ? "bg-blue-50 text-primary font-semibold"
                        : "text-txt-primary hover:bg-page-bg"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Refresh icon */}
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            title="Refresh chart"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card-bg text-secondary-subheading hover:text-primary hover:border-primary/50 transition-colors cursor-pointer disabled:opacity-50"
            aria-label="Refresh data"
          >
            {isRefreshing ? (
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            ) : (
              <RefreshIcon />
            )}
          </button>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="mt-6 h-[260px] sm:h-[280px] w-full min-w-0">
        {isMounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              barGap={4}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#EAECF0"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#5C5F60", fontSize: 11, fontWeight: 500 }}
                domain={[0, 5000]}
                ticks={[1000, 2000, 3000, 4000, 5000]}
                tickFormatter={(val) => `$${val / 1000}K`}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#5C5F60", fontSize: 11, fontWeight: 500 }}
                dy={10}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(231, 241, 251, 0.4)" }}
              />
              <Bar
                dataKey="revenue"
                fill="#52799F"
                radius={[4, 4, 0, 0]}
                barSize={12}
              />
              <Bar
                dataKey="expense"
                fill="#CADFF4"
                radius={[4, 4, 0, 0]}
                barSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full flex items-center justify-center text-xs text-secondary-subheading">
            Loading chart...
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-xs bg-[#52799F]" />
          <span className="text-xs font-medium text-secondary-subheading">
            Revenue
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-xs bg-[#CADFF4]" />
          <span className="text-xs font-medium text-secondary-subheading">
            Expense
          </span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyIncomeChart;

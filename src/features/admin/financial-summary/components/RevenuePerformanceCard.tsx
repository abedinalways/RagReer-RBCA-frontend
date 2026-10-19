"use client";

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { RevenuePerformanceBreakdown } from "../types";

interface RevenuePerformanceCardProps {
  data: RevenuePerformanceBreakdown[];
}

export function RevenuePerformanceCard({ data }: RevenuePerformanceCardProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const chartData = [
    { name: "Collected", value: 75, color: "#EC7032" },
    { name: "Outstanding", value: 25, color: "#8B5CF6" },
    { name: "Overdue", value: 9, color: "#EAAA08" },
  ];

  return (
    <div className="p-4 sm:p-5 rounded border border-surface bg-pure-white-bg shadow-[2px_2px_22px_0px_rgba(55,36,31,0.01)] flex flex-col justify-between">
      <h2 className="text-lg md:text-xl font-normal text-primary-heading mb-2">
        Revenue Performance
      </h2>

      {/* Semi-circle Gauge / Donut */}
      <div className="relative w-full h-[170px] flex items-center justify-center">
        {isMounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 10, right: 10, bottom: 0, left: 10 }}>
              <Pie
                data={chartData}
                dataKey="value"
                cx="50%"
                cy="85%"
                startAngle={180}
                endAngle={0}
                innerRadius={68}
                outerRadius={95}
                paddingAngle={4}
                cornerRadius={5}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full" />
        )}

        {/* Center Text inside semi-circle */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <span className="block text-xs text-secondary-subheading font-normal">
            Total Invoiced
          </span>
          <span className="block text-xl sm:text-2xl font-bold text-primary tracking-tight">
            $24,600
          </span>
        </div>
      </div>

      {/* Breakdown List */}
      <div className="space-y-2 mt-4 pt-4 border-t border-border-subtle">
        {data.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between text-xs sm:text-sm py-1"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-[2px] shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-txt-primary font-normal">{item.label}</span>
            </div>

            <div className="flex items-center gap-6">
              <span className="font-semibold text-txt-primary">
                {item.formattedAmount}
              </span>
              <span className="text-secondary-subheading font-medium min-w-[28px] text-right">
                {item.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

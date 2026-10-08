"use client";

import React from "react";
import { SERVICE_DISTRIBUTION_DATA } from "../data/dashboardData";

export const ServiceDistributionCard: React.FC = () => {
  // SVG Gauge calculations
  const center = 110;
  const strokeWidth = 7;

  // Arc 1 (Outer - Green)
  const r1 = 80;
  const c1 = 2 * Math.PI * r1; // ~502.65
  const stroke1 = (78 / 100) * c1 * 0.75; // 75% of full circle max sweep
  const gap1 = c1 - stroke1;

  // Arc 2 (Middle - Purple)
  const r2 = 64;
  const c2 = 2 * Math.PI * r2; // ~402.12
  const stroke2 = (65 / 100) * c2 * 0.75;
  const gap2 = c2 - stroke2;

  // Arc 3 (Inner - Amber)
  const r3 = 48;
  const c3 = 2 * Math.PI * r3; // ~301.59
  const stroke3 = (43 / 100) * c3 * 0.75;
  const gap3 = c3 - stroke3;

  return (
    <div className="rounded-xl border border-border bg-card-bg p-4 sm:p-5 shadow-2xs">
      <div className="pb-3.5 border-b border-border-subtle">
        <h3 className="font-barlow text-lg font-bold text-primary-heading leading-none">
          Service Distribution
        </h3>
      </div>

      <div className="mt-4 flex flex-col items-center">
        {/* Radial Concentric Gauge Visualization */}
        <div className="relative flex items-center justify-center w-52 h-44">
          <svg
            className="w-full h-full -rotate-45 transform"
            viewBox="0 0 220 220"
          >
            {/* Background tracks */}
            <circle
              cx={center}
              cy={center}
              r={r1}
              fill="none"
              stroke="#F1F5F9"
              strokeWidth={strokeWidth}
              strokeDasharray={`${c1 * 0.75} ${c1 * 0.25}`}
              strokeLinecap="round"
            />
            <circle
              cx={center}
              cy={center}
              r={r2}
              fill="none"
              stroke="#F1F5F9"
              strokeWidth={strokeWidth}
              strokeDasharray={`${c2 * 0.75} ${c2 * 0.25}`}
              strokeLinecap="round"
            />
            <circle
              cx={center}
              cy={center}
              r={r3}
              fill="none"
              stroke="#F1F5F9"
              strokeWidth={strokeWidth}
              strokeDasharray={`${c3 * 0.75} ${c3 * 0.25}`}
              strokeLinecap="round"
            />

            {/* Filled Progress Arcs */}
            {/* Arc 1: Green 78% */}
            <circle
              cx={center}
              cy={center}
              r={r1}
              fill="none"
              stroke="#16A34A"
              strokeWidth={strokeWidth}
              strokeDasharray={`${stroke1} ${gap1}`}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
            {/* Arc 2: Purple 65% */}
            <circle
              cx={center}
              cy={center}
              r={r2}
              fill="none"
              stroke="#8B5CF6"
              strokeWidth={strokeWidth}
              strokeDasharray={`${stroke2} ${gap2}`}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
            {/* Arc 3: Amber 43% */}
            <circle
              cx={center}
              cy={center}
              r={r3}
              fill="none"
              stroke="#F59E0B"
              strokeWidth={strokeWidth}
              strokeDasharray={`${stroke3} ${gap3}`}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>

          {/* Central Statistics Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 pl-4 pointer-events-none space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#16A34A]">
              <span className="h-2 w-2 rounded-2xs bg-[#16A34A]" />
              <span>78%</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8B5CF6]">
              <span className="h-2 w-2 rounded-2xs bg-[#8B5CF6]" />
              <span>65%</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F59E0B]">
              <span className="h-2 w-2 rounded-2xs bg-[#F59E0B]" />
              <span>43%</span>
            </div>
          </div>
        </div>

        {/* Legend List matching Figma */}
        <div className="mt-4 w-full space-y-2 border-t border-border-subtle pt-3 text-xs">
          {SERVICE_DISTRIBUTION_DATA.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 text-txt-primary"
            >
              <span
                className="h-2.5 w-2.5 rounded-2xs shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="truncate font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

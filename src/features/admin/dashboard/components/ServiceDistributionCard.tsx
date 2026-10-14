"use client";

import React, { useState, useEffect } from "react";

export interface ServiceDistributionItem {
  id: string;
  name: string;
  percentage: number;
  color: string;
  countText?: string;
}

const SERVICE_ITEMS: ServiceDistributionItem[] = [
  {
    id: "residential",
    name: "Residential Lawn Care",
    percentage: 78,
    color: "#02983E",
    countText: "142 Active Properties",
  },
  {
    id: "landscape",
    name: "Landscape and Property Maintenance",
    percentage: 65,
    color: "#7F30FE",
    countText: "98 Active Contracts",
  },
  {
    id: "commercial",
    name: "Commercial Services",
    percentage: 43,
    color: "#F5A623",
    countText: "45 Commercial Sites",
  },
];

// Smooth count-up animation hook
function useCountUp(target: number, duration: number = 1100, active: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    let frameId: number;

    const step = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      // Cubic ease-out curve
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, active]);

  return count;
}

export const ServiceDistributionCard: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 60);
    return () => clearTimeout(timer);
  }, []);

  // Geometry settings for concentric circular arcs
  const size = 260;
  const center = size / 2; // 130
  const baseStrokeWidth = 8;

  // Arc Radii: Outer (78%), Middle (65%), Inner (43%)
  const arcs = [
    {
      ...SERVICE_ITEMS[0],
      radius: 88,
      delay: "120ms",
      glowColor: "rgba(2, 152, 62, 0.45)",
    },
    {
      ...SERVICE_ITEMS[1],
      radius: 72,
      delay: "280ms",
      glowColor: "rgba(127, 48, 254, 0.45)",
    },
    {
      ...SERVICE_ITEMS[2],
      radius: 56,
      delay: "440ms",
      glowColor: "rgba(245, 166, 35, 0.45)",
    },
  ];

  // Count-up values
  const count0 = useCountUp(SERVICE_ITEMS[0].percentage, 1000, isMounted);
  const count1 = useCountUp(SERVICE_ITEMS[1].percentage, 1100, isMounted);
  const count2 = useCountUp(SERVICE_ITEMS[2].percentage, 1200, isMounted);
  const displayCounts = [count0, count1, count2];

  return (
    <div className="rounded-xl border border-border bg-card-bg p-4 sm:p-5 shadow-2xs transition-shadow duration-300 hover:shadow-xs">
      {/* Header */}
      <div className="pb-3.5 border-b border-border-subtle flex items-center justify-between">
        <h3 className="font-barlow text-lg md:text-xl font-medium text-primary-heading leading-none">
          Service Distribution
        </h3>
      </div>

      {/* Main Content Area */}
      <div className="mt-4 flex flex-col items-center">
        {/* Radial Concentric Arc Gauge Container */}
        <div className="relative flex items-center justify-center w-[250px] h-[230px]">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="w-full h-full select-none"
          >
            {arcs.map((arc, index) => {
              const circumference = 2 * Math.PI * arc.radius;
              const targetStroke = (arc.percentage / 100) * circumference;
              const strokeDashoffset = isMounted ? circumference - targetStroke : circumference;
              const isHovered = hoveredId === arc.id;
              const isOtherHovered = hoveredId !== null && !isHovered;

              return (
                <g
                  key={arc.id}
                  onMouseEnter={() => setHoveredId(arc.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="cursor-pointer"
                  style={{
                    opacity: isOtherHovered ? 0.35 : 1,
                    transition: "opacity 0.25s ease",
                  }}
                >
                  {/* Invisible wide hit track for reliable mouse hover */}
                  <circle
                    cx={center}
                    cy={center}
                    r={arc.radius}
                    fill="none"
                    stroke="transparent"
                    strokeWidth={baseStrokeWidth + 14}
                    transform={`rotate(-90 ${center} ${center})`}
                  />

                  {/* Main Animated Colored Arc */}
                  <circle
                    cx={center}
                    cy={center}
                    r={arc.radius}
                    fill="none"
                    stroke={arc.color}
                    strokeWidth={isHovered ? baseStrokeWidth + 2.5 : baseStrokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${center} ${center})`}
                    style={{
                      transition: `stroke-dashoffset 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${arc.delay}, stroke-width 0.25s ease`,
                      filter: isHovered
                        ? `drop-shadow(0 0 7px ${arc.glowColor})`
                        : "none",
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Central Animated Percentages List (Figma Exact) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none pl-1">
            <div className="flex flex-col gap-1.5">
              {SERVICE_ITEMS.map((item, idx) => {
                const isHovered = hoveredId === item.id;
                const isOtherHovered = hoveredId !== null && !isHovered;

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 pointer-events-auto cursor-pointer"
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      opacity: isOtherHovered ? 0.35 : 1,
                      transform: isHovered ? "scale(1.08) translateX(2px)" : "scale(1)",
                      transition: "opacity 0.25s ease, transform 0.25s ease",
                    }}
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-xs shrink-0 transition-transform duration-200"
                      style={{
                        backgroundColor: item.color,
                        transform: isHovered ? "scale(1.25)" : "scale(1)",
                      }}
                    />
                    <span
                      className={`text-sm md:text-base font-barlow tracking-tight transition-colors duration-200 ${
                        isHovered
                          ? "font-bold text-primary-heading"
                          : "font-normal text-secondary-subheading"
                      }`}
                    >
                      {isMounted ? `${displayCounts[idx]}%` : `${item.percentage}%`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Floating Micro-Tooltip */}
          {hoveredId && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap rounded-lg border border-border bg-card-bg/95 backdrop-blur-xs px-3 py-1.5 shadow-lg animate-in fade-in zoom-in-95 duration-150 pointer-events-none text-center">
              {(() => {
                const active = SERVICE_ITEMS.find((s) => s.id === hoveredId);
                if (!active) return null;
                return (
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-primary-heading">
                      {active.name}
                    </p>
                    <p className="text-[11px] text-secondary-subheading font-medium">
                      <span className="font-bold text-primary">{active.percentage}%</span>
                      {active.countText ? ` • ${active.countText}` : ""}
                    </p>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Legend List matching Figma with smooth hover interactions */}
        <div className="mt-4 w-full space-y-2 border-t border-border-subtle pt-3.5">
          {SERVICE_ITEMS.map((item) => {
            const isHovered = hoveredId === item.id;
            const isOtherHovered = hoveredId !== null && !isHovered;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="flex items-center justify-between gap-2.5 text-secondary-subheading cursor-pointer transition-all duration-200 py-0.5 rounded-md px-1 hover:bg-page-bg/40"
                style={{
                  opacity: isOtherHovered ? 0.35 : 1,
                  transform: isHovered ? "translateX(4px)" : "none",
                }}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="h-3 w-3 rounded-xs shrink-0 transition-transform duration-200"
                    style={{
                      backgroundColor: item.color,
                      transform: isHovered ? "scale(1.3)" : "scale(1)",
                      boxShadow: isHovered ? `0 0 6px ${item.color}80` : "none",
                    }}
                  />
                  <span
                    className={`text-sm md:text-base truncate transition-colors duration-200 ${
                      isHovered
                        ? "font-medium text-primary-heading"
                        : "font-normal text-secondary-subheading"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>

                {/* Percentage pill on hover */}
                <span
                  className={`text-sm md:text-base font-semibold px-2 py-0.5 rounded-full transition-all duration-200 ${
                    isHovered
                      ? "opacity-100 scale-100 bg-page-bg text-primary-heading"
                      : "opacity-0 scale-90 pointer-events-none"
                  }`}
                >
                  {item.percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServiceDistributionCard;

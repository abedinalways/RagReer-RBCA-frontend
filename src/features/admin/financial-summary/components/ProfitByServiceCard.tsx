"use client";

import React from "react";
import { ServiceProfitItem } from "../types";

interface ProfitByServiceCardProps {
  data: ServiceProfitItem[];
}

export function ProfitByServiceCard({ data }: ProfitByServiceCardProps) {
  return (
    <div className="p-4 sm:p-5 rounded border border-surface bg-pure-white-bg shadow-[2px_2px_22px_0px_rgba(55,36,31,0.01)]">
      <h2 className="text-lg md:text-xl font-normal text-primary-heading mb-4">
        Profit by Service
      </h2>

      <div className="space-y-3.5">
        {data.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[130px_1fr_40px] sm:grid-cols-[160px_1fr_45px] items-center gap-3 sm:gap-4"
          >
            {/* Service Name */}
            <span
              className="text-xs sm:text-sm font-normal text-txt-primary truncate"
              title={item.serviceName}
            >
              {item.serviceName}
            </span>

            {/* Progress Bar */}
            <div className="h-6 w-full bg-[#F5F6F8] rounded overflow-hidden">
              <div
                className="h-full bg-[#5980A6] rounded transition-all duration-700 ease-out"
                style={{ width: `${item.percentage}%` }}
              />
            </div>

            {/* Percentage */}
            <span className="text-xs sm:text-sm font-medium text-primary text-right">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

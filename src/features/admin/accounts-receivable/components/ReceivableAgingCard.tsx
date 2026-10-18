"use client";

import React from "react";
import { ReceivableAgingItem } from "../types";

interface ReceivableAgingCardProps {
  data: ReceivableAgingItem[];
}

export function ReceivableAgingCard({ data }: ReceivableAgingCardProps) {
  return (
    <div className="p-4 sm:p-5 rounded border border-surface bg-pure-white-bg shadow-[2px_2px_22px_0px_rgba(55,36,31,0.01)]">
      <h2 className="text-lg md:text-xl font-normal text-primary-heading mb-4 sm:mb-5">
        Receivable Aging
      </h2>

      <div className="space-y-3 sm:space-y-3.5">
        {data.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[80px_1fr_60px] sm:grid-cols-[110px_1fr_80px] items-center gap-3 sm:gap-4"
          >
            {/* Label */}
            <span className="text-xs sm:text-sm font-normal text-txt-primary truncate">
              {item.label}
            </span>

            {/* Progress Track */}
            <div className="h-7 sm:h-8 w-full bg-[#F5F6F8] rounded overflow-hidden">
              <div
                className="h-full bg-[#CADFF4] rounded transition-all duration-700 ease-out"
                style={{ width: `${item.percentage}%` }}
              />
            </div>

            {/* Amount */}
            <span className="text-xs sm:text-sm font-medium text-right text-primary-heading whitespace-nowrap">
              {item.formattedAmount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

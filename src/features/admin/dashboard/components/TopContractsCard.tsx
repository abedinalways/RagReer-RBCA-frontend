"use client";

import React from "react";
import { TOP_CONTRACTS_DATA } from "../data/dashboardData";

export const TopContractsCard: React.FC = () => {
  return (
    <div className="rounded-xl border border-border bg-card-bg p-4 flex flex-col justify-between shadow-2xs">
      <div className="pb-3 border-b border-border-subtle">
        <h3 className="font-barlow text-lg font-bold text-primary-heading leading-none">
          Top Contracts by Profitability
        </h3>
      </div>

      <div className="mt-3.5 space-y-2.5">
        {TOP_CONTRACTS_DATA.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex items-center justify-between text-xs sm:text-sm gap-2"
          >
            <span className="text-txt-primary font-normal truncate">
              {item.name}
            </span>
            <span className="font-bold font-barlow text-primary-heading shrink-0">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

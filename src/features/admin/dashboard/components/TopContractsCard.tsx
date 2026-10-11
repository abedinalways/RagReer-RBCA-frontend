"use client";

import React from "react";
import { TOP_CONTRACTS_DATA } from "../data/dashboardData";

export const TopContractsCard: React.FC = () => {
  return (
    <div className="rounded-xl border border-border bg-card-bg p-4 flex flex-col justify-between shadow-2xs">
      <div className="pb-3 border-b border-border-subtle">
<<<<<<< HEAD
        <h3 className="font-barlow text-lg md:text-xl font-medium text-primary-heading leading-none">
=======
        <h3 className="font-barlow text-lg font-bold text-primary-heading leading-none">
>>>>>>> dd61997295b24b3ab2b2b9095f6b0b4f2ddb1f7e
          Top Contracts by Profitability
        </h3>
      </div>

      <div className="mt-3.5 space-y-2.5">
        {TOP_CONTRACTS_DATA.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
<<<<<<< HEAD
            className="flex items-center justify-between text-sm md:text-base gap-2"
=======
            className="flex items-center justify-between text-xs sm:text-sm gap-2"
>>>>>>> dd61997295b24b3ab2b2b9095f6b0b4f2ddb1f7e
          >
            <span className="text-txt-primary font-normal truncate">
              {item.name}
            </span>
<<<<<<< HEAD
            <span className="font-medium font-barlow text-primary-heading shrink-0">
=======
            <span className="font-bold font-barlow text-primary-heading shrink-0">
>>>>>>> dd61997295b24b3ab2b2b9095f6b0b4f2ddb1f7e
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { CASH_FLOW_DATA } from "../data/dashboardData";

export const CashFlowCard: React.FC = () => {
  return (
    <div className="rounded-xl border border-border bg-card-bg p-4 flex flex-col justify-between shadow-2xs">
      <div className="pb-3 border-b border-border-subtle">
<<<<<<< HEAD
        <h3 className="font-barlow text-lg md:text-xl font-medium text-primary-heading leading-none">
=======
        <h3 className="font-barlow text-lg font-bold text-primary-heading leading-none">
>>>>>>> dd61997295b24b3ab2b2b9095f6b0b4f2ddb1f7e
          Cash Flow
        </h3>
      </div>

      <div className="mt-3 space-y-2.5">
        {/* Cash In Box */}
<<<<<<< HEAD
        <div className="flex items-center justify-between rounded-lg bg-surface/40 border-none px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base font-normal text-txt-primary">
              Cash In
            </span>
            <span className="inline-flex items-center gap-0.5 text-sm md:text-base font-medium text-trend-up">
              <TrendingUp className="h-4 w-4" />
              {CASH_FLOW_DATA.cashIn.percentage}
            </span>
          </div>
          <span className="font-medium font-barlow text-primary-heading text-sm sm:text-base">
=======
        <div className="flex items-center justify-between rounded-lg bg-badge-active-bg/70 border border-badge-active-border/70 px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-medium text-txt-primary">
              Cash In
            </span>
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-trend-up">
              <TrendingUp className="h-3 w-3" />
              {CASH_FLOW_DATA.cashIn.percentage}
            </span>
          </div>
          <span className="font-bold font-barlow text-primary-heading text-sm sm:text-base">
>>>>>>> dd61997295b24b3ab2b2b9095f6b0b4f2ddb1f7e
            {CASH_FLOW_DATA.cashIn.amount}
          </span>
        </div>

        {/* Cash Out Box */}
<<<<<<< HEAD
        <div className="flex items-center justify-between rounded-lg bg-surface/40 border-none px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base font-medium text-txt-primary">
              Cash Out
            </span>
            <span className="inline-flex items-center gap-0.5 text-sm font-medium text-decline">
              <TrendingDown className="h-4 w-4" />
              {CASH_FLOW_DATA.cashOut.percentage}
            </span>
          </div>
          <span className="font-medium font-barlow text-primary-heading text-sm sm:text-base">
=======
        <div className="flex items-center justify-between rounded-lg bg-decline-secondary/80 border border-decline-border/70 px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-medium text-txt-primary">
              Cash Out
            </span>
            <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-decline">
              <TrendingDown className="h-3 w-3" />
              {CASH_FLOW_DATA.cashOut.percentage}
            </span>
          </div>
          <span className="font-bold font-barlow text-primary-heading text-sm sm:text-base">
>>>>>>> dd61997295b24b3ab2b2b9095f6b0b4f2ddb1f7e
            {CASH_FLOW_DATA.cashOut.amount}
          </span>
        </div>

        {/* Net Profit Row */}
        <div className="flex items-center justify-between pt-2 border-t border-border-subtle">
<<<<<<< HEAD
          <span className="text-sm sm:text-base font-medium text-primary">
            Net Profit
          </span>
          <span className="font-medium font-barlow text-primary text-sm md:text-base">
=======
          <span className="text-xs sm:text-sm font-semibold text-primary">
            Net Profit
          </span>
          <span className="font-bold font-barlow text-primary text-base sm:text-lg">
>>>>>>> dd61997295b24b3ab2b2b9095f6b0b4f2ddb1f7e
            {CASH_FLOW_DATA.netProfit}
          </span>
        </div>
      </div>
    </div>
  );
};

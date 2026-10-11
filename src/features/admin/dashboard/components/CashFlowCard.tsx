"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { CASH_FLOW_DATA } from "../data/dashboardData";

export const CashFlowCard: React.FC = () => {
  return (
    <div className="rounded-xl border border-border bg-card-bg p-4 flex flex-col justify-between shadow-2xs">
      <div className="pb-3 border-b border-border-subtle">
        <h3 className="font-barlow text-lg md:text-xl font-medium text-primary-heading leading-none">
          Cash Flow
        </h3>
      </div>

      <div className="mt-3 space-y-2.5">
        {/* Cash In Box */}
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
            {CASH_FLOW_DATA.cashIn.amount}
          </span>
        </div>

        {/* Cash Out Box */}
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
            {CASH_FLOW_DATA.cashOut.amount}
          </span>
        </div>

        {/* Net Profit Row */}
        <div className="flex items-center justify-between pt-2 border-t border-border-subtle">
          <span className="text-sm sm:text-base font-medium text-primary">
            Net Profit
          </span>
          <span className="font-medium font-barlow text-primary text-sm md:text-base">
            {CASH_FLOW_DATA.netProfit}
          </span>
        </div>
      </div>
    </div>
  );
};

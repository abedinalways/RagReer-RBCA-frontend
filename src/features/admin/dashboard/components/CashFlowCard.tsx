"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { CASH_FLOW_DATA } from "../data/dashboardData";

export const CashFlowCard: React.FC = () => {
  return (
    <div className="rounded-xl border border-border bg-card-bg p-4 flex flex-col justify-between shadow-2xs">
      <div className="pb-3 border-b border-border-subtle">
        <h3 className="font-barlow text-lg font-bold text-primary-heading leading-none">
          Cash Flow
        </h3>
      </div>

      <div className="mt-3 space-y-2.5">
        {/* Cash In Box */}
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
            {CASH_FLOW_DATA.cashIn.amount}
          </span>
        </div>

        {/* Cash Out Box */}
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
            {CASH_FLOW_DATA.cashOut.amount}
          </span>
        </div>

        {/* Net Profit Row */}
        <div className="flex items-center justify-between pt-2 border-t border-border-subtle">
          <span className="text-xs sm:text-sm font-semibold text-primary">
            Net Profit
          </span>
          <span className="font-bold font-barlow text-primary text-base sm:text-lg">
            {CASH_FLOW_DATA.netProfit}
          </span>
        </div>
      </div>
    </div>
  );
};

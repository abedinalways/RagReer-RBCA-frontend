"use client";

import { useState } from "react";
import {
  FINANCIAL_METRICS,
  MONTHLY_TREND_DATA,
  SERVICE_PROFIT_DATA,
  REVENUE_PERFORMANCE_BREAKDOWN,
  TOP_CONTRACTS_DATA,
} from "../data/financialSummaryData";

export function useFinancialSummary() {
  const [timeRange, setTimeRange] = useState("Last 6 months");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleExport = () => {
    const csvContent = [
      ["Top Contracts by Profitability"],
      ["Customer Name", "Jobs", "Revenue", "Crew Cost", "Profit", "Margin"].join(","),
      ...TOP_CONTRACTS_DATA.map((c) =>
        [`"${c.customerName}"`, c.jobs, c.formattedRevenue, c.formattedCrewCost, c.formattedProfit, c.margin].join(",")
      ),
      [],
      ["Profit by Service"],
      ["Service Name", "Profit Percentage"].join(","),
      ...SERVICE_PROFIT_DATA.map((s) => [`"${s.serviceName}"`, `${s.percentage}%`].join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `financial-summary-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    metrics: FINANCIAL_METRICS,
    trendData: MONTHLY_TREND_DATA,
    serviceProfitData: SERVICE_PROFIT_DATA,
    revenuePerformance: REVENUE_PERFORMANCE_BREAKDOWN,
    contractsData: TOP_CONTRACTS_DATA,
    timeRange,
    setTimeRange,
    isRefreshing,
    handleRefresh,
    handleExport,
  };
}

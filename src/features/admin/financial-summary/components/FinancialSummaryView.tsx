"use client";

import React from "react";
import { useFinancialSummary } from "../hooks/useFinancialSummary";
import { FinancialSummaryHeader } from "./FinancialSummaryHeader";
import { FinancialSummaryMetricsCards } from "./FinancialSummaryMetricsCards";
import { MonthlyFinancialTrendChart } from "./MonthlyFinancialTrendChart";
import { ProfitByServiceCard } from "./ProfitByServiceCard";
import { RevenuePerformanceCard } from "./RevenuePerformanceCard";
import { TopContractsTable } from "./TopContractsTable";

export function FinancialSummaryView() {
  const {
    metrics,
    trendData,
    serviceProfitData,
    revenuePerformance,
    contractsData,
    timeRange,
    setTimeRange,
    isRefreshing,
    handleRefresh,
    handleExport,
  } = useFinancialSummary();

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <FinancialSummaryHeader onExport={handleExport} />

      {/* Top 4 Metrics Cards */}
      <FinancialSummaryMetricsCards metrics={metrics} />

      {/* Main Grid: Left (Trend Chart + Top Contracts) & Right (Profit by Service + Revenue Performance) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left Section (8 cols) */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6 flex flex-col justify-between">
          <MonthlyFinancialTrendChart
            data={trendData}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
            isRefreshing={isRefreshing}
            onRefresh={handleRefresh}
          />

          <TopContractsTable data={contractsData} />
        </div>

        {/* Right Section (4 cols) */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6 flex flex-col justify-between">
          <ProfitByServiceCard data={serviceProfitData} />

          <RevenuePerformanceCard data={revenuePerformance} />
        </div>
      </div>
    </div>
  );
}

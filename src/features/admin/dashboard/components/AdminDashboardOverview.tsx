"use client";

import React from "react";
import { AdminStatCards } from "./AdminStatCards";
import { JobPipelineCard } from "./JobPipelineCard";
import { CashFlowCard } from "./CashFlowCard";
import { TopContractsCard } from "./TopContractsCard";
import { MonthlyIncomeChart } from "./MonthlyIncomeChart";
import { NeedAttentionCard } from "./NeedAttentionCard";
import { OutstandingInvoicesTable } from "./OutstandingInvoicesTable";
import { TodaysRouteCard } from "./TodaysRouteCard";
import { FinancialOverviewCard } from "./FinancialOverviewCard";
import { ServiceDistributionCard } from "./ServiceDistributionCard";
import { RecentActivityCard } from "./RecentActivityCard";

export const AdminDashboardOverview: React.FC = () => {
  return (
    <div className="w-full space-y-5 md:space-y-6 max-w-[1600px] mx-auto animate-in fade-in duration-300">
      {/* 1. Top Row: 5 KPI Stat Cards */}
      <AdminStatCards />

      {/* 2. Main Dashboard Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-start">
        {/* Left Column (Approx 66% width) */}
        <div className="lg:col-span-8 space-y-5 md:space-y-6 min-w-0">
          {/* Row of 3 Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <JobPipelineCard />
            <CashFlowCard />
            <TopContractsCard />
          </div>

          {/* Monthly Income Dual Bar Chart */}
          <MonthlyIncomeChart />

          {/* Need Attention Notification Banners */}
          <NeedAttentionCard />

          {/* Outstanding Invoices Table with Search & Pagination */}
          <OutstandingInvoicesTable />
        </div>

        {/* Right Column (Approx 34% width) */}
        <div className="lg:col-span-4 space-y-5 md:space-y-6 min-w-0">
          {/* Today's Route Cards */}
          <TodaysRouteCard />

          {/* Financial Overview Progress Bars */}
          <FinancialOverviewCard />

          {/* Service Distribution Multi-ring Gauge */}
          <ServiceDistributionCard />

          {/* Recent Activity Timeline */}
          <RecentActivityCard />
        </div>
      </div>
    </div>
  );
};

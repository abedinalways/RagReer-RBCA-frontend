"use client";

import React from "react";
import Image from "next/image";
import { ContractProfitItem } from "../types";
import { useDragToScroll } from "@/hooks/useDragToScroll";

interface TopContractsTableProps {
  data: ContractProfitItem[];
}

export function TopContractsTable({ data }: TopContractsTableProps) {
  const { ref, events, dragClassName } = useDragToScroll<HTMLDivElement>();

  return (
    <div className="rounded border border-surface bg-pure-white-bg shadow-[2px_2px_22px_0px_rgba(55,36,31,0.01)] overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-border">
        <h2 className="text-lg md:text-xl font-normal text-primary-heading">
          Top Contracts by Profitability
        </h2>
      </div>

      {/* Table */}
      <div
        ref={ref}
        {...events}
        className={`w-full overflow-x-auto ${dragClassName}`}
      >
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-page-bg/40 border-b border-border">
              <th className="py-3 px-4 font-medium text-secondary-subheading whitespace-nowrap">
                Customer Name
              </th>
              <th className="py-3 px-4 font-medium text-secondary-subheading whitespace-nowrap">
                Jobs
              </th>
              <th className="py-3 px-4 font-medium text-secondary-subheading whitespace-nowrap">
                Revenue
              </th>
              <th className="py-3 px-4 font-medium text-secondary-subheading whitespace-nowrap">
                Crew Cost
              </th>
              <th className="py-3 px-4 font-medium text-secondary-subheading whitespace-nowrap">
                Profit
              </th>
              <th className="py-3 px-4 font-medium text-secondary-subheading whitespace-nowrap">
                Margin
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {data.map((item, idx) => (
              <tr
                key={`${item.id}-${idx}`}
                className="hover:bg-page-bg/50 transition-colors"
              >
                {/* Customer */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-border">
                      <Image
                        src={item.avatarUrl || "/images/customer_avatar.png"}
                        alt={item.customerName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium text-txt-primary">
                      {item.customerName}
                    </span>
                  </div>
                </td>

                {/* Jobs */}
                <td className="py-3.5 px-4 text-txt-primary whitespace-nowrap font-normal">
                  {item.jobs}
                </td>

                {/* Revenue */}
                <td className="py-3.5 px-4 text-txt-primary whitespace-nowrap font-normal">
                  {item.formattedRevenue}
                </td>

                {/* Crew Cost */}
                <td className="py-3.5 px-4 text-txt-primary whitespace-nowrap font-normal">
                  {item.formattedCrewCost}
                </td>

                {/* Profit */}
                <td className="py-3.5 px-4 text-txt-primary whitespace-nowrap font-normal">
                  {item.formattedProfit}
                </td>

                {/* Margin */}
                <td className="py-3.5 px-4 text-txt-primary whitespace-nowrap font-normal">
                  {item.margin}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

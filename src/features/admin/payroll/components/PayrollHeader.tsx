"use client";

import React from "react";
import { Download } from "lucide-react";
import { PayPeriodOption } from "../types";
import { PayPeriodDropdown } from "./PayPeriodDropdown";

interface PayrollHeaderProps {
  selectedPeriod: PayPeriodOption;
  onSelectPeriod: (period: PayPeriodOption) => void;
  onExport: () => void;
}

export function PayrollHeader({
  selectedPeriod,
  onSelectPeriod,
  onExport,
}: PayrollHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
      {/* Title */}
      <div>
        <h1 className="text-xl md:text-2xl font-medium text-primary-heading tracking-tight">
          Payroll
        </h1>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 sm:flex sm:items-center gap-2.5 sm:gap-3">
        <div className="w-full sm:w-auto">
          <PayPeriodDropdown
            selectedPeriod={selectedPeriod}
            onSelectPeriod={onSelectPeriod}
          />
        </div>

        <button
          type="button"
          onClick={onExport}
          className="h-10 px-4 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer active:scale-[0.99]"
        >
          <span>Export</span>
          <Download className="w-4 h-4 stroke-[2]" />
        </button>
      </div>
    </div>
  );
}

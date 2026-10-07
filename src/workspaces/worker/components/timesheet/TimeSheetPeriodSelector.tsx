"use client";

import { CustomSelect } from "@/components/ui/CustomSelect";
import { PeriodOption } from "../../hooks/useWorkerTimeSheet";

interface TimeSheetPeriodSelectorProps {
  title?: string;
  selectedPeriod: string;
  periodOptions: PeriodOption[];
  onPeriodChange: (period: string) => void;
}

export function TimeSheetPeriodSelector({
  title = "Total Work Time",
  selectedPeriod,
  periodOptions,
  onPeriodChange,
}: TimeSheetPeriodSelectorProps) {
  return (
    <div className="flex items-center justify-between pt-1">
      <h2 className="text-xl font-medium text-txt-primary tracking-tight">
        {title}
      </h2>
      <div className="w-28">
        <CustomSelect
          options={periodOptions}
          value={selectedPeriod}
          onChange={onPeriodChange}
          size="sm"
          align="right"
          triggerClassName="h-9 text-sm font-medium border-border/90 rounded-lg bg-card-bg text-secondary-subheading"
        />
      </div>
    </div>
  );
}

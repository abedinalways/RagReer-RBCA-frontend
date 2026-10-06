import { Clock } from "lucide-react";

interface TotalHoursCardProps {
  periodLabel: string;
  totalHours: string;
  regularPercentage: number;
  overtimePercentage: number;
}

export function TotalHoursCard({
  periodLabel,
  totalHours,
  regularPercentage,
  overtimePercentage,
}: TotalHoursCardProps) {
  return (
    <div className="rounded-md border border-border bg-card-bg p-4 shadow-2xs space-y-3.5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-2xs">
          <Clock className="h-4 w-4" />
        </div>
        <span className="text-sm font-medium text-txt-primary">
          {periodLabel}
        </span>
      </div>

      <div className="flex items-baseline">
        <span className="text-xl font-medium tracking-tight text-primary-heading">
          {totalHours}
        </span>
        <span className="ml-1.5 text-sm font-normal text-secondary-subheading">
          h
        </span>
      </div>

      {/* Dual-color Progress Bar (Regular Time vs Over Time) */}
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100 flex">
        <div
          className="h-full bg-primary rounded-l-full transition-all duration-500"
          style={{ width: `${regularPercentage}%` }}
        />
        <div
          className="h-full bg-trend-down rounded-r-full transition-all duration-500"
          style={{ width: `${overtimePercentage}%` }}
        />
      </div>
    </div>
  );
}

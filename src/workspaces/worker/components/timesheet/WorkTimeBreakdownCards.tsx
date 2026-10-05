import { TrendingUp, TrendingDown } from "lucide-react";

interface WorkTimeBreakdownCardsProps {
  regularTime: string;
  overTime: string;
  trend: string;
  trendType: "up" | "down";
}

export function WorkTimeBreakdownCards({
  regularTime,
  overTime,
  trend,
  trendType,
}: WorkTimeBreakdownCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Regular Work Time */}
      <div className="flex flex-col justify-between rounded-xl border border-border bg-card-bg p-3.5 shadow-2xs">
        <span className="text-xs font-medium text-[#5980A6] leading-tight">
          Regular Work Time
        </span>
        <div className="flex items-baseline mt-2.5">
          <span className="text-xl font-bold tracking-tight text-primary-heading font-barlow">
            {regularTime}
          </span>
          <span className="ml-1 text-xs font-normal text-secondary-subheading">
            h
          </span>
        </div>
      </div>

      {/* Over Time */}
      <div className="flex flex-col justify-between rounded-xl border border-border bg-card-bg p-3.5 shadow-2xs">
        <span className="text-xs font-medium text-[#5980A6] leading-tight">
          Over Time
        </span>
        <div className="flex items-baseline justify-between mt-2.5">
          <div className="flex items-baseline">
            <span className="text-xl font-bold tracking-tight text-primary-heading font-barlow">
              {overTime}
            </span>
            <span className="ml-1 text-xs font-normal text-secondary-subheading">
              h
            </span>
          </div>

          <div
            className={`flex items-center gap-0.5 text-xs font-semibold ${
              trendType === "up" ? "text-trend-up" : "text-trend-down"
            }`}
          >
            {trendType === "up" ? (
              <TrendingUp className="h-3 w-3 stroke-[2.5]" />
            ) : (
              <TrendingDown className="h-3 w-3 stroke-[2.5]" />
            )}
            <span>{trend}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

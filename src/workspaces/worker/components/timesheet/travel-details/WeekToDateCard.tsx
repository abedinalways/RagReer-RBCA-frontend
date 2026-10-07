"use client";

interface WeekToDateCardProps {
  currentHours?: number;
  totalTargetHours?: number;
}

export function WeekToDateCard({
  currentHours = 34.5,
  totalTargetHours = 40,
}: WeekToDateCardProps) {
  const percent = Math.min(
    Math.round((currentHours / totalTargetHours) * 100),
    100
  );

  return (
    <div className="rounded-md border border-border-card bg-blue-50/50 p-3 space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-primary-heading">Week to date</span>
        <span className="font-semibold text-primary">
          {currentHours}h <span className="text-secondary-subheading font-normal">/ {totalTargetHours}h</span>
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-1.5 rounded-full bg-card-bg overflow-hidden border border-blue-100">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

"use client";

interface TimeClockCardProps {
  timeFormatted: string; // e.g. "00:00:00 h" or "01:32:34 h"
  statusBadge?: string;  // e.g. "Running"
  subtitleNode?: React.ReactNode; // e.g. "Start Working"
}

export function TimeClockCard({
  timeFormatted,
  statusBadge = "Running",
  subtitleNode,
}: TimeClockCardProps) {
  return (
    <div className="rounded-md border border-border-input bg-card-bg p-5 shadow-2xs space-y-3">
      {/* Top Header: Label + Status Badge */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-normal text-secondary-subheading">
          Time Clock
        </span>
        {statusBadge && (
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-sm bg-status-running-bg text-status-running-text border border-blue-100">
            {statusBadge}
          </span>
        )}
      </div>

      {/* Big Digital Clock Display */}
      <div className="text-center py-1">
        <div className="font-barlow text-4xl sm:text-5xl font-semibold tracking-tight text-primary-heading">
          {timeFormatted}
        </div>

        {subtitleNode && (
          <div className="text-xs text-secondary-subheading mt-1.5 font-normal">
            {subtitleNode}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { MapPin, Calendar, Clock } from "lucide-react";

export interface RecentEntryItem {
  id: string;
  title: string;
  duration: string;
  address: string;
  dateText: string;
  timeText: string;
  status: "Running" | "Submited" | "Completed";
}

interface TimeEntryRecentCardProps {
  entries?: RecentEntryItem[];
  // Fallbacks for single item usage
  title?: string;
  duration?: string;
  address?: string;
  dateText?: string;
  timeText?: string;
  status?: "Running" | "Submited" | "Completed";
}

export function TimeEntryRecentCard({
  entries,
  title = "Traveling Time",
  duration = "0:25h",
  address = "John Young Pkwy - 100 Whisperi...",
  dateText = "Aug 29",
  timeText = "8:20AM -Running",
  status = "Running",
}: TimeEntryRecentCardProps) {
  const displayList: RecentEntryItem[] =
    entries && entries.length > 0
      ? entries
      : [
          {
            id: "entry-default",
            title,
            duration,
            address,
            dateText,
            timeText,
            status,
          },
        ];

  return (
    <section className="space-y-2 pt-1">
      <h2 className="font-barlow text-lg font-semibold tracking-tight text-primary-heading">
        Recent entries
      </h2>

      <div className="space-y-2">
        {displayList.map((item) => (
          <div
            key={item.id}
            className="rounded-md border border-border-input bg-card-bg p-3.5 shadow-2xs space-y-2"
          >
            {/* Top Row: Title + Duration */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-primary-heading leading-tight">
                {item.title}
              </h3>
              <span className="font-barlow text-sm font-bold text-primary-heading">
                {item.duration}
              </span>
            </div>

            {/* Middle Row: Location Address + Status Badge */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs text-secondary-subheading min-w-0">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-secondary-subheading" />
                <span className="truncate">{item.address}</span>
              </div>

              <span className="shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-sm bg-status-running-bg text-status-running-text border border-blue-100">
                {item.status}
              </span>
            </div>

            {/* Bottom Row: Calendar Date + Clock & Running Status */}
            <div className="flex items-center gap-4 pt-0.5 text-xs text-secondary-subheading">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 shrink-0 text-secondary-subheading" />
                <span>{item.dateText}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 shrink-0 text-secondary-subheading" />
                <span>{item.timeText}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

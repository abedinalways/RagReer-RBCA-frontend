import { MapPin } from "lucide-react";
import { DailyTimeEntry } from "../../data/mockWorkerTimeSheet";

interface DailyTimeEntryCardProps {
  entry: DailyTimeEntry;
}

export function DailyTimeEntryCard({ entry }: DailyTimeEntryCardProps) {
  return (
    <div className="flex items-center gap-3.5 rounded-md border border-border bg-card-bg p-3 shadow-2xs transition-all hover:border-primary/40 hover:shadow-xs">
      {/* Date Box */}
      <div className="flex flex-col items-center justify-center rounded-lg bg-blue-50/70 border border-blue-100/50 px-3 py-2 min-w-[70px] shrink-0 text-center">
        <span className="text-xs font-medium text-txt-primary leading-tight">
          {entry.month}
        </span>
        <span className="text-xl font-bold text-primary-heading leading-tight my-0.5 font-barlow">
          {entry.day}
        </span>
        <span className="text-[11px] font-normal text-secondary-subheading leading-tight">
          {entry.weekday}
        </span>
      </div>

      {/* Work Details */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="text-base font-semibold text-primary leading-tight">
          {entry.duration}
        </div>
        <div className="text-sm font-semibold text-secondary-subheading truncate leading-snug">
          {entry.title}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-secondary-subheading">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-secondary-subheading" />
          <span className="truncate">{entry.address}</span>
        </div>
      </div>
    </div>
  );
}

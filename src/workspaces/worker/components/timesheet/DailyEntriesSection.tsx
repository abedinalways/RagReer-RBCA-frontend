import { DailyTimeEntry } from "../../data/mockWorkerTimeSheet";
import { DailyTimeEntryCard } from "./DailyTimeEntryCard";

interface DailyEntriesSectionProps {
  entries: DailyTimeEntry[];
  entriesCountText: string;
}

export function DailyEntriesSection({
  entries,
  entriesCountText,
}: DailyEntriesSectionProps) {
  return (
    <section className="space-y-3 pt-1">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-txt-primary tracking-tight">
          Daily entries
        </h2>
        <span className="text-xs font-semibold text-primary">
          {entriesCountText}
        </span>
      </div>

      <div className="space-y-3">
        {entries.map((entry) => (
          <DailyTimeEntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}

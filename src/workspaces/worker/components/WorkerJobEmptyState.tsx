import { Briefcase } from "lucide-react";

interface WorkerJobEmptyStateProps {
  selectedDateKey: string | null;
  onClearDateFilter: () => void;
}

export function WorkerJobEmptyState({
  selectedDateKey,
  onClearDateFilter,
}: WorkerJobEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg border border-dashed border-border bg-card-bg text-center space-y-3">
      <div className="p-3 rounded-full bg-blue-50 text-primary">
        <Briefcase className="h-6 w-6" />
      </div>
      <div>
        <h3 className="text-base font-medium text-primary-heading">
          No jobs found
        </h3>
        <p className="text-xs text-secondary-subheading mt-1 max-w-[240px]">
          There are no jobs scheduled for {selectedDateKey || "this filter"}.
        </p>
      </div>
      {selectedDateKey && (
        <button
          type="button"
          onClick={onClearDateFilter}
          className="text-xs font-semibold text-primary hover:underline cursor-pointer"
        >
          Show all upcoming jobs
        </button>
      )}
    </div>
  );
}

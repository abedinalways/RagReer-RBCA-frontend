export function TimeSheetSkeleton() {
  return (
    <div
      className="w-full max-w-md mx-auto space-y-4 animate-pulse"
      aria-busy="true"
      aria-label="Loading time sheet"
    >
      {/* 1. Page Header Skeleton */}
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="h-6 w-44 rounded-md bg-slate-200" />
      </div>

      {/* 2. Total Work Time Header & Period Selector Skeleton */}
      <div className="flex items-center justify-between pt-1">
        <div className="h-6 w-36 rounded-md bg-slate-200" />
        <div className="h-9 w-28 rounded-lg bg-slate-200/80 border border-border" />
      </div>

      {/* 3. Total Hours Card Skeleton */}
      <div className="rounded-xl border border-border bg-card-bg p-4 shadow-2xs space-y-3.5">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-slate-200 shrink-0" />
          <div className="h-4 w-36 rounded-md bg-slate-200" />
        </div>

        <div className="flex items-baseline">
          <div className="h-8 w-32 rounded-md bg-slate-200" />
        </div>

        {/* Progress Bar Skeleton */}
        <div className="h-2 w-full rounded-full bg-slate-200" />
      </div>

      {/* 4. Regular Work Time & Over Time Breakdown Cards Skeleton */}
      <div className="grid grid-cols-2 gap-3">
        {/* Regular Work Time */}
        <div className="flex flex-col justify-between rounded-xl border border-border bg-card-bg p-3.5 shadow-2xs space-y-3">
          <div className="h-3.5 w-24 rounded-md bg-slate-200" />
          <div className="h-6 w-20 rounded-md bg-slate-200" />
        </div>

        {/* Over Time */}
        <div className="flex flex-col justify-between rounded-xl border border-border bg-card-bg p-3.5 shadow-2xs space-y-3">
          <div className="h-3.5 w-16 rounded-md bg-slate-200" />
          <div className="flex items-center justify-between">
            <div className="h-6 w-16 rounded-md bg-slate-200" />
            <div className="h-4 w-12 rounded-md bg-slate-200" />
          </div>
        </div>
      </div>

      {/* 5. Daily Entries Section Skeleton */}
      <section className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div className="h-6 w-28 rounded-md bg-slate-200" />
          <div className="h-4 w-12 rounded-md bg-slate-200" />
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3.5 rounded-xl border border-border bg-card-bg p-3 shadow-2xs"
            >
              {/* Date Box Skeleton */}
              <div className="flex flex-col items-center justify-center rounded-lg bg-blue-50/50 border border-blue-100/40 p-2 min-w-[70px] h-[68px] shrink-0 space-y-1.5">
                <div className="h-2.5 w-10 rounded-sm bg-slate-200" />
                <div className="h-5 w-6 rounded-sm bg-slate-200" />
                <div className="h-2.5 w-11 rounded-sm bg-slate-200" />
              </div>

              {/* Details Skeleton */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="h-4 w-20 rounded-md bg-slate-200" />
                <div className="h-3.5 w-4/5 rounded-md bg-slate-200" />
                <div className="h-3 w-3/5 rounded-md bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

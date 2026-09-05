/**
 * Static placeholder rendered while the login form (which reads
 * `useSearchParams`) bails out of prerendering — same pattern as
 * `zvonsystem-dashboard/src/components/LoginFallback.tsx`.
 */
export default function LoginFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md animate-pulse rounded-2xl bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="h-8 w-40 rounded-full bg-slate-200" />
          <div className="mt-3 h-4 w-32 rounded-full bg-slate-100" />
        </div>

        <div className="mt-8 space-y-4">
          <div className="space-y-2">
            <div className="h-4 w-14 rounded-full bg-slate-100" />
            <div className="h-11 rounded-lg border border-slate-200 bg-slate-50" />
          </div>

          <div className="space-y-2">
            <div className="h-4 w-20 rounded-full bg-slate-100" />
            <div className="h-11 rounded-lg border border-slate-200 bg-slate-50" />
          </div>

          <div className="h-11 rounded-lg bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
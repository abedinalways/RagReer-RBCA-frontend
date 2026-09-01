import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "Home" };

export default function WorkerHomePage() {
  return (
    <PlaceholderPage
      title="Today"
      description="Worker home — job summary + quick actions. Data will come from features/jobs & features/time-tracking."
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-2xl font-semibold text-slate-900">1</p>
          <p className="text-xs text-slate-500">Current jobs</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-2xl font-semibold text-slate-900">2</p>
          <p className="text-xs text-slate-500">Upcoming jobs</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-2xl font-semibold text-slate-900">6h 25m</p>
          <p className="text-xs text-slate-500">Time this week</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-2xl font-semibold text-slate-900">0</p>
          <p className="text-xs text-slate-500">Pending reports</p>
        </div>
      </div>
    </PlaceholderPage>
  );
}
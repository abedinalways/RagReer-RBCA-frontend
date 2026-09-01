"use client";

import { useAppStore } from "@/store/store";

export function WorkerHeader() {
  const user = useAppStore((state) => state.user);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between bg-white px-4 shadow-sm">
      <div className="flex items-center gap-2">
        <span aria-hidden>🔧</span>
        <span className="font-semibold text-slate-900">RagReer Jobs</span>
      </div>
      <span className="text-sm font-medium text-slate-600">{user?.name ?? "Worker"}</span>
    </header>
  );
}
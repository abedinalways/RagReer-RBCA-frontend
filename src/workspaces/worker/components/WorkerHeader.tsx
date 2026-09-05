"use client";

import { useAppSelector } from "@/redux/store";
import { selectCurrentUser } from "@/features/auth";
import { LogoutButton } from "@/components/shared/LogoutButton";

export function WorkerHeader() {
  const user = useAppSelector(selectCurrentUser);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between bg-white px-4 shadow-sm">
      <div className="flex items-center gap-2">
        <span aria-hidden>🔧</span>
        <span className="font-semibold text-slate-900">RagReer Jobs</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-600">{user?.name ?? "Worker"}</span>
        <LogoutButton />
      </div>
    </header>
  );
}
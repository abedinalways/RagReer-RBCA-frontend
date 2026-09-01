"use client";

import { useAppStore } from "@/store/store";
import { ROLE_LABELS } from "@/access-control/roles/roles";
import { LogoutButton } from "@/components/shared/LogoutButton";

export function CustomerHeader() {
  const user = useAppStore((state) => state.user);
  const role = useAppStore((state) => state.role);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">
      <div>
        <p className="text-sm font-medium text-slate-800">{user?.name ?? "Welcome"}</p>
        <p className="text-xs text-slate-500">{role ? ROLE_LABELS[role] : ""} Portal</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">Customer</span>
        <LogoutButton />
      </div>
    </header>
  );
}
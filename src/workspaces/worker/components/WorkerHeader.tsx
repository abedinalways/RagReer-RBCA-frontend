"use client";

import { useAppSelector } from "@/redux/store";
import { selectCurrentUser } from "@/features/auth";
import { Bell } from "lucide-react";
import { LogoutButton } from "@/components/shared/LogoutButton";

export function WorkerHeader() {
  const user = useAppSelector(selectCurrentUser);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card-bg px-4 py-3 shadow-xs">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 overflow-hidden rounded-xl border border-border bg-slate-100">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
            alt={user?.name ?? "User avatar"}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-base font-bold leading-snug text-primary-heading">
            Good morning, {user?.name ?? "Luis"}
          </h1>
          <p className="text-xs font-medium text-secondary-subheading">
            Sunday, Agu 23
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-slate-50 text-secondary-subheading transition-colors hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4 text-primary-heading" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary" />
        </button>
        <LogoutButton />
      </div>
    </header>
  );
}
"use client";

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { selectCurrentRole, selectCurrentUser } from "@/features/auth";
import { toggleSidebar } from "@/features/ui";
import { ROLE_LABELS } from "@/access-control/roles/roles";
import { LogoutButton } from "@/components/shared/LogoutButton";

/** Mobile top bar for the admin workspace. */
export function AdminHeader() {
  const user = useAppSelector(selectCurrentUser);
  const role = useAppSelector(selectCurrentRole);
  const dispatch = useAppDispatch();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => dispatch(toggleSidebar())}
          aria-label="Open navigation"
          className="rounded-md p-2 text-slate-500 hover:bg-slate-100"
        >
          ☰
        </button>
        <span className="font-semibold text-slate-900">🏢 RBCA</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-slate-800">{user?.name ?? "Admin"}</p>
          <p className="text-xs text-slate-500">{role ? ROLE_LABELS[role] : ""}</p>
        </div>
        <LogoutButton />
      </div>
    </header>
  );
}
"use client";

import { useAppSelector } from "@/redux/store";
import { selectCurrentUser } from "@/features/auth";
import { LogoutButton } from "@/components/shared/LogoutButton";
import { NotificationBellIcon } from "./icons/WorkerHeaderIcons";

export function WorkerHeader() {
  const user = useAppSelector(selectCurrentUser);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card-bg px-4 py-3 shadow-xs">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 overflow-hidden rounded-xl border border-border bg-slate-100 shrink-0">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
            alt={user?.name ?? "User avatar"}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-base font-medium leading-[116%] text-primary-heading">
            Good morning, {user?.name ?? "Luis"}
          </h1>
          <p className="text-xs font-normal leading-[114%] text-secondary-subheading">
            Sunday, Agu 23
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* Notification Button styled per Figma spec */}
        <button
          type="button"
          className="flex p-3 items-center justify-center gap-2.5 rounded-md border border-[#E9E9EA] bg-[#F2F2F3] shadow-[0_4px_16px_0_rgba(1,5,17,0.08)] transition-all duration-200 hover:bg-[#EAEAEA] active:scale-95 cursor-pointer"
          aria-label="Notifications"
        >
          <NotificationBellIcon className="h-6 w-6 text-primary" />
        </button>
        <LogoutButton />
      </div>
    </header>
  );
}
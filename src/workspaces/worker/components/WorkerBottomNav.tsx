"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, Clock, User } from "lucide-react";
import { usePermission } from "@/access-control/hooks/usePermission";
import { cn } from "@/lib/utils";
import { workerNavigation } from "../navigation/worker-navigation";

const NAV_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Home: Home,
  Jobs: Briefcase,
  Time: Clock,
  Profile: User,
};

export function WorkerBottomNav() {
  const pathname = usePathname();
  const { can } = usePermission();

  const visibleItems = workerNavigation.filter((item) => !item.permission || can(item.permission));

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 pointer-events-none">
      <div className="mx-auto w-full max-w-md px-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] pl-[max(0.75rem,env(safe-area-inset-left,0px))] pr-[max(0.75rem,env(safe-area-inset-right,0px))]">
        <nav
          aria-label="Worker navigation"
          className="pointer-events-auto rounded-md border border-[#D5E3F0] bg-blue-50/95 p-1 sm:p-1.5 shadow-lg shadow-slate-900/10 backdrop-blur-md"
        >
          <div
            className="grid gap-1 items-center"
            style={{
              gridTemplateColumns: `repeat(${visibleItems.length || 4}, minmax(0, 1fr))`,
            }}
          >
            {visibleItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const IconComponent = NAV_ICONS[item.label] || Home;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group flex min-w-0 flex-col items-center justify-center gap-1 rounded-md py-2 px-1 sm:py-2.5 sm:px-2 transition-all duration-200 select-none touch-manipulation",
                    active
                      ? "bg-primary text-white shadow-xs"
                      : "bg-transparent text-primary hover:bg-white/60 active:scale-95",
                  )}
                >
                  <IconComponent
                    className={cn(
                      "h-5 w-5 shrink-0 transition-transform duration-200",
                      active ? "scale-105" : "group-hover:scale-105",
                    )}
                  />
                  <span className="w-full truncate text-center text-[10px] sm:text-xs font-semibold leading-tight tracking-tight">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
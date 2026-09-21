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

/** Primary PWA navigation — floating bottom rounded tab bar based on Figma spec. */
export function WorkerBottomNav() {
  const pathname = usePathname();
  const { can } = usePermission();

  const visibleItems = workerNavigation.filter((item) => !item.permission || can(item.permission));

  return (
    <nav className="fixed inset-x-3 bottom-3 z-40 mx-auto w-[calc(100%-1.5rem)] max-w-md rounded-2xl border border-[#D5E3F0] bg-blue-50/95 p-1.5 shadow-lg shadow-slate-900/5 backdrop-blur-md">
      <div className="grid grid-cols-4 gap-1">
        {visibleItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const IconComponent = NAV_ICONS[item.label] || Home;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-xl py-2.5 px-2 transition-all duration-200 select-none",
                active
                  ? "bg-primary text-white shadow-xs"
                  : "bg-transparent text-primary hover:bg-white/50 active:scale-95",
              )}
            >
              <IconComponent
                className={cn("h-5 w-5 transition-transform duration-200", active ? "scale-105" : "")}
              />
              <span className="text-xs font-semibold leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
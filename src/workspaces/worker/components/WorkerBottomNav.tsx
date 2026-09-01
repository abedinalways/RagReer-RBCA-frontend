"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePermission } from "@/access-control/hooks/usePermission";
import { cn } from "@/lib/utils";
import { workerNavigation } from "../navigation/worker-navigation";

/** Primary PWA navigation — fixed bottom tab bar. */
export function WorkerBottomNav() {
  const pathname = usePathname();
  const { can } = usePermission();

  const visibleItems = workerNavigation.filter((item) => !item.permission || can(item.permission));

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-md border-t border-slate-200 bg-white/95 backdrop-blur">
      <div className="grid grid-cols-4">
        {visibleItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium",
                active ? "text-indigo-600" : "text-slate-500",
              )}
            >
              <span className="text-xl" aria-hidden>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
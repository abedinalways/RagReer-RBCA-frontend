"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePermission } from "@/access-control/hooks/usePermission";
import { cn } from "@/lib/utils";
import { adminNavigation } from "../navigation/admin-navigation";

/** Mobile bottom navigation — horizontal, permission-filtered (Rule ④). */
export function AdminMobileNavigation() {
  const pathname = usePathname();
  const { can } = usePermission();

  const visibleItems = adminNavigation.filter((item) => !item.permission || can(item.permission));

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur lg:hidden">
      <div className="flex overflow-x-auto">
        {visibleItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-w-[4.5rem] flex-1 flex-col items-center gap-1 px-2 py-2 text-[11px] font-medium",
                active ? "text-indigo-600" : "text-slate-500",
              )}
            >
              <span className="text-base" aria-hidden>
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
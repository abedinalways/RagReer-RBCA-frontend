"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePermission } from "@/access-control/hooks/usePermission";
import { cn } from "@/lib/utils";
import { adminNavigation } from "../navigation/admin-navigation";

/** Desktop sidebar — renders only items the user has permission for (Rule ④). */
export function AdminSidebar() {
  const pathname = usePathname();
  const { can } = usePermission();

  const visibleItems = adminNavigation.filter((item) => !item.permission || can(item.permission));

  return (
    <aside className="flex h-full w-full flex-col bg-white">
      <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-6 text-lg font-semibold text-slate-900">
        <span aria-hidden>🏢</span> RBCA Admin
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {visibleItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              )}
            >
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-4 text-xs text-slate-400">
        Admin · Staff workspace
      </div>
    </aside>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePermission } from "@/access-control/hooks/usePermission";
import { cn } from "@/lib/utils";
import { customerNavigation } from "../navigation/customer-navigation";

export function CustomerSidebar() {
  const pathname = usePathname();
  const { can } = usePermission();

  const visibleItems = customerNavigation.filter((item) => !item.permission || can(item.permission));

  return (
    <aside className="flex h-full flex-col bg-layout-bg">
      <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-6 text-lg font-semibold text-slate-900">
        <span aria-hidden>🏠</span> My Portal
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
                  ? "bg-primary text-primary-text"
                  : "text-slate-600 hover:bg-page-bg hover:text-primary",
              )}
            >
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-4 text-xs text-slate-400">Customer workspace</div>
    </aside>
  );
}
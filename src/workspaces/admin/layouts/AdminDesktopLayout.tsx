/**
 * workspaces/admin/layouts/AdminDesktopLayout.tsx
 * Desktop app shell — persistent sidebar + content column.
 */

import { AdminSidebar } from "../components/AdminSidebar";

export function AdminDesktopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden min-h-screen bg-slate-50 lg:grid lg:grid-cols-[16rem_1fr]">
      <div className="sticky top-0 h-screen border-r border-slate-200 bg-white">
        <AdminSidebar />
      </div>
      <div className="min-w-0">
        <main className="h-full p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
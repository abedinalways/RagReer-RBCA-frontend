/**
 * workspaces/admin/layouts/AdminMobileLayout.tsx
 * Mobile shell — compact header + bottom navigation bar.
 */

import { AdminHeader } from "../components/AdminHeader";
import { AdminMobileNavigation } from "../components/AdminMobileNavigation";

export function AdminMobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 lg:hidden">
      <AdminHeader />
      <main className="flex-1 p-4 pb-24">{children}</main>
      <AdminMobileNavigation />
    </div>
  );
}
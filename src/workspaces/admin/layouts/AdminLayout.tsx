/**
 * workspaces/admin/layouts/AdminLayout.tsx
 *
 * Orchestrates the two responsive shells (Rule 16):
 *   - AdminDesktopLayout → sidebar app shell (lg+)
 *   - AdminMobileLayout  → header + bottom-nav app shell (<lg)
 * Both shells render the SAME page content from `features/…`.
 */

import { AdminDesktopLayout } from "./AdminDesktopLayout";
import { AdminMobileLayout } from "./AdminMobileLayout";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminDesktopLayout>{children}</AdminDesktopLayout>
      <AdminMobileLayout>{children}</AdminMobileLayout>
    </>
  );
}
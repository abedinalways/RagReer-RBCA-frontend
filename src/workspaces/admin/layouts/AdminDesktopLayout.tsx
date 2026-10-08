"use client";

import { AdminLayout } from "./AdminLayout";

/**
 * AdminDesktopLayout — delegated to AdminLayout for responsive unified behavior.
 */
export function AdminDesktopLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
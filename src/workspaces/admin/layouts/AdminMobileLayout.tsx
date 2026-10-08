"use client";

import { AdminLayout } from "./AdminLayout";

/**
 * AdminMobileLayout — delegated to AdminLayout for responsive unified behavior.
 */
export function AdminMobileLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
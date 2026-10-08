import type { Metadata } from "next";
import { Suspense } from "react";
import { SettingsView } from "@/features/admin/settings/components/SettingsView";

export const metadata: Metadata = {
  title: "Settings | Admin",
  description: "Manage company profile, scheduling rules, billing preferences, and system security.",
};

export default function AdminSettingsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-100 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <SettingsView />
    </Suspense>
  );
}
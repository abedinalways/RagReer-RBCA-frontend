import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "Settings" };

export default function AdminSettingsPage() {
  return (
    <PlaceholderPage
      title="Settings"
      description="System & staff settings. Staff permission configuration will render PERMISSION_GROUPS from access-control."
    />
  );
}
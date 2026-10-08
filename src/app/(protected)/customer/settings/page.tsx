import type { Metadata } from "next";
import { ProfileSettings } from "@/features/customer/settings/components/ProfileSettings";

export const metadata: Metadata = {
  title: "Profile Settings",
  description: "Manage your profile and account settings",
};

export default function CustomerSettingsPage() {
  return <ProfileSettings />;
}

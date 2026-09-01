import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "Dashboard" };

export default function AdminDashboardPage() {
  return (
    <PlaceholderPage
      title="Dashboard"
      description="Role & permission-aware overview for admin staff. Widgets will render from features/dashboard."
    />
  );
}
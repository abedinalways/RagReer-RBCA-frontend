import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "Roles & Permission" };

export default function AdminRolesPage() {
  return (
    <PlaceholderPage
      title="Roles & Permission"
      description="Manage administrative roles, team access tiers, and granular system privileges."
    />
  );
}

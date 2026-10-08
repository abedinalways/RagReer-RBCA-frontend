import type { Metadata } from "next";
import { RolesManagementView } from "@/features/admin/roles/components/RolesManagementView";

export const metadata: Metadata = {
  title: "Roles & Permission | Admin",
  description: "Manage administrative roles, team access tiers, and granular system privileges.",
};

export default function AdminRolesPage() {
  return <RolesManagementView />;
}

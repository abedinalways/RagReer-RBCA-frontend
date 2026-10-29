import type { Metadata } from "next";
import { AdminPropertiesView } from "@/features/admin/properties/components/AdminPropertiesView";

export const metadata: Metadata = {
  title: "Properties | Admin Console",
  description: "View and manage all customer properties, site access notes, and service histories.",
};

export default function AdminPropertiesPage() {
  return <AdminPropertiesView />;
}

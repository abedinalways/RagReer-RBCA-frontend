import type { Metadata } from "next";
import { EquipmentManagementView } from "@/features/admin/equipment/components/EquipmentManagementView";

export const metadata: Metadata = {
  title: "Equipment | Admin",
  description: "Track machinery, lawn care equipment assignments, maintenance cycles, and fleet inventory.",
};

export default function AdminEquipmentPage() {
  return <EquipmentManagementView />;
}

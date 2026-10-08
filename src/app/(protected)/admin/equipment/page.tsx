import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "Equipment" };

export default function AdminEquipmentPage() {
  return (
    <PlaceholderPage
      title="Equipment"
      description="Track machinery, lawn care equipment assignments, maintenance cycles, and fleet inventory."
    />
  );
}

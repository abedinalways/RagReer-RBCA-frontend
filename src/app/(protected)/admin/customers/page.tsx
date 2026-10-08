import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "Customers" };

export default function AdminCustomersPage() {
  return (
    <PlaceholderPage
      title="Customers"
      description="Customer records & lifecycle — implementation lives in features/customers."
    />
  );
}
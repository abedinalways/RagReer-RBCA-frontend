import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "CRM" };

export default function AdminCrmPage() {
  return (
    <PlaceholderPage
      title="CRM"
      description="CRM records, setup and reports — implementation lives in features/crm."
    />
  );
}
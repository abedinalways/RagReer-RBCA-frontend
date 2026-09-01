import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "Workers" };

export default function AdminWorkersPage() {
  return (
    <PlaceholderPage
      title="Workers"
      description="Worker records, skills & job assignment — implementation lives in features/workers."
    />
  );
}
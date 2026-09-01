import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "Profile" };

export default function WorkerProfilePage() {
  return (
    <PlaceholderPage
      title="Profile"
      description="Worker profile, documents & settings — implementation lives in features/workers."
    />
  );
}
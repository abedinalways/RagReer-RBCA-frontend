import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "Jobs" };

export default function AdminJobsPage() {
  return (
    <PlaceholderPage
      title="Jobs"
      description="Job scheduling, assignment & tracking — implementation lives in features/jobs."
    />
  );
}
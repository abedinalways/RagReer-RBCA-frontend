import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/shared/PlaceholderPage";

export const metadata: Metadata = { title: "Time" };

export default function WorkerTimePage() {
  return (
    <PlaceholderPage
      title="Time"
      description="Work logs & weekly summary — implementation lives in features/time-tracking."
    />
  );
}
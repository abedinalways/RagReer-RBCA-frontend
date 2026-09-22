import type { Metadata } from "next";
import { Suspense } from "react";
import { WorkerProfileView } from "@/workspaces/worker/components/profile/WorkerProfileView";

export const metadata: Metadata = {
  title: "Profile — Worker Workspace",
};

export default function WorkerProfilePage() {
  return (
    <Suspense fallback={<div className="p-4 text-center text-secondary-subheading text-sm font-medium">Loading profile...</div>}>
      <WorkerProfileView />
    </Suspense>
  );
}
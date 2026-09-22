import type { Metadata } from "next";
import { WorkerProfileView } from "@/workspaces/worker/components/profile/WorkerProfileView";

export const metadata: Metadata = {
  title: "Profile — Worker Workspace",
};

export default function WorkerProfilePage() {
  return <WorkerProfileView />;
}
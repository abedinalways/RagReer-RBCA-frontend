import type { Metadata } from "next";
import { WorkerHomeView } from "@/workspaces/worker/components/WorkerHomeView";

export const metadata: Metadata = { title: "Home — Worker Workspace" };

export default function WorkerHomePage() {
  return <WorkerHomeView />;
}
"use client";

import { usePathname } from "next/navigation";
import { WorkerBottomNav } from "../components/WorkerBottomNav";
import { WorkerHeader } from "../components/WorkerHeader";

export function WorkerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isJobDetails = pathname.startsWith("/worker/jobs/") && pathname !== "/worker/jobs";

  if (isJobDetails) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-[#F5F6F8] shadow-sm">
        <main className="flex-1">{children}</main>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-app-bg shadow-sm">
      <WorkerHeader />
      <main className="flex-1 p-4 pb-24">{children}</main>
      <WorkerBottomNav />
    </div>
  );
}
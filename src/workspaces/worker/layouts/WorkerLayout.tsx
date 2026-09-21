
import { WorkerBottomNav } from "../components/WorkerBottomNav";
import { WorkerHeader } from "../components/WorkerHeader";

export function WorkerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-page-bg shadow-sm">
      <WorkerHeader />
      <main className="flex-1 p-4 pb-24">{children}</main>
      <WorkerBottomNav />
    </div>
  );
}
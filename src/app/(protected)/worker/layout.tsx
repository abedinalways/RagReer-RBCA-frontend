import { RoleGuard } from "@/access-control/guards/RoleGuard";
import { ROLES } from "@/access-control/roles/roles";
import { WorkerLayout } from "@/workspaces/worker/layouts/WorkerLayout";

/** WORKER workspace (mobile PWA) — route-level access control. */
export default function WorkerWorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard roles={[ROLES.WORKER]}>
      <WorkerLayout>{children}</WorkerLayout>
    </RoleGuard>
  );
}
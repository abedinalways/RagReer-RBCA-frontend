import { RoleGuard } from "@/access-control/guards/RoleGuard";
import { ROLES } from "@/access-control/roles/roles";
import { WorkerLayout } from "@/workspaces/worker/layouts/WorkerLayout";

// Stable module-scope reference (see admin/layout.tsx for rationale).
const WORKER_ROLES = [ROLES.WORKER] as const;

/** WORKER workspace (mobile PWA) — route-level access control. */
export default function WorkerWorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard roles={WORKER_ROLES}>
      <WorkerLayout>{children}</WorkerLayout>
    </RoleGuard>
  );
}
import { RoleGuard } from "@/access-control/guards/RoleGuard";
import { ROLES } from "@/access-control/roles/roles";
import { AdminLayout } from "@/workspaces/admin/layouts/AdminLayout";

// Module-scope constant → stable reference. Prevents the RoleGuard effect from
// re-running on every render (a fresh array literal would change identity each
// render and fire unnecessary redirects during dev/Client renders).
const ADMIN_ROLES = [ROLES.ADMIN] as const;

/** ADMIN workspace — route-level access control (Rule ④ applies to routes too). */
export default function AdminWorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard roles={ADMIN_ROLES}>
      <AdminLayout>{children}</AdminLayout>
    </RoleGuard>
  );
}
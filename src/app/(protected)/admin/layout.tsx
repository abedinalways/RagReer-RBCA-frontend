import { RoleGuard } from "@/access-control/guards/RoleGuard";
import { ROLES } from "@/access-control/roles/roles";
import { AdminLayout } from "@/workspaces/admin/layouts/AdminLayout";

/** ADMIN workspace — route-level access control (Rule ④ applies to routes too). */
export default function AdminWorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard roles={[ROLES.ADMIN]}>
      <AdminLayout>{children}</AdminLayout>
    </RoleGuard>
  );
}
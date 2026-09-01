import { RoleGuard } from "@/access-control/guards/RoleGuard";
import { ROLES } from "@/access-control/roles/roles";
import { CustomerLayout } from "@/workspaces/customer/layouts/CustomerLayout";

/** CUSTOMER workspace — route-level access control. */
export default function CustomerWorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard roles={[ROLES.CUSTOMER]}>
      <CustomerLayout>{children}</CustomerLayout>
    </RoleGuard>
  );
}
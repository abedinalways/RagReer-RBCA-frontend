import { RoleGuard } from "@/access-control/guards/RoleGuard";
import { ROLES } from "@/access-control/roles/roles";
import { CustomerLayout } from "@/workspaces/customer/layouts/CustomerLayout";

// Stable module-scope reference (see admin/layout.tsx for rationale).
const CUSTOMER_ROLES = [ROLES.CUSTOMER] as const;

/** CUSTOMER workspace — route-level access control. */
export default function CustomerWorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard roles={CUSTOMER_ROLES}>
      <CustomerLayout>{children}</CustomerLayout>
    </RoleGuard>
  );
}
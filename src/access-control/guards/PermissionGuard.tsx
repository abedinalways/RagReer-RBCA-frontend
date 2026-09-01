"use client";

import type { PropsWithChildren, ReactNode } from "react";
import { usePermission } from "../hooks/usePermission";
import type { Permission } from "../permissions/permissions";

interface PermissionGuardProps extends PropsWithChildren {
  /** Required permission — renders children only when the user has it. */
  permission: Permission;
  /** Rendered when the user does NOT have the permission. Defaults to null. */
  fallback?: ReactNode;
}

/**
 * Rule ④ — declarative component-level access control.
 *
 *   <PermissionGuard permission={PERMISSIONS.LEAD.DELETE}>
 *     <button>Delete</button>
 *   </PermissionGuard>
 */
export function PermissionGuard({ permission, fallback = null, children }: PermissionGuardProps) {
  const { can } = usePermission();
  if (!can(permission)) return <>{fallback}</>;
  return <>{children}</>;
}
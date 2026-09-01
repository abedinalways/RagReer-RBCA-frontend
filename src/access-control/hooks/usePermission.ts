"use client";

import { useCallback } from "react";
import { useAppStore } from "@/store/store";
import { hasAnyPermission, hasAllPermissions, hasPermission } from "../access.utils";
import type { Permission } from "../permissions/permissions";

/**
 * Rule ④ — UI is permission-driven.
 *
 *   const { can } = usePermission();
 *   if (can(PERMISSIONS.LEAD.DELETE)) { ... }
 *   <PermissionGuard permission={PERMISSIONS.LEAD.DELETE}>…</PermissionGuard>
 */
export function usePermission() {
  const permissions = useAppStore((state) => state.permissions);
  const role = useAppStore((state) => state.role);

  const can = useCallback((permission: Permission) => hasPermission(permissions, permission), [permissions]);
  const canAny = useCallback((required: Permission[]) => hasAnyPermission(permissions, required), [permissions]);
  const canAll = useCallback((required: Permission[]) => hasAllPermissions(permissions, required), [permissions]);

  return { can, canAny, canAll, permissions, role };
}
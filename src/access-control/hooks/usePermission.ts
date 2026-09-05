"use client";

import { useCallback } from "react";
import { useAppSelector } from "@/redux/store";
import {
  selectCurrentRole,
  selectPermissions,
} from "@/features/auth/state/auth.slice";
import { hasAnyPermission, hasAllPermissions, hasPermission } from "../access.utils";
import type { Permission } from "../permissions/permissions";


export function usePermission() {
  const permissions = useAppSelector(selectPermissions);
  const role = useAppSelector(selectCurrentRole);

  const can = useCallback((permission: Permission) => hasPermission(permissions, permission), [permissions]);
  const canAny = useCallback((required: Permission[]) => hasAnyPermission(permissions, required), [permissions]);
  const canAll = useCallback((required: Permission[]) => hasAllPermissions(permissions, required), [permissions]);

  return { can, canAny, canAll, permissions, role };
}
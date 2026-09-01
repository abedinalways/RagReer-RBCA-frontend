

import type { Permission } from "./permissions/permissions";
import { ROLE_PERMISSIONS, type Role } from "./roles/roles";

export function hasPermission(userPermissions: Permission[] | undefined, permission: Permission): boolean {
  if (!userPermissions || userPermissions.length === 0) return false;
  return userPermissions.includes(permission);
}

export function hasAnyPermission(userPermissions: Permission[] | undefined, required: Permission[]): boolean {
  return required.some((permission) => hasPermission(userPermissions, permission));
}

export function hasAllPermissions(userPermissions: Permission[] | undefined, required: Permission[]): boolean {
  return required.every((permission) => hasPermission(userPermissions, permission));
}

/** Resolve the permission set that a given role carries (single source of truth). */
export function getPermissionsForRole(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}

/** Filter a navigation/action list by the current user's permissions. */
export function filterByPermissions<T>(
  items: readonly T[],
  permissionOf: (item: T) => Permission | undefined,
  userPermissions: Permission[] | undefined,
): T[] {
  return items.filter((item) => {
    const permission = permissionOf(item);
    return permission === undefined ? true : hasPermission(userPermissions, permission);
  });
}
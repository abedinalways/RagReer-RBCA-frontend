"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { PropsWithChildren, ReactNode } from "react";
import { useAppStore } from "@/store/store";
import { ROLE_HOME, type Role } from "../roles/roles";

interface RoleGuardProps extends PropsWithChildren {
  /** Roles allowed inside the guarded area. */
  roles: Role[];
  /** Shown while the guard evaluates / as a fallback. */
  fallback?: ReactNode;
}

/**
 * Route-level role protection. If the session role is not in `roles`,
 * the user is redirected to their own workspace home.
 *
 * Used by workspace route-groups:
 *   src/app/(protected)/admin/layout.tsx → <RoleGuard roles={[ROLES.ADMIN]}>
 */
export function RoleGuard({ roles, fallback = null, children }: RoleGuardProps) {
  const role = useAppStore((state) => state.role);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (role && !roles.includes(role)) {
      router.replace(ROLE_HOME[role] ?? "/login");
    }
  }, [isAuthenticated, role, roles, router]);

  if (!isAuthenticated || !role || !roles.includes(role)) return <>{fallback}</>;
  return <>{children}</>;
}
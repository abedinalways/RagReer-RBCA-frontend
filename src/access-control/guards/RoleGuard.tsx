"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { PropsWithChildren, ReactNode } from "react";
import { useAppSelector } from "@/redux/store";
import {
  selectCurrentRole,
  selectIsAuthenticated,
  selectIsHydrated,
} from "@/features/auth/state/auth.slice";
import { ROLE_HOME, type Role } from "../roles/roles";

interface RoleGuardProps extends PropsWithChildren {
  /** Roles allowed inside the guarded area. */
  roles: readonly Role[];
  /** Shown while the guard evaluates / as a fallback. */
  fallback?: ReactNode;
}

export function RoleGuard({ roles, fallback = null, children }: RoleGuardProps) {
  const hydrated = useAppSelector(selectIsHydrated);
  const role = useAppSelector(selectCurrentRole);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (role && !roles.includes(role)) {
      router.replace(ROLE_HOME[role] ?? "/login");
    }
  }, [hydrated, isAuthenticated, role, roles, router]);

  if (!hydrated || !isAuthenticated || !role || !roles.includes(role)) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
}
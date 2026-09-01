"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import {
  selectCurrentRole,
  selectIsAuthenticated,
  selectIsHydrated,
} from "@/redux/features/auth/authSlice";
import { ROLE_HOME } from "@/access-control/roles/roles";


export function WorkspaceRedirect() {
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
    if (role) router.replace(ROLE_HOME[role]);
  }, [hydrated, isAuthenticated, role, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-500">
      {hydrated && isAuthenticated && role
        ? `Redirecting to ${ROLE_HOME[role]}…`
        : "Redirecting to login…"}
    </div>
  );
}
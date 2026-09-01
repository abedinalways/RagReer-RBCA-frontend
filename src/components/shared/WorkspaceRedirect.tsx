"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/store";
import { ROLE_HOME } from "@/access-control/roles/roles";

/**
 * Root page redirect — lands the user on their role's workspace home.
 * (Replaced by server-side middleware once real auth lands.)
 */
export function WorkspaceRedirect() {
  const role = useAppStore((state) => state.role);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (role) router.replace(ROLE_HOME[role]);
  }, [isAuthenticated, role, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-500">
      {isAuthenticated && role ? `Redirecting to ${ROLE_HOME[role]}…` : "Redirecting to login…"}
    </div>
  );
}
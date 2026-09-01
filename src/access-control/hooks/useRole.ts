"use client";

import { useAppStore } from "@/store/store";
import { ROLE_HOME, ROLE_LABELS, type Role } from "../roles/roles";

/** Role helpers for the current session (read straight from the app store). */
export function useRole() {
  const role = useAppStore((state) => state.role);
  const user = useAppStore((state) => state.user);

  const isRole = (...candidates: Role[]) => role !== null && candidates.includes(role);

  return {
    role,
    isRole,
    roleLabel: role ? ROLE_LABELS[role] : "",
    roleHome: role ? ROLE_HOME[role] : "/login",
    displayName: user?.name ?? "",
  };
}
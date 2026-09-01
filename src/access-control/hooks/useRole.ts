"use client";

import { useAppSelector } from "@/redux/store";
import {
  selectCurrentRole,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import { ROLE_HOME, ROLE_LABELS, type Role } from "../roles/roles";

/** Role helpers for the current session (read straight from the Redux store). */
export function useRole() {
  const role = useAppSelector(selectCurrentRole);
  const user = useAppSelector(selectCurrentUser);

  const isRole = (...candidates: Role[]) => role !== null && candidates.includes(role);

  return {
    role,
    isRole,
    roleLabel: role ? ROLE_LABELS[role] : "",
    roleHome: role ? ROLE_HOME[role] : "/login",
    displayName: user?.name ?? "",
  };
}
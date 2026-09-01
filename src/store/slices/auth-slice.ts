/**
 * store/slices/auth-slice.ts
 *
 * Session & access state for the whole app. Seeded synchronously with a mock
 * session so there is no hydration flash. Later, swap `login/logout` for the
 * real auth provider (e.g. NextAuth / Clerk / your own API) — the shape of the
 * slice stays the same because access-control reads only these fields.
 */

import type { StateCreator } from "zustand";
import { getPermissionsForRole } from "@/access-control/access.utils";
import { ROLES, type Role } from "@/access-control/roles/roles";
import type { SessionUser } from "@/access-control/types";
import type { AppStore, AuthSlice } from "../types";

const DEFAULT_ROLE: Role = (process.env.NEXT_PUBLIC_MOCK_ROLE as Role | undefined) ?? ROLES.ADMIN;

const MOCK_NAMES: Record<Role, string> = {
  [ROLES.ADMIN]: "Admin User",
  [ROLES.CUSTOMER]: "Customer User",
  [ROLES.WORKER]: "Worker User",
};

const MOCK_EMAILS: Record<Role, string> = {
  [ROLES.ADMIN]: "admin@ragreer.com",
  [ROLES.CUSTOMER]: "customer@ragreer.com",
  [ROLES.WORKER]: "worker@ragreer.com",
};

function createMockUser(role: Role): SessionUser {
  return {
    id: "mock-user",
    name: MOCK_NAMES[role],
    email: MOCK_EMAILS[role],
    role,
    permissions: getPermissionsForRole(role),
  };
}

export const createAuthSlice: StateCreator<AppStore, [], [], AuthSlice> = (set) => ({
  user: createMockUser(DEFAULT_ROLE),
  role: DEFAULT_ROLE,
  permissions: getPermissionsForRole(DEFAULT_ROLE),
  isAuthenticated: true,

  login: (role, displayName) =>
    set((state) => ({
      user: { ...createMockUser(role), id: state.user?.id ?? "mock-user", name: displayName ?? MOCK_NAMES[role] },
      role,
      permissions: getPermissionsForRole(role),
      isAuthenticated: true,
    })),

  logout: () => set(() => ({ user: null, role: DEFAULT_ROLE, permissions: [], isAuthenticated: false })),
});
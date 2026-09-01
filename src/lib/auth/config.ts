import { ROLE_HOME } from "@/access-control/roles/roles";
import type { Role } from "@/access-control/roles/roles";

/**
 * Cookie names for the persisted browser session. Read/written by the auth
 * slice (client) and by `src/proxy.ts` (server middleware), exactly like
 * zvonsystem-dashboard's `src/lib/auth/config.ts`.
 */
export const authCookieNames = {
  token: "rgr_auth_token",
  refreshToken: "rgr_refresh_token",
  role: "rgr_auth_role",
} as const;

export const authRoutes = {
  home: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  emailVerify: "/email-verify",
} as const;

const VALID_ROLES: readonly Role[] = ["ADMIN", "CUSTOMER", "WORKER"];

/** Coerces an arbitrary string into one of the app roles, or null. */
export const normalizeAuthRole = (role?: string | null): Role | null => {
  if (role && VALID_ROLES.includes(role as Role)) {
    return role as Role;
  }

  return null;
};

/** Default landing page for a role; falls back to login for unauthenticated. */
export const getDefaultRouteForRole = (role?: string | null): string => {
  const normalizedRole = normalizeAuthRole(role);
  return normalizedRole ? ROLE_HOME[normalizedRole] : authRoutes.login;
};

/** True when the requested path belongs to the given role's workspace. */
export const isAllowedRedirectForRole = (
  role: Role | null,
  pathname?: string | null,
) => {
  if (!role || !pathname || !pathname.startsWith("/")) {
    return false;
  }

  const home = ROLE_HOME[role];
  return pathname === home || pathname.startsWith(`${home}/`);
};

/** Resolve where to send a user after a successful sign-in. */
export const resolvePostLoginPath = (
  role: Role | null,
  requestedPath?: string | null,
) => {
  if (isAllowedRedirectForRole(role, requestedPath)) {
    return requestedPath!;
  }

  return getDefaultRouteForRole(role);
};
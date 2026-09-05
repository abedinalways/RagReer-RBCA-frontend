import type {
  AuthTokenPayload,
  LoginResponse,
  RefreshTokenResponse,
} from "@/features/auth/types/auth.types";
import { normalizeAuthRole } from "@/lib/auth/config";
import { getPermissionsForRole } from "@/access-control/access.utils";
import { ROLES, type Role } from "@/access-control/roles/roles";
import type { SessionUser } from "@/access-control/types";
import type { AppDispatch } from "@/redux/store";
import {
  setCredentials,
  setSessionUser,
} from "@/features/auth/state/auth.slice";
import type { IUserProfile } from "@/features/auth/types/auth.types";

const extractTokenPayload = (
  payload?: LoginResponse | RefreshTokenResponse | null,
): AuthTokenPayload | null => {
  if (!payload) {
    return null;
  }

  return payload.authorization ?? payload.data ?? null;
};

export const extractAuthTokens = (
  payload?: LoginResponse | RefreshTokenResponse | null,
) => {
  const tokenPayload = extractTokenPayload(payload);

  return {
    accessToken: tokenPayload?.access_token ?? null,
    refreshToken: tokenPayload?.refresh_token ?? null,
  };
};

export const extractLoginAuthData = (payload: LoginResponse) => {
  const { accessToken, refreshToken } = extractAuthTokens(payload);
  const role = normalizeAuthRole(payload.type ?? null);

  return { accessToken, refreshToken, role };
};

/** Dispatch the credentials extracted from a successful login response. */
export const handleAuthSuccess = (
  payload: LoginResponse,
  dispatch: AppDispatch,
) => {
  const { accessToken, refreshToken, role } = extractLoginAuthData(payload);

  dispatch(
    setCredentials({
      token: accessToken,
      refreshToken,
      role,
    }),
  );
};

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

/** Build the local session user for a role (design-mode logins). */
export const buildMockUser = (role: Role, displayName?: string): SessionUser => ({
  id: `mock-${role.toLowerCase()}`,
  name: displayName ?? MOCK_NAMES[role],
  email: MOCK_EMAILS[role],
  role,
  permissions: getPermissionsForRole(role),
});

/** Map a `/auth/me` profile into the session user shape (permissions derived). */
export const mapProfileToSessionUser = (
  profile: IUserProfile,
): SessionUser => ({
  id: profile.id,
  name: profile.name,
  email: profile.email,
  role: normalizeAuthRole(profile.role ?? null) ?? ROLES.ADMIN,
  permissions: getPermissionsForRole(
    normalizeAuthRole(profile.role ?? null) ?? ROLES.ADMIN,
  ),
});

/**
 * Design-mode sign-in: stores local mock tokens + mock user without any
 * network call. In production the login page uses the real `logIn` mutation
 * instead, so this helper is only called from the demo role-picker.
 */
export const mockLogin = (
  role: Role,
  dispatch: AppDispatch,
  displayName?: string,
) => {
  const user = buildMockUser(role, displayName);

  dispatch(
    setCredentials({
      token: `design-mode-${role.toLowerCase()}-token`,
      refreshToken: `design-mode-${role.toLowerCase()}-refresh-token`,
      role,
      user,
    }),
  );
};

export { setSessionUser };
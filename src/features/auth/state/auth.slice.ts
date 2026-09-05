"use client";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { authCookieNames, normalizeAuthRole } from "@/lib/auth/config";
import { getPermissionsForRole } from "@/access-control/access.utils";
import type { Role } from "@/access-control/roles/roles";
import type { SessionUser } from "@/access-control/types";
import type { IUserProfile } from "@/features/auth/types/auth.types";
import type { RootState } from "@/redux/store";

/**
 * Auth slice — pure Redux mirror of zvonsystem-dashboard's authSlice. Session
 * (token/refreshToken/role/user) is persisted to cookies so the server-side
 * proxy can guard routes, and the store is rehydrated from those cookies.
 */
interface AuthState {
  token: string | null;
  refreshToken: string | null;
  role: Role | null;
  user: SessionUser | null;
  /**
   * `false` during SSR AND during the client's first render; flipped to `true`
   * right after mount (see ReduxProvider). Every auth-derived selector returns
   * "unauthenticated" values until then, so the server HTML and the client's
   * first render always match (no hydration mismatch).
   */
  hydrated: boolean;
}

interface SetCredentialsPayload {
  token?: string | null;
  refreshToken?: string | null;
  role?: Role | null;
  user?: SessionUser | null;
}

const getCookieValue = (cookieName: string) => {
  if (typeof window === "undefined") {
    return null;
  }

  return Cookies.get(cookieName) ?? null;
};

const initialState: AuthState = {
  token: getCookieValue(authCookieNames.token),
  refreshToken: getCookieValue(authCookieNames.refreshToken),
  role: normalizeAuthRole(getCookieValue(authCookieNames.role)),
  user: null,
  hydrated: false,
};

const cookieOptions = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

const clearAuthCookies = () => {
  Cookies.remove(authCookieNames.token, { path: "/" });
  Cookies.remove(authCookieNames.refreshToken, { path: "/" });
  Cookies.remove(authCookieNames.role, { path: "/" });
};

const persistAuthCookies = ({
  token,
  refreshToken,
  role,
}: SetCredentialsPayload) => {
  clearAuthCookies();

  if (!token || !role) {
    return;
  }

  Cookies.set(authCookieNames.token, token, cookieOptions);

  if (refreshToken) {
    Cookies.set(authCookieNames.refreshToken, refreshToken, cookieOptions);
  }

  Cookies.set(authCookieNames.role, role, cookieOptions);
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      const { token = null, refreshToken = null, role = null, user = null } =
        action.payload;

      state.token = token;
      state.refreshToken = refreshToken;
      state.role = role;
      if (user) {
        state.user = user;
      }

      persistAuthCookies({ token, refreshToken, role });
    },
    /**
     * Populates the session profile returned by `/auth/me`. Permissions are
     * ALWAYS derived from the role (single source of truth) so the server
     * response can't drift from the centralized permission matrix.
     */
    setSessionUser: (state, action: PayloadAction<IUserProfile>) => {
      const profile = action.payload;
      const role =
        normalizeAuthRole(profile.role ?? null) ?? state.role;

      if (!role) {
        return;
      }

      state.role = role;
      state.user = {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        role,
        permissions: getPermissionsForRole(role),
      };

      persistAuthCookies({
        token: state.token,
        refreshToken: state.refreshToken,
        role,
      });
    },
    /**
     * Flipped once right after mount on the client. The cookie-restored
     * token/role above stay available immediately (RTK Query headers, the
     * refresh flow), but render-branching selectors below stay
     * "unauthenticated" until this runs so hydration stays in sync.
     */
    setHydrated: (state) => {
      state.hydrated = true;
    },
    logOut: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.role = null;
      state.user = null;

      clearAuthCookies();
    },
  },
});

export const { setCredentials, setSessionUser, setHydrated, logOut } = authSlice.actions;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectIsHydrated = (state: RootState) => state.auth.hydrated;
/**
 * Role is only exposed once hydrated — the server has no cookie access, so
 * exposing it earlier would make the client's first render differ from SSR.
 */
export const selectCurrentRole = (state: RootState) =>
  state.auth.hydrated ? state.auth.role : null;
export const selectCurrentUser = (state: RootState) =>
  state.auth.hydrated ? state.auth.user : null;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.hydrated && Boolean(state.auth.token && state.auth.role);
export const selectPermissions = (state: RootState) =>
  state.auth.hydrated && state.auth.role
    ? getPermissionsForRole(state.auth.role)
    : [];

export default authSlice.reducer;
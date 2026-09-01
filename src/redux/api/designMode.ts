import type { FetchArgs } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { getPermissionsForRole } from "@/access-control/access.utils";
import { ROLES, type Role } from "@/access-control/roles/roles";
import { authCookieNames, normalizeAuthRole } from "@/lib/auth/config";



const DEFAULT_META = {
  total: 0,
  page: 1,
  last_page: 1,
  limit: 10,
};

const DESIGN_MODE_MESSAGE =
  "API calls are disabled in design mode. Redux and RTK Query remain active for future integration.";

/** Demo email used by the login page role-picker (role is derived from email). */
export const DESIGN_MODE_DEMO_EMAILS: Record<Role, string> = {
  [ROLES.ADMIN]: "admin@raggreer.com",
  [ROLES.CUSTOMER]: "customer@raggreer.com",
  [ROLES.WORKER]: "worker@raggreer.com",
};

const MOCK_NAMES: Record<Role, string> = {
  [ROLES.ADMIN]: "Admin User",
  [ROLES.CUSTOMER]: "Customer User",
  [ROLES.WORKER]: "Worker User",
};

type ApiArgs = string | FetchArgs;

const getUrl = (args: ApiArgs) =>
  typeof args === "string" ? args : (args.url ?? "");

const getMethod = (args: ApiArgs) =>
  typeof args === "string" ? "GET" : (args.method ?? "GET").toUpperCase();

const getBody = (args: ApiArgs) =>
  typeof args === "string" ? undefined : args.body;

const buildSuccess = <T>(data: T, extra?: Record<string, unknown>) => ({
  success: true,
  message: DESIGN_MODE_MESSAGE,
  data,
  ...extra,
});

const buildPaginated = (data: unknown[] = [], meta = DEFAULT_META) =>
  buildSuccess(data, { meta });

/** Design-mode login role is guessed from the email, like zvonsystem. */
const roleFromEmail = (email: string): Role => {
  if (email.includes("worker")) return ROLES.WORKER;
  if (email.includes("customer")) return ROLES.CUSTOMER;
  return ROLES.ADMIN;
};

export const buildDesignModeResponse = (args: ApiArgs) => {
  const url = getUrl(args);
  const method = getMethod(args);
  const body = getBody(args) as Record<string, unknown> | undefined;

  if (url === "/auth/login") {
    const email = String(body?.email ?? "").toLowerCase();
    const role = roleFromEmail(email);

    return {
      success: true,
      message: "Signed in locally in design mode.",
      type: role,
      authorization: {
        access_token: `design-mode-${role.toLowerCase()}-token`,
        refresh_token: `design-mode-${role.toLowerCase()}-refresh-token`,
      },
    };
  }

  if (url === "/auth/me") {
    const role =
      normalizeAuthRole(Cookies.get(authCookieNames.role)?.toUpperCase() ?? null) ??
      ROLES.ADMIN;

    return buildSuccess({
      id: `mock-${role.toLowerCase()}`,
      name: MOCK_NAMES[role],
      email: DESIGN_MODE_DEMO_EMAILS[role],
      role,
      permissions: getPermissionsForRole(role),
    });
  }

  if (url.startsWith("/auth/")) {
    return {
      success: true,
      message: DESIGN_MODE_MESSAGE,
    };
  }

  if (method === "GET") {
    return buildPaginated([], DEFAULT_META);
  }

  return {
    success: true,
    message: DESIGN_MODE_MESSAGE,
  };
};
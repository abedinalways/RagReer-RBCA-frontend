import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import {
  authCookieNames,
  authRoutes,
  getDefaultRouteForRole,
  normalizeAuthRole,
} from "@/lib/auth/config";
import type { Role } from "@/access-control/roles/roles";


const PROTECTED_AREAS: ReadonlyArray<{ prefix: string; roles: Role[] }> = [
  { prefix: "/admin", roles: ["ADMIN"] },
  { prefix: "/customer", roles: ["CUSTOMER"] },
  { prefix: "/worker", roles: ["WORKER"] },
];

const buildLoginRedirect = (request: NextRequest) => {
  const loginUrl = new URL(authRoutes.login, request.url);
  const redirectTo = `${request.nextUrl.pathname}${request.nextUrl.search}`;

  if (redirectTo !== authRoutes.home) {
    loginUrl.searchParams.set("redirect", redirectTo);
  }

  return loginUrl;
};

const isAuthPage = (pathname: string) =>
  pathname === authRoutes.login ||
  pathname === authRoutes.register ||
  pathname === authRoutes.forgotPassword ||
  pathname === authRoutes.emailVerify;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (env.designMode) {
    return NextResponse.next();
  }

  const token = request.cookies.get(authCookieNames.token)?.value;
  const role = normalizeAuthRole(
    request.cookies.get(authCookieNames.role)?.value,
  );

  const isAuthenticated = Boolean(token && role);
  const defaultAuthenticatedRoute = getDefaultRouteForRole(role);

  if (pathname === authRoutes.home) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(authRoutes.login, request.url));
    }

    return NextResponse.redirect(new URL(defaultAuthenticatedRoute, request.url));
  }

  if (isAuthPage(pathname)) {
    if (isAuthenticated) {
      return NextResponse.redirect(
        new URL(defaultAuthenticatedRoute, request.url),
      );
    }

    return NextResponse.next();
  }

  for (const area of PROTECTED_AREAS) {
    const isAreaRoute =
      pathname === area.prefix || pathname.startsWith(`${area.prefix}/`);

    if (!isAreaRoute) {
      continue;
    }

    if (!isAuthenticated) {
      return NextResponse.redirect(buildLoginRedirect(request));
    }

    if (!role || !area.roles.includes(role)) {
      return NextResponse.redirect(
        new URL(defaultAuthenticatedRoute, request.url),
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/email-verify",
    "/admin/:path*",
    "/customer/:path*",
    "/worker/:path*",
  ],
};
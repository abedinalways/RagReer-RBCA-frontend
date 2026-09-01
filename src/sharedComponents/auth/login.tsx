"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/redux/features/auth/hooks";
import { normalizeAuthRole, resolvePostLoginPath } from "@/lib/auth/config";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { env } from "@/lib/env";
import { DESIGN_MODE_DEMO_EMAILS } from "@/redux/api/designMode";
import { ROLES, ROLE_LABELS, type Role } from "@/access-control/roles/roles";
import { cn } from "@/lib/utils";

const DEMO_ROLES: Role[] = [ROLES.ADMIN, ROLES.CUSTOMER, ROLES.WORKER];

const ROLE_ICONS: Record<Role, string> = {
  [ROLES.ADMIN]: "🏢",
  [ROLES.CUSTOMER]: "🏠",
  [ROLES.WORKER]: "🔧",
};

const ROLE_DESCRIPTIONS: Record<Role, string> = {
  [ROLES.ADMIN]: "Dashboard, CRM, Leads, Customers, Workers, Jobs & Settings.",
  [ROLES.CUSTOMER]:
    "My Requests, Property, Estimations, Contracts, Appointments & Invoices.",
  [ROLES.WORKER]: "Home, Jobs, Time-tracking & Profile on the mobile PWA.",
};

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");
  const { logIn, isLoading, isAuthenticated, role } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && role) {
      router.replace(resolvePostLoginPath(role, redirectPath));
    }
  }, [isAuthenticated, redirectPath, role, router]);

  const handleLogin = async (credentials: { email: string; password: string }) => {
    if (isSubmitting) return;

    try {
      setServerError("");
      setIsSubmitting(true);

      const response = await logIn(credentials).unwrap();
      const responseRole = normalizeAuthRole(response.type ?? null);

      if (!response.success || !responseRole) {
        throw new Error("Login response did not include a valid user role.");
      }

      router.replace(resolvePostLoginPath(responseRole, redirectPath));
    } catch (error) {
      setServerError(getErrorMessage(error, "Login failed. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      setServerError("Email and password are required.");
      return;
    }

    void handleLogin({ email: email.trim(), password });
  };

  const handleDemoRole = (demoRole: Role) => {
    void handleLogin({
      email: DESIGN_MODE_DEMO_EMAILS[demoRole],
      password: "design-mode",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-900">RagReer RBCA</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to continue.</p>
        </div>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="login-email"
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="mt-1 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-indigo-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="mt-1 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {serverError && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || isSubmitting}
            className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading || isSubmitting ? "Signing in..." : "Log In"}
          </button>
        </form>
        {env.designMode && (
          <div className="mt-8">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Design mode
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="mt-4 space-y-3">
              {DEMO_ROLES.map((demoRole) => (
                <button
                  key={demoRole}
                  type="button"
                  onClick={() => handleDemoRole(demoRole)}
                  disabled={isLoading || isSubmitting}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors",
                    "border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70",
                  )}
                >
                  <span className="text-2xl" aria-hidden>
                    {ROLE_ICONS[demoRole]}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-slate-900">
                      {ROLE_LABELS[demoRole]}
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-500">
                      {ROLE_DESCRIPTIONS[demoRole]}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-slate-400">
              Demo sign-in — resolves against mocked data.
              Set{" "}
              <code className="rounded bg-slate-100 px-1 py-0.5">
                NEXT_PUBLIC_DESIGN_MODE=false
              </code>{" "}
              to hit the real API.
            </p>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
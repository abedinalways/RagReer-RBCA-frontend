/**
 * lib/api-client.ts — thin typed fetch client for feature `api/*.ts` modules
 * that live outside RTK Query. Swapping the transport (axios, react-query…)
 * later only touches this file.
 *
 * - The authorization token is read from the auth cookie written by the Redux
 *   auth slice, so feature APIs stay authenticated automatically.
 * - Design mode (`NEXT_PUBLIC_DESIGN_MODE=true`): the network is never touched
 *   and benign stubs are returned, matching `redux/api/designMode.ts`.
 * - Production: every request hits the real backend.
 */

import Cookies from "js-cookie";
import { authCookieNames } from "@/lib/auth/config";
import { env } from "@/lib/env";

export interface ApiQueryParams {
  [key: string]: string | number | boolean | undefined;
}

export interface ApiRequestOptions {
  params?: ApiQueryParams;
  headers?: HeadersInit;
}

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return Cookies.get(authCookieNames.token) ?? null;
}

function buildUrl(path: string, params?: ApiQueryParams): string {
  if (!params) return `${env.apiBaseUrl}${path}`;

  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `${env.apiBaseUrl}${path}?${query}` : `${env.apiBaseUrl}${path}`;
}

async function request<T>(path: string, options: ApiRequestOptions & RequestInit = {}): Promise<T> {
  const { params, headers, ...init } = options;

  // Design mode: keep Redux/feature code running without a backend.
  if (env.designMode) {
    const method = (init.method ?? "GET").toUpperCase();
    if (method === "GET") {
      return [] as unknown as T;
    }
    return {
      success: true,
      message: "Design mode: request resolved locally.",
    } as unknown as T;
  }

  const token = getAuthToken();

  const response = await fetch(buildUrl(path, params), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers as Record<string, string> | undefined),
    },
  });

  if (!response.ok) {
    throw new Error(`API ${response.status}: ${response.statusText}`);
  }

  return (await response.json()) as T;
}

export const apiClient = {
  get: <T>(path: string, options?: ApiRequestOptions) => request<T>(path, { ...options, method: "GET" }),

  post: <T>(path: string, body?: unknown, options?: ApiRequestOptions) =>
    request<T>(path, { ...options, method: "POST", body: JSON.stringify(body) }),

  put: <T>(path: string, body?: unknown, options?: ApiRequestOptions) =>
    request<T>(path, { ...options, method: "PUT", body: JSON.stringify(body) }),

  patch: <T>(path: string, body?: unknown, options?: ApiRequestOptions) =>
    request<T>(path, { ...options, method: "PATCH", body: JSON.stringify(body) }),

  delete: <T>(path: string, options?: ApiRequestOptions) => request<T>(path, { ...options, method: "DELETE" }),
};
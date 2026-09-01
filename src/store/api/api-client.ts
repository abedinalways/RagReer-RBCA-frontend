/**
 * store/api/api-client.ts — thin typed fetch client.
 *
 * Feature `api/*.ts` modules import exclusively from here, so swapping the
 * transport (axios, react-query, tRPC…) later only touches this file.
 */

export interface ApiQueryParams {
  [key: string]: string | number | boolean | undefined;
}

export interface ApiRequestOptions {
  params?: ApiQueryParams;
  headers?: HeadersInit;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

function buildUrl(path: string, params?: ApiQueryParams): string {
  if (!params) return `${API_BASE_URL}${path}`;

  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `${API_BASE_URL}${path}?${query}` : `${API_BASE_URL}${path}`;
}

async function request<T>(path: string, options: ApiRequestOptions & RequestInit = {}): Promise<T> {
  const { params, headers, ...init } = options;

  const response = await fetch(buildUrl(path, params), {
    ...init,
    headers: {
      "Content-Type": "application/json",
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
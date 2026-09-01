const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const defaultApiBaseUrl = "";

/**
 * Parses "true"/"1"/"yes"/"on" as true; anything else (or missing) as false.
 * This mirrors zvonsystem-dashboard's `src/lib/env.ts`.
 */
const toBoolean = (value: string | undefined, fallback: boolean) => {
  if (value == null) {
    return fallback;
  }

  return !["0", "false", "no", "off"].includes(value.toLowerCase());
};

export const env = {
  apiBaseUrl: trimTrailingSlash(
    process.env.NEXT_PUBLIC_API_BASE_URL ?? defaultApiBaseUrl,
  ),
  // Uploads come back as storage paths, so a public base is needed to show them.
  mediaBaseUrl: trimTrailingSlash(process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? ""),
  /**
   * When true the app renders against mocked data (design/demo work).
   * When false (production) all API calls hit the real backend.
   */
  designMode: toBoolean(process.env.NEXT_PUBLIC_DESIGN_MODE, false),
};

/** Keeps only the path part of a value, so `http://host:5000/a/b` becomes `/a/b`. */
const toPathname = (value: string) => {
  const match = /^[a-z][a-z\d+.-]*:\/\/[^/]*(\/.*)?$/i.exec(value);
  return match ? (match[1] ?? "/") : value;
};

const trimSlashes = (value: string) => value.replace(/^\/+|\/+$/g, "");

/** Resolve an uploaded storage path (or URL) into a same-origin preview URL. */
export const resolveMediaUrl = (pathOrUrl?: string | null) => {
  const raw = pathOrUrl?.trim();
  if (!raw || !env.mediaBaseUrl) return null;

  const basePath = trimSlashes(toPathname(env.mediaBaseUrl));
  let storagePath = trimSlashes(toPathname(raw));

  if (
    basePath &&
    (storagePath === basePath || storagePath.startsWith(`${basePath}/`))
  ) {
    storagePath = trimSlashes(storagePath.slice(basePath.length));
  }

  if (!storagePath) return null;

  return `/api/media?path=${encodeURIComponent(storagePath)}`;
};

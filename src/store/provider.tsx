"use client";

import type { PropsWithChildren } from "react";

/**
 * store/provider.tsx — client bootstrap for the app store.
 *
 * State is seeded synchronously (see auth-slice), no backend round-trip is
 * needed at startup. This provider is the extension point for future needs
 * such as SSR hydration, persistence or cross-tab sync.
 */
export default function StoreProvider({ children }: PropsWithChildren) {
  return <>{children}</>;
}
"use client";

import type { PropsWithChildren } from "react";
import StoreProvider from "@/store/provider";

/**
 * providers/AppProviders.tsx — root client provider stack.
 * Add future providers here (Theme, ReactQuery, i18n…) — layouts never need
 * to know about them.
 */
export function AppProviders({ children }: PropsWithChildren) {
  return (
    <StoreProvider>
      {/* future providers go here */}
      {children}
    </StoreProvider>
  );
}
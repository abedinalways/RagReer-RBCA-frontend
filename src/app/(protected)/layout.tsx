"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import {
  selectIsAuthenticated,
  selectIsHydrated,
} from "@/redux/features/auth/authSlice";
import { SessionLoader } from "@/redux/features/auth/SessionLoader";

/**
 * Route group shell for every authenticated page. Guards happen here once,
 * and each workspace route-group adds its own RoleGuard. Rendering (and the
 * redirect) wait for client hydration so SSR output always matches.
 */
export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const hydrated = useAppSelector(selectIsHydrated);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !isAuthenticated) router.replace("/login");
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated || !isAuthenticated) return null;

  return (
    <>
      <SessionLoader />
      {children}
    </>
  );
}
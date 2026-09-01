"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/store";

/**
 * Route group shell for every authenticated page. Guards happen here once,
 * and each workspace route-group adds its own RoleGuard.
 */
export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.replace("/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;
  return <>{children}</>;
}
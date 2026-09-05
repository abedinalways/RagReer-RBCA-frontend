"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth";
import { cn } from "@/lib/utils";

/**
 * Logout button — hits the real logout endpoint, clears the session via the
 * auth slice and redirects to /login. Rendered in every workspace header.
 */
export function LogoutButton({ className }: { className?: string }) {
  const { logOut, isLogoutLoading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logOut();
    router.replace("/login");
  };

  return (
    <button
      type="button"
      onClick={() => void handleLogout()}
      disabled={isLogoutLoading}
      aria-label="Log out"
      className={cn(
        "rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600",
        className,
      )}
    >
      Logout
    </button>
  );
}
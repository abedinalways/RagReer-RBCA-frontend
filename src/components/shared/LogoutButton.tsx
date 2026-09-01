"use client";

import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/store";
import { cn } from "@/lib/utils";

/**
 * Logout button — clears the session via the auth slice and redirects to /login.
 * Rendered in every workspace header so each role can sign out.
 */
export function LogoutButton({ className }: { className?: string }) {
  const logout = useAppStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
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
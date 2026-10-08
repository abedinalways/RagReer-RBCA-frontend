"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminHeader } from "../components/AdminHeader";
import { AdminMobileNavigation } from "../components/AdminMobileNavigation";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
}


export function AdminLayout({ children }: AdminLayoutProps) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer whenever route changes
  useEffect(() => {
    setIsMobileDrawerOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileDrawerOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-page-bg">
      {/* Desktop Persistent Sidebar (Fixed left, matching Image 1) */}
      <div className="hidden lg:flex lg:h-screen lg:shrink-0 lg:flex-col bg-layout-bg border-r border-border">
        <AdminSidebar />
      </div>

      {/* Mobile Drawer Backdrop */}
      {isMobileDrawerOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close navigation backdrop"
          onClick={() => setIsMobileDrawerOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setIsMobileDrawerOpen(false);
          }}
          className="fixed inset-0 z-40 bg-txt-primary/40 backdrop-blur-xs transition-opacity lg:hidden"
        />
      )}

      {/* Mobile Off-canvas Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform bg-layout-bg shadow-2xl transition-transform duration-300 ease-in-out lg:hidden",
          isMobileDrawerOpen
            ? "translate-x-0 pointer-events-auto visible"
            : "-translate-x-full pointer-events-none invisible"
        )}
      >
        <AdminSidebar
          onClose={() => setIsMobileDrawerOpen(false)}
          isMobile
        />
      </div>

      {/* Main View Area: Scrolls independently on both desktop and mobile */}
      <div className="flex min-w-0 flex-1 flex-col h-screen overflow-y-auto">
        <AdminHeader onMenuToggle={() => setIsMobileDrawerOpen(true)} />
        <main className="flex-1 p-3 sm:p-5 md:p-6 pb-24 lg:pb-6">{children}</main>
        {/* Mobile floating bottom dock (matching Image 2) */}
        <AdminMobileNavigation onMoreClick={() => setIsMobileDrawerOpen(true)} />
      </div>
    </div>
  );
}
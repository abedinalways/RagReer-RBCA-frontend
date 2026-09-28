"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CustomerHeader } from "../components/CustomerHeader";
import { CustomerSidebar } from "../components/CustomerSidebar";
import { cn } from "@/lib/utils";

/**
 * CustomerLayout — fully responsive workspace shell for the Customer Portal.
 * Supports a fixed/persistent sidebar on desktop while the main content area
 * scrolls independently, preventing the sidebar from scrolling along with page content.
 */
export function CustomerLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer whenever the pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-page-bg">
      {/* Desktop Sidebar (fixed to the left, independent of main content scrolling) */}
      <div className="hidden lg:flex lg:h-screen lg:shrink-0 lg:flex-col bg-layout-bg">
        <CustomerSidebar />
      </div>

      {/* Mobile Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close menu backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setIsMobileMenuOpen(false);
          }}
          className="fixed inset-0 z-40 bg-txt-primary/40 backdrop-blur-xs transition-opacity lg:hidden"
        />
      )}

      {/* Mobile Off-canvas Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform bg-layout-bg shadow-2xl transition-transform duration-300 ease-in-out lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <CustomerSidebar
          onClose={() => setIsMobileMenuOpen(false)}
          isMobile
        />
      </div>

      {/* Main View Area: scrolls independently on both desktop and mobile */}
      <div className="flex min-w-0 flex-1 flex-col h-screen overflow-y-auto">
        <CustomerHeader onMenuToggle={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 p-3 md:p-5 ">{children}</main>
      </div>
    </div>
  );
}
import type { Metadata } from "next";
import { AppProviders } from "@/providers/AppProviders";
import { SITE } from "@/config/site.config";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: SITE.name,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
};

/**
 * Root layout — the ONLY place that mounts the global provider stack.
 * Everything below is routed by app/… route groups and rendered inside
 * workspace layouts.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
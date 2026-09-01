/**
 * workspaces/worker/navigation/worker-navigation.ts
 *
 * Worker's mobile-first PWA navigation (Home / Jobs / Time / Profile).
 * This workspace intentionally reuses NO desktop layout — it is its own
 * bottom-nav app shell (Worker Bottom Nav).
 */

import { PERMISSIONS } from "@/access-control/permissions/permissions";
import type { WorkspaceNavigationItem } from "../../workspace.types";

export const workerNavigation: WorkspaceNavigationItem[] = [
  { label: "Home", href: "/worker/home", icon: "🏠" },
  { label: "Jobs", href: "/worker/jobs", icon: "🧾", permission: PERMISSIONS.JOB.VIEW },
  { label: "Time", href: "/worker/time", icon: "⏱️", permission: PERMISSIONS.TIME_TRACKING.VIEW },
  { label: "Profile", href: "/worker/profile", icon: "👤" },
];
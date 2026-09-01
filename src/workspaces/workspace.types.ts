/**
 * workspaces/workspace.types.ts — shared shape for per-workspace navigation.
 */

import type { Permission } from "@/access-control/permissions/permissions";

export interface WorkspaceNavigationItem {
  label: string;
  href: string;
  /** Optional emoji/icon key — map to real icon set (lucide etc.) later. */
  icon?: string;
  /** Rule ④ — sidebar filters items the user can't see. */
  permission?: Permission;
  /** Optional grouping label for sectioned sidebars. */
  section?: string;
}
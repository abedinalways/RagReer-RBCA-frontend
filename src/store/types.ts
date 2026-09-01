import type { Permission } from "@/access-control/permissions/permissions";
import type { Role } from "@/access-control/roles/roles";
import type { SessionUser } from "@/access-control/types";

export interface AuthSlice {
  user: SessionUser | null;
  role: Role;
  permissions: Permission[];
  isAuthenticated: boolean;
  /** Mock login — switches the workspace/role for development/demos. */
  login: (role: Role, displayName?: string) => void;
  logout: () => void;
}

export interface UISlice {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export type AppStore = AuthSlice & UISlice;
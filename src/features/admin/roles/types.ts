export type RoleId = "crew-leader" | "crew-member" | "customer";

export interface RoleItem {
  id: RoleId;
  name: string;
}

export interface PermissionModule {
  id: string;
  name: string;
  permissions: string[];
}

export interface RoleConfig {
  role: RoleItem;
  modules: PermissionModule[];
  initialActivePermissions: string[];
}

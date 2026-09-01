/**
 * access-control/types.ts — shared access-control domain types.
 */

import type { Permission } from "./permissions/permissions";
import type { Role } from "./roles/roles";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  permissions: Permission[];
}
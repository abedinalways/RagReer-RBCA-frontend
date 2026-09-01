/**
 * access-control/roles/roles.ts
 *
 * Rule ① & ⑤ — Roles are FIXED (ADMIN / CUSTOMER / WORKER) and the role
 * permission matrix is centralized here. Admin gains every permission; Customer
 * and Worker only get their scope. The role matrix is the single source of
 * truth for navigation, route guards, component guards and action guards.
 */

import { ALL_PERMISSIONS, PERMISSIONS, type Permission } from "../permissions/permissions";

export const ROLES = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  WORKER: "WORKER",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_LABELS: Record<Role, string> = {
  ADMIN: "Admin",
  CUSTOMER: "Customer",
  WORKER: "Worker",
};

/** Landing page per role — used by redirects and role guards. */
export const ROLE_HOME: Record<Role, string> = {
  ADMIN: "/admin/dashboard",
  CUSTOMER: "/customer/requests",
  WORKER: "/worker/home",
};

export const ALL_ROLES: Role[] = [ROLES.ADMIN, ROLES.CUSTOMER, ROLES.WORKER];

/**
 * Role ↔ permission matrix.
 *
 * ADMIN    → every permission (staff granularity handled via per-staff
 *             permission sets at the staff-configuration layer).
 * CUSTOMER → own requests/property/estimations/contracts/appointments/invoices.
 * WORKER   → own jobs, time-tracking and profile.
 */
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [ROLES.ADMIN]: [...ALL_PERMISSIONS],

  [ROLES.CUSTOMER]: [
    PERMISSIONS.DASHBOARD.VIEW,
    PERMISSIONS.REQUEST.VIEW,
    PERMISSIONS.REQUEST.CREATE,
    PERMISSIONS.REQUEST.UPDATE,
    PERMISSIONS.PROPERTY.VIEW,
    PERMISSIONS.ESTIMATION.VIEW,
    PERMISSIONS.CONTRACT.VIEW,
    PERMISSIONS.CONTRACT.SIGN,
    PERMISSIONS.APPOINTMENT.VIEW,
    PERMISSIONS.APPOINTMENT.CREATE,
    PERMISSIONS.APPOINTMENT.CANCEL,
    PERMISSIONS.INVOICE.VIEW,
    PERMISSIONS.INVOICE.PAY,
    PERMISSIONS.NOTIFICATION.VIEW,
    PERMISSIONS.NOTIFICATION.MARK_READ,
  ],

  [ROLES.WORKER]: [
    PERMISSIONS.DASHBOARD.VIEW,
    PERMISSIONS.JOB.VIEW,
    PERMISSIONS.JOB.START,
    PERMISSIONS.JOB.COMPLETE,
    PERMISSIONS.TIME_TRACKING.VIEW,
    PERMISSIONS.TIME_TRACKING.LOG,
    PERMISSIONS.NOTIFICATION.VIEW,
    PERMISSIONS.NOTIFICATION.MARK_READ,
  ],
};
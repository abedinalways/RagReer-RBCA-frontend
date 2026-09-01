/**
 * access-control/permissions/permissions.ts
 *
 * Central definition of every permission in the application (Rules ② & ③).
 * Permission strings follow the `module.action` convention and are defined in
 * exactly ONE place — the rest of the project imports `PERMISSIONS` instead of
 * hard-coding strings. The permission definition drives navigation, route
 * access, component access and action access.
 */

export const PERMISSIONS = {
  AUTH: {
    LOGIN: "auth.login",
    LOGOUT: "auth.logout",
  },
  DASHBOARD: {
    VIEW: "dashboard.view",
    MANAGE: "dashboard.manage",
  },
  CRM: {
    VIEW: "crm.view",
    MANAGE: "crm.manage",
    SETUP: "crm.setup",
    REPORT: "crm.report",
  },
  LEAD: {
    VIEW: "lead.view",
    CREATE: "lead.create",
    UPDATE: "lead.update",
    DELETE: "lead.delete",
    IMPORT: "lead.import",
    CONVERT: "lead.convert",
    MANAGE: "lead.manage",
  },
  CUSTOMER: {
    VIEW: "customer.view",
    CREATE: "customer.create",
    UPDATE: "customer.update",
    DELETE: "customer.delete",
  },
  WORKER: {
    VIEW: "worker.view",
    CREATE: "worker.create",
    UPDATE: "worker.update",
    DELETE: "worker.delete",
    ASSIGN: "worker.assign",
  },
  REQUEST: {
    VIEW: "request.view",
    CREATE: "request.create",
    UPDATE: "request.update",
    DELETE: "request.delete",
  },
  PROPERTY: {
    VIEW: "property.view",
    UPDATE: "property.update",
  },
  ESTIMATION: {
    VIEW: "estimation.view",
    CREATE: "estimation.create",
    UPDATE: "estimation.update",
  },
  CONTRACT: {
    VIEW: "contract.view",
    CREATE: "contract.create",
    SIGN: "contract.sign",
  },
  APPOINTMENT: {
    VIEW: "appointment.view",
    CREATE: "appointment.create",
    UPDATE: "appointment.update",
    CANCEL: "appointment.cancel",
  },
  INVOICE: {
    VIEW: "invoice.view",
    CREATE: "invoice.create",
    PAY: "invoice.pay",
    MANAGE: "invoice.manage",
  },
  JOB: {
    VIEW: "job.view",
    ASSIGN: "job.assign",
    START: "job.start",
    COMPLETE: "job.complete",
  },
  TIME_TRACKING: {
    VIEW: "time-tracking.view",
    LOG: "time-tracking.log",
  },
  REPORT: {
    VIEW: "report.view",
    MANAGE: "report.manage",
    EXPORT: "report.export",
  },
  SETTING: {
    VIEW: "settings.view",
    MANAGE: "settings.manage",
    STAFF: "settings.staff",
  },
  NOTIFICATION: {
    VIEW: "notification.view",
    MARK_READ: "notification.mark-read",
  },
} as const;

export type PermissionModule = keyof typeof PERMISSIONS;

export type PermissionMap = typeof PERMISSIONS;

/** Union of every `module.action` value defined above. */
export type Permission = {
  [M in PermissionModule]: (typeof PERMISSIONS)[M][keyof (typeof PERMISSIONS)[M]];
}[PermissionModule];

/** Flat list of every permission — used for the Admin role matrix. */
export const ALL_PERMISSIONS = Object.values(PERMISSIONS).flatMap(
  (module) => Object.values(module),
) as Permission[];

export function getModulePermissions(module: PermissionModule): Permission[] {
  return Object.values(PERMISSIONS[module]) as Permission[];
}
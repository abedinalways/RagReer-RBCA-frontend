/**
 * workspaces/customer/navigation/customer-navigation.ts
 *
 * Customer workspace sidebar — permission driven. Labels map 1:1 to the
 * Customer Portal screenshot (My Requests, My Property, …) while the actual
 * implementation lives in `features/…` (Feature ≠ Role).
 */

import { PERMISSIONS } from "@/access-control/permissions/permissions";
import type { WorkspaceNavigationItem } from "../../workspace.types";

export const customerNavigation: WorkspaceNavigationItem[] = [
  { label: "My Requests", href: "/customer/requests", icon: "📨", permission: PERMISSIONS.REQUEST.VIEW, section: "My Service" },
  { label: "My Property", href: "/customer/property", icon: "🏠", permission: PERMISSIONS.PROPERTY.VIEW, section: "My Property" },
  { label: "Estimation", href: "/customer/estimations", icon: "🧮", permission: PERMISSIONS.ESTIMATION.VIEW, section: "My Property" },
  { label: "Contract & Agreements", href: "/customer/contracts", icon: "📄", permission: PERMISSIONS.CONTRACT.VIEW, section: "My Documents" },
  { label: "Appointments", href: "/customer/appointments", icon: "📅", permission: PERMISSIONS.APPOINTMENT.VIEW, section: "My Documents" },
  { label: "Invoices", href: "/customer/invoices", icon: "🧾", permission: PERMISSIONS.INVOICE.VIEW, section: "My Documents" },
];
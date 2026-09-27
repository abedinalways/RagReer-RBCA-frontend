

import { PERMISSIONS } from "@/access-control/permissions/permissions";
import type { WorkspaceNavigationItem } from "../../workspace.types";

export const customerNavigation: WorkspaceNavigationItem[] = [
  { label: "My Requests", href: "/customer/requests", permission: PERMISSIONS.REQUEST.VIEW, section: "My Service" },
  { label: "My Properties", href: "/customer/property", permission: PERMISSIONS.PROPERTY.VIEW, section: "My Property" },
  { label: "Estimate", href: "/customer/estimations", permission: PERMISSIONS.ESTIMATION.VIEW, section: "My Property" },
  { label: "Contracts & Agreements", href: "/customer/contracts", permission: PERMISSIONS.CONTRACT.VIEW, section: "My Documents" },
  { label: "Appointments", href: "/customer/appointments", permission: PERMISSIONS.APPOINTMENT.VIEW, section: "My Documents" },
  { label: "Invoices", href: "/customer/invoices", permission: PERMISSIONS.INVOICE.VIEW, section: "My Documents" },
];
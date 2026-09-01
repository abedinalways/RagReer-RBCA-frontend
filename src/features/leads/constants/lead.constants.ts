/**
 * features/leads/constants/lead.constants.ts — Lead feature constants + mock data.
 */

import type { Lead, LeadSource, LeadStatus } from "../types/lead.types";

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUALIFIED: "Qualified",
  PROPOSAL: "Proposal",
  WON: "Won",
  LOST: "Lost",
};

export const LEAD_STATUS_BADGES: Record<LeadStatus, string> = {
  NEW: "bg-slate-100 text-slate-700",
  CONTACTED: "bg-sky-100 text-sky-700",
  QUALIFIED: "bg-indigo-100 text-indigo-700",
  PROPOSAL: "bg-amber-100 text-amber-700",
  WON: "bg-emerald-100 text-emerald-700",
  LOST: "bg-rose-100 text-rose-700",
};

export const LEAD_SOURCE_LABELS: Record<LeadSource, string> = {
  REFERRAL: "Referral",
  WEBSITE: "Website",
  CALL: "Call",
  WALK_IN: "Walk-in",
  SOCIAL: "Social",
  OTHER: "Other",
};

export const LEAD_PAGE_SIZE = 10;

/** Demo dataset — used as fallback until the backend endpoints are wired. */
export const MOCK_LEADS: Lead[] = [
  {
    id: "lead-1",
    name: "Rahim Uddin",
    phone: "+880 1711 234 567",
    email: "rahim@example.com",
    source: "WEBSITE",
    status: "NEW",
    assignedTo: "Karim (Staff A)",
    notes: "Interested in bathroom renovation.",
    createdAt: "2026-08-25T10:00:00Z",
    updatedAt: "2026-08-25T10:00:00Z",
  },
  {
    id: "lead-2",
    name: "Salma Begum",
    phone: "+880 1811 876 543",
    email: "salma@example.com",
    source: "REFERRAL",
    status: "CONTACTED",
    assignedTo: "Karim (Staff A)",
    createdAt: "2026-08-24T09:30:00Z",
    updatedAt: "2026-08-26T12:00:00Z",
  },
  {
    id: "lead-3",
    name: "Tanvir Ahmed",
    phone: "+880 1911 555 888",
    email: "tanvir@example.com",
    source: "CALL",
    status: "QUALIFIED",
    assignedTo: "Nadia (Staff B)",
    createdAt: "2026-08-22T15:45:00Z",
    updatedAt: "2026-08-27T09:00:00Z",
  },
  {
    id: "lead-4",
    name: "Farhana Islam",
    phone: "+880 1611 111 222",
    source: "WALK_IN",
    status: "PROPOSAL",
    assignedTo: "Nadia (Staff B)",
    notes: "Office interior fit-out.",
    createdAt: "2026-08-20T11:20:00Z",
    updatedAt: "2026-08-28T16:30:00Z",
  },
  {
    id: "lead-5",
    name: "Mahmud Hasan",
    phone: "+880 1300 777 999",
    email: "mahmud@example.com",
    source: "SOCIAL",
    status: "WON",
    createdAt: "2026-08-18T09:00:00Z",
    updatedAt: "2026-08-29T14:15:00Z",
  },
];
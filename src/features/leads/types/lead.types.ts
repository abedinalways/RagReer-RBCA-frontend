/**
 * features/leads/types/lead.types.ts — Lead domain types.
 */

export const LEAD_STATUS_VALUES = ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"] as const;
export type LeadStatus = (typeof LEAD_STATUS_VALUES)[number];

export const LEAD_SOURCE_VALUES = ["REFERRAL", "WEBSITE", "CALL", "WALK_IN", "SOCIAL", "OTHER"] as const;
export type LeadSource = (typeof LEAD_SOURCE_VALUES)[number];

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  source: LeadSource;
  status: LeadStatus;
  assignedTo?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LeadListParams {
  page?: number;
  pageSize?: number;
  status?: LeadStatus;
  search?: string;
  sortBy?: "name" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export type LeadListViewMode = "table" | "card";
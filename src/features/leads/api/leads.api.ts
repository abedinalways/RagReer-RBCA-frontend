/**
 * features/leads/api/leads.api.ts — Lead endpoints.
 * Only touches the shared client (store/api/api-client.ts) — no direct fetch.
 */

import { apiClient } from "@/store/api/api-client";
import type { Lead, LeadListParams } from "../types/lead.types";

export interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  source: Lead["source"];
  status?: Lead["status"];
  assignedTo?: string;
  notes?: string;
}

export const leadsApi = {
  list: (params: LeadListParams = {}) =>
    apiClient.get<Lead[]>("/leads", { params: { ...params, pageSize: params.pageSize ?? 10 } }),

  getById: (id: string) => apiClient.get<Lead>(`/leads/${id}`),

  create: (payload: LeadPayload) => apiClient.post<Lead>("/leads", payload),

  update: (id: string, payload: Partial<LeadPayload>) => apiClient.patch<Lead>(`/leads/${id}`, payload),

  remove: (id: string) => apiClient.delete<void>(`/leads/${id}`),

  /** Lead → Deal conversion (permission: PERMISSIONS.LEAD.CONVERT). */
  convertToDeal: (id: string) => apiClient.post<{ dealId: string }>(`/leads/${id}/convert`),
};
"use client";

import { useCallback } from "react";
import { leadsApi } from "../api/leads.api";
import type { LeadStatus } from "../types/lead.types";

/**
 * Lead mutating actions — the components only call these; permission checks
 * happen at the UI layer via PermissionGuard (Rule ④).
 */
export function useLeadActions(onSuccess?: () => void) {
  const updateStatus = useCallback(
    async (id: string, status: LeadStatus) => {
      await leadsApi.update(id, { status });
      onSuccess?.();
    },
    [onSuccess],
  );

  const remove = useCallback(
    async (id: string) => {
      await leadsApi.remove(id);
      onSuccess?.();
    },
    [onSuccess],
  );

  const convertToDeal = useCallback(
    async (id: string) => {
      await leadsApi.convertToDeal(id);
      onSuccess?.();
    },
    [onSuccess],
  );

  return { updateStatus, remove, convertToDeal };
}
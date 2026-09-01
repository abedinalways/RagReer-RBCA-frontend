"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { leadsApi } from "../api/leads.api";
import { MOCK_LEADS } from "../constants/lead.constants";
import type { Lead, LeadListParams } from "../types/lead.types";

export interface UseLeadsResult {
  leads: Lead[];
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

/** Loads leads from the API; falls back to mock data until the backend exists. */
export function useLeads(params: LeadListParams = {}): UseLeadsResult {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const queryKey = useMemo(() => JSON.stringify(params), [params]);

  const refresh = useCallback(() => setTick((value) => value + 1), []);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    leadsApi
      .list(params)
      .then((data) => {
        if (!cancelled) setLeads(data);
      })
      .catch(() => {
        // No backend wired yet — keep the demo functional with mock data.
        if (!cancelled) setLeads(MOCK_LEADS);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryKey, tick]);

  return { leads, isLoading, error, refresh };
}
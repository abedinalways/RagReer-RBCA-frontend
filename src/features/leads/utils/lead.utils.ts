/**
 * features/leads/utils/lead.utils.ts — Lead presentation/demo helpers.
 */

import type { Lead } from "../types/lead.types";

export function getLeadInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function formatLeadDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function filterLeadsBySearch(leads: Lead[], query: string): Lead[] {
  const q = query.trim().toLowerCase();
  if (!q) return leads;
  return leads.filter((lead) =>
    [lead.name, lead.phone, lead.email ?? "", lead.assignedTo ?? ""].some((value) =>
      value.toLowerCase().includes(q),
    ),
  );
}

export function sortLeadsByNewest(leads: Lead[]): Lead[] {
  return [...leads].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}
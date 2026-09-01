"use client";

import { getLeadInitials, formatLeadDate } from "../utils/lead.utils";
import { LEAD_SOURCE_LABELS, LEAD_STATUS_BADGES, LEAD_STATUS_LABELS } from "../constants/lead.constants";
import { LeadActions } from "./LeadActions";
import type { Lead } from "../types/lead.types";

interface LeadCardProps {
  lead: Lead;
  onOpen?: (lead: Lead) => void;
  onChanged?: () => void;
}

/** Card-mode view of the same lead data as LeadTable. */
export function LeadCard({ lead, onOpen, onChanged }: LeadCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow">
      <button type="button" onClick={() => onOpen?.(lead)} className="flex w-full items-center gap-3 text-left">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
          {getLeadInitials(lead.name)}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-medium text-slate-900">{lead.name}</span>
          <span className="block truncate text-xs text-slate-500">{lead.phone}</span>
        </span>
      </button>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>{LEAD_SOURCE_LABELS[lead.source]}</span>
        <span>{formatLeadDate(lead.createdAt)}</span>
      </div>

      <div className="mt-2">
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${LEAD_STATUS_BADGES[lead.status]}`}>
          {LEAD_STATUS_LABELS[lead.status]}
        </span>
      </div>

      <div className="mt-4 border-t border-slate-100 pt-3">
        <LeadActions lead={lead} onChanged={onChanged} />
      </div>
    </article>
  );
}
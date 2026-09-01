"use client";

import type { Lead } from "../types/lead.types";
import { LEAD_SOURCE_LABELS, LEAD_STATUS_LABELS } from "../constants/lead.constants";
import { formatLeadDate } from "../utils/lead.utils";

interface LeadDetailsProps {
  lead: Lead;
  onClose: () => void;
}

/** Details modal for a single lead. */
export function LeadDetails({ lead, onClose }: LeadDetailsProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Lead details for ${lead.name}`}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{lead.name}</h2>
            <p className="text-sm text-slate-500">{lead.phone}</p>
            {lead.email ? <p className="text-sm text-slate-500">{lead.email}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-400">Source</dt>
            <dd className="mt-0.5 font-medium text-slate-800">{LEAD_SOURCE_LABELS[lead.source]}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-400">Status</dt>
            <dd className="mt-0.5 font-medium text-slate-800">{LEAD_STATUS_LABELS[lead.status]}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-400">Assigned</dt>
            <dd className="mt-0.5 font-medium text-slate-800">{lead.assignedTo ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-400">Created</dt>
            <dd className="mt-0.5 font-medium text-slate-800">{formatLeadDate(lead.createdAt)}</dd>
          </div>
        </dl>

        {lead.notes ? (
          <div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
            <p className="text-xs uppercase tracking-wide text-slate-400">Notes</p>
            <p className="mt-1">{lead.notes}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
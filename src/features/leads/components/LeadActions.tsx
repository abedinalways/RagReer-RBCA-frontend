"use client";

import { PermissionGuard } from "@/access-control/guards/PermissionGuard";
import { PERMISSIONS } from "@/access-control/permissions/permissions";
import { LEAD_STATUS_VALUES, type Lead, type LeadStatus } from "../types/lead.types";
import { useLeadActions } from "../hooks/useLeadActions";

interface LeadActionsProps {
  lead: Lead;
  onChanged?: () => void;
}

/**
 * Row actions for a lead. Each action is wrapped in PermissionGuard (Rule ④) —
 * e.g. only staff with `lead.convert` see the "Convert to Deal" button.
 */
export function LeadActions({ lead, onChanged }: LeadActionsProps) {
  const { updateStatus, remove, convertToDeal } = useLeadActions(onChanged);

  return (
    <div className="flex items-center gap-2">
      <PermissionGuard permission={PERMISSIONS.LEAD.CONVERT}>
        <button
          type="button"
          onClick={() => void convertToDeal(lead.id)}
          className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-emerald-700"
        >
          Convert
        </button>
      </PermissionGuard>

      <PermissionGuard permission={PERMISSIONS.LEAD.UPDATE} fallback={<span className="text-xs text-slate-300">—</span>}>
        <select
          aria-label={`Change status of ${lead.name}`}
          value={lead.status}
          onChange={(event) => void updateStatus(lead.id, event.target.value as LeadStatus)}
          className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700"
        >
          {LEAD_STATUS_VALUES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </PermissionGuard>

      <PermissionGuard permission={PERMISSIONS.LEAD.DELETE}>
        <button
          type="button"
          onClick={() => void remove(lead.id)}
          className="rounded-md bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-600 transition-colors hover:bg-rose-100"
        >
          Delete
        </button>
      </PermissionGuard>
    </div>
  );
}
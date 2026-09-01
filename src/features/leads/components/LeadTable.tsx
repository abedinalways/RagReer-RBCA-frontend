"use client";

import { useState } from "react";
import { PermissionGuard } from "@/access-control/guards/PermissionGuard";
import { PERMISSIONS } from "@/access-control/permissions/permissions";
import { useLeads } from "../hooks/useLeads";
import { filterLeadsBySearch, formatLeadDate, getLeadInitials } from "../utils/lead.utils";
import { LEAD_PAGE_SIZE, LEAD_SOURCE_LABELS, LEAD_STATUS_BADGES, LEAD_STATUS_LABELS } from "../constants/lead.constants";
import { LeadActions } from "./LeadActions";
import { LeadCard } from "./LeadCard";
import { LeadDetails } from "./LeadDetails";
import { LeadForm } from "./LeadForm";

/**
 * Main Lead view (table + card modes). Presentation-only — all domain data
 * flows from the useLeads hook, actions are permission-driven.
 */
export function LeadTable() {
  const { leads, isLoading, refresh } = useLeads();
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  const visibleLeads = filterLeadsBySearch(leads, search);
  const selectedLead = leads.find((lead) => lead.id === selectedLeadId) ?? null;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search name, phone, email…"
          className="h-9 min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />

        <div className="flex overflow-hidden rounded-lg border border-slate-200 bg-white text-sm">
          {(["table", "card"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setViewMode(mode)}
              className={
                viewMode === mode
                  ? "bg-indigo-600 px-3 py-1.5 font-medium text-white"
                  : "px-3 py-1.5 text-slate-600 hover:bg-slate-50"
              }
            >
              {mode === "table" ? "Table" : "Cards"}
            </button>
          ))}
        </div>

        <PermissionGuard permission={PERMISSIONS.LEAD.CREATE}>
          <button
            type="button"
            onClick={() => setShowCreateForm((open) => !open)}
            className="h-9 rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            {showCreateForm ? "Close" : "+ New Lead"}
          </button>
        </PermissionGuard>
      </div>

      {/* Create form */}
      {showCreateForm ? (
        <LeadForm
          onSuccess={() => {
            setShowCreateForm(false);
            refresh();
          }}
          onCancel={() => setShowCreateForm(false)}
        />
      ) : null}

      {/* Loading / empty state */}
      {isLoading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
          Loading leads…
        </div>
      ) : visibleLeads.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
          No leads found.
        </div>
      ) : viewMode === "table" ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Lead</th>
                  <th className="px-4 py-3 font-medium">Source</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Assigned</th>
                  <th className="px-4 py-3 font-medium">Created</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visibleLeads.slice(0, LEAD_PAGE_SIZE).map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setSelectedLeadId(lead.id)}
                        className="flex items-center gap-3 text-left"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                          {getLeadInitials(lead.name)}
                        </span>
                        <span>
                          <span className="block font-medium text-slate-900">{lead.name}</span>
                          <span className="block text-xs text-slate-500">{lead.phone}</span>
                        </span>
                      </button>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{LEAD_SOURCE_LABELS[lead.source]}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${LEAD_STATUS_BADGES[lead.status]}`}>
                        {LEAD_STATUS_LABELS[lead.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{lead.assignedTo ?? "—"}</td>
                    <td className="px-4 py-3 text-slate-500">{formatLeadDate(lead.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end">
                        <LeadActions lead={lead} onChanged={refresh} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visibleLeads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} onOpen={() => setSelectedLeadId(lead.id)} onChanged={refresh} />
          ))}
        </div>
      )}

      {/* Details modal */}
      {selectedLead ? <LeadDetails lead={selectedLead} onClose={() => setSelectedLeadId(null)} /> : null}
    </div>
  );
}

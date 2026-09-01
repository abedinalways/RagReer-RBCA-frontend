import type { Metadata } from "next";
import { LeadTable } from "@/features/leads/components/LeadTable";

export const metadata: Metadata = { title: "Leads" };

/**
 * Admin Leads page — presentation lives in the workspace, but the entire
 * business UI comes from the shared features/leads module (Feature ≠ Role).
 */
export default function AdminLeadsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Leads</h1>
        <p className="mt-1 text-sm text-slate-500">
          Business UI from <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs">features/leads</code> —
          row actions are permission-driven ({`PERMISSIONS.LEAD.*`}).
        </p>
      </div>
      <LeadTable />
    </div>
  );
}
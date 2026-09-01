"use client";

import type { Invoice, InvoiceStatus } from "../types/invoice.types";
import { formatCurrency, formatDate } from "@/utils/formatters";

const STATUS_META: Record<InvoiceStatus, { label: string; badgeClass: string }> = {
  DRAFT: { label: "Draft", badgeClass: "bg-slate-100 text-slate-600" },
  SENT: { label: "Sent", badgeClass: "bg-sky-100 text-sky-700" },
  PAID: { label: "Paid", badgeClass: "bg-emerald-100 text-emerald-700" },
  OVERDUE: { label: "Overdue", badgeClass: "bg-rose-100 text-rose-700" },
};

const MOCK_INVOICES: Invoice[] = [
  {
    id: "inv-1",
    number: "INV-2026-0001",
    amount: 18500,
    currency: "BDT",
    status: "PAID",
    issuedAt: "2026-08-01T00:00:00Z",
    dueAt: "2026-08-15T00:00:00Z",
    lineItems: [{ description: "Estimation & survey service", quantity: 1, unitPrice: 18500 }],
  },
  {
    id: "inv-2",
    number: "INV-2026-0002",
    amount: 32000,
    currency: "BDT",
    status: "SENT",
    issuedAt: "2026-08-20T00:00:00Z",
    dueAt: "2026-09-05T00:00:00Z",
    lineItems: [],
  },
  {
    id: "inv-3",
    number: "INV-2026-0003",
    amount: 4100,
    currency: "BDT",
    status: "DRAFT",
    issuedAt: "2026-08-28T00:00:00Z",
    dueAt: "2026-09-12T00:00:00Z",
    lineItems: [],
  },
];

/**
 * Invoices list — deliberately reused across workspaces:
 *   features/invoices  →  Customer "My Invoices" AND Admin "Invoice Management".
 * Only the presentation shell differs per workspace.
 */
export function InvoicesList() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Invoice</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Issued</th>
              <th className="px-4 py-3 font-medium">Due</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_INVOICES.map((invoice) => {
              const status = STATUS_META[invoice.status];
              return (
                <tr key={invoice.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{invoice.number}</td>
                  <td className="px-4 py-3 text-slate-700">
                    {formatCurrency(invoice.amount, invoice.currency)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.badgeClass}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{formatDate(invoice.issuedAt)}</td>
                  <td className="px-4 py-3 text-slate-500">{formatDate(invoice.dueAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
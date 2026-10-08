import React from "react";
import Link from "next/link";
import {
  ColumnDef,
  PortfolioConsolidatedInvoice,
  MonthlyStatementItem,
} from "../../types/invoicesTypes";
import { StatusBadge } from "../InvoicesColumns";

export interface PortfolioInvoiceColumnCallbacks {
  onViewReceipt: (invoice: PortfolioConsolidatedInvoice) => void;
  onViewDetails: (invoice: PortfolioConsolidatedInvoice) => void;
}

export const createPortfolioInvoicesColumns = (
  callbacks: PortfolioInvoiceColumnCallbacks
): ColumnDef<PortfolioConsolidatedInvoice>[] => [
  {
    header: "Invoice ID",
    accessorKey: "id",
    cell: (row) => (
      <Link
        href={`/customer/invoices/${row.rawId || "inv-1024"}`}
        className="text-primary hover:underline cursor-pointer font-medium"
      >
        {row.id}
      </Link>
    ),
  },
  {
    header: "Properties",
    accessorKey: "propertiesCount",
    cell: (row) => (
      <span className="text-txt-primary">{row.propertiesCount}</span>
    ),
  },
  {
    header: "Service Period",
    accessorKey: "servicePeriod",
    cell: (row) => (
      <span className="text-txt-primary">{row.servicePeriod}</span>
    ),
  },
  {
    header: "Payment Type",
    accessorKey: "paymentType",
    cell: (row) => (
      <span className="text-txt-primary">{row.paymentType}</span>
    ),
  },
  {
    header: "Issue Date",
    accessorKey: "issueDate",
    cell: (row) => (
      <span className="text-secondary-subheading">{row.issueDate}</span>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (row) => <StatusBadge status={row.status} />,
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: (row) => (
      <span className="text-primary-heading font-medium">{row.amount}</span>
    ),
  },
  {
    header: "Action",
    cell: (row) => {
      if (row.status === "Paid") {
        return (
          <button
            type="button"
            onClick={() => callbacks.onViewReceipt(row)}
            className="bg-card-bg border border-border hover:bg-page-bg text-txt-primary font-medium px-3.5 py-1.5 rounded-sm shadow-2xs cursor-pointer text-xs sm:text-sm whitespace-nowrap transition-colors"
          >
            View Receipt
          </button>
        );
      }
      return (
        <button
          type="button"
          onClick={() => callbacks.onViewDetails(row)}
          className="bg-card-bg border border-border hover:bg-page-bg text-txt-primary font-medium px-3.5 py-1.5 rounded-sm shadow-2xs cursor-pointer text-xs sm:text-sm whitespace-nowrap transition-colors"
        >
          View Details
        </button>
      );
    },
  },
];

export interface MonthlyStatementColumnCallbacks {
  onView: (item: MonthlyStatementItem) => void;
  onDownload: (item: MonthlyStatementItem) => void;
}

export const createMonthlyStatementsColumns = (
  callbacks: MonthlyStatementColumnCallbacks
): ColumnDef<MonthlyStatementItem>[] => [
  {
    header: "Month",
    accessorKey: "month",
    cell: (row) => (
      <button
        type="button"
        onClick={() => callbacks.onView(row)}
        className="text-primary hover:underline cursor-pointer font-medium text-left"
      >
        {row.month}
      </button>
    ),
  },
  {
    header: "Properties",
    accessorKey: "propertiesCount",
    cell: (row) => (
      <span className="text-txt-primary">{row.propertiesCount}</span>
    ),
  },
  {
    header: "Visits",
    accessorKey: "visitsCount",
    cell: (row) => (
      <span className="text-txt-primary">{row.visitsCount}</span>
    ),
  },
  {
    header: "Issue Date",
    accessorKey: "issueDate",
    cell: (row) => (
      <span className="text-secondary-subheading">{row.issueDate}</span>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (row) => <StatusBadge status={row.status} />,
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: (row) => (
      <span className="text-primary-heading font-medium">{row.amount}</span>
    ),
  },
  {
    header: "Action",
    cell: (row) => (
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => callbacks.onView(row)}
          className="bg-card-bg border border-border hover:bg-page-bg text-txt-primary font-medium px-3.5 py-1.5 rounded-sm shadow-2xs cursor-pointer text-xs sm:text-sm whitespace-nowrap transition-colors"
        >
          View
        </button>
        <button
          type="button"
          onClick={() => callbacks.onDownload(row)}
          className="bg-card-bg border border-border hover:bg-page-bg text-txt-primary font-medium px-3.5 py-1.5 rounded-sm shadow-2xs cursor-pointer text-xs sm:text-sm whitespace-nowrap transition-colors"
        >
          Download
        </button>
      </div>
    ),
  },
];

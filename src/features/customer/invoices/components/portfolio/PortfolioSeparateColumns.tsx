import React from "react";
import Link from "next/link";
import {
  ColumnDef,
  PortfolioSeparateInvoice,
  SeparateStatementPropertyItem,
} from "../../types/invoicesTypes";
import { StatusBadge } from "../InvoicesColumns";

export interface PortfolioSeparateInvoiceCallbacks {
  onViewReceipt: (invoice: PortfolioSeparateInvoice) => void;
  onViewDetails: (invoice: PortfolioSeparateInvoice) => void;
}

export const createPortfolioSeparateInvoicesColumns = (
  callbacks: PortfolioSeparateInvoiceCallbacks
): ColumnDef<PortfolioSeparateInvoice>[] => [
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
    header: "Property Address",
    accessorKey: "propertyAddress",
    cell: (row) => (
      <span className="text-txt-primary">{row.propertyAddress}</span>
    ),
  },
  {
    header: "Service Type",
    accessorKey: "serviceType",
    cell: (row) => (
      <span className="text-txt-primary truncate block max-w-[200px]">
        {row.serviceType}
      </span>
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

export interface SeparateStatementItemCallbacks {
  onView: (item: SeparateStatementPropertyItem) => void;
  onDownload: (item: SeparateStatementPropertyItem) => void;
}

export const createSeparateStatementItemsColumns = (
  callbacks: SeparateStatementItemCallbacks
): ColumnDef<SeparateStatementPropertyItem>[] => [
  {
    header: "Property Address",
    accessorKey: "propertyAddress",
    cell: (row) => (
      <span className="text-txt-primary font-normal">{row.propertyAddress}</span>
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

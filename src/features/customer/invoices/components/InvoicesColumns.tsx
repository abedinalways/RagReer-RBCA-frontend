import React from "react";
import Link from "next/link";
import { ColumnDef, Invoice, InvoiceStatus } from "../types/invoicesTypes";

export const StatusBadge: React.FC<{ status: InvoiceStatus }> = ({
  status,
}) => {
  switch (status) {
    case "Pending":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-badge-pending-bg text-badge-pending-text border border-badge-pending-border">
          <span className="w-1.5 h-1.5 rounded-full bg-badge-pending-dot shrink-0" />
          Pending
        </span>
      );
    case "Paid":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-badge-active-bg text-badge-active-text border border-badge-active-border">
          <span className="w-1.5 h-1.5 rounded-full bg-badge-active-dot shrink-0" />
          Paid
        </span>
      );
    case "Due":
    case "Payment Due":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-rose-50 text-rose-600 border border-rose-200">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
          {status}
        </span>
      );
    case "Active":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-badge-active-bg text-badge-active-text border border-badge-active-border">
          <span className="w-1.5 h-1.5 rounded-full bg-badge-active-dot shrink-0" />
          Active
        </span>
      );
    case "Overdue":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
          Overdue
        </span>
      );
    default:
      return null;
  }
};

export const createInvoicesColumns = (
  onActionClick?: (invoice: Invoice) => void,
): ColumnDef<Invoice>[] => [
  {
    header: "Invoice ID",
    accessorKey: "id",
    cell: (row) => (
      <Link
        href={`/customer/invoices/${row.rawId || "inv-1024"}`}
        onClick={() => onActionClick?.(row)}
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
      <span className="text-txt-primary">
        {row.propertyAddress}
      </span>
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
      <span className="text-txt-primary">
        {row.paymentType}
      </span>
    ),
  },
  {
    header: "Issue Date",
    accessorKey: "issueDate",
    cell: (row) => (
      <span className="text-secondary-subheading">
        {row.issueDate}
      </span>
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
      <span className="text-primary-heading font-medium">
        {row.amount}
      </span>
    ),
  },
  {
    header: "Action",
    cell: (row) => (
      <Link
        href={`/customer/invoices/${row.rawId || "inv-1024"}`}
        onClick={() => onActionClick?.(row)}
        className="bg-card-bg border border-border hover:bg-primary hover:text-white text-txt-primary font-medium px-3.5 py-1.5 rounded-sm shadow-2xs cursor-pointer text-xs lg:text-sm inline-block text-center whitespace-nowrap"
      >
        View
      </Link>
    ),
  },
];

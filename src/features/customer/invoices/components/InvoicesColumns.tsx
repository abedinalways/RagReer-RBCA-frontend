import React from "react";
import { ColumnDef, Invoice, InvoiceStatus } from "../types/invoicesTypes";

export const StatusBadge: React.FC<{ status: InvoiceStatus }> = ({
  status,
}) => {
  switch (status) {
    case "Pending":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-tag-rescheduling-bg text-tag-rescheduling-text border border-tag-rescheduling-border">
          <span className="w-2 h-2 rounded-full bg-tag-rescheduling-text"></span>
          Pending
        </span>
      );
    case "Paid":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-trend-up/10 text-trend-up border border-trend-up/20">
          <span className="w-2 h-2 rounded-full bg-trend-up"></span>
          Paid
        </span>
      );
    case "Due":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-trend-down/10 text-trend-down border border-trend-down/20">
          <span className="w-2 h-2 rounded-full bg-trend-down"></span>
          Due
        </span>
      );
    case "Overdue":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-trend-down/10 text-trend-down border border-trend-down/20">
          <span className="w-2 h-2 rounded-full bg-trend-down"></span>
          Overdue
        </span>
      );
    default:
      return null;
  }
};

export const createInvoicesColumns = (
  onActionClick: (invoice: Invoice) => void,
): ColumnDef<Invoice>[] => [
  {
    header: "Invoice ID",
    accessorKey: "id",
    cell: (row) => (
      <button
        onClick={() => onActionClick(row)}
        className="text-primary hover:underline cursor-pointer font-medium"
      >
        {row.id}
      </button>
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
      <span className="text-txt-primary truncate block">
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
    cell: (row) => {
      const buttonText =
        row.status === "Paid" ? "View Receipt" : "View Details";
      return (
        <button
          onClick={() => onActionClick(row)}
          className="bg-card-bg border border-border text-txt-primary hover:bg-blue-50 font-medium px-3 py-1.5 rounded-md shadow-2xs cursor-pointer text-xs lg:text-sm"
        >
          {buttonText}
        </button>
      );
    },
  },
];

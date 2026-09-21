import React from "react";
import { ColumnDef, Invoice, InvoiceStatus } from "../types/invoicesTypes";

export const StatusBadge: React.FC<{ status: InvoiceStatus }> = ({
  status,
}) => {
  switch (status) {
    case "Pending":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-[#fffbeb] text-[#d97706] border border-[#fde68a]">
          <span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span>
          Pending
        </span>
      );
    case "Paid":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]">
          <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
          Paid
        </span>
      );
    case "Due":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-[#fef2f2] text-[#dc2626] border border-[#fecaca]">
          <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span>
          Due
        </span>
      );
    case "Overdue":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-[#ffe4e6] text-[#be123c] border border-[#fecdd3]">
          <span className="w-2 h-2 rounded-full bg-[#e11d48]"></span>
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
        className="text-[#2b5282] font-semibold hover:underline cursor-pointer"
      >
        {row.id}
      </button>
    ),
  },
  {
    header: "Property Address",
    accessorKey: "propertyAddress",
    cell: (row) => (
      <span className="text-gray-700 text-sm">{row.propertyAddress}</span>
    ),
  },
  {
    header: "Service Type",
    accessorKey: "serviceType",
    cell: (row) => (
      <span className="text-gray-700 text-sm truncate block">
        {row.serviceType}
      </span>
    ),
  },
  {
    header: "Payment Type",
    accessorKey: "paymentType",
    cell: (row) => (
      <span className="text-gray-700 text-sm">{row.paymentType}</span>
    ),
  },
  {
    header: "Issue Date",
    accessorKey: "issueDate",
    cell: (row) => (
      <span className="text-gray-600 text-sm">{row.issueDate}</span>
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
      <span className="text-gray-900 font-bold text-sm">{row.amount}</span>
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
          className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-medium px-3 py-1.5 rounded-md shadow-2xs"
        >
          {buttonText}
        </button>
      );
    },
  },
];

import React from "react";
import Link from "next/link";
import { ColumnDef } from "@/features/customer/invoices/types/invoicesTypes";
import { RequestItem, RequestStatus } from "../types/myRequestsTypes";
import { requestStatusStyles } from "../data/myRequestsData";

export const StatusBadge: React.FC<{ status: RequestStatus }> = ({
  status,
}) => {
  const style = requestStatusStyles[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[0.75rem] font-semibold ${style.badgeBg} ${style.badgeText} border ${style.badgeBorder}`}
    >
      <span className={`w-2 h-2 rounded-full ${style.dotBg}`}></span>
      {style.label}
    </span>
  );
};

export const createMyRequestsColumns = (
  onActionClick: (request: RequestItem) => void,
): ColumnDef<RequestItem>[] => [
  {
    header: "Request ID",
    accessorKey: "requestId",
    cell: (row) => (
      <button
        onClick={() => onActionClick(row)}
        className="text-primary text-[0.875rem] hover:underline cursor-pointer"
      >
        {row.requestId}
      </button>
    ),
  },
  {
    header: "Property Address",
    accessorKey: "propertyAddress",
    cell: (row) => (
      <span className="text-txt-primary text-[0.875rem]">
        {row.propertyAddress}
      </span>
    ),
  },
  {
    header: "Service Type",
    accessorKey: "serviceType",
    cell: (row) => (
      <span className="text-txt-primary text-[0.875rem] truncate block">
        {row.serviceType}
      </span>
    ),
  },
  {
    header: "Submitted On",
    accessorKey: "submittedOn",
    cell: (row) => (
      <span className="text-secondary-subheading text-[0.875rem]">
        {row.submittedOn}
      </span>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (row) => <StatusBadge status={row.status} />,
  },
  {
    header: "Action",
    cell: (row) => (
      <Link
        href={`/customer/requests/${row.id}`}
        className="bg-card-bg border border-border text-txt-primary hover:bg-blue-50 text-[0.875rem] font-medium px-3 py-1.5 rounded-md shadow-2xs cursor-pointer"
      >
        View
      </Link>
    ),
  },
];

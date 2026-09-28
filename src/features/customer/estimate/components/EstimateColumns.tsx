import React from "react";
import {
  ColumnDef,
  EstimateItem,
  EstimateStatus,
} from "../types/estimateTypes";
import { estimateStatusStyles } from "../data/estimateData";

export const StatusBadge: React.FC<{ status: EstimateStatus }> = ({
  status,
}) => {
  const style = estimateStatusStyles[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold ${style.badgeBg} ${style.badgeText} border ${style.badgeBorder}`}
    >
      <span className={`w-2 h-2 rounded-full ${style.dotBg}`}></span>
      {style.label}
    </span>
  );
};

export const createEstimateColumns = (
  onActionClick: (estimate: EstimateItem) => void,
): ColumnDef<EstimateItem>[] => [
  {
    header: "Estimate ID",
    accessorKey: "estimateId",
    cell: (row) => (
      <button
        onClick={() => onActionClick(row)}
        className="text-primary hover:underline cursor-pointer font-medium"
      >
        {row.estimateId}
      </button>
    ),
  },
  {
    header: "Request ID",
    accessorKey: "requestId",
    cell: (row) => (
      <span className="text-primary hover:underline cursor-pointer">
        {row.requestId}
      </span>
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
      <button
        onClick={() => onActionClick(row)}
        className="bg-card-bg border border-border text-txt-primary hover:bg-blue-50 font-medium px-3 py-1.5 rounded-md shadow-2xs cursor-pointer text-xs lg:text-sm"
      >
        View Details
      </button>
    ),
  },
];

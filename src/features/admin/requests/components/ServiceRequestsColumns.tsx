import React from "react";
import { ColumnDef } from "@/features/customer/invoices/types/invoicesTypes";
import { AdminServiceRequest } from "../types/serviceRequestsTypes";
import { requestStatusStyles } from "../data/serviceRequestsData";
import { ServiceRequestsActionMenu } from "./ServiceRequestsActionMenu";

export const createServiceRequestsColumns = (
  onActionClick: (actionKey: string, request: AdminServiceRequest) => void
): ColumnDef<AdminServiceRequest>[] => [
  {
    header: "Request ID",
    accessorKey: "requestId",
    cell: (row) => (
      <button
        type="button"
        onClick={() => onActionClick("view_details", row)}
        className="text-primary hover:underline font-medium text-xs sm:text-sm cursor-pointer whitespace-nowrap"
      >
        {row.requestId}
      </button>
    ),
  },
  {
    header: "Customer",
    cell: (row) => (
      <div className="flex items-center gap-2.5 min-w-[170px]">
        <img
          src={row.customer.avatar}
          alt={row.customer.name}
          className="h-8 w-8 rounded-full object-cover border border-border shrink-0"
        />
        <div className="flex flex-col min-w-0">
          <span className="font-medium text-txt-primary text-xs sm:text-sm truncate">
            {row.customer.name}
          </span>
          <span className="text-secondary-subheading text-[11px] sm:text-xs truncate">
            {row.customer.email}
          </span>
        </div>
      </div>
    ),
  },
  {
    header: "Property Address",
    accessorKey: "propertyAddress",
    cell: (row) => (
      <span className="text-txt-primary text-xs sm:text-sm whitespace-nowrap">
        {row.propertyAddress}
      </span>
    ),
  },
  {
    header: "Service Type",
    accessorKey: "serviceType",
    cell: (row) => (
      <span className="text-txt-primary text-xs sm:text-sm whitespace-nowrap">
        {row.serviceType}
      </span>
    ),
  },
  {
    header: "Submitted On",
    accessorKey: "submittedOn",
    cell: (row) => (
      <span className="text-secondary-subheading text-xs sm:text-sm whitespace-nowrap">
        {row.submittedOn}
      </span>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (row) => {
      const style = requestStatusStyles[row.status] || {
        badgeBg: "bg-page-bg",
        badgeText: "text-secondary-subheading",
        badgeBorder: "border-border",
        dotBg: "bg-secondary-subheading",
        label: row.status,
      };
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-xs font-medium ${style.badgeBg} ${style.badgeText} border ${style.badgeBorder} whitespace-nowrap`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${style.dotBg}`} />
          {style.label}
        </span>
      );
    },
  },
  {
    header: "Action",
    cell: (row) => (
      <ServiceRequestsActionMenu
        request={row}
        onActionClick={onActionClick}
      />
    ),
  },
];

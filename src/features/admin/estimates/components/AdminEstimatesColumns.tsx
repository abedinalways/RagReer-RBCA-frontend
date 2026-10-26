import React from "react";
import { ColumnDef } from "@/features/customer/invoices/types/invoicesTypes";
import {
  AdminEstimateItem,
  AdminEstimateStatus,
} from "../types/adminEstimates.types";
import { AdminEstimateActionMenu } from "./AdminEstimateActionMenu";

export const estimateStatusStyles: Record<
  AdminEstimateStatus,
  { badgeBg: string; badgeText: string; badgeBorder: string; dotBg: string }
> = {
  Draft: {
    badgeBg: "bg-[#F2F4F7]",
    badgeText: "text-[#344054]",
    badgeBorder: "border-[#D0D5DD]",
    dotBg: "bg-[#475467]",
  },
  Sent: {
    badgeBg: "bg-[#EFF8FF]",
    badgeText: "text-[#175CD3]",
    badgeBorder: "border-[#B2DDFF]",
    dotBg: "bg-[#1570EF]",
  },
  "Under Review": {
    badgeBg: "bg-[#FEF7E6]",
    badgeText: "text-[#B54708]",
    badgeBorder: "border-[#FEDF89]",
    dotBg: "bg-[#F79009]",
  },
  "Change Requested": {
    badgeBg: "bg-[#FFF4ED]",
    badgeText: "text-[#C2410C]",
    badgeBorder: "border-[#FED7AA]",
    dotBg: "bg-[#EA580C]",
  },
  Approved: {
    badgeBg: "bg-[#ECFDF3]",
    badgeText: "text-[#027A48]",
    badgeBorder: "border-[#ABEFC6]",
    dotBg: "bg-[#12B76A]",
  },
  Expired: {
    badgeBg: "bg-[#FEF3F2]",
    badgeText: "text-[#E11D48]",
    badgeBorder: "border-[#FECDCA]",
    dotBg: "bg-[#E11D48]",
  },
  Declined: {
    badgeBg: "bg-[#FEF3F2]",
    badgeText: "text-[#D92D20]",
    badgeBorder: "border-[#FDA29B]",
    dotBg: "bg-[#D92D20]",
  },
};

export const createAdminEstimatesColumns = (
  onActionClick: (actionKey: string, estimate: AdminEstimateItem) => void
): ColumnDef<AdminEstimateItem>[] => [
  {
    header: "Estimate ID",
    accessorKey: "estimateId",
    cell: (row) => (
      <button
        type="button"
        onClick={() => onActionClick("view_details", row)}
        className="text-primary hover:underline font-medium text-xs sm:text-sm cursor-pointer whitespace-nowrap"
      >
        {row.estimateId}
      </button>
    ),
  },
  {
    header: "Request ID",
    accessorKey: "requestId",
    cell: (row) => (
      <button
        type="button"
        onClick={() => onActionClick("view_request", row)}
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
        {row.customer.avatarUrl ? (
          <img
            src={row.customer.avatarUrl}
            alt={row.customer.name}
            className="h-8 w-8 rounded-full object-cover border border-border shrink-0"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-primary-light text-primary font-medium text-xs flex items-center justify-center shrink-0 border border-border">
            {row.customer.name.charAt(0)}
          </div>
        )}
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
      <span className="text-secondary-subheading text-xs sm:text-sm whitespace-nowrap">
        {row.propertyAddress}
      </span>
    ),
  },
  {
    header: "Service Type",
    accessorKey: "serviceType",
    cell: (row) => (
      <span className="text-secondary-subheading text-xs sm:text-sm whitespace-nowrap">
        {row.serviceType}
      </span>
    ),
  },
  {
    header: "Issue Date",
    accessorKey: "issueDate",
    cell: (row) => (
      <span className="text-secondary-subheading text-xs sm:text-sm whitespace-nowrap">
        {row.issueDate}
      </span>
    ),
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: (row) => (
      <span className="text-txt-primary font-medium text-xs sm:text-sm whitespace-nowrap">
        {row.amount}
      </span>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (row) => {
      const style = estimateStatusStyles[row.status] || {
        badgeBg: "bg-page-bg",
        badgeText: "text-secondary-subheading",
        badgeBorder: "border-border",
        dotBg: "bg-secondary-subheading",
      };
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs text-xs font-medium ${style.badgeBg} ${style.badgeText} border ${style.badgeBorder} whitespace-nowrap`}
        >
          <span className={`w-2 h-2 rounded-full ${style.dotBg} shrink-0`} />
          {row.status}
        </span>
      );
    },
  },
  {
    header: "Action",
    cell: (row) => (
      <AdminEstimateActionMenu
        estimate={row}
        onActionClick={onActionClick}
      />
    ),
  },
];

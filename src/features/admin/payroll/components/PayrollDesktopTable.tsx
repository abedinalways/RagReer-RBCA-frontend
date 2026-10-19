"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { ReusableTable } from "@/components/reusable/ReusableTable";
import { ColumnDef } from "@/features/customer/invoices/types/invoicesTypes";
import { CustomCheckbox } from "@/features/admin/roles/components/CustomCheckbox";
import { PayrollItem } from "../types";

interface PayrollDesktopTableProps {
  data: PayrollItem[];
  selectedIds: string[];
  isAllSelected: boolean;
  onSelectAll: (checked: boolean) => void;
  onToggleRow: (id: string, checked: boolean) => void;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

export function PayrollDesktopTable({
  data,
  selectedIds,
  isAllSelected,
  onSelectAll,
  onToggleRow,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PayrollDesktopTableProps) {
  const columns: ColumnDef<PayrollItem>[] = useMemo(
    () => [
      {
        header: (
          <div className="flex items-center justify-center">
            <CustomCheckbox
              id="select-all-payroll"
              checked={isAllSelected}
              onChange={onSelectAll}
            />
          </div>
        ),
        headerClassName: "w-12 text-center",
        className: "w-12 text-center",
        cell: (row) => (
          <div className="flex items-center justify-center">
            <CustomCheckbox
              id={`select-${row.id}`}
              checked={selectedIds.includes(row.id)}
              onChange={(checked) => onToggleRow(row.id, checked)}
            />
          </div>
        ),
      },
      {
        header: "Crew Member",
        cell: (row) => (
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 ring-1 ring-border/40 bg-page-bg">
              <Image
                src={row.avatar}
                alt={row.name}
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <span className="font-medium text-sm text-primary-heading block truncate">
                {row.name}
              </span>
              <span className="text-xs text-secondary-subheading block truncate">
                {row.email}
              </span>
            </div>
          </div>
        ),
      },
      {
        header: "Hours",
        accessorKey: "hours",
        cell: (row) => (
          <span className="text-sm text-txt-primary font-normal">
            {row.hours}
          </span>
        ),
      },
      {
        header: "Rate",
        accessorKey: "rate",
        cell: (row) => (
          <span className="text-sm text-secondary-subheading font-normal">
            {row.rate}
          </span>
        ),
      },
      {
        header: "Total Payable Amount",
        accessorKey: "totalPayable",
        cell: (row) => (
          <span className="text-sm font-bold text-txt-primary">
            {row.totalPayable}
          </span>
        ),
      },
    ],
    [isAllSelected, onSelectAll, selectedIds, onToggleRow]
  );

  return (
    <div className="hidden md:block">
      <ReusableTable<PayrollItem>
        data={data}
        columns={columns}
        keyExtractor={(item) => item.id}
        emptyMessage="No payroll records found."
        pagination={{
          currentPage,
          itemsPerPage,
          onPageChange,
          onItemsPerPageChange,
          pageSizeOptions: [10, 25, 50, 100],
        }}
      />
    </div>
  );
}

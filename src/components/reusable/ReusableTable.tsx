"use client";

import { ColumnDef } from "@/features/customer/invoices/types/invoicesTypes";
import { Pagination } from "@/components/reusable/Pagination";
import { useDragToScroll } from "@/hooks/useDragToScroll";
import React from "react";

interface ReusableTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  keyExtractor: (item: T, index: number) => string | number;
  emptyMessage?: string;
  pagination?: {
    currentPage: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (items: number) => void;
    pageSizeOptions?: number[];
  };
}

export function ReusableTable<T>({
  data,
  columns,
  keyExtractor,
  emptyMessage = "No items found.",
  pagination,
}: ReusableTableProps<T>) {
  const { ref, events, dragClassName } = useDragToScroll<HTMLDivElement>();

  const itemsPerPage = Math.max(1, pagination?.itemsPerPage ?? data.length);
  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  const currentPage = pagination
    ? Math.min(
        Math.max(1, Math.floor(pagination.currentPage)),
        Math.max(1, totalPages),
      )
    : 1;
  const visibleData = pagination
    ? data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      )
    : data;

  return (
    <div className="w-full">
      <div
        ref={ref}
        {...events}
        className={`w-full overflow-x-auto ${dragClassName}`}
      >
        <table className="w-full text-left border-collapse text-sm lg:text-base">
          <thead>
            <tr className="bg-page-bg border-b border-border">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="py-3 px-4 font-medium text-secondary-subheading capitalize tracking-wider whitespace-nowrap"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle bg-card-bg text-sm lg:text-base">
            {visibleData.length > 0 ? (
              visibleData.map((row, rowIdx) => (
                <tr
                  key={keyExtractor(row, rowIdx)}
                  className="hover:bg-blue-50/80 transition-colors"
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className="py-3.5 px-4 text-txt-primary text-sm lg:text-base"
                    >
                      {col.cell
                        ? col.cell(row)
                        : col.accessorKey
                          ? (row[col.accessorKey] as unknown as React.ReactNode)
                          : null}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-8 text-center text-secondary-subheading text-sm lg:text-base"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {pagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={pagination.onPageChange}
          onItemsPerPageChange={pagination.onItemsPerPageChange}
          pageSizeOptions={pagination.pageSizeOptions}
        />
      )}
    </div>
  );
}

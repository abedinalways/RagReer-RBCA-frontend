import { ColumnDef } from "@/features/customer/invoices/types/invoicesTypes";
import React from "react";
// import { ColumnDef } from "./invoicesTypes";

interface ReusableTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  keyExtractor: (item: T, index: number) => string | number;
  emptyMessage?: string;
}

export function ReusableTable<T>({
  data,
  columns,
  keyExtractor,
  emptyMessage = "No items found.",
}: ReusableTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#f3f4f6] border-b border-gray-200">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="py-3 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {data.length > 0 ? (
            data.map((row, rowIdx) => (
              <tr
                key={keyExtractor(row, rowIdx)}
                className="hover:bg-gray-50/80"
              >
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className="py-3.5 px-4 text-sm">
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
                className="py-8 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

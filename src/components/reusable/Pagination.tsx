import React from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
  pageSizeOptions?: number[];
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  pageSizeOptions = [10, 25, 50],
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white">
      {/* Show Items Selector */}
      <div className="flex items-center gap-2 text-sm text-gray-700">
        <span>Show items</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
        >
          {pageSizeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1 border rounded disabled:opacity-40"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button className="min-w-[32px] h-8 rounded text-sm bg-[#476282] text-white">
          {currentPage}
        </button>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1 border rounded disabled:opacity-40"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

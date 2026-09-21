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
    <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-card-bg">
      {/* Show Items Selector */}
      <div className="flex items-center gap-2 text-sm text-secondary-subheading">
        <span>Show items</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="border border-border rounded px-2 py-1 text-sm bg-input-bg text-secondary-subheading"
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
          className="p-1 border border-border bg-card-bg text-secondary-subheading rounded disabled:opacity-40 hover:border-primary hover:text-primary"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button className="min-w-8 h-8 rounded text-sm bg-primary text-primary-text">
          {currentPage}
        </button>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1 border border-border bg-card-bg text-secondary-subheading rounded disabled:opacity-40 hover:border-primary hover:text-primary"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

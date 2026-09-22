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
  pageSizeOptions = [1, 5, 10, 25, 50, 100],
}) => {
  // Generate dynamic array of page numbers with ellipsis (...)
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        if (!pages.includes("...")) {
          pages.push("...");
        }
      }

      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 px-4 py-3 border-t border-border bg-card-bg">
      {/* Left: Show Items Selector */}
      <div className="flex items-center gap-2 w-full sm:w-auto text-sm font-medium text-secondary-subheading">
        <span className="hidden sm:inline">Show items</span>
        <div className="relative inline-block flex-1 sm:flex-none">
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="appearance-none bg-card-bg border border-border rounded px-3 py-1.5 pr-8 text-sm text-secondary-subheading focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer w-full md:w-auto min-w-30"
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Right: Pagination Navigation Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2 w-full justify-center sm:justify-end">
        {/* Previous Page Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border border-border bg-card-bg rounded text-secondary-subheading hover:bg-border-subtle disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Page Number Group */}
        <div className="flex items-center overflow-hidden rounded bg-border-subtle">
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-sm text-secondary-subheading bg-border-subtle select-none"
                >
                  ...
                </span>
              );
            }

            const isSelected = page === currentPage;

            return (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(Number(page))}
                className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-sm font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-primary text-white font-semibold"
                    : "bg-border-subtle text-secondary-subheading hover:bg-border"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Page Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border border-border bg-card-bg rounded text-secondary-subheading hover:bg-border-subtle disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

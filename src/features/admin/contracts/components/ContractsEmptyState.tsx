"use client";

import React from "react";
import Link from "next/link";
import ContractsIcon from "@/components/icons/admin/ContractsIcon";

interface ContractsEmptyStateProps {
  onCreateContract?: () => void;
}

export const ContractsEmptyState: React.FC<ContractsEmptyStateProps> = ({
  onCreateContract,
}) => {
  return (
    <div className="w-full flex items-center justify-center py-12 md:py-20 px-4">
      <div className="w-full max-w-xl rounded-xl border border-border bg-card-bg p-10 sm:p-14 flex flex-col items-center justify-center text-center shadow-2xs animate-in fade-in duration-200">
        {/* Soft Blue Circle Container with ContractsIcon */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#EBF2F7] flex items-center justify-center text-[#5980A6] mb-4">
          <ContractsIcon className="w-7 h-7 sm:w-8 sm:h-8 text-[#5980A6]" />
        </div>

        {/* Title */}
        <h2 className="font-barlow-condensed font-medium text-xl sm:text-2xl text-primary-heading mb-1 tracking-tight">
          No Contracts Yet
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-secondary-subheading mb-6">
          Start with creating a new contract & agreement
        </p>

        {/* Create Contract Button */}
        {onCreateContract ? (
          <button
            type="button"
            onClick={onCreateContract}
            className="inline-flex items-center justify-center rounded-sm bg-primary px-6 py-2.5 text-sm font-medium text-white shadow-2xs hover:bg-primary-hover transition-colors cursor-pointer"
          >
            Create Contract & Agreement
          </button>
        ) : (
          <Link
            href="/admin/contracts/create"
            className="inline-flex items-center justify-center rounded-sm bg-primary px-6 py-2.5 text-sm font-medium text-white shadow-2xs hover:bg-primary-hover transition-colors cursor-pointer"
          >
            Create Contract & Agreement
          </Link>
        )}
      </div>
    </div>
  );
};

export default ContractsEmptyState;

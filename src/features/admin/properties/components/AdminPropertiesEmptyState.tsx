"use client";
import React from "react";
import PropertyIcon from "@/components/icons/customer/PropertyIcon";

interface AdminPropertiesEmptyStateProps {
  onLoadSampleData?: () => void;
}

export const AdminPropertiesEmptyState: React.FC<
  AdminPropertiesEmptyStateProps
> = ({ onLoadSampleData }) => {
  return (
    <div className="w-full flex items-center justify-center min-h-[550px] p-4">
      <div className="bg-card-bg rounded-xl border border-border p-8 sm:p-12 max-w-lg w-full text-center space-y-6 shadow-2xs">
        {/* Soft Circular Icon Container */}
        <div className="mx-auto w-16 h-16 rounded-full bg-nav-bg flex items-center justify-center text-primary shadow-2xs">
          <PropertyIcon className="w-8 h-8 text-primary" />
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-2">
          <h2 className="text-2xl font-medium text-primary-heading font-barlow-condensed">
            No Property Added Yet
          </h2>
          <p className="text-sm text-secondary-subheading max-w-sm mx-auto leading-relaxed">
            No properties have been added by customers yet. Properties will
            appear here once a customer adds one.
          </p>
        </div>

        {/* Optional helper to switch back to populated view */}
        {onLoadSampleData && (
          <div className="pt-1 flex items-center justify-center">
            <button
              type="button"
              onClick={onLoadSampleData}
              className="px-6 py-2 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-medium rounded-md shadow-2xs transition-colors cursor-pointer"
            >
              Load Sample Properties
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPropertiesEmptyState;

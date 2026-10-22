"use client";
import React from "react";
import { User, Plus } from "lucide-react";

interface AdminCustomersEmptyStateProps {
  onAddCustomer: () => void;
  onViewSampleCustomer?: () => void;
}

export const AdminCustomersEmptyState: React.FC<
  AdminCustomersEmptyStateProps
> = ({ onAddCustomer, onViewSampleCustomer }) => {
  return (
    <div className="space-y-4">
      {/* Top Header Row (Figma Screenshot 1) */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-primary-heading font-barlow-condensed">
          Customers
        </h1>
        <div className="flex items-center gap-2">
          {onViewSampleCustomer && (
            <button
              type="button"
              onClick={onViewSampleCustomer}
              className="px-4 py-2 border border-border text-secondary-subheading hover:bg-page-bg text-xs sm:text-sm font-medium rounded-md transition-colors cursor-pointer"
            >
              View Sample Customer
            </button>
          )}
          <button
            type="button"
            onClick={onAddCustomer}
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-medium rounded-md shadow-2xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>Add Customer</span>
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Empty State Card */}
      <div className="w-full flex items-center justify-center min-h-[500px] p-4">
        <div className="bg-card-bg rounded-xl border border-border p-8 sm:p-12 max-w-lg w-full text-center space-y-6 shadow-2xs">
          {/* Soft Circular Icon Container */}
          <div className="mx-auto w-16 h-16 rounded-full bg-nav-bg flex items-center justify-center text-primary shadow-2xs">
            <User className="w-8 h-8 text-primary" strokeWidth={1.75} />
          </div>

          {/* Heading & Subtitle */}
          <div className="space-y-2">
            <h2 className="text-2xl font-medium text-primary-heading font-barlow-condensed">
              No Customer Added Yet
            </h2>
            <p className="text-sm text-secondary-subheading max-w-xs mx-auto leading-relaxed">
              Create customer profile by adding them
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-1 flex items-center justify-center">
            <button
              type="button"
              onClick={onAddCustomer}
              className="w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-medium rounded-md shadow-2xs transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
            >
              <span>Add Customer</span>
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomersEmptyState;

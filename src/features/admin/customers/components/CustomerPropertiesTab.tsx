"use client";
import React from "react";
import PropertyIcon from "@/components/icons/admin/PropertyIcon";

export const CustomerPropertiesTab: React.FC = () => {
  return (
    <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-6 shadow-2xs space-y-4 min-h-[400px]">
      <h2 className="text-base sm:text-lg font-medium text-primary-heading font-barlow-condensed border-b border-border pb-3">
        Properties
      </h2>

      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
        {/* Soft Circular Icon Container */}
        <div className="mx-auto w-16 h-16 rounded-full bg-nav-bg flex items-center justify-center text-primary shadow-2xs">
          <PropertyIcon className="w-8 h-8 text-primary" />
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-medium text-primary-heading font-barlow-condensed">
            No Properties Added Yet
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading max-w-sm mx-auto leading-relaxed">
            The customer will add properties during onboarding
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerPropertiesTab;

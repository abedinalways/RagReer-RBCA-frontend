"use client";

import React from "react";
import { Wrench, Plus } from "lucide-react";
import Button from "@/components/ui/Button";

interface ServicesEmptyStateProps {
  onAddService: () => void;
}

export function ServicesEmptyState({ onAddService }: ServicesEmptyStateProps) {
  return (
    <div className="bg-card-bg border border-border rounded-xl p-8 sm:p-14 text-center max-w-xl mx-auto shadow-xs my-6 sm:my-12">
      {/* Tool Icon Circle */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#EFF4F9] flex items-center justify-center text-[#5980A6] mx-auto mb-4">
        <Wrench className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2]" />
      </div>

      {/* Heading */}
      <h3 className="text-xl sm:text-2xl font-bold text-primary-heading">
        No Service Added Yet
      </h3>

      {/* Description */}
      <p className="text-sm sm:text-base text-secondary-subheading max-w-md mx-auto mt-2 mb-6 leading-relaxed">
        Add service from the below button and manage all categories, services, pricing under one table.
      </p>

      {/* Action Button */}
      <div className="flex justify-center">
        <Button
          onClick={onAddService}
          fullWidth={false}
          className="w-full sm:w-auto self-stretch sm:self-auto shrink-0"
        >
          <span className="inline-flex items-center justify-center gap-2">
            <Plus className="w-4 h-4 stroke-[2.5] shrink-0" />
            <span>Add Service</span>
          </span>
        </Button>
      </div>
    </div>
  );
}

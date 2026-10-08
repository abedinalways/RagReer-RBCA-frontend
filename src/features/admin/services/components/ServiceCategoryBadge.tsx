import React from "react";
import { ServiceCategory } from "../types";

interface ServiceCategoryBadgeProps {
  category: string;
}

export function ServiceCategoryBadge({ category }: ServiceCategoryBadgeProps) {
  // Both commercial and residential services in the design screenshot have the crisp light-blue badge
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded border border-[#BAE0FD] bg-[#EBF5FF] text-[#0284C7] font-medium text-xs md:text-sm whitespace-nowrap">
      {category}
    </span>
  );
}

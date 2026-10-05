"use client";
import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { EstimatePropertyInfo } from "../types/estimateTypes";

interface EstimatePropertyCardProps {
  property: EstimatePropertyInfo;
}

export const EstimatePropertyCard: React.FC<EstimatePropertyCardProps> = ({
  property,
}) => {
  return (
    <div className="bg-card-bg rounded-lg border border-border p-4 shadow-2xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Property Image */}
        <div className="relative w-full sm:w-[130px] h-[96px] rounded-md overflow-hidden bg-slate-100 shrink-0">
          <Image
            src={property.imageUrl}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 130px"
          />
        </div>

        {/* Property Details */}
        <div className="flex-1 min-w-0 space-y-1.5">
          <span className="inline-block bg-[#EAF0F6] text-[#5980A6] text-[0.75rem] font-medium px-2 py-0.5 rounded">
            {property.tag}
          </span>
          <h2 className="text-sm md:text-base font-semibold text-primary-heading truncate">
            {property.title}
          </h2>
          <div className="flex items-center gap-1.5 text-secondary-subheading text-sm">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-secondary-subheading" />
            <span className="truncate">{property.address}</span>
          </div>
          <p className="text-xs md:text-sm font-medium text-primary">
            {property.size}
          </p>
        </div>
      </div>
    </div>
  );
};

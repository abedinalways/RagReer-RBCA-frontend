import React from "react";
import Link from "next/link";
import { Property } from "../types/PropertyTypes";
import { MapPinIcon } from "@/components/icons/MapPinIcon";

export interface PropertyCardProps {
  property: Property;
  onEdit?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onEdit,
}) => {
  return (
    <div className="bg-card-bg border border-border rounded-xl p-3.5 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow duration-200">
      <div>
        {/* Top Image Container */}
        <div className="relative w-full h-45 rounded-lg overflow-hidden mb-3 bg-blue-100">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Tag & Status Row */}
        <div className="flex items-center justify-between min-h-6.5 mb-2 text-[0.75rem]">
          <span className="inline-block bg-blue-50 text-secondary-subheading  font-medium px-2.5 py-0.5 rounded">
            {property.type}
          </span>

          {property.status && (
            <span
              className={`inline-flex items-center gap-1.5 font-medium px-2.5 py-0.5 rounded-md border ${
                property.status === "Active"
                  ? "bg-status-running-bg text-info border-border-card"
                  : "bg-trend-down/10 text-trend-down border-trend-down/20"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  property.status === "Active" ? "bg-info" : "bg-trend-down"
                }`}
              />
              {property.status}
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="font-medium text-primary-heading text-[1rem] leading-snug mb-1.5 line-clamp-1">
          {property.title}
        </h4>

        {/* Location Row */}
        <div className="flex gap-2 items-center text-secondary-subheading text-[0.875rem] mb-3">
          <MapPinIcon className="w-3.5 h-3.5 text-secondary-subheading mr-1 mt-0.5 shrink-0" />
          <span className="line-clamp-1">{property.address}</span>
        </div>

        {/* Size Row */}
        <div className="text-[0.875rem] font-medium text-secondary-subheading mb-4">
          Size:{" "}
          <span className="text-txt-primary font-medium">{property.size}</span>
        </div>
      </div>

      {/* Action Buttons Row */}
      <hr className="my-5 border border-border" />
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => onEdit?.(property)}
          className="w-full py-2 px-3 border border-border hover:bg-blue-50 text-primary text-[0.875rem] font-medium rounded-md transition-colors text-center cursor-pointer"
        >
          Edit
        </button>
        <Link
          href={`/customer/property/${property.id}`}
          className="w-full py-2 px-3 border border-border hover:bg-blue-50 text-primary text-[0.875rem] font-medium rounded-md transition-colors text-center cursor-pointer"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

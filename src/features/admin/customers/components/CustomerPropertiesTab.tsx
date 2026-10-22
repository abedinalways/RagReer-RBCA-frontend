"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { MapPin, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { CUSTOMER_PROPERTIES_LIST } from "../data/adminCustomersDetailData";
import { CustomerPropertyItem } from "../types/adminCustomers.types";
import { Pagination } from "@/components/reusable/Pagination";

interface CustomerPropertiesTabProps {
  onSelectProperty?: (property: CustomerPropertyItem) => void;
}

export const CustomerPropertiesTab: React.FC<CustomerPropertiesTabProps> = ({
  onSelectProperty,
}) => {
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(25);

  const filteredProperties = useMemo(() => {
    return CUSTOMER_PROPERTIES_LIST.filter((prop) => {
      const matchType =
        selectedType === "All" || prop.category === selectedType;
      const matchStatus =
        selectedStatus === "All" || prop.status === selectedStatus;
      return matchType && matchStatus;
    });
  }, [selectedType, selectedStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / itemsPerPage));
  const currentProperties = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProperties.slice(start, start + itemsPerPage);
  }, [filteredProperties, currentPage, itemsPerPage]);

  const handleViewProperty = (prop: CustomerPropertyItem) => {
    if (onSelectProperty) {
      onSelectProperty(prop);
    } else {
      toast.success(`Viewing property details: ${prop.title}`);
    }
  };

  return (
    <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-6 shadow-2xs space-y-6">
      {/* Header and Filter Row (Figma Screenshot 2) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <h2 className="text-xl sm:text-2xl font-medium text-primary-heading font-barlow-condensed">
          Properties
        </h2>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-3">
          {/* Property Type Dropdown */}
          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none bg-card-bg border border-border text-xs sm:text-sm text-primary-heading pl-3 pr-8 py-2 rounded-md focus:outline-hidden focus:border-primary cursor-pointer"
            >
              <option value="All">All Property Type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Church">Church</option>
              <option value="HOA">HOA</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none bg-card-bg border border-border text-xs sm:text-sm text-primary-heading pl-3 pr-8 py-2 rounded-md focus:outline-hidden focus:border-primary cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 3-Column Properties Grid (Figma Screenshot 2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentProperties.map((prop) => (
          <div
            key={prop.id}
            className="rounded-xl border border-border bg-card-bg overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            {/* Property Image */}
            <div className="relative w-full h-48 sm:h-52 bg-slate-100 overflow-hidden">
              <Image
                src={prop.imageUrl}
                alt={prop.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Property Content */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                {/* Category & Status Row */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-secondary-subheading border border-blue-100">
                    {prop.category}
                  </span>

                  {prop.status === "Active" ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-info">
                      <span className="w-1.5 h-1.5 rounded-full bg-info" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-decline">
                      <span className="w-1.5 h-1.5 rounded-full bg-decline" />
                      Inactive
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-primary-heading font-barlow-condensed leading-snug line-clamp-1">
                  {prop.title}
                </h3>

                {/* Address */}
                <div className="flex items-center gap-1 text-xs text-secondary-subheading">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-secondary-subheading/70" />
                  <span className="truncate">{prop.address}</span>
                </div>

                {/* Size */}
                <p className="text-xs text-secondary-subheading pt-1">
                  {prop.size}
                </p>
              </div>

              {/* View Details Button */}
              <button
                type="button"
                onClick={() => handleViewProperty(prop)}
                className="w-full mt-3 py-2 px-4 rounded-md border border-primary/50 text-primary hover:bg-primary hover:text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer text-center"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="pt-4 border-t border-border">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(newSize) => {
            setItemsPerPage(newSize);
            setCurrentPage(1);
          }}
          pageSizeOptions={[6, 12, 25, 50]}
        />
      </div>
    </div>
  );
};

export default CustomerPropertiesTab;

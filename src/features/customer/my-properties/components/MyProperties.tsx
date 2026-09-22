"use client";
import React, { useState } from "react";
import { PropertyCard } from "./PropertyCard";
import { Pagination } from "@/components/reusable/Pagination";
import { ImportIcon } from "@/components/icons/ImportIcon";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { propertiesData } from "../data/propertiesData";

export const MyProperties: React.FC = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  return (
    <div>
      <div className="bg-card-bg border border-border rounded-2xl p-7 shadow-xs">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 md:mb-6">
          <h2 className="text-[1.25rem] font-medium text-primary-heading">
            My Properties
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-input-bg border border-border rounded-md px-3 py-2 text-[1rem] font-medium text-txt-primary"
            >
              <option value="All">All Property Type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>

            <button className="bg-input-bg border border-border px-4 py-2 rounded-md text-[1rem] font-medium text-txt-primary hover:bg-blue-50 cursor-pointer transition-colors flex items-center gap-2">
              Import
              <ImportIcon className="w-4 h-4" />
            </button>

            <button className="bg-primary text-primary-text px-4 py-2 rounded-md text-[1rem] font-medium hover:bg-primary-hover cursor-pointer transition-colors flex items-center gap-2">
              <PlusIcon className="w-4 h-4" />
              Add New Property
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          {propertiesData.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>

        {/* Pagination Bar */}
        <Pagination
          currentPage={currentPage}
          totalPages={4}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>
    </div>
  );
};

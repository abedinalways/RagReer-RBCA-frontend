"use client";

import React, { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { PropertyCard } from "./PropertyCard";
import { PropertyEmptyState } from "./PropertyEmptyState";
import { ImportPropertyModal } from "./ImportPropertyModal";
import { ImportPreviewModal } from "./ImportPreviewModal";
import { AddPropertyModal } from "./AddPropertyModal";
import { Pagination } from "@/components/reusable/Pagination";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { ImportIcon } from "@/components/icons/ImportIcon";
import { propertiesData } from "../data/propertiesData";
import { Property, PropertyType } from "../types/PropertyTypes";

const PROPERTY_TYPE_OPTIONS = [
  "All Property Type",
  "Residential",
  "Commercial",
];

export const MyProperties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>(propertiesData);
  const [selectedType, setSelectedType] = useState<string>("All Property Type");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(25);

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const filteredProperties = useMemo(() => {
    if (selectedType === "All Property Type") {
      return properties;
    }
    return properties.filter((prop) => prop.type === selectedType);
  }, [properties, selectedType]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProperties.length / itemsPerPage)
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const visibleProperties = filteredProperties.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage
  );

  const handleOpenAddModal = () => {
    setEditingProperty(null);
    setIsAddModalOpen(true);
  };

  const handleEditProperty = (prop: Property) => {
    setEditingProperty(prop);
    setIsAddModalOpen(true);
  };

  const handleSaveProperty = (savedProp: Property) => {
    setProperties((prev) => {
      const exists = prev.some((p) => p.id === savedProp.id);
      if (exists) {
        return prev.map((p) => (p.id === savedProp.id ? savedProp : p));
      }
      return [savedProp, ...prev];
    });
    setIsAddModalOpen(false);
    setEditingProperty(null);
  };

  const handleUploadSuccess = () => {
    setIsImportModalOpen(false);
    setIsPreviewModalOpen(true);
  };

  const handleConfirmImport = (importedList: Property[]) => {
    setProperties((prev) => [...importedList, ...prev]);
    setIsPreviewModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {properties.length === 0 ? (
        <PropertyEmptyState
          onImportClick={() => setIsImportModalOpen(true)}
          onAddClick={handleOpenAddModal}
        />
      ) : (
        <div className="bg-card-bg rounded-lg border border-border p-4 sm:p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-primary-heading">
              My Properties
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="w-full sm:w-48">
                <CustomSelect
                  value={selectedType}
                  onChange={(val) => {
                    setSelectedType(val);
                    setCurrentPage(1);
                  }}
                  options={PROPERTY_TYPE_OPTIONS}
                  size="sm"
                />
              </div>

              <button
                type="button"
                onClick={() => setIsImportModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-card-bg border border-border px-4 py-2 rounded-md text-sm font-medium text-txt-primary hover:bg-blue-50/70 transition-colors cursor-pointer"
              >
                <span>Import</span>
                <ImportIcon className="w-4 h-4 text-primary" />
              </button>

              <button
                type="button"
                onClick={handleOpenAddModal}
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Property</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {visibleProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onEdit={handleEditProperty}
              />
            ))}
          </div>

          <Pagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(items) => {
              setItemsPerPage(items);
              setCurrentPage(1);
            }}
          />
        </div>
      )}

      <ImportPropertyModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />

      <ImportPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        onConfirmImport={handleConfirmImport}
      />

      <AddPropertyModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingProperty(null);
        }}
        onSave={handleSaveProperty}
        initialProperty={editingProperty}
      />
    </div>
  );
};

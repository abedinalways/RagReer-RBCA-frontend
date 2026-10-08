"use client";

import React, { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import { ServiceItem, ServiceFilters } from "../types";
import { INITIAL_SERVICES } from "../data/servicesData";
import { ServicesToolbar } from "./ServicesToolbar";
import { ServicesTable } from "./ServicesTable";
import { ServicesEmptyState } from "./ServicesEmptyState";
import { ServiceFormModal } from "./ServiceFormModal";
import { DeleteConfirmationModal } from "@/features/admin/equipment/components/DeleteConfirmationModal";

export function ServicesManagementView() {
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);

  // Filters state
  const [filters, setFilters] = useState<ServiceFilters>({
    search: "",
    category: "",
    applicableTo: "",
    pricingType: "",
    status: "",
  });

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState<ServiceItem | null>(null);

  // Filtered dataset
  const filteredServices = useMemo(() => {
    return services.filter((item) => {
      // Search
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        const appString = Array.isArray(item.applicableTo)
          ? item.applicableTo.join(" ")
          : (item.applicableTo || "");
        const matchesApp = appString.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat && !matchesApp) {
          return false;
        }
      }

      // Category
      if (filters.category && item.category !== filters.category) {
        return false;
      }

      // Applicable To
      if (filters.applicableTo) {
        const appString = Array.isArray(item.applicableTo)
          ? item.applicableTo.join(" ")
          : (item.applicableTo || "");
        if (!appString.toLowerCase().includes(filters.applicableTo.toLowerCase())) {
          return false;
        }
      }

      // Pricing Type
      if (filters.pricingType && item.pricingType !== filters.pricingType) {
        return false;
      }

      // Status
      if (filters.status === "active" && !item.isActive) {
        return false;
      }
      if (filters.status === "inactive" && item.isActive) {
        return false;
      }

      return true;
    });
  }, [services, filters]);

  // Handlers
  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (item: ServiceItem) => {
    setEditingItem(item);
    setIsFormModalOpen(true);
  };

  const handleOpenDelete = (item: ServiceItem) => {
    setDeletingItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingItem) {
      setServices((prev) => prev.filter((s) => s.id !== deletingItem.id));
      setDeletingItem(null);
    }
    setIsDeleteModalOpen(false);
  };

  const handleToggleStatus = (id: string, active: boolean) => {
    setServices((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: active } : item
      )
    );
  };

  const handleSaveService = (data: Omit<ServiceItem, "id" | "updatedOn"> & { id?: string }) => {
    const today = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date());

    if (data.id) {
      // Edit
      setServices((prev) =>
        prev.map((item) =>
          item.id === data.id
            ? {
                ...item,
                ...data,
                updatedOn: today,
              }
            : item
        )
      );
    } else {
      // Add
      const newService: ServiceItem = {
        ...data,
        id: `srv-${Date.now()}`,
        updatedOn: today,
      };
      setServices((prev) => [newService, ...prev]);
    }
  };

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary-heading">
            Service
          </h1>
          <p className="text-xs md:text-sm text-secondary-subheading mt-0.5">
            Configure lawn care service catalog, tiered bundles, seasonal offerings, and rate cards.
          </p>
        </div>

        <Button
          onClick={handleOpenAdd}
          fullWidth={false}
          className="w-full sm:w-auto self-stretch sm:self-auto shrink-0"
        >
          <span className="inline-flex items-center justify-center gap-2">
            <span>Add New Service</span>
            <Plus className="w-4 h-4 stroke-[2.5] shrink-0" />
          </span>
        </Button>
      </div>

      {/* Main Content Area */}
      {services.length === 0 ? (
        <ServicesEmptyState onAddService={handleOpenAdd} />
      ) : (
        <div className="w-full bg-card-bg border border-border rounded-xl shadow-xs overflow-hidden">
          <ServicesToolbar
            filters={filters}
            onFilterChange={setFilters}
          />
          <ServicesTable
            data={filteredServices}
            onToggleStatus={handleToggleStatus}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDelete}
          />
        </div>
      )}

      {/* Add / Edit Form Modal */}
      <ServiceFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        initialData={editingItem}
        onSave={handleSaveService}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Are you sure want to delete this item?"
        description="This action can not be undone. Do you want to continue?"
      />
    </div>
  );
}

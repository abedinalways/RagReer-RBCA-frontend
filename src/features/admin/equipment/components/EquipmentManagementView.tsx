"use client";

import React, { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import {
  EquipmentItem,
  EquipmentFilters,
  EquipmentCondition,
  EquipmentStatus,
  EquipmentStats,
} from "../types";
import { INITIAL_EQUIPMENT_DATA } from "../data/equipmentData";
import { EquipmentStatCards } from "./EquipmentStatCards";
import { EquipmentToolbar } from "./EquipmentToolbar";
import { EquipmentTable } from "./EquipmentTable";
import { EquipmentFormModal } from "./EquipmentFormModal";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";

export function EquipmentManagementView() {
  const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>(
    () => INITIAL_EQUIPMENT_DATA
  );

  const [filters, setFilters] = useState<EquipmentFilters>({
    search: "",
    type: "",
    condition: "",
    status: "",
  });

  // Modal controls
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EquipmentItem | null>(null);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<EquipmentItem | null>(null);

  // Compute stats dynamically from the current dataset
  const stats: EquipmentStats = useMemo(() => {
    return {
      total: equipmentList.length,
      available: equipmentList.filter((e) => e.status === "Available").length,
      inUse: equipmentList.filter((e) => e.status === "In Use").length,
      inRepair: equipmentList.filter((e) => e.status === "In Repair").length,
      damaged: equipmentList.filter((e) => e.status === "Damaged").length,
    };
  }, [equipmentList]);

  // Filter equipment
  const filteredEquipment = useMemo(() => {
    return equipmentList.filter((item) => {
      // Search
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesType = item.type.toLowerCase().includes(query);
        const matchesJob = item.assignedJob?.toLowerCase().includes(query) ?? false;
        const matchesWorker = item.assignedTo?.name.toLowerCase().includes(query) ?? false;
        if (!matchesName && !matchesType && !matchesJob && !matchesWorker) {
          return false;
        }
      }

      // Type filter
      if (filters.type && item.type !== filters.type) {
        return false;
      }

      // Condition filter
      if (filters.condition && item.condition !== filters.condition) {
        return false;
      }

      // Status filter
      if (filters.status && item.status !== filters.status) {
        return false;
      }

      return true;
    });
  }, [equipmentList, filters]);

  // Handlers
  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: EquipmentItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = (data: Omit<EquipmentItem, "id"> & { id?: string }) => {
    if (data.id) {
      // Edit existing
      setEquipmentList((prev) =>
        prev.map((item) => (item.id === data.id ? { ...item, ...data } as EquipmentItem : item))
      );
      toast.success(`Updated "${data.name}" successfully!`);
    } else {
      // Add new
      const newItem: EquipmentItem = {
        ...data,
        id: `eq-${Date.now()}`,
      };
      setEquipmentList((prev) => [newItem, ...prev]);
      toast.success(`Added "${data.name}" successfully!`);
    }
  };

  const handleUpdateCondition = (id: string, condition: EquipmentCondition) => {
    setEquipmentList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, condition } : item))
    );
    toast.success(`Condition updated to ${condition}`);
  };

  const handleUpdateStatus = (id: string, status: EquipmentStatus) => {
    setEquipmentList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    toast.success(`Status updated to ${status}`);
  };

  const handleAssign = (item: EquipmentItem) => {
    toast(`Assignment drawer for ${item.name} opened`, { icon: "🔧" });
  };

  const handleDeleteClick = (item: EquipmentItem) => {
    setDeleteTarget(item);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setEquipmentList((prev) => prev.filter((i) => i.id !== deleteTarget.id));
    toast.success(`Deleted ${deleteTarget.name}`);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6 w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-primary-heading">
            Equipment
          </h1>
          <p className="text-xs md:text-sm text-secondary-subheading mt-0.5">
            Track machinery, lawn care equipment assignments, maintenance cycles, and fleet inventory.
          </p>
        </div>

        <Button
          onClick={handleOpenAdd}
          fullWidth={false}
          className="w-full sm:w-auto self-stretch sm:self-auto shrink-0"
        >
          <span className="inline-flex items-center justify-center gap-2">
            <span>Add Equipment</span>
            <Plus className="w-4 h-4 stroke-[2.5] shrink-0" />
          </span>
        </Button>
      </div>

      {/* 5 Metric Summary Cards */}
      <EquipmentStatCards stats={stats} />

      {/* Main Card with Toolbar & Table */}
      <div className="w-full bg-card-bg border border-border rounded-xl shadow-xs overflow-hidden">
        <EquipmentToolbar
          filters={filters}
          onFilterChange={setFilters}
        />
        <EquipmentTable
          data={filteredEquipment}
          onUpdateCondition={handleUpdateCondition}
          onUpdateStatus={handleUpdateStatus}
          onEdit={handleOpenEdit}
          onAssign={handleAssign}
          onDelete={handleDeleteClick}
        />
      </div>

      {/* Add / Edit Equipment Modal */}
      <EquipmentFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingItem}
        onSave={handleSaveItem}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

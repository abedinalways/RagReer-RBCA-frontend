"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { RoleId } from "../types";
import { ROLES_CONFIG } from "../data/rolesData";
import { RolesTable } from "./RolesTable";
import { PermissionModal } from "./PermissionModal";
import Button from "@/components/ui/Button";

export function RolesManagementView() {
  // Store permissions displayed on the main table
  const [rolePermissions, setRolePermissions] = useState<Record<RoleId, string[]>>(() => {
    return {
      "crew-leader": [...ROLES_CONFIG["crew-leader"].initialActivePermissions],
      "crew-member": [...ROLES_CONFIG["crew-member"].initialActivePermissions],
      customer: [...ROLES_CONFIG.customer.initialActivePermissions],
    };
  });

  // Modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<RoleId>("crew-leader");
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");

  // Handle removing a permission tag directly from the table
  const handleRemovePermission = (roleId: RoleId, permission: string) => {
    setRolePermissions((prev) => ({
      ...prev,
      [roleId]: prev[roleId].filter((p) => p !== permission),
    }));
    toast.success(`Removed "${permission}" from ${ROLES_CONFIG[roleId].role.name}`);
  };

  // Open modal in EDIT mode targeted directly to the selected role tab
  const handleEditRole = (roleId: RoleId) => {
    setActiveRole(roleId);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  // Open modal in VIEW mode from the top-right button
  const handleViewAllPermissions = () => {
    setModalMode("view");
    setIsModalOpen(true);
  };

  // Save changes from modal matrix
  const handleSaveModalPermissions = (
    roleId: RoleId,
    updatedMatrix: Record<string, string[]>
  ) => {
    // Collect all checked permission strings across all modules for this role
    const allChecked = Object.values(updatedMatrix).flat();

    // Map module permissions to friendly display tags if needed, or preserve existing tags
    setRolePermissions((prev) => {
      // Merge unique permissions
      const current = prev[roleId] || [];
      // Combine active list with checked matrix items
      const combined = Array.from(new Set([...current, ...allChecked]));
      return {
        ...prev,
        [roleId]: combined.length > 0 ? combined : allChecked,
      };
    });

    toast.success(`Permissions updated for ${ROLES_CONFIG[roleId].role.name}`);
  };

  return (
    <div className="space-y-6 w-full">
      {/* Top Header matching Image 1 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-primary-heading">
            Manage Roles
          </h1>
          <p className="text-xs md:text-sm text-secondary-subheading mt-0.5">
            Configure role access privileges, view matrix allocations, and adjust team tier permissions.
          </p>
        </div>
        <Button
          onClick={handleViewAllPermissions}
          fullWidth={false}
          className="w-full sm:w-auto shrink-0"
        >
          View Permission
        </Button>
      </div>

      {/* Main Roles Table */}
      <RolesTable
        rolePermissions={rolePermissions}
        onRemovePermission={handleRemovePermission}
        onEditRole={handleEditRole}
      />

      {/* Reusable Permission Modal */}
      <PermissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeRole={activeRole}
        onRoleChange={setActiveRole}
        mode={modalMode}
        onSave={handleSaveModalPermissions}
      />
    </div>
  );
}

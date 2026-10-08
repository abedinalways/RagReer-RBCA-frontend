"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/reusable/Modal";
import { RoleId } from "../types";
import { ROLES_CONFIG, INITIAL_MODAL_CHECKED_PERMISSIONS } from "../data/rolesData";
import { CustomCheckbox } from "./CustomCheckbox";
import { cn } from "@/lib/utils";

interface PermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeRole: RoleId;
  onRoleChange: (roleId: RoleId) => void;
  mode: "view" | "edit";
  onSave: (roleId: RoleId, updatedChecked: Record<string, string[]>) => void;
}

const TABS: { id: RoleId; label: string }[] = [
  { id: "crew-leader", label: "Crew Leader" },
  { id: "crew-member", label: "Crew Member" },
  { id: "customer", label: "Customer" },
];

export function PermissionModal({
  isOpen,
  onClose,
  activeRole,
  onRoleChange,
  mode,
  onSave,
}: PermissionModalProps) {
  // Local state for checkboxes in the matrix per role
  const [matrixState, setMatrixState] = useState<Record<RoleId, Record<string, string[]>>>(
    () => INITIAL_MODAL_CHECKED_PERMISSIONS
  );

  // Sync or reset whenever opened
  useEffect(() => {
    if (isOpen) {
      // Keep existing state or reset if needed
    }
  }, [isOpen]);

  const currentRoleConfig = ROLES_CONFIG[activeRole];
  const currentChecked = matrixState[activeRole] || {};

  // Check if a single permission is checked
  const isChecked = (moduleId: string, permission: string): boolean => {
    return (currentChecked[moduleId] || []).includes(permission);
  };

  // Toggle a single permission
  const handleTogglePermission = (moduleId: string, permission: string) => {
    setMatrixState((prev) => {
      const roleModules = { ...(prev[activeRole] || {}) };
      const currentModulePerms = roleModules[moduleId] || [];

      const updatedModulePerms = currentModulePerms.includes(permission)
        ? currentModulePerms.filter((p) => p !== permission)
        : [...currentModulePerms, permission];

      return {
        ...prev,
        [activeRole]: {
          ...roleModules,
          [moduleId]: updatedModulePerms,
        },
      };
    });
  };

  // Toggle entire module
  const handleToggleModule = (moduleId: string, checkAll: boolean) => {
    const targetModule = currentRoleConfig.modules.find((m) => m.id === moduleId);
    if (!targetModule) return;

    setMatrixState((prev) => {
      const roleModules = { ...(prev[activeRole] || {}) };
      return {
        ...prev,
        [activeRole]: {
          ...roleModules,
          [moduleId]: checkAll ? [...targetModule.permissions] : [],
        },
      };
    });
  };

  // Calculate if entire module is checked
  const isModuleChecked = (moduleId: string): boolean => {
    const targetModule = currentRoleConfig.modules.find((m) => m.id === moduleId);
    if (!targetModule || targetModule.permissions.length === 0) return false;
    const checkedInModule = currentChecked[moduleId] || [];
    return targetModule.permissions.every((p) => checkedInModule.includes(p));
  };

  // Calculate if all permissions in current role are checked
  const isAllRoleChecked = (): boolean => {
    return currentRoleConfig.modules.every((mod) => {
      const checkedInModule = currentChecked[mod.id] || [];
      return mod.permissions.every((p) => checkedInModule.includes(p));
    });
  };

  // Toggle "Assign all permission to role"
  const handleToggleAllForRole = (checked: boolean) => {
    setMatrixState((prev) => {
      const updatedModules: Record<string, string[]> = {};
      for (const mod of currentRoleConfig.modules) {
        updatedModules[mod.id] = checked ? [...mod.permissions] : [];
      }
      return {
        ...prev,
        [activeRole]: updatedModules,
      };
    });
  };

  const handleSaveAndSubmit = () => {
    onSave(activeRole, matrixState[activeRole] || {});
    onClose();
  };

  const modalTitle = mode === "edit" ? "Edit All Permission" : "View All Permission";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      maxWidth="6xl"
      className="max-h-[90vh]"
      contentClassName="p-0 overflow-hidden flex flex-col"
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-md border border-border text-txt-primary hover:bg-page-bg font-medium text-sm md:text-base transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveAndSubmit}
            className="px-6 py-2.5 rounded-md bg-primary text-white hover:bg-primary-hover font-medium text-sm md:text-base transition-colors cursor-pointer shadow-xs"
          >
            Save & Update
          </button>
        </div>
      }
    >
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Role Tabs Header */}
        <div className="flex items-center gap-8 px-6 pt-2 border-b border-border bg-layout-bg shrink-0">
          {TABS.map((tab) => {
            const isActive = activeRole === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onRoleChange(tab.id)}
                className={cn(
                  "pb-2.5 md:pb-3.5 pt-2 text-sm md:text-base font-medium transition-colors border-b-2 cursor-pointer -mb-0.5 md:-mb-px",
                  isActive
                    ? "border-primary text-primary font-semibold"
                    : "border-transparent text-secondary-subheading hover:text-txt-primary"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Scrollable Matrix Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="border border-border rounded-lg overflow-hidden bg-layout-bg shadow-2xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-page-bg/80 border-b border-border text-xs sm:text-sm font-semibold text-secondary-subheading">
                  <th className="py-3 px-4 w-44 sm:w-52">Module</th>
                  <th className="py-3 px-4">Permissions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {currentRoleConfig.modules.map((mod) => {
                  const modChecked = isModuleChecked(mod.id);

                  return (
                    <tr key={mod.id} className="hover:bg-page-bg/30 transition-colors">
                      {/* Module Checkbox */}
                      <td className="py-4 px-4 align-top">
                        <CustomCheckbox
                          id={`mod-${mod.id}`}
                          checked={modChecked}
                          onChange={(checked) => handleToggleModule(mod.id, checked)}
                          label={<span className="font-medium">{mod.name}</span>}
                        />
                      </td>

                      {/* Permissions Checkbox Grid */}
                      <td className="py-4 px-4 align-top">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-3">
                          {mod.permissions.map((perm) => (
                            <CustomCheckbox
                              key={perm}
                              id={`perm-${mod.id}-${perm}`}
                              checked={isChecked(mod.id, perm)}
                              onChange={() => handleTogglePermission(mod.id, perm)}
                              label={perm}
                            />
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Assign all permissions checkbox */}
          <div className="pt-4 pb-2">
            <CustomCheckbox
              id="assign-all-permissions"
              checked={isAllRoleChecked()}
              onChange={handleToggleAllForRole}
              label={
                <span className="text-xs sm:text-sm text-secondary-subheading font-medium">
                  Assign all permission to role
                </span>
              }
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

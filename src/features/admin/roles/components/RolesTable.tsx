"use client";

import React from "react";
import { Pencil } from "lucide-react";
import { RoleId } from "../types";
import { ROLES_CONFIG } from "../data/rolesData";
import { PermissionTag } from "./PermissionTag";
import { useDragToScroll } from "@/hooks/useDragToScroll";

interface RolesTableProps {
  rolePermissions: Record<RoleId, string[]>;
  onRemovePermission: (roleId: RoleId, permission: string) => void;
  onEditRole: (roleId: RoleId) => void;
}

const ORDERED_ROLES: RoleId[] = ["crew-leader", "crew-member", "customer"];

export function RolesTable({
  rolePermissions,
  onRemovePermission,
  onEditRole,
}: RolesTableProps) {
  const { ref, events, dragClassName } = useDragToScroll<HTMLDivElement>();

  return (
    <div className="w-full bg-card-bg border border-border rounded-xl shadow-xs overflow-hidden">
      {/* Desktop / Tablet Table View (hidden on small mobile screens) */}
      <div
        ref={ref}
        {...events}
        className={`hidden sm:block overflow-x-auto ${dragClassName}`}
      >
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-page-bg/75 border-b border-border text-sm md:text-base font-normal text-secondary-subheading uppercase sm:normal-case tracking-wider sm:tracking-normal">
              <th className="py-4 px-6 w-36 sm:w-48">Role</th>
              <th className="py-4 px-6 min-w-80">Permissions</th>
              <th className="py-4 px-6 w-24 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {ORDERED_ROLES.map((roleId) => {
              const roleInfo = ROLES_CONFIG[roleId];
              const permissions = rolePermissions[roleId] || [];

              return (
                <tr
                  key={roleId}
                  className="hover:bg-page-bg/40 transition-colors"
                >
                  {/* Role Name */}
                  <td className="py-6 px-6 align-top">
                    <span className="font-medium text-txt-primary text-sm md:text-base">
                      {roleInfo.role.name}
                    </span>
                  </td>

                  {/* Permissions Pills */}
                  <td className="py-6 px-6 align-top">
                    <div className="flex flex-wrap gap-2 items-center">
                      {permissions.length > 0 ? (
                        permissions.map((perm) => (
                          <PermissionTag
                            key={perm}
                            label={perm}
                            onRemove={() => onRemovePermission(roleId, perm)}
                          />
                        ))
                      ) : (
                        <span className="text-xs sm:text-sm text-secondary-subheading italic">
                          No permissions assigned. Click edit to assign permissions.
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Action (Edit Button) */}
                  <td className="py-6 px-6 align-top text-center">
                    <button
                      type="button"
                      onClick={() => onEditRole(roleId)}
                      title={`Edit permissions for ${roleInfo.role.name}`}
                      aria-label={`Edit ${roleInfo.role.name} role`}
                      className="inline-flex items-center justify-center p-2 rounded-lg border border-border/80 bg-layout-bg text-secondary-subheading hover:text-primary hover:border-primary/50 hover:bg-primary-light/40 transition-all cursor-pointer shadow-2xs"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View (< sm) */}
      <div className="sm:hidden divide-y divide-border/70">
        {ORDERED_ROLES.map((roleId) => {
          const roleInfo = ROLES_CONFIG[roleId];
          const permissions = rolePermissions[roleId] || [];

          return (
            <div key={roleId} className="p-4 space-y-3 bg-layout-bg">
              {/* Header with Role Name and Edit Action */}
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="font-semibold text-txt-primary text-base">
                    {roleInfo.role.name}
                  </span>
                  <span className="text-xs text-secondary-subheading ml-2">
                    ({permissions.length} perms)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onEditRole(roleId)}
                  title={`Edit permissions for ${roleInfo.role.name}`}
                  aria-label={`Edit ${roleInfo.role.name} role`}
                  className="inline-flex items-center justify-center p-2 rounded-lg border border-border/80 bg-card-bg text-secondary-subheading hover:text-primary hover:border-primary/50 hover:bg-primary-light/40 transition-all cursor-pointer shadow-2xs"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>

              {/* Tags Flex Wrap */}
              <div className="flex flex-wrap gap-1.5 items-center pt-1">
                {permissions.length > 0 ? (
                  permissions.map((perm) => (
                    <PermissionTag
                      key={perm}
                      label={perm}
                      onRemove={() => onRemovePermission(roleId, perm)}
                    />
                  ))
                ) : (
                  <span className="text-xs text-secondary-subheading italic">
                    No permissions assigned. Click edit to assign permissions.
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Table Pagination / Entry Count */}
      <div className="py-3.5 sm:py-4 px-4 sm:px-6 border-t border-border bg-layout-bg text-xs sm:text-sm text-secondary-subheading">
        Showing 3 of 3 entries
      </div>
    </div>
  );
}

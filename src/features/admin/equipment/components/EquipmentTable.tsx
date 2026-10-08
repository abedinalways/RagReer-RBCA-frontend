"use client";

import React, { useState } from "react";
import Image from "next/image";
import { EquipmentItem, EquipmentCondition, EquipmentStatus } from "../types";
import { ConditionBadge } from "./ConditionBadge";
import { StatusBadge } from "./StatusBadge";
import { EquipmentActionMenu } from "./EquipmentActionMenu";
import { Pagination } from "@/components/reusable/Pagination";
import { CustomCheckbox } from "../../roles/components/CustomCheckbox";
import { useDragToScroll } from "@/hooks/useDragToScroll";

interface EquipmentTableProps {
  data: EquipmentItem[];
  onUpdateCondition: (id: string, condition: EquipmentCondition) => void;
  onUpdateStatus: (id: string, status: EquipmentStatus) => void;
  onEdit: (item: EquipmentItem) => void;
  onAssign: (item: EquipmentItem) => void;
  onDelete: (item: EquipmentItem) => void;
}

export function EquipmentTable({
  data,
  onUpdateCondition,
  onUpdateStatus,
  onEdit,
  onAssign,
  onDelete,
}: EquipmentTableProps) {
  const { ref, events, dragClassName } = useDragToScroll<HTMLDivElement>();

  // Checkbox selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedData = data.slice(
    (validCurrentPage - 1) * itemsPerPage,
    validCurrentPage * itemsPerPage
  );

  const isAllSelected =
    paginatedData.length > 0 &&
    paginatedData.every((item) => selectedIds.includes(item.id));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const newIds = Array.from(
        new Set([...selectedIds, ...paginatedData.map((d) => d.id)])
      );
      setSelectedIds(newIds);
    } else {
      const pageIds = paginatedData.map((d) => d.id);
      setSelectedIds(selectedIds.filter((id) => !pageIds.includes(id)));
    }
  };

  const handleToggleRow = (id: string, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  return (
    <div className="w-full">
      {/* Desktop / Tablet Table View */}
      <div
        ref={ref}
        {...events}
        className={`hidden md:block overflow-x-auto ${dragClassName}`}
      >
        <table className="w-full text-left border-collapse min-w-[950px]">
          <thead>
            <tr className="bg-page-bg/75 border-b border-border text-sm md:text-base font-medium text-secondary-subheading">
              <th className="py-3.5 px-4 w-12 text-center">
                <CustomCheckbox
                  id="select-all-header"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="py-3.5 px-4 font-medium">Equipment Name</th>
              <th className="py-3.5 px-4 font-medium">Equipment Type</th>
              <th className="py-3.5 px-4 font-medium">Condition</th>
              <th className="py-3.5 px-4 font-medium">Assigned To</th>
              <th className="py-3.5 px-4 font-medium">Assigned Job</th>
              <th className="py-3.5 px-4 font-medium">Last Inspection</th>
              <th className="py-3.5 px-4 font-medium">Status</th>
              <th className="py-3.5 px-4 text-center font-medium w-20">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 bg-layout-bg text-sm md:text-base">
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => {
                const isSelected = selectedIds.includes(item.id);

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-page-bg/40 transition-colors"
                  >
                    {/* Checkbox */}
                    <td className="py-3.5 px-4 text-center">
                      <CustomCheckbox
                        id={`select-${item.id}`}
                        checked={isSelected}
                        onChange={(checked) => handleToggleRow(item.id, checked)}
                      />
                    </td>

                    {/* Name */}
                    <td className="py-3.5 px-4 font-medium text-txt-primary text-sm md:text-base">
                      {item.name}
                    </td>

                    {/* Type */}
                    <td className="py-3.5 px-4 text-secondary-subheading text-sm md:text-base">
                      {item.type}
                    </td>

                    {/* Condition */}
                    <td className="py-3.5 px-4">
                      <ConditionBadge
                        condition={item.condition}
                        onChange={(c) => onUpdateCondition(item.id, c)}
                      />
                    </td>

                    {/* Assigned To */}
                    <td className="py-3.5 px-4">
                      {item.assignedTo ? (
                        <div className="flex items-center gap-2.5">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border shrink-0">
                            <Image
                              src={item.assignedTo.avatarUrl || "/images/customer_avatar.png"}
                              alt={item.assignedTo.name}
                              fill
                              sizes="32px"
                              className="object-cover"
                            />
                          </div>
                          <div className="leading-tight">
                            <div className="font-medium text-txt-primary text-sm md:text-base">
                              {item.assignedTo.name}
                            </div>
                            <div className="text-xs md:text-sm text-secondary-subheading">
                              {item.assignedTo.role}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-secondary-subheading text-sm md:text-base">-</span>
                      )}
                    </td>

                    {/* Assigned Job */}
                    <td className="py-3.5 px-4">
                      {item.assignedJob ? (
                        <span className="text-[#2D6A9F] font-medium hover:underline cursor-pointer text-sm md:text-base">
                          {item.assignedJob}
                        </span>
                      ) : (
                        <span className="text-secondary-subheading text-sm md:text-base">-</span>
                      )}
                    </td>

                    {/* Last Inspection */}
                    <td className="py-3.5 px-4 text-secondary-subheading text-sm md:text-base">
                      {item.lastInspection}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <StatusBadge
                        status={item.status}
                        onChange={(s) => onUpdateStatus(item.id, s)}
                      />
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-center">
                      <EquipmentActionMenu
                        item={item}
                        onEdit={onEdit}
                        onAssign={onAssign}
                        onDelete={onDelete}
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="py-12 text-center text-secondary-subheading text-sm md:text-base"
                >
                  No equipment found matching filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View (< md) */}
      <div className="md:hidden divide-y divide-border/60 bg-layout-bg">
        {paginatedData.length > 0 ? (
          paginatedData.map((item) => {
            const isSelected = selectedIds.includes(item.id);

            return (
              <div key={item.id} className="p-4 space-y-3">
                {/* Top Row: Select + Name + Status + Action */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <CustomCheckbox
                      id={`mobile-select-${item.id}`}
                      checked={isSelected}
                      onChange={(checked) => handleToggleRow(item.id, checked)}
                    />
                    <div>
                      <h3 className="font-semibold text-txt-primary text-base">
                        {item.name}
                      </h3>
                      <p className="text-sm text-secondary-subheading">
                        {item.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge
                      status={item.status}
                      onChange={(s) => onUpdateStatus(item.id, s)}
                    />
                    <EquipmentActionMenu
                      item={item}
                      onEdit={onEdit}
                      onAssign={onAssign}
                      onDelete={onDelete}
                    />
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2 text-sm pt-1 border-t border-border/40">
                  <div>
                    <span className="text-secondary-subheading text-xs sm:text-sm block mb-0.5">Condition:</span>
                    <ConditionBadge
                      condition={item.condition}
                      onChange={(c) => onUpdateCondition(item.id, c)}
                    />
                  </div>
                  <div>
                    <span className="text-secondary-subheading text-xs sm:text-sm block mb-0.5">Last Inspection:</span>
                    <span className="font-medium text-txt-primary text-sm">{item.lastInspection}</span>
                  </div>
                </div>

                {/* Assignment Row */}
                {(item.assignedTo || item.assignedJob) && (
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/40 text-sm">
                    {item.assignedTo ? (
                      <div className="flex items-center gap-2">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden border border-border">
                          <Image
                            src={item.assignedTo.avatarUrl || "/images/customer_avatar.png"}
                            alt={item.assignedTo.name}
                            fill
                            sizes="24px"
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium text-txt-primary text-sm">
                          {item.assignedTo.name} <span className="text-xs text-secondary-subheading">({item.assignedTo.role})</span>
                        </span>
                      </div>
                    ) : (
                      <span className="text-secondary-subheading text-sm">Unassigned</span>
                    )}

                    {item.assignedJob && (
                      <span className="text-[#2D6A9F] font-semibold text-sm">
                        {item.assignedJob}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center text-secondary-subheading">
            No equipment found matching filters.
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      <Pagination
        currentPage={validCurrentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(items) => {
          setItemsPerPage(items);
          setCurrentPage(1);
        }}
        pageSizeOptions={[10, 25, 50, 100]}
      />
    </div>
  );
}

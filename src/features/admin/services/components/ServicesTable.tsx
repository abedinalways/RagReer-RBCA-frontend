"use client";

import React, { useState } from "react";
import { ServiceItem } from "../types";
import { ServiceCategoryBadge } from "./ServiceCategoryBadge";
import { ServiceStatusToggle } from "./ServiceStatusToggle";
import { ServiceActionMenu } from "./ServiceActionMenu";
import { Pagination } from "@/components/reusable/Pagination";
import { CustomCheckbox } from "../../roles/components/CustomCheckbox";
import { useDragToScroll } from "@/hooks/useDragToScroll";

interface ServicesTableProps {
  data: ServiceItem[];
  onToggleStatus: (id: string, active: boolean) => void;
  onEdit: (item: ServiceItem) => void;
  onView?: (item: ServiceItem) => void;
  onDelete: (item: ServiceItem) => void;
}

export function ServicesTable({
  data,
  onToggleStatus,
  onEdit,
  onView,
  onDelete,
}: ServicesTableProps) {
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
      {/* Desktop / Tablet Table View (>= md) */}
      <div
        ref={ref}
        {...events}
        className={`hidden md:block overflow-x-auto ${dragClassName}`}
      >
        <table className="w-full text-left border-collapse min-w-[1050px]">
          <thead>
            <tr className="bg-page-bg/75 border-b border-border text-sm md:text-base font-medium text-secondary-subheading">
              <th className="py-3.5 px-4 w-12 text-center">
                <CustomCheckbox
                  id="select-all-services-header"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="py-3.5 px-4 font-medium">Service Name</th>
              <th className="py-3.5 px-4 font-medium">Description</th>
              <th className="py-3.5 px-4 font-medium">Category</th>
              <th className="py-3.5 px-4 font-medium">Applicable To</th>
              <th className="py-3.5 px-4 font-medium">Pricing Type</th>
              <th className="py-3.5 px-4 font-medium">Pricing Basis</th>
              <th className="py-3.5 px-4 font-medium">Status</th>
              <th className="py-3.5 px-4 font-medium">Updated On</th>
              <th className="py-3.5 px-4 text-center font-medium w-16">Action</th>
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
                        id={`select-srv-${item.id}`}
                        checked={isSelected}
                        onChange={(checked) => handleToggleRow(item.id, checked)}
                      />
                    </td>

                    {/* Service Name */}
                    <td className="py-3.5 px-4 font-medium text-txt-primary text-sm md:text-base whitespace-nowrap">
                      {item.name}
                    </td>

                    {/* Description */}
                    <td className="py-3.5 px-4 text-secondary-subheading text-sm md:text-base truncate max-w-[180px]">
                      {item.description}
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <ServiceCategoryBadge category={item.category} />
                    </td>

                    {/* Applicable To */}
                    <td
                      className="py-3.5 px-4 text-secondary-subheading text-sm md:text-base truncate max-w-[200px]"
                      title={Array.isArray(item.applicableTo) ? item.applicableTo.join(", ") : item.applicableTo}
                    >
                      {Array.isArray(item.applicableTo) ? item.applicableTo.join(", ") : item.applicableTo}
                    </td>

                    {/* Pricing Type */}
                    <td className="py-3.5 px-4 text-secondary-subheading text-sm md:text-base whitespace-nowrap">
                      {item.pricingType}
                    </td>

                    {/* Pricing Basis */}
                    <td className="py-3.5 px-4 text-secondary-subheading text-sm md:text-base whitespace-nowrap">
                      {item.pricingBasis}
                    </td>

                    {/* Status Toggle Switch */}
                    <td className="py-3.5 px-4">
                      <ServiceStatusToggle
                        isActive={item.isActive}
                        onChange={(val) => onToggleStatus(item.id, val)}
                      />
                    </td>

                    {/* Updated On */}
                    <td className="py-3.5 px-4 text-secondary-subheading text-sm md:text-base whitespace-nowrap">
                      {item.updatedOn}
                    </td>

                    {/* Action Menu */}
                    <td className="py-3.5 px-4 text-center">
                      <ServiceActionMenu
                        item={item}
                        onEdit={onEdit}
                        onView={onView}
                        onDelete={onDelete}
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={10}
                  className="py-12 text-center text-secondary-subheading text-sm md:text-base"
                >
                  No services found matching filters.
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
                {/* Top Row: Checkbox + Name + Action */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <CustomCheckbox
                      id={`mobile-select-srv-${item.id}`}
                      checked={isSelected}
                      onChange={(checked) => handleToggleRow(item.id, checked)}
                    />
                    <div>
                      <h3 className="font-semibold text-txt-primary text-base">
                        {item.name}
                      </h3>
                      <p className="text-xs text-secondary-subheading">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ServiceStatusToggle
                      isActive={item.isActive}
                      onChange={(val) => onToggleStatus(item.id, val)}
                    />
                    <ServiceActionMenu
                      item={item}
                      onEdit={onEdit}
                      onView={onView}
                      onDelete={onDelete}
                    />
                  </div>
                </div>

                {/* Details Badges & Row */}
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <ServiceCategoryBadge category={item.category} />
                  <span className="text-xs text-secondary-subheading bg-page-bg/80 px-2 py-0.5 rounded border border-border">
                    {item.pricingBasis}
                  </span>
                  <span className="text-xs text-secondary-subheading bg-page-bg/80 px-2 py-0.5 rounded border border-border">
                    {item.pricingType}
                  </span>
                </div>

                {/* Applicable & Date */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/40 text-xs sm:text-sm">
                  <span className="text-secondary-subheading truncate max-w-[200px]" title={Array.isArray(item.applicableTo) ? item.applicableTo.join(", ") : item.applicableTo}>
                    {Array.isArray(item.applicableTo) ? item.applicableTo.join(", ") : item.applicableTo}
                  </span>
                  <span className="text-secondary-subheading shrink-0">
                    {item.updatedOn}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center text-secondary-subheading text-sm">
            No services found matching filters.
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

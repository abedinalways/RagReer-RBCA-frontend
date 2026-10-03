"use client";

import React, { useState } from "react";
import { Modal } from "@/components/reusable/Modal";
import { ImportPreviewItem, Property } from "../types/PropertyTypes";

interface ImportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmImport: (importedProperties: Property[]) => void;
}

const DEFAULT_PREVIEW_ITEMS: ImportPreviewItem[] = [
  {
    id: "import-1",
    type: "Residential",
    name: "North Entrance Monument & Islands",
    street1: "124 Oak Street",
    street2: "124 Oak Street",
  },
  {
    id: "import-2",
    type: "Residential",
    name: "Oakridge Main Clubhouse & Pool Grounds",
    street1: "124 Oak Street",
    street2: "124 Oak Street",
  },
  {
    id: "import-3",
    type: "Residential",
    name: "South Retention Pond & Walking Trail",
    street1: "124 Oak Street",
    street2: "124 Oak Street",
  },
];

export const ImportPreviewModal: React.FC<ImportPreviewModalProps> = ({
  isOpen,
  onClose,
  onConfirmImport,
}) => {
  const [items] = useState<ImportPreviewItem[]>(DEFAULT_PREVIEW_ITEMS);

  const handleImport = () => {
    const newProperties: Property[] = items.map((item, index) => ({
      id: `prop-imp-${Date.now()}-${index}`,
      title: item.name,
      type: item.type,
      status: "Active",
      address: `${item.street1}, ${item.street2}`,
      size: "Medium (1/4 - 1/2 acre)",
      imageUrl:
        index % 2 === 0
          ? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
          : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    }));

    onConfirmImport(newProperties);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Import User CSV Data"
      maxWidth="2xl"
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border border-border rounded-md text-sm font-medium text-txt-primary hover:bg-page-bg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleImport}
            className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-md text-sm font-medium transition-colors cursor-pointer"
          >
            Import List
          </button>
        </div>
      }
    >
      <div className="w-full border border-border rounded-md overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-page-bg/80 border-b border-border">
              <th className="py-3 px-4 font-semibold text-secondary-subheading">
                Property Type
              </th>
              <th className="py-3 px-4 font-semibold text-secondary-subheading">
                Property Name
              </th>
              <th className="py-3 px-4 font-semibold text-secondary-subheading">
                Street 1
              </th>
              <th className="py-3 px-4 font-semibold text-secondary-subheading">
                Street 2
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle bg-card-bg">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-blue-50/40">
                <td className="py-3.5 px-4 font-medium text-primary whitespace-nowrap">
                  {item.type}
                </td>
                <td className="py-3.5 px-4 text-txt-primary max-w-xs truncate">
                  {item.name}
                </td>
                <td className="py-3.5 px-4 text-secondary-subheading whitespace-nowrap">
                  {item.street1}
                </td>
                <td className="py-3.5 px-4 text-secondary-subheading whitespace-nowrap">
                  {item.street2}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

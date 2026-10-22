"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Search, ChevronDown, Eye } from "lucide-react";
import { ReusableTable } from "@/components/reusable/ReusableTable";
import { ColumnDef } from "@/features/customer/invoices/types/invoicesTypes";
import {
  AdminPropertyItem,
  AdminPropertyStatus,
} from "../types/adminProperties.types";

interface AdminPropertiesListProps {
  properties: AdminPropertyItem[];
  onSelectProperty: (propertyId: string) => void;
  onViewEmptyState?: () => void;
}

export const AdminPropertiesList: React.FC<AdminPropertiesListProps> = ({
  properties,
  onSelectProperty,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      const matchesSearch =
        prop.propertyCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.customer.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "All" || prop.status === selectedStatus;

      const matchesType =
        selectedType === "All" || prop.propertyType === selectedType;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [properties, searchQuery, selectedStatus, selectedType]);

  const isAllSelected =
    filteredProperties.length > 0 &&
    filteredProperties.every((p) => selectedIds.includes(p.id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProperties.map((p) => p.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getStatusBadge = (status: AdminPropertyStatus) => {
    switch (status) {
      case "Active":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-blue-50 text-primary border border-blue-100">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Active
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-apt-pending-bg text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-flagged-amber" />
            Pending
          </span>
        );
      case "Inactive":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-apt-cancelled-bg text-decline border border-decline-border">
            <span className="w-1.5 h-1.5 rounded-full bg-decline" />
            Inactive
          </span>
        );
      default:
        return null;
    }
  };

  const columns: ColumnDef<AdminPropertyItem>[] = [
    {
      header: (
        <input
          type="checkbox"
          checked={isAllSelected}
          onChange={toggleSelectAll}
          className="w-3.5 h-3.5 rounded border-border-input text-primary focus:ring-0 cursor-pointer"
        />
      ),
      className: "w-10 text-center",
      cell: (row) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(row.id)}
          onChange={() => toggleSelectRow(row.id)}
          className="w-3.5 h-3.5 rounded border-border-input text-primary focus:ring-0 cursor-pointer"
        />
      ),
    },
    {
      header: "Property ID",
      accessorKey: "propertyCode",
      cell: (row) => (
        <button
          type="button"
          onClick={() => onSelectProperty(row.id)}
          className="text-primary hover:underline font-medium text-xs sm:text-sm cursor-pointer"
        >
          {row.propertyCode}
        </button>
      ),
    },
    {
      header: "Property Type",
      accessorKey: "propertyType",
      cell: (row) => (
        <span className="text-xs sm:text-sm text-secondary-subheading font-medium">
          {row.propertyType}
        </span>
      ),
    },
    {
      header: "Property Address",
      accessorKey: "propertyAddress",
      cell: (row) => (
        <span className="text-xs sm:text-sm text-secondary-subheading">
          {row.propertyAddress}
        </span>
      ),
    },
    {
      header: "Customer Name",
      cell: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-border">
            <Image
              src={row.customer.avatar}
              alt={row.customer.name}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 leading-tight">
            <p className="text-xs sm:text-sm font-medium text-primary-heading truncate">
              {row.customer.name}
            </p>
            <p className="text-[11px] text-secondary-subheading truncate">
              {row.customer.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => getStatusBadge(row.status),
    },
    {
      header: "Action",
      className: "text-center w-16",
      cell: (row) => (
        <button
          type="button"
          onClick={() => onSelectProperty(row.id)}
          className="p-1.5 rounded-md text-secondary-subheading hover:text-primary hover:bg-page-bg transition-colors cursor-pointer"
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Page Title */}
      <h1 className="text-2xl font-medium text-primary-heading font-barlow-condensed">
        Properties
      </h1>

      {/* Main Table Card */}
      <div className="bg-card-bg rounded-xl border border-border shadow-2xs overflow-hidden">
        {/* Top Header Filter Bar (Figma Screenshot 2) */}
        <div className="p-4 sm:p-5 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-lg font-medium text-primary-heading font-barlow-condensed">
            All Property List
          </h2>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Properties Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-secondary-subheading absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search properties"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs sm:text-sm border border-border rounded-md bg-card-bg text-primary-heading placeholder:text-secondary-subheading/60 focus:outline-none focus:border-primary w-48 sm:w-56"
              />
            </div>

            {/* Status Dropdown Filter */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none border border-border rounded-md pl-3 pr-8 py-1.5 text-xs sm:text-sm bg-card-bg text-secondary-subheading focus:outline-none focus:border-primary cursor-pointer font-medium"
              >
                <option value="All">Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Property Type Dropdown Filter */}
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="appearance-none border border-border rounded-md pl-3 pr-8 py-1.5 text-xs sm:text-sm bg-card-bg text-secondary-subheading focus:outline-none focus:border-primary cursor-pointer font-medium"
              >
                <option value="All">Property Type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Reusable Table */}
        <ReusableTable
          data={filteredProperties}
          columns={columns}
          keyExtractor={(item) => item.id}
          emptyMessage="No properties found matching your filter."
          pagination={{
            currentPage,
            itemsPerPage,
            onPageChange: setCurrentPage,
            onItemsPerPageChange: (items) => {
              setItemsPerPage(items);
              setCurrentPage(1);
            },
            pageSizeOptions: [10, 25, 50],
          }}
        />
      </div>
    </div>
  );
};

export default AdminPropertiesList;

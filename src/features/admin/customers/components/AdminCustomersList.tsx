"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  ChevronsUpDown,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { ReusableTable } from "@/components/reusable/ReusableTable";
import { ColumnDef } from "@/features/customer/invoices/types/invoicesTypes";
import {
  CustomerItem,
  CustomerStatus,
} from "../types/adminCustomers.types";
import { CustomerActionMenu } from "./CustomerActionMenu";

interface AdminCustomersListProps {
  customers: CustomerItem[];
  onSelectCustomer: (customerId: string) => void;
  onAddCustomer: () => void;
  onDeleteCustomer: (customerId: string) => void;
  onTogglePortalAccess: (customerId: string) => void;
}

export const AdminCustomersList: React.FC<AdminCustomersListProps> = ({
  customers,
  onSelectCustomer,
  onAddCustomer,
  onDeleteCustomer,
  onTogglePortalAccess,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("default");

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Filtered and sorted customers
  const filteredCustomers = useMemo(() => {
    const filtered = customers.filter((customer) => {
      const code = customer.customerCode || `#${customer.id}`;
      const matchesSearch =
        code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.customerType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "All" || customer.status === selectedStatus;

      const matchesType =
        selectedType === "All" || customer.customerType === selectedType;

      return matchesSearch && matchesStatus && matchesType;
    });

    if (sortBy === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "properties") {
      filtered.sort(
        (a, b) => Number(b.propertiesCount) - Number(a.propertiesCount)
      );
    }

    return filtered;
  }, [customers, searchQuery, selectedStatus, selectedType, sortBy]);

  const isAllSelected =
    filteredCustomers.length > 0 &&
    filteredCustomers.every((c) => selectedIds.includes(c.id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredCustomers.map((c) => c.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getStatusBadge = (status: CustomerStatus) => {
    switch (status) {
      case "Active":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-badge-active-bg text-badge-active-text border border-badge-active-border">
            <span className="w-1.5 h-1.5 rounded-full bg-badge-active-dot" />
            Active
          </span>
        );
      case "Inactive":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-apt-cancelled-bg text-decline border border-decline-border">
            <span className="w-1.5 h-1.5 rounded-full bg-decline" />
            Inactive
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-apt-pending-bg text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-flagged-amber" />
            Pending
          </span>
        );
      case "Draft":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            Draft
          </span>
        );
      default:
        return null;
    }
  };

  const columns: ColumnDef<CustomerItem>[] = [
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
      header: "Customer ID",
      cell: (row) => (
        <button
          type="button"
          onClick={() => onSelectCustomer(row.id)}
          className="text-primary hover:underline font-medium text-xs sm:text-sm cursor-pointer whitespace-nowrap"
        >
          {row.customerCode || `#${row.id}`}
        </button>
      ),
    },
    {
      header: "Customer Type",
      accessorKey: "customerType",
      cell: (row) => (
        <span className="text-xs sm:text-sm text-secondary-subheading font-medium">
          {row.customerType}
        </span>
      ),
    },
    {
      header: "Customer",
      cell: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-border">
            <Image
              src={row.avatar}
              alt={row.name}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 leading-tight">
            <p className="text-xs sm:text-sm font-medium text-primary-heading truncate">
              {row.name}
            </p>
            <p className="text-[11px] text-secondary-subheading truncate">
              {row.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Properties",
      className: "text-center",
      cell: (row) => (
        <span className="text-xs sm:text-sm text-secondary-subheading font-medium">
          {row.propertiesCount}
        </span>
      ),
    },
    {
      header: "Active Services",
      className: "text-center",
      cell: (row) => (
        <span className="text-xs sm:text-sm text-secondary-subheading font-medium">
          {row.activeServicesCount}
        </span>
      ),
    },
    {
      header: "Outstanding",
      className: "text-center",
      cell: (row) => (
        <span className="text-xs sm:text-sm text-secondary-subheading font-medium">
          {row.outstandingAmount}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => getStatusBadge(row.status),
    },
    {
      header: "Portal Access",
      className: "text-center w-20",
      cell: (row) => (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(row.portalAccessEnabled)}
            onChange={() => onTogglePortalAccess(row.id)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
        </label>
      ),
    },
    {
      header: "Action",
      className: "text-center w-14",
      cell: (row) => (
        <CustomerActionMenu
          customer={row}
          onSelectCustomer={onSelectCustomer}
          onDeleteCustomer={onDeleteCustomer}
        />
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Top Header Row (Figma Screenshot 1 & 2) */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-primary-heading font-barlow-condensed">
          Customers
        </h1>
        <button
          type="button"
          onClick={onAddCustomer}
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-medium rounded-md shadow-2xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
        >
          <span>Add Customer</span>
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Main Table Card (Figma Screenshot 1 & 2) */}
      <div className="bg-card-bg rounded-xl border border-border shadow-2xs overflow-hidden">
        {/* Top Header Filter Bar */}
        <div className="p-4 sm:p-5 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-lg font-medium text-primary-heading font-barlow-condensed">
            All Customer List
          </h2>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Customers Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-secondary-subheading absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search customers"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs sm:text-sm border border-border rounded-md bg-card-bg text-primary-heading placeholder:text-secondary-subheading/60 focus:outline-none focus:border-primary w-44 sm:w-52"
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
                <option value="Draft">Draft</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Customer Type Dropdown Filter */}
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="appearance-none border border-border rounded-md pl-3 pr-8 py-1.5 text-xs sm:text-sm bg-card-bg text-secondary-subheading focus:outline-none focus:border-primary cursor-pointer font-medium"
              >
                <option value="All">Customer Type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Sort By Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none border border-border rounded-md pl-3 pr-8 py-1.5 text-xs sm:text-sm bg-card-bg text-secondary-subheading focus:outline-none focus:border-primary cursor-pointer font-medium"
              >
                <option value="default">Sort By</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="properties">Properties</option>
              </select>
              <ChevronsUpDown className="w-3.5 h-3.5 text-secondary-subheading absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Reusable Table */}
        <ReusableTable
          data={filteredCustomers}
          columns={columns}
          keyExtractor={(item) => item.id}
          emptyMessage="No customers found matching your filter."
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

export default AdminCustomersList;

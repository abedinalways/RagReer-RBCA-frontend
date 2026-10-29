"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Search, ChevronDown, Plus } from "lucide-react";
import { ReusableTable } from "@/components/reusable/ReusableTable";
import { ColumnDef } from "@/features/customer/invoices/types/invoicesTypes";
import {
  CrewMemberItem,
  CrewMemberRole,
  CrewMemberStatus,
} from "../types/crewMembers.types";
import { CrewMemberActionMenu } from "./CrewMemberActionMenu";
import { CustomSelect } from "@/components/ui/CustomSelect";

interface CrewMembersListProps {
  crewMembers: CrewMemberItem[];
  onSelectMember: (member: CrewMemberItem) => void;
  onViewLogHistory: (member: CrewMemberItem) => void;
  onAddCrewMember: () => void;
  onDeleteMember: (member: CrewMemberItem) => void;
}

export const CrewMembersList: React.FC<CrewMembersListProps> = ({
  crewMembers,
  onSelectMember,
  onViewLogHistory,
  onAddCrewMember,
  onDeleteMember,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedRole, setSelectedRole] = useState<string>("All");

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  // Filtered crew members
  const filteredCrew = useMemo(() => {
    return crewMembers.filter((member) => {
      const code = member.crewId || `#${member.id}`;
      const matchesSearch =
        code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "All" || member.status === selectedStatus;

      const matchesRole =
        selectedRole === "All" || member.role === selectedRole;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [crewMembers, searchQuery, selectedStatus, selectedRole]);

  const isAllSelected =
    filteredCrew.length > 0 &&
    filteredCrew.every((m) => selectedIds.includes(m.id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredCrew.map((m) => m.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getStatusBadge = (status: CrewMemberStatus) => {
    if (status === "Active") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-nav-bg text-info border border-blue-100">
          <span className="w-1.5 h-1.5 rounded-full bg-info" />
          Active
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-apt-cancelled-bg text-decline border border-decline-border">
        <span className="w-1.5 h-1.5 rounded-full bg-decline" />
        Inactive
      </span>
    );
  };

  const columns: ColumnDef<CrewMemberItem>[] = [
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
      header: "Crew ID",
      cell: (row) => (
        <button
          type="button"
          onClick={() => onSelectMember(row)}
          className="text-primary hover:underline font-medium text-xs sm:text-sm cursor-pointer whitespace-nowrap"
        >
          {row.crewId}
        </button>
      ),
    },
    {
      header: "Crew Member Name",
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
      header: "Current Role",
      accessorKey: "role",
      cell: (row) => (
        <span className="inline-flex items-center justify-center px-3 py-1 rounded text-xs font-medium border border-badge-active-border bg-badge-active-bg text-badge-active-text min-w-16">
          {row.role}
        </span>
      ),
    },
    {
      header: "Jobs This Month",
      cell: (row) => (
        <span className="text-xs sm:text-sm text-secondary-subheading font-medium">
          {row.jobsThisMonth}
        </span>
      ),
    },
    {
      header: "Payable This Month",
      cell: (row) => (
        <span className="text-xs sm:text-sm text-secondary-subheading font-medium">
          {row.payableThisMonth}
        </span>
      ),
    },
    {
      header: "Strikes",
      cell: (row) => (
        <span className="text-xs sm:text-sm text-secondary-subheading font-medium">
          {row.strikes}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => getStatusBadge(row.status),
    },
    {
      header: "Action",
      className: "text-center w-14",
      cell: (row) => (
        <CrewMemberActionMenu
          member={row}
          onViewDetails={onSelectMember}
          onViewLogHistory={onViewLogHistory}
          onDeleteMember={onDeleteMember}
        />
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Top Header Row (Screenshot 2) */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium text-primary-heading font-barlow-condensed">
          Crew Members
        </h1>
        <button
          type="button"
          onClick={onAddCrewMember}
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-medium rounded-md shadow-2xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
        >
          <span>Add Crew Member</span>
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Main Table Card (Screenshot 2) */}
      <div className="bg-card-bg rounded-xl border border-border shadow-2xs overflow-hidden">
        {/* Top Header Filter Bar */}
        <div className="p-4 sm:p-5 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-lg font-medium text-primary-heading font-barlow-condensed">
            All Crew List
          </h2>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
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
            <div className="w-28 sm:w-32">
              <CustomSelect
                value={selectedStatus}
                onChange={(val) => {
                  setSelectedStatus(val);
                  setCurrentPage(1);
                }}
                options={[
                  { value: "All", label: "Status" },
                  { value: "Active", label: "Active" },
                  { value: "Inactive", label: "Inactive" },
                ]}
                size="sm"
                align="left"
                dropdownClassName="min-w-full w-36"
                triggerClassName="h-9 px-3 text-xs sm:text-sm font-medium text-secondary-subheading"
              />
            </div>

            {/* Role Dropdown Filter */}
            <div className="w-28 sm:w-32">
              <CustomSelect
                value={selectedRole}
                onChange={(val) => {
                  setSelectedRole(val);
                  setCurrentPage(1);
                }}
                options={[
                  { value: "All", label: "All Role" },
                  { value: "Leader", label: "Leader" },
                  { value: "Member", label: "Member" },
                ]}
                size="sm"
                align="left"
                dropdownClassName="min-w-full w-36"
                triggerClassName="h-9 px-3 text-xs sm:text-sm font-medium text-secondary-subheading"
              />
            </div>
          </div>
        </div>

        {/* Reusable Table with Pagination */}
        <ReusableTable
          data={filteredCrew}
          columns={columns}
          keyExtractor={(item) => item.id}
          emptyMessage="No crew members found matching your filter."
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

export default CrewMembersList;

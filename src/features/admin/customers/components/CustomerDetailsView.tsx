"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Send } from "lucide-react";
import ServiceIcon from "@/components/icons/admin/ServiceIcon";
import PropertyIcon from "@/components/icons/admin/PropertyIcon";
import OutstandingIcon from "@/components/icons/admin/OutstandingIcon";
import { TopTab, TopTabItem } from "@/components/reusable/TopTab";
import { CustomerItem, CustomerTabKey } from "../types/adminCustomers.types";
import CustomerOverviewTab from "./CustomerOverviewTab";
import CustomerPropertiesTab from "./CustomerPropertiesTab";
import CustomerGenericEmptyTab from "./CustomerGenericEmptyTab";

interface CustomerDetailsViewProps {
  customer: CustomerItem;
  initialTab?: CustomerTabKey;
  onBack?: () => void;
  onSendInvitation?: (customer: CustomerItem) => void;
}

export const CustomerDetailsView: React.FC<CustomerDetailsViewProps> = ({
  customer,
  initialTab = "overview",
  onBack,
  onSendInvitation,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<CustomerTabKey>(initialTab);

  const tabs: TopTabItem<CustomerTabKey>[] = [
    { key: "overview", label: "Overview" },
    { key: "properties", label: "Properties" },
    { key: "services", label: "Services" },
    { key: "proposals", label: "Proposals" },
    { key: "contracts-agreements", label: "Contracts & Agreements" },
    { key: "billing", label: "Billing" },
    { key: "activity", label: "Activity" },
  ];

  const handleTabChange = (key: CustomerTabKey) => {
    setActiveTab(key);
    // Update router URL query/path smoothly
    router.replace(`/admin/customers/${customer.id}/${key}`, { scroll: false });
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Breadcrumb (Figma Screenshot 3) */}
      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-secondary-subheading">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Customers
          </button>
        ) : (
          <Link
            href="/admin/customers"
            className="hover:text-primary transition-colors"
          >
            Customers
          </Link>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-secondary-subheading/60" />
        <span className="text-primary-heading font-medium">Customer Details</span>
      </div>

      {/* Customer Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Avatar, Name, Status Badge, ID */}
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-border bg-slate-100 shrink-0">
            <Image
              src={customer.avatar}
              alt={customer.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-medium text-primary-heading font-barlow-condensed leading-tight">
                {customer.name}
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                {customer.status}
              </span>
            </div>
            <p className="text-xs text-secondary-subheading">
              Customer ID: #{customer.id}
            </p>
          </div>
        </div>

        {/* Right: Send Invitation Button */}
        <div>
          <button
            type="button"
            onClick={() => onSendInvitation?.(customer)}
            className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-medium rounded-md shadow-2xs transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span>Send Invitation</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Active Services */}
        <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-5 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-secondary-subheading font-medium">
              Active Services
            </p>
            <p className="text-2xl font-medium text-primary-heading font-barlow-condensed">
              {customer.activeServicesCount}
            </p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-nav-bg flex items-center justify-center text-primary shrink-0 shadow-2xs">
            <ServiceIcon className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Card 2: Properties */}
        <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-5 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-secondary-subheading font-medium">
              Properties
            </p>
            <p className="text-2xl font-medium text-primary-heading font-barlow-condensed">
              {customer.propertiesCount}
            </p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-nav-bg flex items-center justify-center text-primary shrink-0 shadow-2xs">
            <PropertyIcon className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Card 3: Outstanding */}
        <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-5 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-secondary-subheading font-medium">
              Outstanding
            </p>
            <p className="text-2xl font-medium text-primary-heading font-barlow-condensed">
              {customer.outstandingAmount}
            </p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-nav-bg flex items-center justify-center text-primary shrink-0 shadow-2xs">
            <OutstandingIcon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>

      {/* Navigation TopTab */}
      <div className="bg-card-bg rounded-xl border border-border shadow-2xs overflow-hidden">
        <TopTab
          tabs={tabs}
          activeTab={activeTab}
          onChange={handleTabChange}
          className="border-b-0 px-2"
        />
      </div>

      {/* Tab Content Display */}
      <div>
        {activeTab === "overview" && (
          <CustomerOverviewTab customer={customer} />
        )}
        {activeTab === "properties" && <CustomerPropertiesTab />}
        {activeTab !== "overview" && activeTab !== "properties" && (
          <CustomerGenericEmptyTab tabKey={activeTab} />
        )}
      </div>
    </div>
  );
};

export default CustomerDetailsView;

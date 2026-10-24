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
import {
  CustomerItem,
  CustomerTabKey,
  CustomerPropertyItem,
} from "../types/adminCustomers.types";
import CustomerOverviewTab from "./CustomerOverviewTab";
import CustomerPropertiesTab from "./CustomerPropertiesTab";
import CustomerServicesTab from "./CustomerServicesTab";
import CustomerEstimatesTab from "./CustomerEstimatesTab";
import CustomerContractsTab from "./CustomerContractsTab";
import CustomerBillingTab from "./CustomerBillingTab";
import CustomerActivityTab from "./CustomerActivityTab";
import CustomerGenericEmptyTab from "./CustomerGenericEmptyTab";
import CustomerAppointmentsCalendarView from "./CustomerAppointmentsCalendarView";
import { AdminPropertyDetailView } from "@/features/admin/properties/components/AdminPropertyDetailView";
import { defaultAdminPropertyDetail } from "@/features/admin/properties/data/adminPropertiesData";
import { AdminPropertyDetailData } from "@/features/admin/properties/types/adminProperties.types";

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
  // Normalize initialTab so aliases map to the appropriate key
  const normalizedInitialTab: CustomerTabKey =
    initialTab === "proposals" || initialTab === "estimates"
      ? "estimates"
      : initialTab === "contracts"
      ? "contracts-agreements"
      : initialTab === "invoices" || initialTab === "payments"
      ? "billing"
      : initialTab;
  const [activeTab, setActiveTab] = useState<CustomerTabKey>(normalizedInitialTab);
  const [showCalendarView, setShowCalendarView] = useState<boolean>(
    normalizedInitialTab === "calendar"
  );
  const [selectedProperty, setSelectedProperty] = useState<CustomerPropertyItem | null>(null);

  const tabs: TopTabItem<CustomerTabKey>[] = [
    { key: "overview", label: "Overview" },
    { key: "properties", label: "Properties" },
    { key: "services", label: "Services" },
    { key: "estimates", label: "Proposals" },
    { key: "contracts-agreements", label: "Contracts & Agreements" },
    { key: "billing", label: "Billing" },
    { key: "activity", label: "Activity" },
  ];

  const handleTabChange = (key: CustomerTabKey) => {
    setActiveTab(key);
    setSelectedProperty(null);
    if (key === "calendar") {
      setShowCalendarView(true);
    } else {
      setShowCalendarView(false);
    }
    router.replace(`/admin/customers/${customer.id}/${key}`, { scroll: false });
  };

  const getStatusBadge = (status: string) => {
    const isAct = status === "Active";
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium border ${
          isAct
            ? "bg-badge-active-bg text-badge-active-text border-badge-active-border"
            : "bg-slate-100 text-slate-700 border-slate-200"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isAct ? "bg-badge-active-dot" : "bg-slate-500"
          }`}
        />
        {status || "Active"}
      </span>
    );
  };

  // If user opens the Calendar View (Figma Screenshot 1, 2, 3)
  if (showCalendarView || activeTab === "calendar") {
    return (
      <CustomerAppointmentsCalendarView
        customer={customer}
        onBackToDetails={() => {
          setShowCalendarView(false);
          handleTabChange("overview");
        }}
        onBackToList={onBack}
      />
    );
  }

  // If a property is selected in Properties tab (Figma screenshot: Customers > Customer Details > Properties > Details)
  if (selectedProperty) {
    const isSouthRetention =
      selectedProperty.title.toLowerCase().includes("south retention") ||
      selectedProperty.id === "prop-2" ||
      selectedProperty.id === "prop-5";

    const detailData: AdminPropertyDetailData = {
      ...defaultAdminPropertyDetail,
      id: selectedProperty.id,
      title: selectedProperty.title,
      category: isSouthRetention
        ? "Residential"
        : selectedProperty.category === "Commercial"
        ? "Commercial"
        : "Residential",
      status: selectedProperty.status === "Active" ? "Active" : "Inactive",
      size: selectedProperty.size || defaultAdminPropertyDetail.size,
      images: isSouthRetention
        ? defaultAdminPropertyDetail.images
        : [
            selectedProperty.imageUrl,
            ...defaultAdminPropertyDetail.images.slice(1),
          ],
      location: {
        ...defaultAdminPropertyDetail.location,
        address:
          selectedProperty.address || defaultAdminPropertyDetail.location.address,
      },
    };

    return (
      <AdminPropertyDetailView
        property={detailData}
        onBack={() => setSelectedProperty(null)}
        onViewCalendar={() => {
          setSelectedProperty(null);
          handleTabChange("calendar");
        }}
        breadcrumbs={
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
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Customers
              </Link>
            )}
            <ChevronRight className="w-3.5 h-3.5 text-secondary-subheading/60" />
            <button
              type="button"
              onClick={() => {
                setSelectedProperty(null);
                handleTabChange("overview");
              }}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Customer Details
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-secondary-subheading/60" />
            <button
              type="button"
              onClick={() => setSelectedProperty(null)}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Properties
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-secondary-subheading/60" />
            <span className="text-primary-heading font-medium">Details</span>
          </div>
        }
      />
    );
  }

  return (
    <div className="space-y-5 pb-12">
      {/* Breadcrumb (Figma Screenshot 1-4) */}
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
                {customer.organizationName || customer.name}
              </h1>
              {getStatusBadge(customer.status || "Active")}
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
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-medium rounded-md shadow-2xs transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span>Send Invitation</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3 Metric Cards (Figma Screenshot 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Active Services */}
        <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-5 shadow-2xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-secondary-subheading font-medium">
              Active Services
            </p>
            <p className="text-2xl font-medium text-primary-heading font-barlow-condensed">
              {customer.activeServicesCount || "03"}
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
              {customer.propertiesCount || "12"}
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
              {customer.outstandingAmount || "$1,528.00"}
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
          activeTab={activeTab === "proposals" ? "estimates" : activeTab}
          onChange={handleTabChange}
          className="border-b-0 px-2"
        />
      </div>

      {/* Tab Content Display */}
      <div>
        {activeTab === "overview" && (
          <CustomerOverviewTab
            customer={customer}
            onViewAllJobs={() => handleTabChange("services")}
            onViewAllActivity={() => handleTabChange("activity")}
            onViewCalendar={() => {
              setShowCalendarView(true);
              handleTabChange("calendar");
            }}
          />
        )}
        {activeTab === "properties" && (
          <CustomerPropertiesTab
            onSelectProperty={(prop) => {
              setSelectedProperty(prop);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
        {activeTab === "services" && <CustomerServicesTab />}
        {(activeTab === "estimates" || activeTab === "proposals") && (
          <CustomerEstimatesTab />
        )}
        {activeTab === "contracts-agreements" && <CustomerContractsTab />}
        {activeTab === "billing" && <CustomerBillingTab customer={customer} />}
        {activeTab === "activity" && <CustomerActivityTab />}
        {activeTab !== "overview" &&
          activeTab !== "properties" &&
          activeTab !== "services" &&
          activeTab !== "estimates" &&
          activeTab !== "proposals" &&
          activeTab !== "contracts-agreements" &&
          activeTab !== "contracts" &&
          activeTab !== "billing" &&
          activeTab !== "invoices" &&
          activeTab !== "payments" &&
          activeTab !== "activity" && (
            <CustomerGenericEmptyTab tabKey={activeTab} />
          )}
      </div>
    </div>
  );
};

export default CustomerDetailsView;


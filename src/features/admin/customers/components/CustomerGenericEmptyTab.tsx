"use client";
import React from "react";
import ServiceIcon from "@/components/icons/admin/ServiceIcon";
import BillingIcon from "@/components/icons/admin/BillingIcon";
import ActivityIcon from "@/components/icons/admin/ActivityIcon";
import { FileText, FileCheck } from "lucide-react";
import { CustomerTabKey } from "../types/adminCustomers.types";

interface CustomerGenericEmptyTabProps {
  tabKey: CustomerTabKey;
}

export const CustomerGenericEmptyTab: React.FC<CustomerGenericEmptyTabProps> = ({
  tabKey,
}) => {
  const tabConfig: Record<
    string,
    { title: string; emptyTitle: string; emptySubtitle: string; icon: React.ReactNode }
  > = {
    services: {
      title: "Services",
      emptyTitle: "No Services Yet",
      emptySubtitle: "No active services requested by this customer yet",
      icon: <ServiceIcon className="w-8 h-8 text-primary" />,
    },
    proposals: {
      title: "Proposals",
      emptyTitle: "No Proposals Yet",
      emptySubtitle: "No proposals or estimates created for this customer yet",
      icon: <FileText className="w-8 h-8 text-primary" strokeWidth={1.75} />,
    },
    "contracts-agreements": {
      title: "Contracts & Agreements",
      emptyTitle: "No Contracts Yet",
      emptySubtitle: "No contracts or agreements signed for this customer yet",
      icon: <FileCheck className="w-8 h-8 text-primary" strokeWidth={1.75} />,
    },
    billing: {
      title: "Billing",
      emptyTitle: "No Billing Records Yet",
      emptySubtitle: "No invoices, payments, or balance records for this customer yet",
      icon: <BillingIcon className="w-8 h-8 text-primary" />,
    },
    activity: {
      title: "Activity",
      emptyTitle: "No Activity Yet",
      emptySubtitle: "There is no recent activity or audit logs for this customer",
      icon: <ActivityIcon className="w-8 h-8 text-primary" />,
    },
  };

  const current = tabConfig[tabKey] || {
    title: tabKey,
    emptyTitle: `No ${tabKey} Yet`,
    emptySubtitle: `No records found for this customer`,
    icon: <FileText className="w-8 h-8 text-primary" strokeWidth={1.75} />,
  };

  return (
    <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-6 shadow-2xs space-y-4 min-h-[400px]">
      <h2 className="text-base sm:text-lg font-medium text-primary-heading font-barlow-condensed border-b border-border pb-3">
        {current.title}
      </h2>

      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-nav-bg flex items-center justify-center text-primary shadow-2xs">
          {current.icon}
        </div>

        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-medium text-primary-heading font-barlow-condensed">
            {current.emptyTitle}
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading max-w-sm mx-auto leading-relaxed">
            {current.emptySubtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerGenericEmptyTab;

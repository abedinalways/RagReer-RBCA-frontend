"use client";
import React from "react";
import { PenTool } from "lucide-react";
import { CustomerItem } from "../types/adminCustomers.types";

interface CustomerOverviewTabProps {
  customer: CustomerItem;
}

export const CustomerOverviewTab: React.FC<CustomerOverviewTabProps> = ({
  customer,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Card: Customer Information */}
      <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-6 shadow-2xs space-y-4">
        <h2 className="text-base sm:text-lg font-medium text-primary-heading font-barlow-condensed border-b border-border pb-3">
          Customer Information
        </h2>

        <div className="space-y-3.5 text-xs sm:text-sm">
          <div className="flex items-center justify-between">
            <span className="text-secondary-subheading">Full Name</span>
            <span className="text-primary-heading font-medium">
              {customer.name}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-secondary-subheading">Customer Type</span>
            <span className="text-primary-heading font-medium">
              {customer.customerType}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-secondary-subheading">Role</span>
            <span className="text-primary-heading font-medium">
              {customer.role}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-secondary-subheading">Email Address</span>
            <span className="text-primary-heading font-medium">
              {customer.email}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-secondary-subheading">Phone Number</span>
            <span className="text-primary-heading font-medium">
              {customer.phone}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-secondary-subheading">Billing Type</span>
            <span className="text-primary-heading font-medium">
              {customer.billingType}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-secondary-subheading">Portal Access</span>
            <span className="text-primary font-medium">
              {customer.portalAccess}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-secondary-subheading">Member Since</span>
            <span className="text-primary-heading font-medium">
              {customer.memberSince}
            </span>
          </div>
        </div>
      </div>

      {/* Right Card: Recent Activity */}
      <div className="bg-card-bg rounded-xl border border-border p-4 sm:p-6 shadow-2xs space-y-4 flex flex-col justify-between min-h-[350px]">
        <h2 className="text-base sm:text-lg font-medium text-primary-heading font-barlow-condensed border-b border-border pb-3">
          Recent Activity
        </h2>

        <div className="my-auto text-center space-y-3 py-8">
          <div className="mx-auto w-14 h-14 rounded-full bg-nav-bg flex items-center justify-center text-primary shadow-2xs">
            <PenTool className="w-6 h-6 text-primary" strokeWidth={1.75} />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-medium text-primary-heading font-barlow-condensed">
              No Activity Yet
            </h3>
            <p className="text-xs sm:text-sm text-secondary-subheading max-w-xs mx-auto">
              There is no activity for this customer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOverviewTab;

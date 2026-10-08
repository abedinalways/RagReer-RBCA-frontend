"use client";

import React, { useState } from "react";
import { BillingSettings } from "../types";
import { ServiceStatusToggle } from "@/features/admin/services/components/ServiceStatusToggle";
import { CustomCheckbox } from "@/features/admin/roles/components/CustomCheckbox";

interface BillingPaymentsTabProps {
  settings: BillingSettings;
  onChange: (settings: BillingSettings) => void;
}

export function BillingPaymentsTab({
  settings,
  onChange,
}: BillingPaymentsTabProps) {
  const [data, setData] = useState<BillingSettings>(settings);

  const handleDueDaysChange = (days: number) => {
    const updated = { ...data, invoiceDueDays: days };
    setData(updated);
    onChange(updated);
  };

  const handleReminderToggle = (key: keyof BillingSettings["reminders"], val: boolean) => {
    const updated = {
      ...data,
      reminders: { ...data.reminders, [key]: val },
    };
    setData(updated);
    onChange(updated);
  };

  const handleMethodToggle = (key: keyof BillingSettings["acceptedMethods"], val: boolean) => {
    const updated = {
      ...data,
      acceptedMethods: { ...data.acceptedMethods, [key]: val },
    };
    setData(updated);
    onChange(updated);
  };

  const handleBillingTypeToggle = (key: keyof BillingSettings["billingTypeDefault"], val: boolean) => {
    const updated = {
      ...data,
      billingTypeDefault: { ...data.billingTypeDefault, [key]: val },
    };
    setData(updated);
    onChange(updated);
  };

  return (
    <div className="space-y-8 divide-y divide-border/60">
      {/* 1. Payment Terms */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 pt-0">
        <div className="lg:col-span-5">
          <h3 className="text-[1.125rem] font-bold text-primary-heading">
            Payment Terms
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-1 leading-relaxed">
            Default due date applied to all invoices.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 p-4 border border-border rounded-md bg-card-bg flex-wrap">
            <span className="text-sm md:text-base font-medium text-txt-primary">
              Invoice due after
            </span>
            <input
              type="number"
              min={1}
              max={180}
              value={data.invoiceDueDays}
              onChange={(e) => handleDueDaysChange(Number(e.target.value) || 0)}
              className="w-16 px-2.5 py-1.5 rounded-md border border-border bg-page-bg/40 text-center text-sm md:text-base font-semibold text-txt-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <span className="text-sm md:text-base font-medium text-txt-primary">
              days from invoice date
            </span>
          </div>
        </div>
      </div>

      {/* 2. Payment Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 pt-8">
        <div className="lg:col-span-5">
          <h3 className="text-[1.125rem] font-bold text-primary-heading">
            Payment Reminders
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-1 leading-relaxed">
            Automated reminders sent to customers.
          </p>
        </div>

        <div className="lg:col-span-7 border border-border rounded-md bg-card-bg divide-y divide-border/50">
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-sm md:text-base text-txt-primary">
              7 days before due date
            </span>
            <ServiceStatusToggle
              isActive={data.reminders.sevenDaysBefore}
              onChange={(val) => handleReminderToggle("sevenDaysBefore", val)}
            />
          </div>

          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-sm md:text-base text-txt-primary">
              Due date reminder
            </span>
            <ServiceStatusToggle
              isActive={data.reminders.dueDateReminder}
              onChange={(val) => handleReminderToggle("dueDateReminder", val)}
            />
          </div>

          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-sm md:text-base text-txt-primary">
              3 days overdue notice
            </span>
            <ServiceStatusToggle
              isActive={data.reminders.threeDaysOverdue}
              onChange={(val) => handleReminderToggle("threeDaysOverdue", val)}
            />
          </div>

          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-sm md:text-base text-txt-primary">
              10 days overdue notice
            </span>
            <ServiceStatusToggle
              isActive={data.reminders.tenDaysOverdue}
              onChange={(val) => handleReminderToggle("tenDaysOverdue", val)}
            />
          </div>

          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-sm md:text-base text-txt-primary">
              14 days overdue
            </span>
            <ServiceStatusToggle
              isActive={data.reminders.fourteenDaysOverdue}
              onChange={(val) => handleReminderToggle("fourteenDaysOverdue", val)}
            />
          </div>
        </div>
      </div>

      {/* 3. Accepted Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 pt-8">
        <div className="lg:col-span-5">
          <h3 className="text-[1.125rem] font-bold text-primary-heading">
            Accepted Payment Methods
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-1 leading-relaxed">
            Set your payment methods
          </p>
        </div>

        <div className="lg:col-span-7 border border-border rounded-md bg-card-bg divide-y divide-border/50">
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-sm md:text-base text-txt-primary">
              Clover / Card — online payments via customer portal
            </span>
            <CustomCheckbox
              id="method-clover"
              checked={data.acceptedMethods.cloverCard}
              onChange={(val) => handleMethodToggle("cloverCard", val)}
            />
          </div>

          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-sm md:text-base text-txt-primary">
              Cash — collected by Kyle & Crew Leader
            </span>
            <CustomCheckbox
              id="method-cash"
              checked={data.acceptedMethods.cash}
              onChange={(val) => handleMethodToggle("cash", val)}
            />
          </div>

          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-sm md:text-base text-txt-primary">
              ACH / Bank transfer
            </span>
            <CustomCheckbox
              id="method-ach"
              checked={data.acceptedMethods.ach}
              onChange={(val) => handleMethodToggle("ach", val)}
            />
          </div>
        </div>
      </div>

      {/* 4. Billing Type Default */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 pt-8">
        <div className="lg:col-span-5">
          <h3 className="text-[1.125rem] font-bold text-primary-heading">
            Billing Type Default
          </h3>
          <p className="text-xs sm:text-sm text-secondary-subheading mt-1 leading-relaxed">
            Applied when adding a new portfolio customer. Can be changed per customer.
          </p>
        </div>

        <div className="lg:col-span-7 border border-border rounded-md bg-card-bg divide-y divide-border/50">
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-sm md:text-base text-txt-primary">
              Consolidated — one invoice for all properties
            </span>
            <CustomCheckbox
              id="billing-consolidated"
              checked={data.billingTypeDefault.consolidated}
              onChange={(val) => handleBillingTypeToggle("consolidated", val)}
            />
          </div>

          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-sm md:text-base text-txt-primary">
              Separate — one invoice per property
            </span>
            <CustomCheckbox
              id="billing-separate"
              checked={data.billingTypeDefault.separate}
              onChange={(val) => handleBillingTypeToggle("separate", val)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
